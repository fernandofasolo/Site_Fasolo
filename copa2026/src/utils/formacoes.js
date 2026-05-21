// Coordenadas dos slots por formação.
// Campo SVG: viewBox "0 0 100 140"
// x: 0-100 (esquerda → direita)
// y: 0-140 (ataque=topo → GK=base)

const F = (id, posicao, label, x, y) => ({ id, posicao, label, x, y })

export const FORMACOES = {
  '4-3-3': [
    F('gk',  'GK',  'GK',  50, 120),
    F('ld',  'DEF', 'LD',  83, 96), F('zd', 'DEF', 'ZD', 62, 96),
    F('ze',  'DEF', 'ZE',  38, 96), F('le', 'DEF', 'LE', 17, 96),
    F('md',  'MID', 'MD',  75, 70), F('mc', 'MID', 'MC', 50, 70),
    F('me',  'MID', 'ME',  25, 70),
    F('pd',  'FWD', 'PD',  80, 36), F('ca', 'FWD', 'CA', 50, 28),
    F('pe',  'FWD', 'PE',  20, 36),
  ],
  '4-4-2': [
    F('gk',  'GK',  'GK',  50, 120),
    F('ld',  'DEF', 'LD',  83, 96), F('zd', 'DEF', 'ZD', 62, 96),
    F('ze',  'DEF', 'ZE',  38, 96), F('le', 'DEF', 'LE', 17, 96),
    F('md',  'MID', 'MD',  83, 70), F('rmc','MID', 'MC', 62, 70),
    F('lmc', 'MID', 'MC',  38, 70), F('me', 'MID', 'ME', 17, 70),
    F('at1', 'FWD', 'AT',  63, 32), F('at2','FWD', 'AT', 37, 32),
  ],
  '4-2-3-1': [
    F('gk',  'GK',  'GK',  50, 120),
    F('ld',  'DEF', 'LD',  83, 96), F('zd', 'DEF', 'ZD', 62, 96),
    F('ze',  'DEF', 'ZE',  38, 96), F('le', 'DEF', 'LE', 17, 96),
    F('v1',  'MID', 'VOL', 63, 84), F('v2', 'MID', 'VOL', 37, 84),
    F('md',  'MID', 'MD',  80, 58), F('mc', 'MID', 'MC',  50, 58),
    F('me',  'MID', 'ME',  20, 58),
    F('ca',  'FWD', 'CA',  50, 28),
  ],
  '3-5-2': [
    F('gk',  'GK',  'GK',  50, 120),
    F('zd',  'DEF', 'ZD',  72, 96), F('zc', 'DEF', 'ZC', 50, 96),
    F('ze',  'DEF', 'ZE',  28, 96),
    F('ald', 'MID', 'ALD', 90, 70), F('md', 'MID', 'MD', 68, 70),
    F('mc',  'MID', 'MC',  50, 70), F('me', 'MID', 'ME', 32, 70),
    F('ale', 'MID', 'ALE', 10, 70),
    F('at1', 'FWD', 'AT',  63, 32), F('at2','FWD', 'AT', 37, 32),
  ],
  '5-3-2': [
    F('gk',  'GK',  'GK',  50, 120),
    F('ald', 'DEF', 'ALD', 90, 96), F('zd', 'DEF', 'ZD', 70, 96),
    F('zc',  'DEF', 'ZC',  50, 96), F('ze', 'DEF', 'ZE', 30, 96),
    F('ale', 'DEF', 'ALE', 10, 96),
    F('md',  'MID', 'MD',  72, 70), F('mc', 'MID', 'MC', 50, 70),
    F('me',  'MID', 'ME',  28, 70),
    F('at1', 'FWD', 'AT',  63, 32), F('at2','FWD', 'AT', 37, 32),
  ],
  '4-1-4-1': [
    F('gk',  'GK',  'GK',  50, 120),
    F('ld',  'DEF', 'LD',  83, 96), F('zd', 'DEF', 'ZD', 62, 96),
    F('ze',  'DEF', 'ZE',  38, 96), F('le', 'DEF', 'LE', 17, 96),
    F('vol', 'MID', 'VOL', 50, 84),
    F('md',  'MID', 'MD',  83, 62), F('rmc','MID', 'MC', 62, 62),
    F('lmc', 'MID', 'MC',  38, 62), F('me', 'MID', 'ME', 17, 62),
    F('ca',  'FWD', 'CA',  50, 28),
  ],
  '3-4-3': [
    F('gk',  'GK',  'GK',  50, 120),
    F('zd',  'DEF', 'ZD',  72, 96), F('zc', 'DEF', 'ZC', 50, 96),
    F('ze',  'DEF', 'ZE',  28, 96),
    F('md',  'MID', 'MD',  83, 70), F('rmc','MID', 'MC', 62, 70),
    F('lmc', 'MID', 'MC',  38, 70), F('me', 'MID', 'ME', 17, 70),
    F('pd',  'FWD', 'PD',  80, 36), F('ca', 'FWD', 'CA', 50, 28),
    F('pe',  'FWD', 'PE',  20, 36),
  ],
}

export const NOMES_FORMACAO = Object.keys(FORMACOES)

// Tenta preservar jogadores ao trocar formação
export function migrarTitulares(slotsAntigos, slotsNovos, titularesAtuais) {
  const porPos = {}
  for (const [slotId, jogador] of Object.entries(titularesAtuais)) {
    const slot = slotsAntigos.find(s => s.id === slotId)
    if (!slot) continue
    if (!porPos[slot.posicao]) porPos[slot.posicao] = []
    porPos[slot.posicao].push(jogador)
  }

  const novosPorPos = {}
  for (const slot of slotsNovos) {
    if (!novosPorPos[slot.posicao]) novosPorPos[slot.posicao] = []
    novosPorPos[slot.posicao].push(slot)
  }

  const result = {}
  for (const [pos, jogadores] of Object.entries(porPos)) {
    const slots = novosPorPos[pos] ?? []
    for (let i = 0; i < Math.min(jogadores.length, slots.length); i++) {
      result[slots[i].id] = jogadores[i]
    }
  }
  return result
}
