import JogadorSlot from './JogadorSlot'

function LinhasGrama() {
  return (
    <>
      {/* faixas de grama alternadas */}
      {Array.from({ length: 7 }).map((_, i) => (
        <rect
          key={i}
          x={0} y={i * 20} width={100} height={20}
          fill={i % 2 === 0 ? '#1a4a1a' : '#1e541e'}
        />
      ))}

      {/* borda do campo */}
      <rect x={2} y={2} width={96} height={136} rx={1}
        fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth={0.6} />

      {/* linha do meio */}
      <line x1={2} y1={70} x2={98} y2={70}
        stroke="rgba(255,255,255,0.4)" strokeWidth={0.6} />

      {/* círculo central */}
      <circle cx={50} cy={70} r={9}
        fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth={0.6} />
      <circle cx={50} cy={70} r={0.8} fill="rgba(255,255,255,0.4)" />

      {/* área grande — ataque (topo) */}
      <rect x={18} y={2} width={64} height={18}
        fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth={0.5} />
      {/* área pequena — ataque */}
      <rect x={31} y={2} width={38} height={7}
        fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth={0.5} />

      {/* área grande — defesa (base) */}
      <rect x={18} y={120} width={64} height={18}
        fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth={0.5} />
      {/* área pequena — defesa */}
      <rect x={31} y={131} width={38} height={7}
        fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth={0.5} />

      {/* ponto de pênalti — ataque */}
      <circle cx={50} cy={15} r={0.8} fill="rgba(255,255,255,0.4)" />
      {/* ponto de pênalti — defesa */}
      <circle cx={50} cy={125} r={0.8} fill="rgba(255,255,255,0.4)" />

      {/* arco de pênalti — ataque */}
      <path
        d={`M 33 20 A 9 9 0 0 0 67 20`}
        fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth={0.5}
      />
      {/* arco de pênalti — defesa */}
      <path
        d={`M 33 120 A 9 9 0 0 1 67 120`}
        fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth={0.5}
      />

      {/* cantos */}
      {[
        { cx: 2,  cy: 2,   s: 1,  e: 1  },
        { cx: 98, cy: 2,   s: 0,  e: 1  },
        { cx: 2,  cy: 138, s: 1,  e: 0  },
        { cx: 98, cy: 138, s: 0,  e: 0  },
      ].map(({ cx, cy, s, e }, i) => (
        <path
          key={i}
          d={`M ${cx + (s ? 1 : -1) * 3} ${cy} A 3 3 0 0 ${e} ${cx} ${cy + (e ? 1 : -1) * 3}`}
          fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth={0.5}
        />
      ))}
    </>
  )
}

export default function CampoFutebol({
  slots,
  titulares,
  jogadorSelecionado,
  dragOverSlot,
  onSlotClick,
  onDragOver,
  onDrop,
}) {
  return (
    <div className="relative w-full" style={{ paddingBottom: '140%' }}>
      {/* SVG de fundo */}
      <svg
        viewBox="0 0 100 140"
        className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-2xl"
        preserveAspectRatio="xMidYMid meet"
      >
        <LinhasGrama />
      </svg>

      {/* container de slots sobrepostos */}
      <div className="absolute inset-0">
        {slots.map(slot => (
          <JogadorSlot
            key={slot.id}
            slot={slot}
            jogador={titulares[slot.id] ?? null}
            selecionado={jogadorSelecionado !== null && titulares[slot.id]?.id === jogadorSelecionado?.id}
            dragOver={dragOverSlot === slot.id}
            onClick={onSlotClick}
            onDragOver={onDragOver}
            onDrop={onDrop}
          />
        ))}
      </div>
    </div>
  )
}
