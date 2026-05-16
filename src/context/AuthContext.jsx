import { createContext, useContext, useState } from 'react'

const USERS = [
  { id: 1, email: 'admin@moskalenko.com', password: 'admin123', name: 'Administrador', role: 'admin', pages: ['dashboard','campanhas','leads','crm','roteiros','criativos','config'] },
  { id: 2, email: 'advogado@moskalenko.com', password: 'adv123', name: 'Advogado', role: 'advogado', pages: ['roteiros','crm'] },
  { id: 3, email: 'marketing@moskalenko.com', password: 'mkt123', name: 'Yasmim', role: 'marketing', pages: ['roteiros','crm','criativos'] },
  { id: 4, email: 'captacao@moskalenko.com', password: 'cap123', name: 'Captacao', role: 'captacao', pages: ['crm'] },
  { id: 5, email: 'time@moskalenko.com', password: 'time123', name: 'Time', role: 'time', pages: ['dashboard','campanhas','leads','crm','roteiros','criativos','config'] },
]

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('mosk_user')
    return saved ? JSON.parse(saved) : null
  })
  const login = (email, password) => {
    const found = USERS.find(u => u.email === email && u.password === password)
    if (found) {
      const { password: _, ...safe } = found
      setUser(safe)
      localStorage.setItem('mosk_user', JSON.stringify(safe))
      return true
    }
    return false
  }
  const logout = () => {
    setUser(null)
    localStorage.removeItem('mosk_user')
  }
  const canAccess = (page) => user?.pages?.includes(page)
  return (
    <AuthContext.Provider value={{ user, login, logout, canAccess }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
