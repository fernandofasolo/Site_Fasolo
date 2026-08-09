/* Traducao e cor de cada tipo. As cores sao as canonicas da franquia,
   usadas nas fichas do jogo — servem de referencia visual imediata. */

export interface Tipo {
  nome: string;
  cor: string;
}

export const TIPOS: Record<string, Tipo> = {
  normal:   { nome: 'Normal',    cor: '#a8a77a' },
  fire:     { nome: 'Fogo',      cor: '#ee8130' },
  water:    { nome: 'Água',      cor: '#6390f0' },
  electric: { nome: 'Elétrico',  cor: '#e8c31f' },
  grass:    { nome: 'Planta',    cor: '#7ac74c' },
  ice:      { nome: 'Gelo',      cor: '#96d9d6' },
  fighting: { nome: 'Lutador',   cor: '#c22e28' },
  poison:   { nome: 'Venenoso',  cor: '#a33ea1' },
  ground:   { nome: 'Terrestre', cor: '#e2bf65' },
  flying:   { nome: 'Voador',    cor: '#a98ff3' },
  psychic:  { nome: 'Psíquico',  cor: '#f95587' },
  bug:      { nome: 'Inseto',    cor: '#a6b91a' },
  rock:     { nome: 'Pedra',     cor: '#b6a136' },
  ghost:    { nome: 'Fantasma',  cor: '#735797' },
  dragon:   { nome: 'Dragão',    cor: '#6f35fc' },
  dark:     { nome: 'Sombrio',   cor: '#8d7461' },
  steel:    { nome: 'Aço',       cor: '#b7b7ce' },
  fairy:    { nome: 'Fada',      cor: '#d685ad' },
};

export const nomeTipo = (chave: string): string => TIPOS[chave]?.nome ?? chave;
export const corTipo  = (chave: string): string => TIPOS[chave]?.cor  ?? '#64748b';

/* Ordem fixa para o filtro, para nao depender da ordem de insercao. */
export const TIPOS_ORDENADOS = Object.keys(TIPOS).sort((a, b) =>
  TIPOS[a].nome.localeCompare(TIPOS[b].nome, 'pt-BR'),
);
