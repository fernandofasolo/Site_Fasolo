---
title: 'Proxmox em casa: meu servidor de virtualização doméstico'
description: 'Como montei um servidor caseiro com Proxmox para rodar VMs, containers e aprender infraestrutura sem gastar fortunas em nuvem.'
pubDate: '2026-05-05'
author: 'Fernando Fasolo'
category: 'Tech'
---

Um dos projetos mais divertidos que fiz nos últimos tempos foi montar um servidor doméstico com Proxmox VE. Parece coisa de especialista, mas é mais acessível do que parece.

## O que é Proxmox?

Proxmox é um sistema operacional de virtualização gratuito e open source. Com ele, você cria máquinas virtuais (VMs) e containers LXC em cima de um servidor físico — como se fosse seu próprio datacenter em miniatura.

## Por que fiz isso?

- Testar ambientes sem pagar por nuvem
- Aprender infraestrutura na prática
- Rodar serviços internos (VPN, NAS, automação)

## O hardware que usei

Não precisa de server enterprise. Usei um PC velho com:
- Intel Core i5 de 4ª geração
- 16 GB de RAM (fundamental — RAM é o maior limitante)
- 2 SSDs: um para o Proxmox, outro para as VMs

## O que rodo hoje

- **Ubuntu Server**: para desenvolvimento e testes
- **Debian LXC**: para serviços leves (Pi-hole, Nginx)
- **Windows 10 VM**: para testes de aplicações específicas

## Vale a pena?

Se você tem um PC velho encostado e curiosidade sobre infraestrutura, com certeza. A curva de aprendizado é real, mas o retorno é enorme.
