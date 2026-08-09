import dados from './pokemon.json';

/* ============================================================
   Nucleo da Pokedex: le a lista dos 1025 Pokemon da Pokedex
   Nacional (gerada da PokeAPI) e cruza com a lista do que
   FALTA para cada treinador, produzindo as estatisticas.
   ============================================================ */

export interface Pokemon {
  id: number;
  name: string;
  gen: number;
  types: string[];
}

export const POKEMON = dados as Pokemon[];
export const TOTAL_NACIONAL = POKEMON.length;

export const GERACOES = [
  { num: 1, regiao: 'Kanto',  jogos: 'Red · Blue · Yellow' },
  { num: 2, regiao: 'Johto',  jogos: 'Gold · Silver · Crystal' },
  { num: 3, regiao: 'Hoenn',  jogos: 'Ruby · Sapphire · Emerald' },
  { num: 4, regiao: 'Sinnoh', jogos: 'Diamond · Pearl · Platinum' },
  { num: 5, regiao: 'Unova',  jogos: 'Black · White' },
  { num: 6, regiao: 'Kalos',  jogos: 'X · Y' },
  { num: 7, regiao: 'Alola',  jogos: 'Sun · Moon' },
  { num: 8, regiao: 'Galar',  jogos: 'Sword · Shield' },
  { num: 9, regiao: 'Paldea', jogos: 'Scarlet · Violet' },
];

/* ------------------------------------------------------------
   Parser tolerante da lista de faltantes. Aceita array de
   numeros ou texto livre com virgulas, espacos, quebras de
   linha, intervalos "152-160" e comentarios iniciados por #.
   ------------------------------------------------------------ */
export function parseFaltantes(entrada: string | number[]): Set<number> {
  const faltantes = new Set<number>();

  const adicionar = (n: number) => {
    if (Number.isInteger(n) && n >= 1 && n <= TOTAL_NACIONAL) faltantes.add(n);
  };

  if (Array.isArray(entrada)) {
    entrada.forEach(adicionar);
    return faltantes;
  }

  const limpo = String(entrada ?? '')
    .split('\n')
    .map((linha) => linha.replace(/#.*$/, ''))
    .join('\n');

  // Intervalos primeiro (152-160), depois os numeros soltos que sobraram.
  const semIntervalos = limpo.replace(/(\d+)\s*[-–—]\s*(\d+)/g, (_, a: string, b: string) => {
    const ini = Math.min(Number(a), Number(b));
    const fim = Math.max(Number(a), Number(b));
    for (let n = ini; n <= fim; n++) adicionar(n);
    return ' ';
  });

  for (const bruto of semIntervalos.match(/\d+/g) ?? []) adicionar(Number(bruto));

  return faltantes;
}

export interface ProgressoGeracao {
  num: number;
  regiao: string;
  jogos: string;
  total: number;
  capturados: number;
  faltam: number;
  percentual: number;
  completa: boolean;
}

export interface Progresso {
  total: number;
  capturados: number;
  faltam: number;
  percentual: number;
  completa: boolean;
  geracoes: ProgressoGeracao[];
  faltantesOrdenados: number[];
}

export function calcularProgresso(faltantes: Set<number>): Progresso {
  const capturados = TOTAL_NACIONAL - faltantes.size;

  const geracoes = GERACOES.map((g) => {
    const daGeracao = POKEMON.filter((p) => p.gen === g.num);
    const faltamAqui = daGeracao.filter((p) => faltantes.has(p.id)).length;
    const capturadosAqui = daGeracao.length - faltamAqui;
    return {
      ...g,
      total: daGeracao.length,
      capturados: capturadosAqui,
      faltam: faltamAqui,
      percentual: daGeracao.length ? (capturadosAqui / daGeracao.length) * 100 : 0,
      completa: faltamAqui === 0,
    };
  });

  return {
    total: TOTAL_NACIONAL,
    capturados,
    faltam: faltantes.size,
    percentual: (capturados / TOTAL_NACIONAL) * 100,
    completa: faltantes.size === 0,
    geracoes,
    faltantesOrdenados: [...faltantes].sort((a, b) => a - b),
  };
}

/* Numero no formato da Pokedex: 001, 025, 1025. */
export const numeroDex = (id: number): string => String(id).padStart(3, '0');
