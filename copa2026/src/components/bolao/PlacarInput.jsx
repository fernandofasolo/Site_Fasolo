// Stepper numérico compacto para entrada de placar
export default function PlacarInput({ value, onChange, disabled }) {
  const dec = () => onChange(Math.max(0, (value ?? 0) - 1))
  const inc = () => onChange(Math.min(20, (value ?? 0) + 1))

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={dec}
        disabled={disabled || (value ?? 0) <= 0}
        className="w-6 h-6 rounded flex items-center justify-center text-gray-400
                   hover:text-white hover:bg-white/10 disabled:opacity-20 transition-colors text-sm"
      >
        −
      </button>
      <span className="font-mono font-bold text-white text-base w-5 text-center tabular-nums select-none">
        {value ?? '–'}
      </span>
      <button
        onClick={inc}
        disabled={disabled || (value ?? 0) >= 20}
        className="w-6 h-6 rounded flex items-center justify-center text-gray-400
                   hover:text-white hover:bg-white/10 disabled:opacity-20 transition-colors text-sm"
      >
        +
      </button>
    </div>
  )
}
