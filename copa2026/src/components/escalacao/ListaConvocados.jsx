import { useState } from 'react'

const FILTROS = [
  { value: '',    label: 'Todos' },
  { value: 'GK',  label: 'GL' },
  { value: 'DEF', label: 'DEF' },
  { value: 'MID', label: 'MEI' },
  { value: 'FWD', label: 'ATA' },
]

const POS_COR = {
  GK:  'bg-amber-900/50 text-amber-400 border-amber-700/50',
  DEF: 'bg-blue-900/50  text-blue-400  border-blue-700/50',
  MID: 'bg-green-900/50 text-green-400 border-green-700/50',
  FWD: 'bg-red-900/50   text-red-400   border-red-700/50',
}

const ORDEM = { GK: 0, DEF: 1, MID: 2, FWD: 3 }

function CartaoJogador({ jogador, alocado, selecionado, onClick, onDragStart }) {
  return (
    <div
      draggable={!alocado}
      onDragStart={onDragStart}
      onClick={onClick}
      className={`
        flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer
        transition-all duration-150 select-none
        ${selecionado
          ? 'border-copa-yellow bg-copa-yellow/10'
          : alocado
            ? 'border-copa-border/30 bg-black/10 opacity-40 cursor-not-allowed'
            : 'border-copa-border bg-copa-card hover:border-white/30 hover:bg-white/5 active:scale-95'
        }
      `}
    >
      <span className="font-mono text-xs text-gray-500 w-5 text-right shrink-0">
        {jogador.numero ?? '—'}
      </span>
      <span className={`text-[10px] border rounded px-1 py-0.5 shrink-0 ${POS_COR[jogador.posicao]}`}>
        {jogador.posicao}
      </span>
      <span className={`text-sm truncate flex-1 ${selecionado ? 'text-copa-yellow' : 'text-gray-200'}`}>
        {jogador.nome_curto ?? jogador.nome}
      </span>
      {jogador.eh_capitao === 1 && (
        <span className="text-copa-yellow text-[11px] font-bold shrink-0">©</span>
      )}
    </div>
  )
}

export default function ListaConvocados({
  jogadores,
  loading,
  titulares,
  jogadorSelecionado,
  onJogadorClick,
  onDragStart,
}) {
  const [filtroPos, setFiltroPos] = useState('')

  const alocados = new Set(Object.values(titulares).map(j => j?.id).filter(Boolean))

  const lista = [...(jogadores ?? [])]
    .sort((a, b) => ORDEM[a.posicao] - ORDEM[b.posicao] || (a.numero ?? 99) - (b.numero ?? 99))
    .filter(j => !filtroPos || j.posicao === filtroPos)

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* cabeçalho */}
      <div className="flex items-center justify-between mb-3 shrink-0">
        <h3 className="text-xs text-gray-500 uppercase tracking-widest">Convocados</h3>
        <span className="text-xs text-gray-600">{jogadores?.length ?? 0} atletas</span>
      </div>

      {/* filtros */}
      <div className="flex gap-1 mb-3 shrink-0 flex-wrap">
        {FILTROS.map(f => (
          <button
            key={f.value}
            onClick={() => setFiltroPos(f.value)}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              filtroPos === f.value
                ? 'bg-copa-green text-white'
                : 'bg-copa-card border border-copa-border text-gray-400 hover:text-white'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* lista scrollável */}
      <div className="flex-1 overflow-y-auto space-y-1.5 pr-0.5">
        {loading ? (
          Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="h-9 bg-copa-border/30 rounded-lg animate-pulse" />
          ))
        ) : (
          lista.map(j => (
            <CartaoJogador
              key={j.id}
              jogador={j}
              alocado={alocados.has(j.id)}
              selecionado={jogadorSelecionado?.id === j.id}
              onClick={() => onJogadorClick(j)}
              onDragStart={() => onDragStart(j)}
            />
          ))
        )}
      </div>

      {/* legenda */}
      <p className="text-[10px] text-gray-700 mt-3 shrink-0 text-center">
        Arraste para o campo ou clique para selecionar
      </p>
    </div>
  )
}
