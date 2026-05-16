import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Scale, Eye, EyeOff, AlertCircle } from 'lucide-react'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    const ok = login(email, password)
    setLoading(false)
    if (ok) navigate('/')
    else setError('E-mail ou senha incorretos')
  }

  return (
    <div className="min-h-screen bg-surface-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(18,48,160,0.15) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(18,48,160,0.10) 0%, transparent 70%)' }} />
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="w-full max-w-md fade-up">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 brand-gradient rounded-2xl mb-5 brand-glow">
            <Scale size={28} className="text-white" />
          </div>
          <h1 className="font-display text-4xl font-bold text-white tracking-wide">MOSKALENKO</h1>
          <p className="text-white/30 text-sm tracking-[0.3em] uppercase mt-1">Advogados</p>
          <p className="text-white/20 text-xs mt-3">Plataforma de Marketing Jurídico</p>
        </div>

        {/* Form */}
        <div className="glass rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-white/50 text-xs font-medium uppercase tracking-wider block mb-2">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="seu@moskalenko.com"
                required
                className="w-full glass-light rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none border border-transparent focus:border-brand-500/50 transition-all"
              />
            </div>
            <div>
              <label className="text-white/50 text-xs font-medium uppercase tracking-wider block mb-2">Senha</label>
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full glass-light rounded-xl px-4 py-3 pr-12 text-white text-sm placeholder-white/20 outline-none border border-transparent focus:border-brand-500/50 transition-all"
                />
                <button type="button" onClick={() => setShow(!show)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                  {show ? <EyeOff size={16}/> : <Eye size={16}/>}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 rounded-xl px-4 py-3">
                <AlertCircle size={15}/> {error}
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full brand-gradient py-3.5 rounded-xl text-white font-semibold text-sm tracking-wide hover:opacity-90 transition-all brand-glow disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? 'Entrando...' : 'Entrar na Plataforma'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/5">
            <p className="text-white/20 text-xs text-center">Acesso restrito ao time Moskalenko Advogados</p>
          </div>
        </div>
      </div>
    </div>
  )
}
