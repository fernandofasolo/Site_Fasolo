import { FALTANTES_FERNANDO } from './faltantes-fernando';
import { FALTANTES_FASOLINHO } from './faltantes-fasolinho';
import { parseFaltantes, calcularProgresso, type Progresso } from './pokedex';

/* ============================================================
   Os dois treinadores. Para mexer no que falta capturar,
   edite os arquivos faltantes-*.ts — nao e preciso tocar aqui.
   ============================================================ */

export interface Treinador {
  slug: string;
  nome: string;
  apelido: string;
  autor: 'Fernando Fasolo' | 'Fernando Fasolo Jr.';
  iniciais: string;
  /* Cor de destaque: coral para o pai, teal para o filho —
     mesma divisao de acentos do resto do site. `corRgb` guarda os
     canais soltos para montar transparencias com rgb(... / alfa). */
  cor: string;
  corRgb: string;
  desde: string;
  blog: string;
  faltantes: Set<number>;
  progresso: Progresso;
}

function montar(base: Omit<Treinador, 'faltantes' | 'progresso'>, lista: string): Treinador {
  const faltantes = parseFaltantes(lista);
  return { ...base, faltantes, progresso: calcularProgresso(faltantes) };
}

export const FERNANDO: Treinador = montar(
  {
    slug: 'fernando',
    nome: 'Fernando Fasolo',
    apelido: 'o pai',
    autor: 'Fernando Fasolo',
    iniciais: 'FF',
    cor: '#fb7a45',
    corRgb: '251 122 69',
    desde: 'julho de 2016',
    blog: '/blog/fernando-fasolo/',
  },
  FALTANTES_FERNANDO,
);

export const FASOLINHO: Treinador = montar(
  {
    slug: 'fasolinho',
    nome: 'Fernando Fasolo Jr.',
    apelido: 'Fasolinho',
    autor: 'Fernando Fasolo Jr.',
    iniciais: 'FFF',
    cor: '#1fc7b6',
    corRgb: '31 199 182',
    desde: 'julho de 2016',
    blog: '/blog/fasolinho/',
  },
  FALTANTES_FASOLINHO,
);

export const TREINADORES = [FERNANDO, FASOLINHO];

export const porSlug = (slug: string): Treinador | undefined =>
  TREINADORES.find((t) => t.slug === slug);
