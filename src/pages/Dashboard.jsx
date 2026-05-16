import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { DollarSign, Users, Target, MessageCircle, Eye, LayoutGrid } from 'lucide-react'
import { PLATFORMS, formatCurrency, formatNumber, formatPercent } from '../data/data'
import { useData } from '../context/DataContext'
import CSVUploader from '../components/shared/CSVUploader'

const TT = { contentStyle:{background:'#0b152e',border:'1px solid rgba(255,255,255,0.08)',borderRadius:10,color:'#fff'}, labelStyle:{color:'rgba(255,255,255,0.5)',fontSize:11}, itemStyle:{fontSize:11} }

function KPI({ label, value, sub, icon: Icon, color, delay }) {
  return (
    <div className={`glass rounded-2xl p-5 fade-up delay-${delay}`}>
      <div className="flex items-start justify-between mb-3">
        <p className="text-white/40 text-xs font-medium">{label}</p>
        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${color}20` }}>
          <Icon size={15} style={{ color }} />
        </div>
      </div>
      <p className="font-display text-3xl font-bold text-white">{value}</p>
      {sub && <p className="text-white/30 text-xs mt-1">{sub}</p>}
    </div>
  )
}

export default function Dashboard() {
  const { data, isCustom } = useData()
  const { overviewMetrics, platformMetrics, leadsTimeline, ageDistribution, areaDistribution } = data

  return (
    <div>
      <div className="mb-5">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-white/30 text-sm mt-1">
          {isCustom ? 'Dados importados do CSV' : '01 a 16 de Maio 2026 · Meta Ads'}
        </p>
      </div>

      <CSVUploader />

      <div className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 gap-4 mb-8">
        <KPI label="Investimento"     value={formatCurrency(overviewMetrics.totalInvestment)}  icon={DollarSign}    color="#3a60ff" delay={1} />
        <KPI label="Leads WhatsApp"   value={formatNumber(overviewMetrics.totalLeads)}          icon={MessageCircle} color="#25D366" delay={2} sub="conversas iniciadas" />
        <KPI label="Custo por Lead"   value={formatCurrency(overviewMetrics.costPerLead)}       icon={Target}        color="#22c55e" delay={3} />
        <KPI label="Seguidores"       value={formatNumber(overviewMetrics.totalFollowers ?? 0)} icon={Users}         color="#a855f7" delay={4} sub="novos seguidores" />
        <KPI label="Visitas ao Perfil" value={formatNumber(overviewMetrics.totalProfileVisits ?? overviewMetrics.totalImpressions ?? 0)} icon={Eye} color="#E8A820" delay={5} />
        <KPI label="Campanhas Ativas" value={overviewMetrics.activeCampaigns ?? overviewMetrics.totalClicks ?? 0} icon={LayoutGrid} color="#3a60ff" delay={5} sub="Meta Ads" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        <div className="xl:col-span-2 glass rounded-2xl p-6">
          <h3 className="font-display text-lg font-semibold text-white mb-1">Evolução de Leads</h3>
          <p className="text-white/30 text-xs mb-5">Maio 2026 por plataforma</p>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={leadsTimeline} margin={{top:5,right:5,left:-20,bottom:0}}>
              <defs>
                {[['google','#4285F4'],['meta','#0866FF'],['tiktok','#FF0050']].map(([k,c])=>(
                  <linearGradient key={k} id={`g-${k}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={c} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={c} stopOpacity={0}/>
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)"/>
              <XAxis dataKey="date" tick={{fill:'rgba(255,255,255,0.3)',fontSize:10}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fill:'rgba(255,255,255,0.3)',fontSize:10}} axisLine={false} tickLine={false}/>
              <Tooltip {...TT}/>
              {['google','meta','tiktok'].map((k)=>(
                <Area key={k} type="monotone" dataKey={k} name={PLATFORMS[k].name}
                  stroke={PLATFORMS[k].color} strokeWidth={2} fill={`url(#g-${k})`}/>
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass rounded-2xl p-6">
          <h3 className="font-display text-lg font-semibold text-white mb-1">Leads por Área</h3>
          <p className="text-white/30 text-xs mb-4">Distribuição jurídica</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={areaDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={3}>
                {areaDistribution.map((e,i)=><Cell key={i} fill={e.color} stroke="transparent"/>)}
              </Pie>
              <Tooltip contentStyle={TT.contentStyle} itemStyle={TT.itemStyle}/>
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {areaDistribution.map(a=>(
              <div key={a.area} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{background:a.color}}/>
                  <span className="text-white/50 text-xs">{a.area}</span>
                </div>
                <span className="text-white text-xs font-medium">{a.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="glass rounded-2xl p-6">
          <h3 className="font-display text-lg font-semibold text-white mb-1">Faixa Etária dos Leads</h3>
          <p className="text-white/30 text-xs mb-5">Distribuição por idade</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={ageDistribution} margin={{top:5,right:5,left:-20,bottom:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)"/>
              <XAxis dataKey="faixa" tick={{fill:'rgba(255,255,255,0.3)',fontSize:10}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fill:'rgba(255,255,255,0.3)',fontSize:10}} axisLine={false} tickLine={false}/>
              <Tooltip {...TT} formatter={v=>[v,'Leads']}/>
              <Bar dataKey="quantidade" radius={[6,6,0,0]}>
                {ageDistribution.map((_,i)=><Cell key={i} fill={`rgba(58,96,255,${0.4+i*0.1})`}/>)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass rounded-2xl p-6">
          <h3 className="font-display text-lg font-semibold text-white mb-5">Performance por Plataforma</h3>
          <div className="space-y-5">
            {platformMetrics.map(pm=>{
              const p = PLATFORMS[pm.platform]
              const pct = overviewMetrics.totalLeads > 0 ? (pm.leads / overviewMetrics.totalLeads) * 100 : 0
              return (
                <div key={pm.platform}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{background:p?.bg,color:p?.color}}>{p?.name ?? pm.platform}</span>
                    <div className="text-right">
                      <span className="text-white font-semibold text-sm">{pm.leads} leads</span>
                      <span className="text-white/30 text-xs ml-2">{formatCurrency(pm.costPerLead)}/lead</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{width:`${pct}%`,background:p?.color ?? '#3a60ff'}}/>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-white/25 text-xs">{formatCurrency(pm.investment)} investidos</span>
                    <span className="text-white/25 text-xs">{pm.ctr > 0 ? `CTR ${formatPercent(pm.ctr)}` : 'Meta Ads'}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
