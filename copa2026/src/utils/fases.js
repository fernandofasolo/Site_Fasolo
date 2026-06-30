// Rótulos das fases do torneio (FIFA 2026: 48 seleções → R32 → R16 → QF → SF → Final)
// O valor `dezesseis_avos` é a 1ª rodada eliminatória (Round of 32), antes das Oitavas.
export const FASE_LABEL = {
  grupo:          'Grupos',
  dezesseis_avos: '16-avos',
  oitavas:        'Oitavas',
  quartas:        'Quartas',
  semi:           'Semis',
  terceiro:       '3º Lugar',
  final:          'Final',
}

// Rótulo amigável de uma fase; para a fase de grupos inclui a letra do grupo.
export function faseLabel(fase, grupo) {
  if (fase === 'grupo') return grupo ? `Grupo ${grupo}` : 'Grupos'
  return FASE_LABEL[fase] ?? fase
}

// True quando o jogo foi decidido nos pênaltis (ambos os placares de pênalti presentes).
export function temPenaltis(jogo) {
  return jogo?.penaltis_a != null && jogo?.penaltis_b != null
}
