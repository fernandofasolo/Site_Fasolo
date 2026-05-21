import { useState, useEffect, useCallback } from 'react'
import { apiFetch } from '../utils/api'
import useAppStore from '../store/useAppStore'
import { toHorarioBrasilia } from '../utils/formatDate'

const FASES = [
  { value: 'grupo',    label: 'Grupos'       },
  { value: 'oitavas',  label: 'Oitavas'      },
  { value: 'quartas',  label: 'Quartas'      },
  { value: 'semi',     label: 'Semis'        },
  { value: 'terceiro', label: '3° lugar'     },
  { value: 'final',    label: 'Final'        },
]

const STATUS_OPTS = [
  { value: 'agendado',      label: 'Agendado'     },
  { value: 'em_andamento',  label: 'Ao Vivo'      },
  { value: 'encerrado',     label: 'Encerrado'    },
]

// ── Tela de login ─────────────────────────────────────────────────────
function TelaLogin({ onLogin }) {
  const [key, setKey] = useState('')

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="card w-full max-w-sm space-y-5 text-center">
        <div>
          <div className="text-4xl mb-3">🔐</div>
          <h2 className="font-display text-3xl tracking-widest text-white">ADMIN</h2>
          <p className="text-gray-600 text-sm mt-1">Insira a chave de administrador</p>
        </div>
        <input
          type="password"
          value={key}
          onChange={e => setKey(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && key && onLogin(key)}
          placeholder="Chave de admin..."
          autoFocus
          className="w-full bg-black/30 border border-copa-border rounded-xl px-4 py-3
                     text-gray-200 placeholder-gray-700 focus:outline-none focus:border-copa-green
                     text-center tracking-widest"
        />
        <button
          onClick={() => key && onLogin(key)}
          className="btn-primary w-full"
        >
          Entrar
        </button>
      </div>
    </div>
  )
}

