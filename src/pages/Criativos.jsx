import { useState, useRef, useEffect } from 'react'
import { Send, Copy, Check, Sparkles, Palette, Key, ExternalLink } from 'lucide-react'

const GEMINI_KEY = import.meta.env.VITE_GEMINI_KEY

const SYSTEM_PROMPT = `Você é um assistente especializado em marketing jurídico para o escritório Moskalenko Advogados. Identidade visual: azul royal #1230A0, branco, estilo profissional. Públicos: trabalhadores lesados (motoristas, caminhoneiros) e consumidores lesados por bancos e planos de saúde. Quando pedirem um criativo, gere: 1) Prompt completo pro Gemini criar a imagem (em inglês, estilo Pixar 3D ou miniatura fotorrealista, com identidade da Moskalenko), 2) Prompt pro Google Flow animar, 3) Legenda em português pra Instagram com CTA pro WhatsApp, 4) 5 hashtags.

Responda SEMPRE neste formato exato, usando os separadores abaixo:

---PROMPT GEMINI (Imagem)---
[prompt detalhado em inglês, 3D Pixar style ou miniatura fotorrealista, cores #1230A0 e branco da Moskalenko, sem texto na imagem, formato vertical 9:16]

---PROMPT GOOGLE FLOW (Animação)---
[prompt em inglês para animar a cena com movimentos expressivos dos personagens]

---LEGENDA INSTAGRAM---
[legenda em português com gancho forte, identificação da dor, CTA pro WhatsApp, máx 150 palavras]

---HASHTAGS---
[5 hashtags relevantes em português]`

const SUGGESTIONS = [
  'Post Dia do Trabalhador com caminhoneiro',
  'Imagem campanha banco cobrança indevida',
  'Post direitos do consumidor estilo Pixar 3D',
  'Criativo plano de saúde negou cobertura',
  'Post motivacional para advogado trabalhista',
  'Imagem hora extra não paga motorista',
]

function parseResponse(text) {
  const sections = {}
  const parts = text.split(/---(.+?)---/)
  for (let i = 1; i < parts.length; i += 2) {
    const key = parts[i].trim()
    const val = parts[i + 1]?.trim() || ''
    sections[key] = val
  }
  return Object.keys(sections).length > 0 ? sections : null
}

function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button onClick={copy} className="flex items-center gap-1 text-white/30 hover:text-white/70 transition-colors text-xs">
      {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
      {copied ? 'Copiado!' : 'Copiar'}
    </button>
  )
}

