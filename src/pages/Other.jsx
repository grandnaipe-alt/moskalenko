import { useState } from 'react'
import { PLATFORMS, CAMPAIGN_TYPES, formatCurrency, formatPercent, formatNumber } from '../data/data'
import { Search, Plus, Pause, Play } from 'lucide-react'
import { useData } from '../context/DataContext'
import CSVUploader from '../components/shared/CSVUploader'

export function Campanhas() {
  const { data } = useData()
  const { campaigns } = data
  const [search, setSearch] = useState('')
  const [plat, setPlat] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')

  const filtered = campaigns.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) &&
    (plat === 'all' || c.platform === plat) &&
    (typeFilter === 'all' || c.type === typeFilter)
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Campanhas</h1>
          <p className="text-white/30 text-sm mt-1">Gestão de campanhas ativas</p>
        </div>
        <button className="flex items-center gap-2 brand-gradient px-4 py-2.5 rounded-xl text-sm font-medium text-white">
          <Plus size={15}/> Nova Campanha
        </button>
      </div>

      <CSVUploader />

      <div className="flex gap-3 mb-6 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"/>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar campanha..."
            className="w-full glass rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-white/20 outline-none border border-transparent focus:border-brand-500/40 transition-colors"/>
        </div>
        <div className="flex glass rounded-xl overflow-hidden">
          {[['all','Todas'],['whatsapp','WhatsApp'],['seguidores','Seguidores']].map(([v,l]) => (
            <button key={v} onClick={() => setTypeFilter(v)}
              className={`px-4 py-2.5 text-xs font-semibold transition-all ${typeFilter===v ? 'bg-brand-500/20 text-white' : 'text-white/40 hover:text-white/70'}`}>
              {l}
            </button>
          ))}
        </div>
        <div className="flex glass rounded-xl overflow-hidden">
          {['all','google','meta','tiktok'].map(p => (
            <button key={p} onClick={() => setPlat(p)}
              className={`px-4 py-2.5 text-xs font-semibold transition-all ${plat===p ? 'bg-brand-500/20 text-white' : 'text-white/40 hover:text-white/70'}`}>
              {p === 'all' ? 'Todas' : PLATFORMS[p]?.name}
            </button>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-white/5">
              {['Campanha','Tipo','Status','Gasto','Resultado','Custo/Result.','Seguidores','Ações'].map(h => (
                <th key={h} className="text-left text-xs font-semibold text-white/25 uppercase tracking-wider py-4 px-4">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map(c => {
              const p  = PLATFORMS[c.platform]
              const ct = CAMPAIGN_TYPES[c.type]
              const active = c.status === 'ativa'
              const isWpp = c.type === 'whatsapp'
              return (
                <tr key={c.id} className="hover:bg-white/2 transition-colors group">
                  <td className="py-4 px-4 max-w-[220px]">
                    <p className="text-white text-sm font-medium truncate">{c.name}</p>
                    <span className="text-xs px-1.5 py-0.5 rounded-full font-medium mt-1 inline-block" style={{background:p?.bg,color:p?.color}}>{p?.name ?? c.platform}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{background:ct?.bg,color:ct?.color}}>
                      {ct?.label}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${active ? 'bg-emerald-500/15 text-emerald-400' : 'bg-yellow-500/15 text-yellow-400'}`}>
                      {active ? 'Ativa' : 'Pausada'}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-white text-sm">{formatCurrency(c.spent)}</td>
                  <td className="py-4 px-4">
                    {isWpp ? (
                      <div>
                        <p className="text-white font-semibold text-sm">{c.leads} leads</p>
                        <p className="text-white/30 text-xs">conversas WhatsApp</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-white font-semibold text-sm">{formatNumber(c.results)} visitas</p>
                        <p className="text-white/30 text-xs">ao perfil</p>
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`text-sm font-medium ${isWpp && c.cpl < 10 ? 'text-emerald-400' : 'text-white/70'}`}>
                      {formatCurrency(c.costPerResult)}
                    </span>
                    <p className="text-white/25 text-xs">{isWpp ? '/lead' : '/resultado'}</p>
                  </td>
                  <td className="py-4 px-4">
                    {c.followers > 0 ? (
                      <span className="text-white text-sm font-medium">+{formatNumber(c.followers)}</span>
                    ) : (
                      <span className="text-white/25 text-sm">—</span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <button className="w-7 h-7 glass rounded-lg flex items-center justify-center text-white/30 hover:text-white opacity-0 group-hover:opacity-100 transition-all">
                      {active ? <Pause size={12}/> : <Play size={12}/>}
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function Leads() {
  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-white mb-2">Leads</h1>
      <p className="text-white/30 text-sm mb-8">Análise de leads por faixa etária e plataforma</p>
      <div className="glass rounded-2xl p-12 text-center">
        <p className="text-white/40 text-sm">Módulo de análise de leads em construção</p>
        <p className="text-white/20 text-xs mt-2">Integre via Claude Code para adicionar os gráficos</p>
      </div>
    </div>
  )
}

export function Config() {
  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-white mb-2">Configurações</h1>
      <p className="text-white/30 text-sm mb-8">Integrações e preferências da plataforma</p>
      <div className="space-y-4">
        {[
          { name:'Google Ads API',     desc:'Sincronização automática de campanhas e métricas', color:'#4285F4' },
          { name:'Meta Marketing API', desc:'Facebook e Instagram Ads em tempo real',           color:'#0866FF' },
          { name:'TikTok Ads API',     desc:'TikTok Ads automático',                            color:'#FF0050' },
          { name:'WhatsApp Business',  desc:'Receba leads direto no CRM',                       color:'#25D366' },
          { name:'Chave API Gemini',   desc:'IA de Criativos — modelo gemini-1.5-flash gratuito', color:'#4285F4' },
        ].map(item => (
          <div key={item.name} className="glass rounded-2xl p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background:`${item.color}20`}}>
                <div className="w-3 h-3 rounded-full" style={{background:item.color}}/>
              </div>
              <div>
                <p className="text-white font-medium text-sm">{item.name}</p>
                <p className="text-white/30 text-xs">{item.desc}</p>
              </div>
            </div>
            <button className="px-4 py-2 glass rounded-xl text-xs text-white/50 hover:text-white border border-transparent hover:border-white/15 transition-all">
              Conectar
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
