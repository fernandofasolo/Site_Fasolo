const FLAGS = {
  MX: '🇲🇽', KR: '🇰🇷', CZ: '🇨🇿', ZA: '🇿🇦',
  CA: '🇨🇦', BA: '🇧🇦', QA: '🇶🇦', CH: '🇨🇭',
  AR: '🇦🇷', HR: '🇭🇷', MA: '🇲🇦', EC: '🇪🇨',
  US: '🇺🇸', AU: '🇦🇺', PY: '🇵🇾', TR: '🇹🇷',
  DE: '🇩🇪', JP: '🇯🇵', CI: '🇨🇮', CW: '🇨🇼',
  NL: '🇳🇱', SE: '🇸🇪', TN: '🇹🇳', DZ: '🇩🇿',
  BR: '🇧🇷', NG: '🇳🇬', CO: '🇨🇴', SA: '🇸🇦',
  ES: '🇪🇸', UY: '🇺🇾', CV: '🇨🇻', JM: '🇯🇲',
  FR: '🇫🇷', NO: '🇳🇴', SN: '🇸🇳', IQ: '🇮🇶',
  PT: '🇵🇹', CD: '🇨🇩', CR: '🇨🇷', UZ: '🇺🇿',
  BE: '🇧🇪', IR: '🇮🇷', EG: '🇪🇬', NZ: '🇳🇿',
  GB: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'GB-SCT': '🏴󠁧󠁢󠁳󠁣󠁴󠁿', GH: '🇬🇭', PA: '🇵🇦',
}

export function getFlag(codigoIso) {
  return FLAGS[codigoIso] || '🏳'
}
