"""Testes da landing (fasolo.ia.br): layout em vários tamanhos de tela, capa,
botões, links, imagens e SEO. Rodar com:

    npm run build
    .venv-tests/Scripts/python -m pytest tests -v
"""

from urllib.parse import urljoin, urlparse

import pytest

import os

from conftest import CELULARES, ROOT, VIEWPORTS

TODOS = list(VIEWPORTS)
CTAS = 'section.hero-bg a[href="#pai"], section.hero-bg a[href="#filho"]'


def caixa(page, seletor):
    return page.locator(seletor).first.evaluate(
        "el => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el);"
        " return {x: r.left, y: r.top, w: r.width, h: r.height, fonte: parseFloat(s.fontSize),"
        " linhas: el.getClientRects().length} }"
    )


# --- Carregamento ----------------------------------------------------------

def test_carrega_sem_erros_de_javascript(abrir):
    page, erros = abrir("desktop-1440")
    assert "Fasolo" in page.title()
    # Falhas de rede de terceiros (ícones externos, ipinfo) não contam: só erros do nosso código.
    nossos = [e for e in erros if "Failed to load resource" not in e]
    assert not nossos, nossos


# --- Layout responsivo -----------------------------------------------------

@pytest.mark.parametrize("vp", TODOS)
def test_sem_rolagem_horizontal(abrir, vp):
    page, _ = abrir(vp)
    larg = page.evaluate("[document.documentElement.scrollWidth, document.documentElement.clientWidth]")
    assert larg[0] <= larg[1], f"conteúdo com {larg[0]}px numa tela de {larg[1]}px"


@pytest.mark.parametrize("vp", TODOS)
def test_capa_carrega_a_versao_certa(abrir, vp):
    page, _ = abrir(vp)
    img = page.locator("section.hero-bg picture img")
    info = img.evaluate("i => ({src: i.currentSrc, ok: i.complete && i.naturalWidth > 0})")
    assert info["ok"], f"capa não carregou: {info['src']}"
    esperado = "capa-mobile" if VIEWPORTS[vp]["width"] < 768 else "capa-desktop"
    assert esperado in info["src"], f"esperava {esperado}, veio {info['src']}"


@pytest.mark.parametrize("vp", TODOS)
def test_titulo_inteiro_na_tela(abrir, vp):
    page, _ = abrir(vp)
    h1 = caixa(page, "section.hero-bg h1")
    largura = VIEWPORTS[vp]["width"]
    assert h1["x"] >= 0 and h1["x"] + h1["w"] <= largura, f"[FASOLO] sai da tela: {h1}"


@pytest.mark.parametrize("vp", TODOS)
def test_logo_de_vidro_no_titulo(abrir, vp):
    """O h1 é o logo [FASOLO] em vidro: carregado, com alt para buscadores e
    leitores de tela, inteiro na tela e com tamanho de destaque."""
    page, _ = abrir(vp)
    img = page.locator("section.hero-bg h1 img")
    info = img.evaluate("i => ({ok: i.complete && i.naturalWidth > 0, alt: i.alt, src: i.currentSrc,"
                        " w: i.getBoundingClientRect().width, x: i.getBoundingClientRect().left})")
    assert info["ok"], f"logo não carregou: {info['src']}"
    assert info["alt"] == "[FASOLO]"
    largura = VIEWPORTS[vp]["width"]
    assert info["x"] >= 0 and info["x"] + info["w"] <= largura, "o logo sai da tela"
    assert info["w"] >= min(0.6 * largura, 240), f"logo pequeno demais: {info['w']:.0f}px"


@pytest.mark.parametrize("vp", CELULARES)
def test_botoes_da_capa_proporcionais_no_celular(abrir, vp):
    """Os dois botões (laranja e verde) devem ter cara de botão, não de faixa:
    mesma largura entre si, sem ocupar a tela de ponta a ponta, texto numa linha
    e em tamanho de leitura, altura confortável para o dedo."""
    page, _ = abrir(vp)
    largura = VIEWPORTS[vp]["width"]
    botoes = [caixa(page, f'section.hero-bg a[href="{h}"]') for h in ("#pai", "#filho")]
    for b in botoes:
        assert b["w"] <= 0.8 * largura, f"botão com {b['w']:.0f}px numa tela de {largura}px (vira faixa)"
        assert 44 <= b["h"] <= 56, f"altura do botão {b['h']:.0f}px fora de 44–56px"
        assert 14 <= b["fonte"] <= 17, f"texto do botão com {b['fonte']}px"
    assert abs(botoes[0]["w"] - botoes[1]["w"]) <= 2, "os dois botões têm larguras diferentes"


