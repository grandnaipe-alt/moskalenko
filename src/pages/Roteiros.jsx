import { useState } from 'react'
import { roteiros, STATUS_ROTEIRO } from '../data/data'
import { ChevronDown, ChevronUp, Lightbulb } from 'lucide-react'

const AREAS = ['Todas', 'Trabalhista', 'Consumidor']
const SEMANAS = [0, 1, 2, 3, 4]

const AREA_COLORS = {
  Trabalhista: { color: '#3a60ff', bg: 'rgba(58,96,255,0.15)' },
  Consumidor:  { color: '#E8A820', bg: 'rgba(232,168,32,0.15)' },
}

const BLOCO_STYLES = {
  gancho:  { label: 'GANCHO  [0-5s]',               border: '#ef4444', bg: 'rgba(239,68,68,0.08)' },
  dor:     { label: 'DOR / IDENTIFICAÇÃO  [5-25s]',  border: '#f59e0b', bg: 'rgba(245,158,11,0.08)' },
  solucao: { label: 'SOLUÇÃO + AUTORIDADE  [25-50s]',border: '#3a60ff', bg: 'rgba(58,96,255,0.08)' },
  cta:     { label: 'CHAMADA PRA AÇÃO  [50-60s]',    border: '#22c55e', bg: 'rgba(34,197,94,0.08)' },
}

export default function Roteiros() {
  const [semana, setSemana] = useState(0)
  const [area, setArea] = useState('Todas')
  const [open, setOpen] = useState(null)
  const [statuses, setStatuses] = useState(() =>
    Object.fromEntries(roteiros.map(r => [r.id, r.status]))
  )

  const filtered = roteiros.filter(r =>
    (semana === 0 || r.semana === semana) &&
    (area === 'Todas' || r.area === area)
  )

  const changeStatus = (id, val) =>
    setStatuses(prev => ({ ...prev, [id]: val }))

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-white">Roteiros</h1>
        <p className="text-white/30 text-sm mt-1">12 roteiros prontos para gravação</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-7">
        <div className="flex glass rounded-xl overflow-hidden">
          {SEMANAS.map(s => (
            <button key={s} onClick={() => setSemana(s)}
              className={`px-4 py-2.5 text-xs font-semibold transition-all ${semana === s ? 'bg-brand-500/30 text-white' : 'text-white/40 hover:text-white/70'}`}>
              {s === 0 ? 'Todas' : `Sem. ${s}`}
            </button>
          ))}
        </div>
        <div className="flex glass rounded-xl overflow-hidden">
          {AREAS.map(a => (
            <button key={a} onClick={() => setArea(a)}
              className={`px-4 py-2.5 text-xs font-semibold transition-all ${area === a ? 'bg-brand-500/30 text-white' : 'text-white/40 hover:text-white/70'}`}>
              {a}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-4 text-xs text-white/30">
          {Object.entries(STATUS_ROTEIRO).map(([k, s]) => (
            <span key={k} className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ background: s.color }} />
              {s.label}
            </span>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.map(r => {
          const st = statuses[r.id]
          const SR = STATUS_ROTEIRO[st]
          const AC = AREA_COLORS[r.area]
          const isOpen = open === r.id

          return (
            <div key={r.id} className="glass rounded-2xl overflow-hidden">
              <div className="flex items-center gap-4 p-4 cursor-pointer hover:bg-white/2 transition-colors"
                onClick={() => setOpen(isOpen ? null : r.id)}>
                {/* Número */}
                <div className="w-8 h-8 rounded-xl brand-gradient flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">{r.id}</span>
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{r.titulo}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: AC.bg, color: AC.color }}>{r.area}</span>
                    <span className="text-white/30 text-xs">·</span>
                    <span className="text-white/30 text-xs">{r.tema}</span>
                    <span className="text-white/30 text-xs">·</span>
                    <span className="text-white/30 text-xs">Semana {r.semana}</span>
                  </div>
                </div>
                {/* Status */}
                <select value={st} onClick={e => e.stopPropagation()}
                  onChange={e => changeStatus(r.id, e.target.value)}
                  className="text-xs px-3 py-1.5 rounded-lg outline-none border-0 cursor-pointer font-medium"
                  style={{ background: SR.bg, color: SR.color }}>
                  {Object.entries(STATUS_ROTEIRO).map(([k, s]) => (
                    <option key={k} value={k} style={{ background: '#0b152e', color: '#fff' }}>{s.label}</option>
                  ))}
                </select>
                {/* Toggle */}
                <div className="text-white/20">
                  {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </div>

              {/* Roteiro expandido */}
              {isOpen && (
                <div className="border-t border-white/5 p-4 space-y-3">
                  {Object.entries(BLOCO_STYLES).map(([key, bs]) => (
                    <div key={key} className="rounded-xl p-4" style={{ background: bs.bg, borderLeft: `3px solid ${bs.border}` }}>
                      <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: bs.border }}>{bs.label}</p>
                      <p className="text-white/70 text-sm leading-relaxed">{r[key]}</p>
                    </div>
                  ))}
                  {r.dica && (
                    <div className="flex items-start gap-3 bg-white/4 rounded-xl p-3">
                      <Lightbulb size={14} className="text-yellow-400 flex-shrink-0 mt-0.5" />
                      <p className="text-white/50 text-xs leading-relaxed">{r.dica}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
