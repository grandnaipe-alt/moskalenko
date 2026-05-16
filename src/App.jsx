import { Routes, Route, Navigate } from 'react-router-dom'
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
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
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
