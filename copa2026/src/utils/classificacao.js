// Client-side group classification — mirrors classificacao.py logic

export function calcularClassificacaoGrupo(jogos, selecoes, palpites = {}) {
  const stats = {}
  for (const s of selecoes) {
    stats[s.id] = {
      ...s,
      jogos: 0, vitorias: 0, empates: 0, derrotas: 0,
      gols_pro: 0, gols_contra: 0, saldo_gols: 0, pontos: 0,
    }
  }

  for (const j of jogos) {
    const p = palpites[j.id]
    const ga = p?.gols_a ?? null
    const gb = p?.gols_b ?? null
    if (ga === null || gb === null) continue

    const idA = j.selecao_a_id
    const idB = j.selecao_b_id

    if (stats[idA]) {
      stats[idA].jogos++
      stats[idA].gols_pro  += ga
      stats[idA].gols_contra += gb
      stats[idA].saldo_gols  += ga - gb
    }
    if (stats[idB]) {
      stats[idB].jogos++
      stats[idB].gols_pro  += gb
      stats[idB].gols_contra += ga
      stats[idB].saldo_gols  += gb - ga
    }

    if (ga > gb) {
      if (stats[idA]) { stats[idA].vitorias++; stats[idA].pontos += 3 }
      if (stats[idB]) { stats[idB].derrotas++ }
    } else if (gb > ga) {
      if (stats[idB]) { stats[idB].vitorias++; stats[idB].pontos += 3 }
      if (stats[idA]) { stats[idA].derrotas++ }
    } else {
      if (stats[idA]) { stats[idA].empates++; stats[idA].pontos++ }
      if (stats[idB]) { stats[idB].empates++; stats[idB].pontos++ }
    }
  }

  const lista = Object.values(stats)
  lista.sort((a, b) => {
    if (b.pontos    !== a.pontos)    return b.pontos    - a.pontos
    if (b.saldo_gols !== a.saldo_gols) return b.saldo_gols - a.saldo_gols
    if (b.gols_pro  !== a.gols_pro)  return b.gols_pro  - a.gols_pro
    return (a.ranking_fifa || 999) - (b.ranking_fifa || 999)
  })

  return lista.map((s, i) => ({ ...s, posicao: i + 1 }))
}

export function computarTodosGrupos(jogosGrupo, selecoes, palpites) {
  const grupos = {}
  for (const letra of 'ABCDEFGHIJKL') {
    const jogosG = jogosGrupo.filter(j => j.grupo === letra)
    const selsG  = selecoes.filter(s => s.grupo === letra)
    grupos[letra] = calcularClassificacaoGrupo(jogosG, selsG, palpites)
  }
  return grupos
}

export function selecionarMelhoresTerceiros(grupos) {
  const terceiros = Object.entries(grupos)
    .map(([letra, cls]) => cls[2] ? { ...cls[2], grupo: letra } : null)
    .filter(Boolean)

  terceiros.sort((a, b) => {
    if (b.pontos    !== a.pontos)    return b.pontos    - a.pontos
    if (b.saldo_gols !== a.saldo_gols) return b.saldo_gols - a.saldo_gols
    if (b.gols_pro  !== a.gols_pro)  return b.gols_pro  - a.gols_pro
    return (a.ranking_fifa || 999) - (b.ranking_fifa || 999)
  })

  return terceiros.slice(0, 8)
}

export function extrairClassificados(grupos) {
  const primeiros  = {}
  const segundos   = {}
  for (const [letra, cls] of Object.entries(grupos)) {
    primeiros[letra] = cls[0] ?? null
    segundos[letra]  = cls[1] ?? null
  }
  const terceiros = selecionarMelhoresTerceiros(grupos)
  return { primeiros, segundos, terceiros }
}
