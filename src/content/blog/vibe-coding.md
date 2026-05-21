---
title: 'Vibe Coding: programar sem saber programar (e funcionar)'
description: 'O que acontece quando um empreendedor sem formação em TI decide construir um app completo usando só IA? Eu testei — e foi mais longe do que eu esperava.'
pubDate: '2026-05-21'
author: 'Fernando Fasolo'
category: 'Tech'
---

Em fevereiro de 2025, Andrej Karpathy — um dos fundadores da OpenAI — publicou uma thread no X descrevendo uma nova forma de programar. Ele chamou de **Vibe Coding**: você descreve o que quer em linguagem natural, a IA escreve o código, você testa, pede ajustes, aceita o que funciona e segue em frente. Sem entender profundamente o que está por baixo. Apenas na vibe.

Eu li aquilo e pensei: *esse sou eu.*

## O experimento

Sou empreendedor da área de telecomunicações. Nunca trabalhei como desenvolvedor. Sei ler código, entendo a lógica, mas escrever uma API do zero, configurar banco de dados, montar deploy com CI/CD — isso ficava fora do meu raio de ação.

Decidi testar os limites do Vibe Coding de verdade: construir um app web completo, do zero, do backend ao deploy, usando o Claude como par de programação.

O projeto: um site sobre a **Copa do Mundo FIFA 2026** — com tabela de jogos, grupos ao vivo, escalação do Brasil, bolão e painel admin.

Stack escolhida pelo Claude: FastAPI (Python), React com Vite, Tailwind CSS, SQLite, deploy no Vercel + Render.

## Como foi na prática

Trabalho em sprints. Cada sprint tinha um objetivo claro — "quero uma página de grupos com classificação ao vivo" — e eu descrevia o que queria ver, o comportamento esperado, as restrições. O Claude escrevia. Eu testava no browser. Encontrava o que não funcionava, descrevia o problema, e seguia.

Em alguns momentos entrei no código para entender uma lógica específica. Mas a maior parte do tempo fui um **gerente de produto exigente** mais do que um programador.

O que surpreendeu: a qualidade arquitetural. O código gerado seguia boas práticas — separação de responsabilidades, SQL parametrizado, tratamento de erros, sem vazamentos de credenciais. Não era código de prototipagem descartável. Era código que eu teria orgulho de mostrar para um dev sênior.

## O que o Vibe Coding exige de você

Não é mágica passiva. Para funcionar bem, você precisa:

- **Saber o que quer** — quanto mais claro o objetivo, melhor o resultado
- **Testar com rigor** — a IA não usa o produto; você usa
- **Entender o suficiente** — não precisa saber escrever, mas precisa saber ler e questionar
- **Iterar sem pressa** — bugs fazem parte; descrever bem o erro resolve 90% das vezes

O que não funciona: pedir "faz um app de e-commerce" e esperar um Mercado Livre. Escopo pequeno, iteração rápida, feedback constante — esse é o ritmo certo.

## O resultado

O site está no ar: [fasolo.ia.br/copa2026](/copa2026). Foram 9 sprints, aproximadamente 30 horas de trabalho distribuídas em sessões, algo que um dev solo levaria semanas para entregar — e eu fiz como hobby, sem background em desenvolvimento.

Não significa que substituí um desenvolvedor. Significa que **o custo de entrada para construir software caiu drasticamente**. Um empreendedor com clareza de produto e disposição para iterar consegue entregar coisas reais.

## O que muda daqui pra frente

Vibe Coding não é para todo mundo e não resolve tudo. Sistemas complexos, código crítico de segurança, integrações delicadas — ainda exigem profissionais experientes.

Mas para MVPs, ferramentas internas, projetos pessoais e protótipos? O jogo mudou. A barreira não é mais técnica. É de clareza e de coragem para começar.

Se você tem uma ideia engavetada por não saber programar — esse engavetamento acabou.
