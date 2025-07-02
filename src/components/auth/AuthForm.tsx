import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { toast } from 'sonner'

interface AuthFormProps {
  mode: 'signin' | 'signup'
  onSuccess?: () => void
}

export function AuthForm({ mode, onSuccess }: AuthFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)

  const { signIn, signUp, resetPassword } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (mode === 'signup') {
        if (password !== confirmPassword) {
          toast.error('Passwords do not match')
          return
        }
        if (password.length < 6) {
          toast.error('Password must be at least 6 characters')
          return
        }

        const { data, error } = await signUp(email, password)
        
        if (error) {
          toast.error(error.message)
        } else {
          toast.success('Check your email for the confirmation link!')
          onSuccess?.()
        }
      } else {
        const { data, error } = await signIn(email, password)
        
        if (error) {
          toast.error(error.message)
        } else {
          toast.success('Welcome back!')
          onSuccess?.()
        }
      }
    } catch (error) {
      toast.error('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast.error('Please enter your email address')
      return
    }

    setLoading(true)
    const { error } = await resetPassword(email)
    
    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Password reset email sent!')
      setShowForgotPassword(false)
    }
    setLoading(false)
  }

  if (showForgotPassword) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white/5 rounded-lg p-6 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Reset Password
          </h2>
          
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-purple-200 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input-field"
                placeholder="Enter your email"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="auth-button"
            >
              {loading ? 'Sending...' : 'Send Reset Email'}
            </button>

            <button
              type="button"
              onClick={() => setShowForgotPassword(false)}
              className="w-full text-purple-400 hover:text-purple-300 text-sm"
            >
              Back to Sign In
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white/5 rounded-lg p-6 border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-purple-200 mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input-field"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-purple-200 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input-field"
              placeholder="Enter your password"
              required
              minLength={6}
            />
          </div>

          {mode === 'signup' && (
            <div>
              <label htmlFor="confirmPassword" className="block text-purple-200 mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="auth-input-field"
                placeholder="Confirm your password"
                required
                minLength={6}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="auth-button"
          >
            {loading 
              ? (mode === 'signin' ? 'Signing In...' : 'Creating Account...') 
              : (mode === 'signin' ? 'Sign In' : 'Create Account')
            }
          </button>

          {mode === 'signin' && (
            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              className="w-full text-purple-400 hover:text-purple-300 text-sm"
            >
              Forgot your password?
            </button>
          )}
        </form>
      </div>
    </div>
  )
}