// ── Linha de jogo com edição inline ──────────────────────────────────
function JogoRow({ jogo, adminKey, onAtualizar }) {
  const toast = useAppStore(s => s.toast)
  const [editando, setEditando] = useState(false)
  const [form, setForm] = useState({
    gols_a:  jogo.gols_a  ?? '',
    gols_b:  jogo.gols_b  ?? '',
    status:  jogo.status,
  })
  const [salvando, setSalvando] = useState(false)

  const handleSalvar = async () => {
    setSalvando(true)
    try {
      const body = {
        status: form.status,
        gols_a: form.gols_a === '' ? null : Number(form.gols_a),
        gols_b: form.gols_b === '' ? null : Number(form.gols_b),
      }
      const res = await apiFetch(`/api/admin/jogos/${jogo.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Key': adminKey,
        },
        body: JSON.stringify(body),
      })
      if (res.status === 401 || res.status === 403) {
        toast('Chave de admin inválida.', 'error')
        return
      }
      if (!res.ok) throw new Error()
      onAtualizar(jogo.id, body)
      toast(`Jogo #${jogo.id} atualizado.`, 'success')
      setEditando(false)
    } catch {
      toast('Erro ao salvar. Tente novamente.', 'error')
    } finally {
      setSalvando(false)
    }
  }

  const badgeCls = {
    agendado:     'badge-agendado',
    em_andamento: 'badge-em_andamento',
    encerrado:    'badge-encerrado',
  }

  return (
    <>
      <tr className="border-b border-copa-border/20 hover:bg-white/[0.02] transition-colors">
        <td className="py-2.5 pl-4 text-xs text-gray-600 w-28 shrink-0">
          {toHorarioBrasilia(jogo.data_hora_utc)}
        </td>
        <td className="py-2.5 text-sm">
          <div className="flex items-center gap-1.5">
            <span>{jogo.selecao_a?.bandeira_emoji}</span>
            <span className="text-gray-300 hidden sm:inline">{jogo.selecao_a?.nome_pt}</span>
          </div>
        </td>
        <td className="py-2.5 text-center font-mono text-sm font-bold text-white tabular-nums w-16">
          {jogo.gols_a ?? '—'} × {jogo.gols_b ?? '—'}
        </td>
        <td className="py-2.5 text-sm">
          <div className="flex items-center gap-1.5 justify-end">
            <span className="text-gray-300 hidden sm:inline">{jogo.selecao_b?.nome_pt}</span>
            <span>{jogo.selecao_b?.bandeira_emoji}</span>
          </div>
        </td>
        <td className="py-2.5 text-center w-28">
          <span className={badgeCls[jogo.status]}>
            {STATUS_OPTS.find(s => s.value === jogo.status)?.label}
          </span>
        </td>
        <td className="py-2.5 pr-4 text-right w-20">
          <button
            onClick={() => setEditando(v => !v)}
            className="text-xs text-gray-500 hover:text-copa-yellow transition-colors px-2"
          >
            {editando ? 'Fechar' : 'Editar'}
          </button>
        </td>
      </tr>

      {editando && (
        <tr className="border-b border-copa-border bg-black/20">
          <td colSpan={6} className="px-4 py-3">
            <div className="flex flex-wrap items-end gap-4">
              <div>
                <label className="text-[10px] text-gray-600 uppercase tracking-wider block mb-1">
                  Gols {jogo.selecao_a?.bandeira_emoji}
                </label>
                <input
                  type="number" min={0} max={20}
                  value={form.gols_a}
                  onChange={e => setForm(f => ({ ...f, gols_a: e.target.value }))}
                  className="w-16 bg-copa-card border border-copa-border rounded-lg px-3 py-1.5
                             text-white text-center font-mono focus:outline-none focus:border-copa-green"
                />
              </div>
              <div>
                <label className="text-[10px] text-gray-600 uppercase tracking-wider block mb-1">
                  Gols {jogo.selecao_b?.bandeira_emoji}
                </label>
                <input
                  type="number" min={0} max={20}
                  value={form.gols_b}
                  onChange={e => setForm(f => ({ ...f, gols_b: e.target.value }))}
                  className="w-16 bg-copa-card border border-copa-border rounded-lg px-3 py-1.5
                             text-white text-center font-mono focus:outline-none focus:border-copa-green"
                />
              </div>
              <div>
                <label className="text-[10px] text-gray-600 uppercase tracking-wider block mb-1">
                  Status
                </label>
                <select
                  value={form.status}
                  onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                  className="bg-copa-card border border-copa-border rounded-lg px-3 py-1.5
                             text-gray-300 text-sm focus:outline-none focus:border-copa-green"
                >
                  {STATUS_OPTS.map(s => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2 mt-auto">
                <button
                  onClick={handleSalvar}
                  disabled={salvando}
                  className="btn-primary text-sm px-4 disabled:opacity-50"
                >
                  {salvando ? 'Salvando…' : 'Salvar'}
                </button>
                <button
                  onClick={() => setEditando(false)}
                  className="text-sm px-4 py-2 text-gray-500 hover:text-white transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  )
}

// ── Painel principal ──────────────────────────────────────────────────
function PainelAdmin({ adminKey, onLogout }) {
  const [jogos,      setJogos]      = useState([])
  const [loading,    setLoading]    = useState(true)
  const [filtroFase, setFiltroFase] = useState('grupo')
  const [filtroStatus, setFiltroStatus] = useState('')

  useEffect(() => {
    setLoading(true)
    const params = new URLSearchParams({ per_page: 200 })
    if (filtroFase)   params.set('fase', filtroFase)
    if (filtroStatus) params.set('status', filtroStatus)
    apiFetch(`/api/jogos?${params}`)
      .then(r => r.json())
      .then(d => { setJogos(Array.isArray(d) ? d : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [filtroFase, filtroStatus])

  const handleAtualizar = useCallback((id, updates) => {
    setJogos(prev => prev.map(j =>
      j.id === id ? { ...j, ...updates } : j
    ))
  }, [])

  return (
    <div className="space-y-5">
      {/* cabeçalho */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-4xl tracking-widest text-white">ADMIN</h1>
          <p className="text-gray-500 text-sm mt-1">
            Atualização de placares e status dos jogos
          </p>
        </div>
        <button
          onClick={onLogout}
          className="text-xs text-gray-600 hover:text-white transition-colors"
        >
          Sair
        </button>
      </div>

      {/* filtros */}
      <div className="flex gap-2 flex-wrap">
        {FASES.map(f => (
          <button
            key={f.value}
            onClick={() => setFiltroFase(f.value)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filtroFase === f.value
                ? 'bg-copa-green text-white'
                : 'bg-copa-card border border-copa-border text-gray-400 hover:text-white'
            }`}
          >
            {f.label}
          </button>
        ))}
        <div className="flex gap-2 ml-auto">
          <select
            value={filtroStatus}
            onChange={e => setFiltroStatus(e.target.value)}
            className="bg-copa-card border border-copa-border text-xs text-gray-400 rounded-lg
                       px-3 py-1.5 focus:outline-none focus:border-copa-green"
          >
            <option value="">Todos os status</option>
            {STATUS_OPTS.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* tabela */}
      <div className="card p-0 overflow-hidden overflow-x-auto">
        {loading ? (
          <div className="p-4 space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-10 bg-copa-border/30 rounded animate-pulse" />
            ))}
          </div>
        ) : jogos.length === 0 ? (
          <div className="py-12 text-center text-gray-600 text-sm">
            Nenhum jogo encontrado para esse filtro.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[11px] text-gray-600 border-b border-copa-border bg-black/20">
                <th className="text-left pl-4 py-2.5 font-normal">Data/Hora</th>
                <th className="text-left py-2.5 font-normal">Seleção A</th>
                <th className="text-center py-2.5 font-normal">Placar</th>
                <th className="text-right py-2.5 font-normal">Seleção B</th>
                <th className="text-center py-2.5 font-normal">Status</th>
                <th className="pr-4 py-2.5 font-normal" />
              </tr>
            </thead>
            <tbody>
              {jogos.map(j => (
                <JogoRow
                  key={j.id}
                  jogo={j}
                  adminKey={adminKey}
                  onAtualizar={handleAtualizar}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>

      <p className="text-xs text-gray-700 text-center">
        {jogos.length} jogo{jogos.length !== 1 ? 's' : ''} · clique em Editar para atualizar placar e status
      </p>
    </div>
  )
}

// ── Página ───────────────────────────────────────────────────────────
export default function AdminPage() {
  const [adminKey, setAdminKey] = useState(
    () => sessionStorage.getItem('copa_admin_key') ?? ''
  )

  const handleLogin = (key) => {
    sessionStorage.setItem('copa_admin_key', key)
    setAdminKey(key)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('copa_admin_key')
    setAdminKey('')
  }

  if (!adminKey) return <TelaLogin onLogin={handleLogin} />
  return <PainelAdmin adminKey={adminKey} onLogout={handleLogout} />
}
