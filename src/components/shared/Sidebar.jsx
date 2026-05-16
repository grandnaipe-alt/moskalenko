import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {
  LayoutDashboard, Megaphone, TrendingUp, Users,
  Film, Palette, Settings, Scale, LogOut,
} from 'lucide-react'

const ALL_NAV = [
  { to: '/',           page: 'dashboard',  icon: LayoutDashboard, label: 'Dashboard',    group: 'principal' },
  { to: '/campanhas',  page: 'campanhas',  icon: Megaphone,       label: 'Campanhas',    group: 'principal' },
  { to: '/leads',      page: 'leads',      icon: TrendingUp,      label: 'Leads',        group: 'principal' },
  { to: '/crm',        page: 'crm',        icon: Users,           label: 'CRM',          group: 'principal' },
  { to: '/roteiros',   page: 'roteiros',   icon: Film,            label: 'Roteiros',     group: 'conteudo'  },
  { to: '/criativos',  page: 'criativos',  icon: Palette,         label: 'IA Criativos', group: 'conteudo'  },
  { to: '/config',     page: 'config',     icon: Settings,        label: 'Config.',      group: 'sistema'   },
]

const ROLE_LABELS = {
  admin:    'Administrador',
  advogado: 'Advogado',
  marketing: 'Marketing',
  captacao:  'Captação',
  time:      'Time Moskalenko',
}

const GROUP_LABELS = { principal: 'Principal', conteudo: 'Conteúdo', sistema: 'Sistema' }

export default function Sidebar({ isOpen, onClose }) {
  const { user, canAccess, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const nav    = ALL_NAV.filter(n => canAccess(n.page))
  const groups = [...new Set(nav.map(n => n.group))]

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={onClose} />
      )}

      <aside className={`fixed left-0 top-0 h-screen w-64 glass border-r border-white/5 flex flex-col z-50 transition-transform duration-300 md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>

        {/* Logo */}
        <div className="px-6 py-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 brand-gradient rounded-xl flex items-center justify-center brand-glow flex-shrink-0">
              <Scale size={18} className="text-white" />
            </div>
            <div>
              <p className="font-display text-base font-bold text-white leading-none tracking-wider">MOSKALENKO</p>
              <p className="text-white/30 text-[10px] mt-0.5 tracking-widest uppercase">Advogados</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-5 overflow-y-auto space-y-1">
          {groups.map(group => (
            <div key={group}>
              <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest px-3 mb-2 mt-4 first:mt-0">
                {GROUP_LABELS[group]}
              </p>
              {nav.filter(n => n.group === group).map(item => (
                <NavLink key={item.to} to={item.to} end={item.to === '/'}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
                      isActive
                        ? 'bg-brand-500/20 text-white border border-brand-500/25'
                        : 'text-white/40 hover:text-white/70 hover:bg-white/4'
                    }`
                  }>
                  {({ isActive }) => (
                    <>
                      <item.icon size={16} className={isActive ? 'text-brand-300' : 'text-white/30 group-hover:text-white/50'} />
                      <span>{item.label}</span>
                      {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-400" />}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        {/* User */}
        <div className="px-3 py-4 border-t border-white/5">
          <div className="glass-light rounded-xl p-3 flex items-center gap-3">
            <div className="w-8 h-8 brand-gradient rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-xs">{user?.name?.[0]}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{user?.name}</p>
              <p className="text-white/30 text-xs">{ROLE_LABELS[user?.role]}</p>
            </div>
            <button onClick={handleLogout} title="Sair"
              className="text-white/20 hover:text-red-400 transition-colors">
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
