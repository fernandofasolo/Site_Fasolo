import { useState, useMemo } from 'react'
import PlacarInput from './PlacarInput'
import { calcularClassificacaoGrupo } from '../../utils/classificacao'
import Bandeira from '../ui/Bandeira'

const POS_COR = ['text-copa-green', 'text-copa-green', 'text-copa-yellow', 'text-gray-600']

function MiniTabela({ classificacao }) {
  return (
    <table className="w-full text-xs">
      <thead>
        <tr className="text-gray-700 border-b border-copa-border">
          <th className="text-left py-1 pl-2 font-normal w-5">#</th>
          <th className="text-left py-1 font-normal">Seleção</th>
          <th className="text-center py-1 font-normal w-6">J</th>
          <th className="text-center py-1 font-normal w-6">SG</th>
          <th className="text-center py-1 font-mono font-bold w-7">Pts</th>
        </tr>
      </thead>
      <tbody>
        {classificacao.map((s, i) => (
          <tr key={s.selecao_id} className="border-b border-copa-border/20">
            <td className={`py-1.5 pl-2 font-mono font-bold ${POS_COR[i] ?? 'text-gray-600'}`}>
              {i + 1}
            </td>
            <td className="py-1.5">
              <Bandeira iso={s.codigo_iso} className="h-4 w-auto mr-1 align-middle" />
              <span className={i < 2 ? 'text-gray-200' : 'text-gray-500'}>
                {s.nome_pt?.split(' ')[0]}
              </span>
              {i === 2 && <span className="ml-1 text-[9px] text-copa-yellow">(3°)</span>}
            </td>
            <td className="py-1.5 text-center text-gray-500">{s.jogos}</td>
            <td className="py-1.5 text-center text-gray-400 font-mono">
              {s.saldo_gols > 0 ? `+${s.saldo_gols}` : s.saldo_gols}
            </td>
            <td className="py-1.5 text-center font-mono font-bold text-copa-yellow">{s.pontos}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function JogoPalpite({ jogo, palpite, onMudar }) {
  const ga = palpite?.gols_a
  const gb = palpite?.gols_b
  const preenchido = ga !== undefined && gb !== undefined

  return (
    <div className={`flex items-center gap-2 py-2 px-3 rounded-lg transition-colors ${
      preenchido ? 'bg-black/20' : 'bg-black/10'
    }`}>
      <div className="flex items-center gap-1.5 flex-1 min-w-0">
        <Bandeira iso={jogo.selecao_a?.codigo_iso} className="h-4 w-auto shrink-0" />
        <span className="text-xs text-gray-400 truncate hidden sm:block">
          {jogo.selecao_a?.nome_pt?.split(' ')[0]}
        </span>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        <PlacarInput value={ga} onChange={v => onMudar(jogo.id, v, gb ?? 0)} />
        <span className="text-gray-600 text-xs mx-0.5">×</span>
        <PlacarInput value={gb} onChange={v => onMudar(jogo.id, ga ?? 0, v)} />
      </div>

      <div className="flex items-center gap-1.5 flex-1 min-w-0 justify-end">
        <span className="text-xs text-gray-400 truncate hidden sm:block">
          {jogo.selecao_b?.nome_pt?.split(' ')[0]}
        </span>
        <Bandeira iso={jogo.selecao_b?.codigo_iso} className="h-4 w-auto shrink-0" />
      </div>

      {!preenchido && (
        <button
          onClick={() => onMudar(jogo.id, 0, 0)}
          className="shrink-0 text-[10px] text-gray-700 hover:text-copa-yellow transition-colors ml-1"
          title="Empate rápido (0–0)"
        >
          =
        </button>
      )}
    </div>
  )
}

function GrupoAcordeon({ letra, jogos, selecoes, palpites, onMudar }) {
  const [aberto, setAberto] = useState(false)

  const classificacao = useMemo(
    () => calcularClassificacaoGrupo(jogos, selecoes, palpites),
    [jogos, selecoes, palpites],
  )

  const preenchidos = jogos.filter(j => palpites[j.id]?.gols_a !== undefined).length

  return (
    <div className="card p-0 overflow-hidden">
      <button
        onClick={() => setAberto(v => !v)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="font-display text-2xl tracking-widest text-copa-yellow">
            GRUPO {letra}
          </span>
          <span className="text-xs text-gray-600">
            {preenchidos}/{jogos.length} palpites
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1">
            {classificacao.slice(0, 2).map(s => (
              <Bandeira key={s.selecao_id} iso={s.codigo_iso} className="h-4 w-auto" />
            ))}
          </div>
          <span className="text-gray-500 text-sm">{aberto ? '▲' : '▼'}</span>
        </div>
      </button>

      {aberto && (
        <div className="grid sm:grid-cols-[1fr_auto] gap-4 px-4 pb-4">
          <div className="space-y-1.5">
            {jogos.map(j => (
              <JogoPalpite key={j.id} jogo={j} palpite={palpites[j.id]} onMudar={onMudar} />
            ))}
          </div>
          <div className="sm:w-56">
            <p className="text-[10px] text-gray-700 uppercase tracking-wider mb-2">Classificação</p>
            <MiniTabela classificacao={classificacao} />
          </div>
        </div>
      )}
    </div>
  )
}

export default function SimuladorGrupos({ jogosGrupo, selecoes, palpites, onMudar }) {
  return (
    <div className="space-y-2">
      {'ABCDEFGHIJKL'.split('').map(letra => {
        const jogos = jogosGrupo.filter(j => j.grupo === letra)
        const sels  = selecoes.filter(s => s.grupo === letra)
        return (
          <GrupoAcordeon
            key={letra}
            letra={letra}
            jogos={jogos}
            selecoes={sels}
            palpites={palpites}
            onMudar={onMudar}
          />
        )
      })}
    </div>
  )
}
