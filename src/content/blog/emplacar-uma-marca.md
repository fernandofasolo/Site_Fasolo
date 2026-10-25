---
title: 'Emplacar uma marca do zero: o que aprendi divulgando um eSIM brasileiro'
description: 'Anúncios, redes, WhatsApp, vídeo com IA e muita medição: os bastidores do marketing digital de um produto novo, com orçamento pequeno e uma marca que ninguém conhecia.'
pubDate: '2026-10-25'
author: 'Fernando Fasolo'
category: 'Negócios'
heroImage: '../../assets/marketing/capa-marketing.jpg'
---

Lançar um produto é uma coisa. Fazer alguém confiar numa marca que nunca ouviu falar, para comprar algo que nem dá para pegar na mão, é outra bem diferente.

Nos últimos meses passei por isso com um **eSIM brasileiro para viagem**: um chip virtual de dados para quem viaja para fora do Brasil. Você compra, recebe um QR code, instala no celular antes de embarcar e chega ao destino já conectado. Simples de explicar, difícil de vender. Este post é sobre o caminho: as plataformas, a estratégia e, principalmente, os tropeços.

## O produto e o posicionamento

O mercado de eSIM para viagem já tem marcas globais grandes, que cobram em dólar e atendem em inglês. A gente não entrou para ser o mais barato. A aposta foi outra: **marca brasileira, preço em reais e atendimento em português pelo WhatsApp, sete dias por semana.**

Parece pouco, mas para quem está no aeroporto sem Wi-Fi e com o QR code que não lê, falar com uma pessoa na própria língua vale muito.

Desde o começo o público se dividiu em dois:

- **Pessoa física**: turista, família de férias, nômade digital.
- **Empresas**: inclusive agências de turismo, como canal de revenda.

## As plataformas: onde a marca precisava estar

Uma marca nova não escolhe um canal só. Precisa estar onde o viajante procura, onde ele conversa e onde ele se informa. Montamos assim:

- **Site próprio**: uma landing estática, gerada a partir de **uma única tabela de pacotes**. Preço, textos e páginas de suporte saem dali. Ninguém edita preço à mão.
- **Google Ads (pesquisa)**: o canal pago principal. Captura quem já está procurando "eSIM para a Europa", por exemplo.
- **Meta (Facebook, Instagram, Threads)**: campanhas que levam a conversa para o WhatsApp, mais posts orgânicos.
- **WhatsApp**: onde a venda acontece de fato. Respostas prontas para as dúvidas mais comuns e um calendário de Status três vezes por semana.
- **YouTube Shorts**: vídeos curtos e educativos. O primeiro foi um tutorial: *"Seu celular tem eSIM? Disque \*#06#"*.
- **Reddit e Discord**: comunidade. Menos venda, mais conversa.
- **E-mail marketing**: boas-vindas, cupom e mensagens de compra.

Por trás de tudo, **painéis próprios** para acompanhar cada canal num lugar só, sem depender da interface de cada plataforma, e o trio clássico de medição: Google Analytics, Pixel da Meta e Search Console.

## Um criativo, muitos lugares

Com equipe pequena, a regra foi **produzir uma vez e distribuir em todo lugar**. O mesmo criativo vira post no Facebook, no Instagram e no Threads, Status no WhatsApp, Short no YouTube e conversa no Reddit.

As artes são geradas em código a partir de um modelo, e **o preço que aparece na imagem sai da mesma tabela do site**. Parece detalhe, mas não é: preço escrito à mão fica desatualizado em silêncio, e ninguém percebe até o cliente reclamar.

A inteligência artificial entrou forte aqui. As fotos de fundo dos criativos foram geradas com o **Nano Banana**, do Gemini. O primeiro vídeo usou o **Veo** para a imagem e o **Lyria** para a trilha. Uma orientação que funcionou: pedir *"foto de celular de viajante, não de banco de imagem"*. Marca nova não pode parecer genérica.

E quase todo o trabalho técnico (o site, os painéis, as automações) foi feito com o **Claude Code** como copiloto. Já contei um pouco disso no post sobre [vibe coding](/blog/vibe-coding/). Aqui foi a mesma ideia levada para o marketing.

