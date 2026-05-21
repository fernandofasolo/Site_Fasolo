import { Link } from 'react-router-dom'
import { useJogos } from '../../hooks/useJogos'
import JogoCard from './JogoCard'

export default function UltimosResultados() {
  const { jogos, loading, error } = useJogos({ status: 'encerrado', limit: 5 })

  if (!loading && jogos.length === 0) return null

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-2xl tracking-widest text-white">ÚLTIMOS RESULTADOS</h2>
        <Link to="/tabela" className="text-sm text-copa-green hover:underline">
          Ver todos →
        </Link>
      </div>

      {error && (
        <p className="text-gray-500 text-sm">Não foi possível carregar os resultados.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="card animate-pulse h-28 bg-copa-border rounded-xl" />
            ))
          : jogos.map(j => <JogoCard key={j.id} jogo={j} />)
        }
      </div>
    </section>
  )
}
