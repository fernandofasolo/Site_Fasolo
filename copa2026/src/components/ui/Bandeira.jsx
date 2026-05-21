const ISO_OVERRIDE = { GB: 'gb-eng', 'GB-SCT': 'gb-sct' }

export default function Bandeira({ iso, className = 'h-5 w-auto' }) {
  if (!iso) return null
  const code = ISO_OVERRIDE[iso] ?? iso.toLowerCase()
  return (
    <img
      src={`https://flagcdn.com/w40/${code}.png`}
      srcSet={`https://flagcdn.com/w80/${code}.png 2x`}
      alt={iso}
      className={`inline-block aspect-[3/2] object-cover rounded-sm ${className}`}
    />
  )
}
