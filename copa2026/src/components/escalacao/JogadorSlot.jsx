// Slot individual no campo — vazio ou ocupado
// x/y são % dentro do container do campo

export default function JogadorSlot({
  slot,
  jogador,
  selecionado,
  onClick,
  onDragOver,
  onDrop,
}) {
  const ocupado = !!jogador

  const handleDragOver = (e) => {
    e.preventDefault()
    onDragOver?.(slot.id)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    onDrop?.(slot.id)
  }

  const style = {
    position: 'absolute',
    left: `${slot.x}%`,
    top: `${(slot.y / 140) * 100}%`,
    transform: 'translate(-50%, -50%)',
    zIndex: 10,
  }

  return (
    <div
      style={style}
      onClick={() => onClick?.(slot.id)}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="flex flex-col items-center gap-0.5 cursor-pointer select-none group"
    >
      {/* círculo */}
      <div
        className={`
          w-9 h-9 rounded-full flex items-center justify-center
          border-2 transition-all duration-150
          ${selecionado
            ? 'border-copa-yellow bg-copa-yellow/20 scale-110'
            : ocupado
              ? 'border-white/70 bg-copa-blue/80 group-hover:border-copa-yellow group-hover:scale-105'
              : 'border-white/30 bg-white/10 group-hover:border-white/60 animate-pulse-slow'
          }
        `}
      >
        {ocupado ? (
          <span className="text-white font-mono text-xs font-bold">
            {jogador.numero ?? '?'}
          </span>
        ) : (
          <span className="text-white/40 text-[10px] font-medium">{slot.label}</span>
        )}
      </div>

      {/* nome abaixo */}
      <span
        className={`
          text-[10px] font-medium text-center leading-none max-w-[52px] truncate
          drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]
          ${selecionado ? 'text-copa-yellow' : ocupado ? 'text-white' : 'text-white/40'}
        `}
      >
        {ocupado ? (jogador.nome_curto ?? jogador.nome?.split(' ').pop()) : slot.label}
      </span>
    </div>
  )
}
