import { useState } from 'react'
import { crmLeads, CRM_STATUS, PLATFORMS } from '../data/data'
import { Search, User, MessageCircle, Phone, Plus, X } from 'lucide-react'

export default function CRM() {
  const [leads, setLeads] = useState(crmLeads)
  const [search, setSearch] = useState('')
  const [view, setView] = useState('kanban')
  const [selected, setSelected] = useState(null)

  const filtered = leads.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.area.toLowerCase().includes(search.toLowerCase())
  )

  const changeStatus = (id, status) =>
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l))

  const COLS = ['novo', 'contato', 'qualificado', 'proposta', 'fechado']

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">CRM</h1>
          <p className="text-white/30 text-sm mt-1">Gestão de leads e relacionamentos</p>
        </div>
        <button className="flex items-center gap-2 brand-gradient px-4 py-2.5 rounded-xl text-sm font-medium text-white">
          <Plus size={15} /> Novo Lead
        </button>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Buscar lead..."
            className="w-full glass rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-white/20 outline-none border border-transparent focus:border-brand-500/40 transition-colors" />
        </div>
        <div className="flex glass rounded-xl overflow-hidden">
          {['kanban', 'lista'].map(v => (
            <button key={v} onClick={() => setView(v)}
              className={`px-5 py-2.5 text-sm font-medium capitalize transition-all ${view === v ? 'bg-brand-500/20 text-brand-300' : 'text-white/40 hover:text-white/70'}`}>
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Status summary */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {Object.entries(CRM_STATUS).map(([k, s]) => {
          const count = leads.filter(l => l.status === k).length
          return (
            <div key={k} className="glass rounded-xl px-4 py-2 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
              <span className="text-white/40 text-xs">{s.label}</span>
              <span className="text-white font-semibold text-sm">{count}</span>
            </div>
          )
        })}
      </div>

      {/* Kanban */}
      {view === 'kanban' ? (
        <div className="grid grid-cols-5 gap-4 overflow-x-auto pb-4">
          {COLS.map(col => {
            const colLeads = filtered.filter(l => l.status === col)
            const s = CRM_STATUS[col]
            return (
              <div key={col} className="min-w-[190px]">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                  <span className="text-white/50 text-xs font-medium">{s.label}</span>
                  <span className="ml-auto text-white/25 text-xs font-mono">{colLeads.length}</span>
                </div>
                <div className="space-y-3">
                  {colLeads.map(lead => (
                    <div key={lead.id} onClick={() => setSelected(lead.id)}
                      className="glass-light rounded-xl p-4 cursor-pointer hover:border-white/15 border border-transparent transition-all group">
                      <div className="flex items-start justify-between mb-2">
                        <div className="w-8 h-8 rounded-full bg-brand-500/20 flex items-center justify-center">
                          <User size={13} className="text-brand-400" />
                        </div>
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                          style={{ background: PLATFORMS[lead.platform]?.bg, color: PLATFORMS[lead.platform]?.color }}>
                          {PLATFORMS[lead.platform]?.name?.replace(' Ads', '')}
                        </span>
                      </div>
                      <p className="text-white text-sm font-medium mt-2">{lead.name}</p>
                      <p className="text-white/40 text-xs mt-0.5">{lead.area}</p>
                      <p className="text-white/25 text-xs mt-1">{lead.age} anos · {lead.createdAt}</p>
                      <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <a href={`https://wa.me/55${lead.phone.replace(/\D/g,'')}`} target="_blank" rel="noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-emerald-500/15 text-emerald-400 rounded-lg text-xs hover:bg-emerald-500/25 transition-colors">
                          <MessageCircle size={10} /> Zap
                        </a>
                        <button onClick={e => e.stopPropagation()}
                          className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-brand-500/15 text-brand-400 rounded-lg text-xs hover:bg-brand-500/25 transition-colors">
                          <Phone size={10} /> Ligar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="glass rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                {['Nome','Área','Plataforma','Status','Idade','Data','Ações'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-white/25 uppercase tracking-wider pb-4 pt-4 px-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map(lead => {
                const s = CRM_STATUS[lead.status]
                const p = PLATFORMS[lead.platform]
                return (
                  <tr key={lead.id} className="hover:bg-white/2 cursor-pointer transition-colors group"
                    onClick={() => setSelected(lead.id)}>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-500/15 flex items-center justify-center flex-shrink-0">
                          <User size={13} className="text-brand-400" />
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">{lead.name}</p>
                          <p className="text-white/25 text-xs">{lead.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-white/50 text-sm">{lead.area}</td>
                    <td className="py-3.5 px-4">
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: p?.bg, color: p?.color }}>{p?.name}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: s.bg, color: s.color }}>{s.label}</span>
                    </td>
                    <td className="py-3.5 px-4 text-white/50 text-sm">{lead.age} anos</td>
                    <td className="py-3.5 px-4 text-white/30 text-sm">{lead.createdAt}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={e => e.stopPropagation()}>
                        <a href={`https://wa.me/55${lead.phone.replace(/\D/g,'')}`} target="_blank" rel="noreferrer"
                          className="w-7 h-7 flex items-center justify-center bg-emerald-500/15 text-emerald-400 rounded-lg hover:bg-emerald-500/25 transition-colors">
                          <MessageCircle size={13} />
                        </a>
                        <button className="w-7 h-7 flex items-center justify-center bg-brand-500/15 text-brand-400 rounded-lg hover:bg-brand-500/25 transition-colors">
                          <Phone size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {selected && (() => {
        const lead = leads.find(l => l.id === selected)
        const s = CRM_STATUS[lead.status]
        const p = PLATFORMS[lead.platform]
        return (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setSelected(null)}>
            <div className="glass rounded-2xl p-8 w-full max-w-md" onClick={e => e.stopPropagation()}>
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 brand-gradient rounded-xl flex items-center justify-center brand-glow">
                    <User size={20} className="text-white" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold text-white">{lead.name}</h2>
                    <p className="text-white/40 text-sm">{lead.area} · {lead.age} anos</p>
                  </div>
                </div>
                <button onClick={() => setSelected(null)} className="text-white/20 hover:text-white transition-colors">
                  <X size={18} />
                </button>
              </div>
              <div className="space-y-3 mb-6">
                {[
                  ['Plataforma', <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: p?.bg, color: p?.color }}>{p?.name}</span>],
                  ['Telefone', lead.phone],
                  ['Recebido', lead.createdAt],
                ].map(([label, val]) => (
                  <div key={label} className="flex justify-between items-center py-3 border-b border-white/5">
                    <span className="text-white/40 text-sm">{label}</span>
                    <span className="text-white text-sm">{val}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-white/40 text-sm">Status</span>
                  <select value={lead.status} onChange={e => changeStatus(lead.id, e.target.value)}
                    className="glass rounded-lg px-3 py-1.5 text-sm text-white outline-none border border-white/10">
                    {Object.entries(CRM_STATUS).map(([k, sv]) => (
                      <option key={k} value={k} style={{ background: '#0b152e' }}>{sv.label}</option>
                    ))}
                  </select>
                </div>
                <div className="py-3">
                  <span className="text-white/40 text-sm block mb-2">Observações</span>
                  <p className="text-white/60 text-sm">{lead.notes}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <a href={`https://wa.me/55${lead.phone.replace(/\D/g,'')}`} target="_blank" rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-500/15 text-emerald-400 rounded-xl text-sm font-medium hover:bg-emerald-500/25 transition-colors">
                  <MessageCircle size={16} /> WhatsApp
                </a>
                <button className="flex-1 flex items-center justify-center gap-2 py-3 brand-gradient rounded-xl text-sm font-medium text-white">
                  <Phone size={16} /> Ligar
                </button>
              </div>
            </div>
          </div>
        )
      })()}
    </div>
  )
}