@pytest.mark.parametrize("vp", CELULARES)
def test_texto_dos_botoes_em_uma_linha(abrir, vp):
    page, _ = abrir(vp)
    for h in ("#pai", "#filho"):
        altura_linha = page.locator(f'section.hero-bg a[href="{h}"]').evaluate(
            "a => { const r = document.createRange(); r.selectNodeContents(a); return r.getClientRects().length }")
        assert altura_linha == 1, f"o texto do botão {h} quebrou em {altura_linha} linhas"


@pytest.mark.parametrize("vp", CELULARES)
def test_nomes_dos_autores_nao_quebram_no_meio(abrir, vp):
    page, _ = abrir(vp)
    for nome in ("Fernando Fasolo Filho", "Fernando Fasolo"):
        el = page.locator("section.hero-bg p span", has_text=nome).first
        assert el.evaluate("e => e.getClientRects().length") == 1, f'"{nome}" quebrou em duas linhas'


@pytest.mark.parametrize("vp", CELULARES)
def test_textos_do_topo_compactos_no_celular(abrir, vp):
    """No celular o início fica enxuto: título, frase e autores em tamanho menor
    e o selo de categorias numa linha só dentro do chip."""
    page, _ = abrir(vp)
    assert caixa(page, "section.hero-bg h1")["fonte"] <= 40
    frase = page.locator("section.hero-bg h1 + p")
    assert frase.inner_text().strip() == "Cotidiano, área tech, negócios e jogatinas"
    assert caixa(page, "section.hero-bg h1 + p")["fonte"] <= 16
    assert caixa(page, "section.hero-bg h1 + p + p")["fonte"] <= 14
    linhas = page.locator("section.hero-bg .tag").evaluate(
        "e => { const r = document.createRange(); r.selectNodeContents(e); return r.getClientRects().length }")
    assert linhas == 1, f"o selo quebrou em {linhas} linhas"


@pytest.mark.parametrize("vp", CELULARES)
def test_selo_de_categorias_cabe_na_tela(abrir, vp):
    page, _ = abrir(vp)
    tag = caixa(page, "section.hero-bg .tag")
    assert tag["x"] >= 0 and tag["x"] + tag["w"] <= VIEWPORTS[vp]["width"], f"selo sai da tela: {tag}"


@pytest.mark.parametrize("vp", CELULARES)
def test_widget_de_visita_nao_cobre_os_botoes(abrir, vp):
    """No celular o card "Sua visita" só aparece depois que a capa sai da tela."""
    page, _ = abrir(vp)
    page.wait_for_timeout(2500)
    assert not page.locator("#visitor-widget").is_visible(), "o widget aparece por cima da capa"
    page.mouse.wheel(0, VIEWPORTS[vp]["height"] * 2)
    page.wait_for_timeout(800)
    assert page.locator("#visitor-widget").is_visible(), "o widget não aparece depois de rolar"


@pytest.mark.parametrize("fonte", [100, 125, 150])
@pytest.mark.parametrize("vp", CELULARES)
def test_texto_dentro_dos_chips(abrir, vp, fonte):
    """O texto de cada chip/botão da capa fica dentro dos limites dele, inclusive
    com a fonte do sistema aumentada (acessibilidade no Android/iPhone)."""
    page, _ = abrir(vp)
    page.add_style_tag(content=f"html{{font-size:{fonte}% !important}}")
    page.wait_for_timeout(200)
    fora = page.eval_on_selector_all(
        "section.hero-bg .tag, section.hero-bg a[href^='#'], section.hero-bg .float",
        """els => els.map(e => {
            const r = e.getBoundingClientRect(), s = getComputedStyle(e);
            const raio = Math.min(parseFloat(s.borderTopLeftRadius) || 0, r.height / 2);
            const rg = document.createRange(); rg.selectNodeContents(e);
            const linhas = [...rg.getClientRects()];
            // Em cada linha de texto, a folga lateral precisa cobrir a curva do canto.
            const ruim = linhas.some(l => {
              const meio = (l.top + l.bottom) / 2 - r.top;
              const dy = Math.max(0, raio - Math.min(meio, r.height - meio));
              const recuo = raio - Math.sqrt(Math.max(0, raio * raio - dy * dy));
              return l.left < r.left + recuo - 0.5 || l.right > r.right - recuo + 0.5
                  || l.top < r.top - 0.5 || l.bottom > r.bottom + 0.5;
            });
            return ruim ? e.textContent.trim() : null;
        }).filter(Boolean)""")
    assert not fora, f"texto saindo do chip com fonte {fonte}%: {fora}"
    larg = page.evaluate("[document.documentElement.scrollWidth, document.documentElement.clientWidth]")
    assert larg[0] <= larg[1], f"com fonte {fonte}% a página fica com {larg[0]}px numa tela de {larg[1]}px"


