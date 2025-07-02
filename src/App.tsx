import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import { AuthPage } from './components/auth/AuthPage'
import { ResetPassword } from './components/auth/ResetPassword'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { AstrologyDashboard } from './components/AstrologyDashboard'
import { SignOutButton } from './components/auth/SignOutButton'
import { useAuth } from './hooks/useAuth'

export default function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        {user && (
          <header className="sticky top-0 z-10 bg-black/20 backdrop-blur-sm border-b border-white/10">
            <div className="container mx-auto px-4 h-16 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🔮</span>
                <h1 className="text-xl font-bold text-white">AstroMystic</h1>
              </div>
              <SignOutButton />
            </div>
          </header>
        )}

        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <AstrologyDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/" 
              element={
                user ? <Navigate to="/dashboard" replace /> : <Navigate to="/auth" replace />
              } 
            />
          </Routes>
        </main>
        
        <Toaster />
      </div>
    </Router>
  )
}
