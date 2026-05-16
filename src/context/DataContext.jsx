import { createContext, useContext, useState } from 'react'
import {
  overviewMetrics as sampleOverview,
  platformMetrics as samplePlatform,
  leadsTimeline as sampleTimeline,
  ageDistribution as sampleAge,
  areaDistribution as sampleArea,
  campaigns as sampleCampaigns,
} from '../data/data'

const DataContext = createContext(null)

const SAMPLE = {
  campaigns: sampleCampaigns,
  overviewMetrics: sampleOverview,
  platformMetrics: samplePlatform,
  leadsTimeline: sampleTimeline,
  ageDistribution: sampleAge,
  areaDistribution: sampleArea,
}

function parseNum(val) {
  if (!val) return 0
  let s = String(val).replace(/[^0-9.,\-]/g, '')
  if (/\d\.\d{3},\d/.test(s)) s = s.replace(/\./g, '').replace(',', '.')
  else if (/^\d+,\d+$/.test(s)) s = s.replace(',', '.')
  else s = s.replace(/,/g, '')
  return parseFloat(s) || 0
}

function parseCSVLine(line) {
  const result = []
  let cur = ''
  let inQ = false
  for (const ch of line) {
    if (ch === '"') inQ = !inQ
    else if (ch === ',' && !inQ) { result.push(cur.trim()); cur = '' }
    else cur += ch
  }
  result.push(cur.trim())
  return result
}

