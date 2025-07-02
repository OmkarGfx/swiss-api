import { useEffect, useState } from 'react'
import { AuthForm } from './AuthForm'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export function AuthPage() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard', { replace: true })
    }
  }, [user, loading, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🔮</div>
          <h1 className="text-4xl font-bold text-white mb-2">AstroMystic</h1>
          <p className="text-purple-200">Discover your cosmic journey through the stars</p>
        </div>

        <AuthForm mode={mode} onSuccess={() => navigate('/dashboard')} />

        <div className="text-center mt-6">
          <button
            onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
            className="text-purple-400 hover:text-purple-300 text-sm"
          >
            {mode === 'signin' 
              ? "Don't have an account? Sign up" 
              : "Already have an account? Sign in"
            }
          </button>
        </div>
      </div>
    </div>
  )
}