function SectionBlock({ title, content, color }) {
  return (
    <div className="rounded-xl overflow-hidden" style={{ borderLeft: `3px solid ${color}` }}>
      <div className="flex items-center justify-between px-4 py-2" style={{ background: `${color}15` }}>
        <span className="text-xs font-bold uppercase tracking-wider" style={{ color }}>{title}</span>
        <CopyBtn text={content} />
      </div>
      <div className="px-4 py-3 bg-white/3">
        <p className="text-white/70 text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  )
}

const SECTION_COLORS = {
  'PROMPT GEMINI (Imagem)':        '#4285F4',
  'PROMPT GOOGLE FLOW (Animação)': '#22c55e',
  'LEGENDA INSTAGRAM':             '#E8A820',
  'HASHTAGS':                      '#a855f7',
}

export default function Criativos() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const send = async (text) => {
    if (!text.trim() || loading || !GEMINI_KEY) return
    const userMsg = { role: 'user', content: text }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const history = [...messages, userMsg]
      const contents = history.map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }))

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents,
            systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
            generationConfig: { maxOutputTokens: 1500, temperature: 0.9 },
          }),
        }
      )

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        if (res.status === 429) throw new Error('Limite de requisições atingido (15 req/min). Aguarde um momento e tente novamente.')
        if (res.status === 400 || res.status === 403) throw new Error('Chave API inválida. Verifique o valor de VITE_GEMINI_KEY no arquivo .env.')
        throw new Error(err.error?.message || `Erro ${res.status}`)
      }

      const data = await res.json()
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Erro ao gerar resposta.'
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: e.message || 'Erro de conexão.' }])
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)]">
      <div className="mb-6 flex-shrink-0">
        <h1 className="font-display text-3xl font-bold text-white">IA Criativos</h1>
        <p className="text-white/30 text-sm mt-1">Gere prompts e legendas com a identidade da Moskalenko</p>
      </div>

      {!GEMINI_KEY && (
        <div className="glass rounded-2xl p-6 mb-6 flex-shrink-0 border border-yellow-500/20">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:'rgba(245,158,11,0.15)'}}>
              <Key size={18} className="text-yellow-400" />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium mb-1">Chave API Gemini não configurada</p>
              <p className="text-white/50 text-sm mb-3">Para usar a IA de Criativos, você precisa de uma chave gratuita do Google AI Studio.</p>
              <ol className="text-white/40 text-xs space-y-1.5 mb-4 list-none">
                <li>1. Acesse <span className="text-brand-300">aistudio.google.com</span> e crie uma chave gratuita</li>
                <li>2. Crie um arquivo <span className="font-mono text-white/60">.env</span> na raiz do projeto</li>
                <li>3. Adicione: <span className="font-mono text-white/60">VITE_GEMINI_KEY=sua_chave_aqui</span></li>
                <li>4. Reinicie o servidor com <span className="font-mono text-white/60">npm run dev</span></li>
              </ol>
              <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-brand-300 hover:text-brand-200 text-sm font-medium transition-colors">
                Obter chave gratuita <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Chat */}
      <div className="flex-1 overflow-y-auto space-y-5 pr-1 mb-4">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 brand-gradient rounded-2xl flex items-center justify-center mx-auto mb-4 brand-glow">
              <Palette size={28} className="text-white" />
            </div>
            <p className="text-white/50 text-sm mb-2">Peça um criativo pra IA</p>
            <p className="text-white/25 text-xs mb-8">A IA já conhece a identidade visual da Moskalenko</p>
            <div className="flex flex-wrap gap-2 justify-center max-w-lg mx-auto">
              {SUGGESTIONS.map(s => (
                <button key={s} onClick={() => send(s)} disabled={!GEMINI_KEY}
                  className="glass-light rounded-xl px-4 py-2 text-xs text-white/60 hover:text-white hover:border-brand-500/30 border border-transparent transition-all disabled:opacity-30 disabled:cursor-not-allowed">
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => {
          if (msg.role === 'user') {
            return (
              <div key={i} className="flex justify-end">
                <div className="brand-gradient rounded-2xl rounded-tr-sm px-4 py-3 max-w-sm">
                  <p className="text-white text-sm">{msg.content}</p>
                </div>
              </div>
            )
          }
          const parsed = parseResponse(msg.content)
          return (
            <div key={i} className="flex justify-start">
              <div className="max-w-2xl w-full">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 brand-gradient rounded-lg flex items-center justify-center">
                    <Sparkles size={12} className="text-white" />
                  </div>
                  <span className="text-white/40 text-xs">IA Moskalenko</span>
                </div>
                {parsed ? (
                  <div className="space-y-3">
                    {Object.entries(parsed).map(([title, content]) => (
                      <SectionBlock key={title} title={title} content={content} color={SECTION_COLORS[title] || '#3a60ff'} />
                    ))}
                  </div>
                ) : (
                  <div className="glass rounded-2xl rounded-tl-sm px-4 py-3">
                    <p className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  </div>
                )}
              </div>
            </div>
          )
        })}

        {loading && (
          <div className="flex justify-start">
            <div className="glass rounded-2xl px-4 py-3">
              <div className="flex gap-1.5">
                {[0,1,2].map(i => (
                  <div key={i} className="w-2 h-2 bg-brand-400 rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 150}ms` }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex-shrink-0">
        <div className="glass rounded-2xl flex items-center gap-3 px-4 py-3">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send(input)}
            placeholder={GEMINI_KEY ? 'Ex: Post dia do trabalhador com caminhoneiro estilo Pixar...' : 'Configure VITE_GEMINI_KEY para usar a IA'}
            disabled={!GEMINI_KEY}
            className="flex-1 bg-transparent text-white text-sm placeholder-white/20 outline-none disabled:cursor-not-allowed"
          />
          <button onClick={() => send(input)} disabled={loading || !input.trim() || !GEMINI_KEY}
            className="w-9 h-9 brand-gradient rounded-xl flex items-center justify-center disabled:opacity-30 transition-opacity">
            <Send size={15} className="text-white" />
          </button>
        </div>
        <p className="text-white/15 text-xs text-center mt-2">Enter para enviar · Gemini 1.5 Flash · 15 req/min gratuitos</p>
      </div>
    </div>
  )
}
