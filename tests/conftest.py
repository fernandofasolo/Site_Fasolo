"""Fixtures dos testes da landing.

Por padrão testa o build local: roda `astro preview` em cima do dist/ (rode
`npm run build` antes). Para testar outro endereço, por exemplo produção:

    BASE_URL=https://fasolo.ia.br .venv-tests/Scripts/python -m pytest tests

O navegador é o Edge instalado no Windows (channel "msedge"); em outro sistema,
use PW_CHANNEL=chromium depois de `python -m playwright install chromium`.
"""

import os
import socket
import subprocess
import sys
import time
from pathlib import Path

import pytest
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
PORT = 4329

# Larguras reais de aparelhos: celulares pequenos a grandes, tablet e desktop.
VIEWPORTS = {
    "celular-320": {"width": 320, "height": 568},
    "celular-360": {"width": 360, "height": 740},
    "celular-390": {"width": 390, "height": 844},
    "celular-414": {"width": 414, "height": 896},
    "tablet-768": {"width": 768, "height": 1024},
    "desktop-1280": {"width": 1280, "height": 800},
    "desktop-1440": {"width": 1440, "height": 900},
}
CELULARES = [k for k in VIEWPORTS if k.startswith("celular")]


def _porta_aberta(port: int) -> bool:
    with socket.socket() as s:
        s.settimeout(0.5)
        return s.connect_ex(("127.0.0.1", port)) == 0


@pytest.fixture(scope="session")
def base_url():
    externo = os.environ.get("BASE_URL")
    if externo:
        yield externo.rstrip("/")
        return
    if not (ROOT / "dist" / "index.html").exists():
        pytest.exit("dist/ não existe: rode `npm run build` antes dos testes.", returncode=2)
    npx = "npx.cmd" if sys.platform == "win32" else "npx"
    proc = subprocess.Popen(
        [npx, "astro", "preview", "--port", str(PORT), "--host", "127.0.0.1"],
        cwd=ROOT, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
    )
    for _ in range(60):
        if _porta_aberta(PORT):
            break
        time.sleep(0.5)
    else:
        proc.kill()
        pytest.exit("astro preview não subiu na porta %d." % PORT, returncode=2)
    yield f"http://127.0.0.1:{PORT}"
    proc.terminate()
    # No Windows o npx deixa o node filho vivo; derruba a árvore inteira.
    if sys.platform == "win32":
        subprocess.run(["taskkill", "/F", "/T", "/PID", str(proc.pid)], capture_output=True)


@pytest.fixture(scope="session")
def browser():
    with sync_playwright() as pw:
        b = pw.chromium.launch(channel=os.environ.get("PW_CHANNEL", "msedge"))
        yield b
        b.close()


@pytest.fixture
def abrir(browser, base_url):
    """abrir(viewport_key, caminho='/') -> (page, erros_de_console)."""
    contextos = []

    def _abrir(viewport_key: str, caminho: str = "/"):
        vp = VIEWPORTS[viewport_key]
        ctx = browser.new_context(viewport=vp, device_scale_factor=2 if vp["width"] < 768 else 1,
                                  is_mobile=vp["width"] < 768, has_touch=vp["width"] < 768)
        contextos.append(ctx)
        page = ctx.new_page()
        erros = []
        page.on("pageerror", lambda e: erros.append(f"pageerror: {e}"))
        page.on("console", lambda m: m.type == "error" and erros.append(f"console: {m.text}"))
        resp = page.goto(base_url + caminho, wait_until="networkidle")
        assert resp is not None and resp.status == 200, f"{caminho} respondeu {resp and resp.status}"
        return page, erros

    yield _abrir
    for ctx in contextos:
        ctx.close()
