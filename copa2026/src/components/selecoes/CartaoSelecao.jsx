import Bandeira from '../ui/Bandeira'

const CONF_COR = {
  UEFA:     'bg-blue-900/40 text-blue-400',
  CONMEBOL: 'bg-green-900/40 text-green-400',
  CONCACAF: 'bg-red-900/40 text-red-400',
  AFC:      'bg-yellow-900/40 text-yellow-400',
  CAF:      'bg-orange-900/40 text-orange-400',
  OFC:      'bg-purple-900/40 text-purple-400',
}

export default function CartaoSelecao({ selecao, onClick }) {
  return (
    <button
      onClick={onClick}
      className="card group flex flex-col items-center gap-2 py-5 text-center
                 hover:border-copa-green/50 hover:bg-white/[0.03] transition-all"
    >
      <span className="group-hover:scale-110 transition-transform">
        <Bandeira iso={selecao.codigo_iso} className="h-10 w-auto" />
      </span>
      <p className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors leading-tight">
        {selecao.nome_pt}
      </p>
      <div className="flex gap-1 flex-wrap justify-center">
        <span className="text-[10px] bg-copa-card border border-copa-border rounded px-1.5 py-0.5 text-gray-500">
          Grupo {selecao.grupo}
        </span>
        <span className={`text-[10px] rounded px-1.5 py-0.5 ${CONF_COR[selecao.confederacao] ?? 'text-gray-500'}`}>
          {selecao.confederacao}
        </span>
      </div>
      {selecao.ranking_fifa && (
        <span className="text-[10px] text-gray-600">FIFA #{selecao.ranking_fifa}</span>
      )}
    </button>
  )
}
