import Bandeira from '../ui/Bandeira'

// Renderiza uma lista de confrontos de fase eliminatória
// Cada confronto: clique numa seleção para indicar o vencedor

function TimeSide({ team, lado, vencedor, onClick }) {
  const isVencedor = vencedor?.id === team?.id
  const isEliminado = vencedor && !isVencedor

  if (!team) {
    return (
      <button
        disabled
        className={`flex items-center gap-2 flex-1 py-2.5 px-3 rounded-lg bg-black/10
          border border-copa-border/30 opacity-40 cursor-not-allowed
          ${lado === 'b' ? 'flex-row-reverse' : ''}`}
      >
        <div className="w-7 h-7 rounded-full bg-copa-border/30 animate-pulse" />
        <span className="text-xs text-gray-600">A definir</span>
      </button>
    )
  }

  return (
    <button
      onClick={() => onClick(team.id)}
      className={`
        flex items-center gap-2 flex-1 py-2.5 px-3 rounded-lg border transition-all duration-150
        ${lado === 'b' ? 'flex-row-reverse' : ''}
        ${isVencedor
          ? 'border-copa-green bg-copa-green/10 text-white'
          : isEliminado
            ? 'border-copa-border/20 bg-black/10 opacity-40'
            : 'border-copa-border bg-copa-card hover:border-white/30 hover:bg-white/5'
        }
      `}
    >
      <Bandeira iso={team.codigo_iso} className="h-6 w-auto shrink-0" />
      <span className={`text-xs font-medium truncate ${isVencedor ? 'text-white' : 'text-gray-300'}`}>
        {team.nome_pt}
      </span>
      {isVencedor && <span className="shrink-0 ml-auto text-copa-green text-xs">✓</span>}
    </button>
  )
}

function Confronto({ jogo, onVencedor }) {
  const { teamA, teamB, vencedor, id } = jogo

  const handleClick = (selecaoId) => {
    if (vencedor?.id === selecaoId) {
      // segundo clique no mesmo time desfaz
      onVencedor(id, null)
    } else {
      onVencedor(id, selecaoId)
    }
  }

  return (
    <div className="card p-3">
      <p className="text-[10px] text-gray-700 uppercase tracking-wider mb-2 text-center">
        {id.startsWith('M') ? `Oitavas — ${id}` :
         id.startsWith('Q') ? `Quartas — ${id}` :
         id.startsWith('S') && !id.startsWith('SF') ? `Semi — ${id}` :
         id.startsWith('SF') ? `Meia-Final — ${id}` :
         id === 'T3P' ? '3º Lugar' : 'Final'}
      </p>
      <div className="flex items-center gap-2">
        <TimeSide team={teamA} lado="a" vencedor={vencedor} onClick={handleClick} />
        <span className="text-gray-700 text-xs font-mono shrink-0">vs</span>
        <TimeSide team={teamB} lado="b" vencedor={vencedor} onClick={handleClick} />
      </div>
      {(!teamA || !teamB) && (
        <p className="text-[10px] text-gray-700 text-center mt-1.5">
          Preencha a fase anterior para definir os times
        </p>
      )}
    </div>
  )
}

export default function RodadaElim({ jogos, onVencedor, colunas = 2 }) {
  return (
    <div className={`grid gap-3 ${
      colunas === 1 ? 'grid-cols-1 max-w-lg mx-auto'
      : colunas === 2 ? 'grid-cols-1 sm:grid-cols-2'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
    }`}>
      {jogos.map(jogo => (
        <Confronto key={jogo.id} jogo={jogo} onVencedor={onVencedor} />
      ))}
    </div>
  )
}
