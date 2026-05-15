# SEO Audit — fasolo.ia.br

## Contexto
Site portfólio pessoal de Fernando Fasolo (pai — tech/negócios/IA) e
Fernando Fasolo Filho (filho — games/Roblox). Hospedado na Vercel.

## Keywords-Alvo
### Fernando Fasolo (pai)
- fernando fasolo
- fasolo telecom
- fasolo ia
- empreendedor telecom brasil
- pabx em nuvem brasil

### Fernando Fasolo Filho (filho)
- fasolo roblox
- fasolo games
- steal a brainrot

## Sequência de Verificação

### 1. Indexação
- [ ] Buscar `site:fasolo.ia.br` no Google e registrar quantas páginas indexadas
- [ ] Verificar se a home aparece como primeiro resultado

### 2. Ranking por Keyword
Para cada keyword-alvo acima:
- [ ] Buscar no Google e verificar se o site aparece nas 3 primeiras páginas
- [ ] Anotar posição aproximada

### 3. Arquivos Técnicos
- [ ] WebFetch em `https://fasolo.ia.br/robots.txt` — verificar se não bloqueia Googlebot
- [ ] WebFetch em `https://fasolo.ia.br/sitemap.xml` — verificar se existe e está bem formado

### 4. On-Page SEO (via WebFetch na home)
- [ ] `<title>` presente e com keyword principal
- [ ] `<meta name="description">` presente e entre 120-160 caracteres
- [ ] Tag canonical correta (`https://fasolo.ia.br/`)
- [ ] Open Graph (`og:title`, `og:description`, `og:image`) presentes
- [ ] Schema.org `Person` ou `Organization` no HTML
- [ ] Headings hierárquicos (um H1, H2s relevantes)

### 5. Performance
- [ ] WebFetch na API do PageSpeed Insights:
  `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://fasolo.ia.br`
- [ ] Anotar scores: Performance, Accessibility, Best Practices, SEO

### 6. Presença Externa
- [ ] Buscar `"fasolo.ia.br"` no Google — ver sites que linkam ou mencionam
- [ ] Buscar `"Fernando Fasolo"` — ver se o site aparece nos resultados

## Output Esperado
Ao final, gerar tabela com:
| Item | Status | Observação |
|---|---|---|
| Indexação | ✅ / ❌ | X páginas indexadas |
| Ranking principal keyword | ✅ / ❌ | Posição X |
| robots.txt | ✅ / ❌ | |
| sitemap.xml | ✅ / ❌ | |
| Meta tags | ✅ / ❌ | |
| PageSpeed Score | ✅ / ❌ | XX/100 |

## Recomendações
[Claude preenche aqui após a auditoria]