## Os desafios de verdade

Esta é a parte que ninguém coloca no slide.

### Medir antes de otimizar

No começo, os números não batiam. Fomos atrás e descobrimos que uma regra de segurança do próprio site **bloqueava o analytics**. Mapeamos o caminho inteiro, do clique no anúncio até a venda, e eram seis elos. Vários estavam rompidos.

A lição ficou: **antes de otimizar qualquer coisa, prove que a medição existe.** Não adianta ajustar campanha olhando para um painel que não está vendo nada.

### A marca que o Google não achava

Buscar o nome da marca devolvia o site institucional antigo, não a página do eSIM. A solução foi migrar o domínio com redirecionamento permanente e organizar as páginas para o Google entender qual é a principal.

Depois vem a parte que exige paciência: página nova fica semanas como "detectada, não indexada". Não é erro, é fila. O Google tem o tempo dele.

### A palavra-chave que enganava

"Chip virtual" trazia a maior parte dos cliques, mas de gente procurando eSIM de operadora brasileira para usar **aqui**, não em viagem. Clique que nunca ia virar venda.

Decidimos manter a palavra pela visibilidade da marca e excluir as buscas pelas operadoras nacionais. Nem toda palavra com muito clique é uma boa palavra.

### Plataformas desconfiam de quem é novo

Toda rede tem seu porteiro: verificação de conta, revisão de anúncio, aprovação de API. O primeiro post da marca no Reddit caiu direto no filtro antispam. Mudamos a estratégia: **primeiro ajudar e comentar, depois postar.** Comunidade não gosta de quem chega vendendo, e está certa.

### Orçamento pequeno tem regras próprias

As plataformas têm um mínimo abaixo do qual simplesmente não entregam. Um teste com lance baixo no Google rendeu 9 impressões e nenhum clique. Na Meta, com verba no mínimo diário, cada troca de anúncio zera o aprendizado do algoritmo.

E tem mais uma consequência: **com pouco volume, teste A/B não conclui nada.** Zero clique em 9 impressões não é sinal de nada. É só pouco dado.

### Nota máxima não é garantia

O Google dá uma nota de "qualidade do anúncio". Nossa campanha para os EUA tinha nota máxima e entregava três vezes e meia menos que a da Europa. Correr atrás da nota "Excelente" não pagou a conta. Outra surpresa: as recomendações automáticas, se ficam ligadas, removem palavras-chave por conta própria. Vale olhar com atenção o que está ligado.

### Confiança se constrói no atendimento

Marca desconhecida vendendo um QR code. Por que alguém confiaria?

Respondemos com o que estava ao nosso alcance:

- atendimento humano rápido no WhatsApp;
- uma página de suporte com as perguntas reais dos clientes;
- conferir a compatibilidade do aparelho na ficha do fabricante, não em listas de terceiros.

A prova social ainda está crescendo. Ela vem com o tempo, cliente por cliente.

## O que eu levo disso

1. **Quando o conselho genérico bate de frente com o número da sua conta, vence o número.** Várias "boas práticas" foram medidas aqui e não se pagaram.
2. **Diga o denominador antes de afirmar.** Amostra pequena não conclui nada.
3. **Canal barato em dinheiro pode ser caro em horas.** A pergunta certa não é "quanto custa?", é "quem vai operar?".
4. **Uma fonte de verdade para tudo.** Tabela → site, criativos e e-mail. Menos erro, menos retrabalho.
5. **IA multiplica quem opera sozinho, mas não decide por ele.** Cada criativo novo e cada real gasto passam pela minha revisão.

## Conclusão

Emplacar uma marca não é um evento, é uma soma de pequenas provas: o anúncio que aparece para a pessoa certa, a resposta rápida no WhatsApp, o QR code que funciona no aeroporto. As ferramentas ajudam muito, e a IA mudou o que uma equipe pequena consegue fazer. Mas a confiança continua sendo construída do jeito antigo: **cumprindo o que promete, uma venda de cada vez.**

Se você está lançando algo novo, meu conselho é o mesmo do [post sobre IA](/blog/ia-no-dia-a-dia/): comece pequeno, meça de verdade e deixe o número te contar a história.
