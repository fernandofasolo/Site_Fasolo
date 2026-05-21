const FASES = [
  { value: 'grupo',    label: 'Grupos' },
  { value: 'oitavas',  label: 'Oitavas' },
  { value: 'quartas',  label: 'Quartas' },
  { value: 'semi',     label: 'Semis' },
  { value: 'terceiro', label: '3º Lugar' },
  { value: 'final',    label: 'Final' },
]

const GRUPOS = 'ABCDEFGHIJKL'.split('')

const STATUS = [
  { value: '',            label: 'Todos' },
  { value: 'agendado',    label: 'Agendado' },
  { value: 'em_andamento',label: 'Ao Vivo' },
  { value: 'encerrado',   label: 'Encerrado' },
]

export default function FiltrosJogos({ filtros, onChange }) {
  const set = (key, val) => onChange({ ...filtros, [key]: val })

  return (
    <div className="space-y-3 sticky top-14 z-40 bg-copa-dark pt-2 pb-3 border-b border-copa-border">
      {/* tabs de fase */}
      <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
        {FASES.map(f => (
          <button
            key={f.value}
            onClick={() => onChange({ ...filtros, fase: f.value, grupo: '' })}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              filtros.fase === f.value
                ? 'bg-copa-green text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* filtros secundários */}
      <div className="flex gap-2 flex-wrap">
        {filtros.fase === 'grupo' && (
          <select
            value={filtros.grupo}
            onChange={e => set('grupo', e.target.value)}
            className="bg-copa-card border border-copa-border text-sm text-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:border-copa-green"
          >
            <option value="">Todos os grupos</option>
            {GRUPOS.map(g => (
              <option key={g} value={g}>Grupo {g}</option>
            ))}
          </select>
        )}

        <select
          value={filtros.status}
          onChange={e => set('status', e.target.value)}
          className="bg-copa-card border border-copa-border text-sm text-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:border-copa-green"
        >
          {STATUS.map(s => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>

        <input
          type="date"
          value={filtros.data}
          onChange={e => set('data', e.target.value)}
          className="bg-copa-card border border-copa-border text-sm text-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:border-copa-green"
        />

        {(filtros.grupo || filtros.status || filtros.data) && (
          <button
            onClick={() => onChange({ ...filtros, grupo: '', status: '', data: '' })}
            className="text-xs text-gray-500 hover:text-white px-2 py-1.5 transition-colors"
          >
            Limpar filtros ✕
          </button>
        )}
      </div>
    </div>
  )
}
