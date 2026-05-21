export function toHorarioBrasilia(utcString) {
  if (!utcString) return ''
  const date = new Date(utcString.endsWith('Z') ? utcString : utcString + 'Z')
  return date.toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function toDataLonga(utcString) {
  if (!utcString) return ''
  const date = new Date(utcString.endsWith('Z') ? utcString : utcString + 'Z')
  return date.toLocaleDateString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  })
}

export function toHora(utcString) {
  if (!utcString) return ''
  const date = new Date(utcString.endsWith('Z') ? utcString : utcString + 'Z')
  return date.toLocaleTimeString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    hour: '2-digit',
    minute: '2-digit',
  })
}
