import { Link } from 'react-router-dom'
import { useJogos } from '../../hooks/useJogos'
import JogoCard from './JogoCard'

function Skeleton() {
  return (
    <div className="card min-w-[260px] sm:min-w-0 animate-pulse space-y-3">
      <div className="h-3 bg-copa-border rounded w-1/3" />
      <div className="flex justify-between items-center gap-2">
        <div className="flex-1 flex flex-col items-center gap-2">
          <div className="w-10 h-10 bg-copa-border rounded-full" />
          <div className="h-2 bg-copa-border rounded w-16" />
        </div>
        <div className="h-6 bg-copa-border rounded w-12" />
        <div className="flex-1 flex flex-col items-center gap-2">
          <div className="w-10 h-10 bg-copa-border rounded-full" />
          <div className="h-2 bg-copa-border rounded w-16" />
        </div>
      </div>
      <div className="h-2 bg-copa-border rounded w-2/3 mx-auto" />
    </div>
  )
}

export default function ProximosJogos() {
  const { jogos, loading, error } = useJogos({ status: 'agendado', limit: 5 })

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-2xl tracking-widest text-white">PRÓXIMOS JOGOS</h2>
        <Link to="/tabela" className="text-sm text-copa-green hover:underline">
          Ver todos →
        </Link>
      </div>

      {error && (
        <p className="text-gray-500 text-sm">Não foi possível carregar os jogos.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3
                      overflow-x-auto sm:overflow-visible
                      flex sm:grid snap-x snap-mandatory sm:snap-none
                      pb-2 sm:pb-0">
        {loading
          ? Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} />)
          : jogos.length === 0
            ? <p className="text-gray-500 text-sm col-span-full">Nenhum jogo agendado.</p>
            : jogos.map(j => <JogoCard key={j.id} jogo={j} />)
        }
      </div>
    </section>
  )
}
