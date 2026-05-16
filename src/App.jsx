import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Menu, Scale } from 'lucide-react'
import { useAuth } from './context/AuthContext'
import Sidebar from './components/shared/Sidebar'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import CRM from './pages/CRM'
import Roteiros from './pages/Roteiros'
import Criativos from './pages/Criativos'
import { Campanhas, Leads, Config } from './pages/Other'

function Protected({ children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return children
}

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Mobile top bar */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-14 glass border-b border-white/5 flex items-center justify-between px-4 z-30">
        <button onClick={() => setSidebarOpen(true)}
          className="w-9 h-9 flex items-center justify-center text-white/60 hover:text-white transition-colors">
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 brand-gradient rounded-lg flex items-center justify-center">
            <Scale size={12} className="text-white" />
          </div>
          <span className="font-display font-bold text-white text-sm tracking-wider">MOSKALENKO</span>
        </div>
        <div className="w-9" />
      </header>

      <main className="flex-1 md:ml-64 p-4 md:p-8">
        {/* Spacer that pushes content below the fixed mobile header */}
        <div className="h-14 md:hidden" />
        <div className="max-w-[1400px] mx-auto">
          <Routes>
            <Route path="/"           element={<Dashboard />} />
            <Route path="/campanhas"  element={<Campanhas />} />
            <Route path="/leads"      element={<Leads />} />
            <Route path="/crm"        element={<CRM />} />
            <Route path="/roteiros"   element={<Roteiros />} />
            <Route path="/criativos"  element={<Criativos />} />
            <Route path="/config"     element={<Config />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<Protected><Layout /></Protected>} />
    </Routes>
  )
}