def test_widget_recolhe_para_bem_vindo(abrir):
    """O card "Sua visita" aparece, some depois de 3 s e deixa a pílula
    "Bem-vindo!"; tocar nela reabre o card."""
    page, _ = abrir("desktop-1440")
    card, pilula = page.locator("#visitor-card"), page.locator("#visitor-pill")
    assert card.is_visible(), "o card não aparece ao abrir a página"
    page.wait_for_timeout(3600)
    assert not card.is_visible(), "o card não recolheu depois de 3 s"
    assert pilula.is_visible() and "Bem-vindo" in pilula.inner_text()
    pilula.click()
    assert card.is_visible(), "tocar na pílula não reabre o card"


@pytest.mark.parametrize("vp", ["celular-390", "desktop-1440"])
def test_recarregar_volta_ao_topo(abrir, vp):
    page, _ = abrir(vp)
    page.locator('section.hero-bg a[href="#filho"]').click()  # deixa #filho no endereço
    page.mouse.wheel(0, 2500)
    page.wait_for_timeout(500)
    assert page.evaluate("scrollY") > 0
    page.reload(wait_until="networkidle")
    page.wait_for_timeout(500)
    assert page.evaluate("scrollY") == 0, "depois de recarregar a página não voltou ao topo"
    assert page.evaluate("location.hash") == "", "a âncora continuou no endereço"


def test_link_com_ancora_de_outra_pagina_continua_funcionando(abrir):
    page, _ = abrir("desktop-1440", "/#contato")
    page.wait_for_timeout(500)
    assert page.evaluate("scrollY") > 300, "/#contato não levou até a seção de contato"


# --- Links, imagens e SEO --------------------------------------------------

def test_ancoras_internas_existem(abrir):
    page, _ = abrir("desktop-1440")
    alvos = page.eval_on_selector_all('a[href^="#"]', "as => as.map(a => a.getAttribute('href'))")
    faltando = [h for h in set(alvos) if h != "#" and page.locator(h).count() == 0]
    assert not faltando, f"âncoras sem destino: {faltando}"


def test_links_internos_respondem(abrir, base_url):
    page, _ = abrir("desktop-1440")
    hrefs = page.eval_on_selector_all("a[href]", "as => as.map(a => a.getAttribute('href'))")
    internos = sorted({urljoin(base_url + "/", h).split("#")[0] for h in hrefs
                       if not h.startswith(("#", "mailto:", "tel:"))
                       and urlparse(urljoin(base_url + "/", h)).netloc == urlparse(base_url).netloc})
    quebrados = []
    for url in internos:
        if "/copa2026" in url and not os.environ.get("BASE_URL") and not (ROOT / "public" / "copa2026").exists():
            continue  # a Copa é um app à parte, só entra no build completo (npm run build:full)
        r = page.request.get(url)
        if r.status >= 400:
            quebrados.append(f"{r.status} {url}")
    assert internos, "nenhum link interno encontrado"
    assert not quebrados, quebrados


def test_imagens_carregam(abrir):
    page, _ = abrir("desktop-1440")
    quebradas = page.eval_on_selector_all(
        "img", "is => is.filter(i => i.loading !== 'lazy' && i.complete && i.naturalWidth === 0).map(i => i.src)")
    assert not quebradas, f"imagens quebradas: {quebradas}"


def test_imagens_tem_alt(abrir):
    page, _ = abrir("desktop-1440")
    sem_alt = page.eval_on_selector_all("img", "is => is.filter(i => !i.hasAttribute('alt')).map(i => i.src)")
    assert not sem_alt, sem_alt


def test_seo_basico(abrir):
    page, _ = abrir("desktop-1440")
    assert page.locator("html").get_attribute("lang") == "pt-BR"
    for seletor in ('meta[name="description"]', 'meta[property="og:image"]', 'link[rel="canonical"]'):
        assert page.locator(seletor).count() == 1, f"faltando {seletor}"
    assert page.locator("h1").count() == 1, "a página deve ter exatamente um h1"


@pytest.mark.parametrize("vp", CELULARES)
def test_alvos_de_toque_no_celular(abrir, vp):
    page, _ = abrir(vp)
    pequenos = page.eval_on_selector_all(
        "section.hero-bg a, section.hero-bg button",
        "els => els.map(e => [e.textContent.trim(), e.getBoundingClientRect().height])"
               ".filter(([t, h]) => h > 0 && h < 32)")
    assert not pequenos, f"links pequenos demais para o dedo (<32px): {pequenos}"
