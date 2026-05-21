// Bracket structure for FIFA 2026 (48 teams, 12 groups, R32 → R16 → QF → SF → Final)

// R32 seedings — each slot is "1A" (winner group A), "2B" (runner-up B), "T0" (best 3rd, index 0)
export const R32_JOGOS = [
  { id: 'M01', slotA: '1A', slotB: '2B' },
  { id: 'M02', slotA: '1C', slotB: '2D' },
  { id: 'M03', slotA: '1E', slotB: '2F' },
  { id: 'M04', slotA: '1G', slotB: '2H' },
  { id: 'M05', slotA: '1I', slotB: '2J' },
  { id: 'M06', slotA: '1K', slotB: '2L' },
  { id: 'M07', slotA: '1B', slotB: '2C' },
  { id: 'M08', slotA: '1D', slotB: '2E' },
  { id: 'M09', slotA: '1F', slotB: '2G' },
  { id: 'M10', slotA: '1H', slotB: '2I' },
  { id: 'M11', slotA: '1J', slotB: '2K' },
  { id: 'M12', slotA: '1L', slotB: '2A' },
  { id: 'M13', slotA: 'T0', slotB: 'T4' },
  { id: 'M14', slotA: 'T1', slotB: 'T5' },
  { id: 'M15', slotA: 'T2', slotB: 'T6' },
  { id: 'M16', slotA: 'T3', slotB: 'T7' },
]

export const QUARTAS_JOGOS = [
  { id: 'Q1', parentA: 'M01', parentB: 'M02' },
  { id: 'Q2', parentA: 'M03', parentB: 'M04' },
  { id: 'Q3', parentA: 'M05', parentB: 'M06' },
  { id: 'Q4', parentA: 'M07', parentB: 'M08' },
  { id: 'Q5', parentA: 'M09', parentB: 'M10' },
  { id: 'Q6', parentA: 'M11', parentB: 'M12' },
  { id: 'Q7', parentA: 'M13', parentB: 'M14' },
  { id: 'Q8', parentA: 'M15', parentB: 'M16' },
]

export const SEMIS_JOGOS = [
  { id: 'S1', parentA: 'Q1', parentB: 'Q2' },
  { id: 'S2', parentA: 'Q3', parentB: 'Q4' },
  { id: 'S3', parentA: 'Q5', parentB: 'Q6' },
  { id: 'S4', parentA: 'Q7', parentB: 'Q8' },
]

export const MEIASFINAIS_JOGOS = [
  { id: 'SF1', parentA: 'S1', parentB: 'S2' },
  { id: 'SF2', parentA: 'S3', parentB: 'S4' },
]

export const TERCEIRO_JOGO = { id: 'T3P', parentA: 'SF1_LOSER', parentB: 'SF2_LOSER' }
export const FINAL_JOGO    = { id: 'FIN', parentA: 'SF1',       parentB: 'SF2'       }

// Resolve a slot like "1A", "2B", "T0" into a team from classificados
function resolveSlot(slot, classificados) {
  const pos   = slot[0]  // "1" | "2" | "T"
  const letra = slot.slice(1)
  if (pos === '1') return classificados.primeiros[letra] ?? null
  if (pos === '2') return classificados.segundos[letra]  ?? null
  if (pos === 'T') return classificados.terceiros[parseInt(letra)] ?? null
  return null
}

// Build full bracket from classificados + knockoutDecisoes
// knockoutDecisoes: { matchId: selecao_id_vencedor }
export function buildBracket(classificados, knockoutDecisoes = {}) {
  const winners = {}   // matchId → selecao object
  const losers  = {}

  function teamFor(matchId, side) {
    // returns the selecao or null
    return side === 'a' ? winners[matchId + '_A'] : winners[matchId + '_B']
  }

  // R32: resolve from group results
  const oitavas = R32_JOGOS.map(jogo => {
    const teamA = resolveSlot(jogo.slotA, classificados)
    const teamB = resolveSlot(jogo.slotB, classificados)
    const vencedorId = knockoutDecisoes[jogo.id]
    const vencedor = vencedorId === teamA?.selecao_id ? teamA
                   : vencedorId === teamB?.selecao_id ? teamB : null
    winners[jogo.id] = vencedor
    losers[jogo.id]  = !vencedor ? null : (vencedor === teamA ? teamB : teamA)
    return { ...jogo, teamA, teamB, vencedor }
  })

  // Generic round builder
  function buildRound(jogos) {
    return jogos.map(jogo => {
      const teamA = winners[jogo.parentA] ?? null
      const teamB = winners[jogo.parentB] ?? null
      const vencedorId = knockoutDecisoes[jogo.id]
      const vencedor = vencedorId === teamA?.selecao_id ? teamA
                     : vencedorId === teamB?.selecao_id ? teamB : null
      winners[jogo.id] = vencedor
      losers[jogo.id]  = !vencedor ? null : (vencedor === teamA ? teamB : teamA)
      return { ...jogo, teamA, teamB, vencedor }
    })
  }

  const quartas     = buildRound(QUARTAS_JOGOS)
  const semis       = buildRound(SEMIS_JOGOS)
  const meias_finais = buildRound(MEIASFINAIS_JOGOS)

  const terceiro = {
    ...TERCEIRO_JOGO,
    teamA: losers['SF1'] ?? null,
    teamB: losers['SF2'] ?? null,
    vencedor: (() => {
      const idV = knockoutDecisoes['T3P']
      const a = losers['SF1'], b = losers['SF2']
      return idV === a?.selecao_id ? a : idV === b?.selecao_id ? b : null
    })(),
  }

  const final = {
    ...FINAL_JOGO,
    teamA: winners['SF1'] ?? null,
    teamB: winners['SF2'] ?? null,
    vencedor: (() => {
      const idV = knockoutDecisoes['FIN']
      const a = winners['SF1'], b = winners['SF2']
      return idV === a?.selecao_id ? a : idV === b?.selecao_id ? b : null
    })(),
  }

  return { oitavas, quartas, semis, meias_finais, terceiro, final }
}