function normH(h) {
  return h.toLowerCase().replace(/['"]/g, '').trim()
}

function findCol(headers, ...keys) {
  for (const k of keys) {
    const i = headers.findIndex(h => h.includes(k.toLowerCase()))
    if (i !== -1) return i
  }
  return -1
}

function platformFromName(name) {
  const n = name.toLowerCase()
  if (n.includes('tiktok')) return 'tiktok'
  if (n.includes('google') || n.includes('search') || n.includes('display') || n.includes('youtube') || n.includes('pmax')) return 'google'
  if (n.includes('facebook') || n.includes('instagram') || n.includes('stories') || n.includes('feed') || n.includes('reels') || n.includes('meta')) return 'meta'
  return null
}

export function parseMetricsCSV(text) {
  const lines = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n').map(l => l.trim()).filter(l => l)
  if (lines.length < 2) return null

  let hi = 0
  while (hi < Math.min(lines.length, 6)) {
    if (parseCSVLine(lines[hi]).map(normH).some(c => c.includes('campaign') || c.includes('campanha'))) break
    hi++
  }
  if (hi >= lines.length) return null

  const headers = parseCSVLine(lines[hi]).map(normH)
  const isMeta   = headers.some(h => h.includes('amount spent') || h.includes('valor gasto') || h.includes('link clicks'))
  const isGoogle = headers.some(h => h.includes('impr.') || h.includes('avg. cpc') || h.includes('cost / conv'))

  const C = {
    name:      findCol(headers, 'campaign name', 'nome da campanha', 'campaign', 'campanha'),
    spent:     findCol(headers, 'amount spent', 'valor gasto', 'cost', 'custo', 'spend', 'gasto'),
    impr:      findCol(headers, 'impressions', 'impressões', 'impr.'),
    clicks:    findCol(headers, 'link clicks', 'cliques no link', 'clicks', 'cliques'),
    results:   findCol(headers, 'results', 'resultados', 'conversions', 'conversões'),
    indicator: findCol(headers, 'indicador de resultados', 'result indicator', 'optimization goal'),
    cpr:       findCol(headers, 'cost per result', 'custo por resultado', 'cost / conv', 'custo / conv'),
    budget:    findCol(headers, 'budget', 'orçamento', 'daily budget'),
    status:    findCol(headers, 'delivery', 'veiculação', 'campaign status', 'status'),
    followers: findCol(headers, 'seguidores no instagram', 'instagram followers', 'follows'),
  }

  if (C.name === -1) return null

  const rows = lines.slice(hi + 1).map(l => parseCSVLine(l)).filter(row => {
    const n = row[C.name] || ''
    return row.length > 1 && n &&
      !n.toLowerCase().startsWith('total') &&
      !n.toLowerCase().startsWith('all campaign') &&
      !n.toLowerCase().startsWith('todas')
  })
  if (rows.length === 0) return null

  const campaigns = rows.map((row, i) => {
    const name      = row[C.name] || `Campanha ${i + 1}`
    const spent     = C.spent    >= 0 ? parseNum(row[C.spent])    : 0
    const results   = C.results  >= 0 ? parseNum(row[C.results])  : 0
    const cpr       = C.cpr      >= 0 ? parseNum(row[C.cpr])      : (results > 0 ? +(spent / results).toFixed(2) : 0)
    const budget    = C.budget   >= 0 ? parseNum(row[C.budget])   : +(spent * 1.25).toFixed(2)
    const followers = C.followers >= 0 ? parseNum(row[C.followers]) : 0
    const sr        = C.status   >= 0 ? (row[C.status] || '').toLowerCase() : 'active'
    const status    = (sr.includes('ativ') || sr.includes('active') || sr.includes('enabled') || sr.includes('habilitad')) ? 'ativa' : 'pausada'

    // Detect campaign type from result indicator column
    const indicator = C.indicator >= 0 ? (row[C.indicator] || '').toLowerCase() : ''
    const isLeadCampaign = indicator.includes('messaging') || indicator.includes('lead') ||
      indicator.includes('conversion') || indicator.includes('purchase') ||
      name.toLowerCase().includes('whatsapp') || name.toLowerCase().includes('lead')
    const type = isLeadCampaign ? 'whatsapp' : 'seguidores'

    let platform = isMeta ? 'meta' : isGoogle ? 'google' : 'meta'
    const det = platformFromName(name)
    if (det) platform = det

    return {
      id: i + 1, name, platform, type, area: 'Trabalhista', status,
      budget: +budget.toFixed(2), spent: +spent.toFixed(2),
      leads: isLeadCampaign ? Math.round(results) : 0,
      results: Math.round(results),
      cpl: isLeadCampaign ? cpr : 0,
      costPerResult: cpr,
      followers: Math.round(followers),
    }
  })

  const totalInvestment = +campaigns.reduce((s, c) => s + c.spent, 0).toFixed(2)
  const totalLeads      = campaigns.reduce((s, c) => s + c.leads, 0)
  const totalFollowers  = campaigns.reduce((s, c) => s + c.followers, 0)
  const totalProfileVisits = campaigns.filter(c => c.type === 'seguidores').reduce((s, c) => s + c.results, 0)

  const byPlat = {}
  campaigns.forEach(c => {
    if (!byPlat[c.platform]) byPlat[c.platform] = { investment: 0, leads: 0, impressions: 0, clicks: 0 }
    byPlat[c.platform].investment += c.spent
    byPlat[c.platform].leads      += c.leads
  })

  const platformMetrics = Object.entries(byPlat).map(([platform, d]) => ({
    platform,
    investment:  +d.investment.toFixed(2),
    leads:       d.leads,
    costPerLead: d.leads > 0 ? +(d.investment / d.leads).toFixed(2) : 0,
    impressions: 0, clicks: 0, ctr: 0,
  }))

  const cleanCampaigns = campaigns

  return {
    campaigns: cleanCampaigns,
    overviewMetrics: {
      totalInvestment,
      totalLeads,
      costPerLead:      totalLeads > 0 ? +(totalInvestment / totalLeads).toFixed(2) : 0,
      totalFollowers,
      totalProfileVisits,
      activeCampaigns:  campaigns.filter(c => c.status === 'ativa').length,
    },
    platformMetrics,
    leadsTimeline:    sampleTimeline,
    ageDistribution:  sampleAge,
    areaDistribution: sampleArea,
  }
}

export function DataProvider({ children }) {
  const [csvData, setCsvData] = useState(null)
  const [csvMeta, setCsvMeta] = useState(null)

  const loadCSV = async (file) => {
    const text = await file.text()
    const parsed = parseMetricsCSV(text)
    if (!parsed) return false
    setCsvData(parsed)
    setCsvMeta({ filename: file.name, rows: parsed.campaigns.length })
    return true
  }

  const resetToSample = () => {
    setCsvData(null)
    setCsvMeta(null)
  }

  return (
    <DataContext.Provider value={{ data: csvData || SAMPLE, isCustom: csvData !== null, csvMeta, loadCSV, resetToSample }}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => useContext(DataContext)
