import { useAuth } from '../../hooks/useAuth'
import { toast } from 'sonner'

export function SignOutButton() {
  const { signOut, user } = useAuth()

  const handleSignOut = async () => {
    const { error } = await signOut()
    if (error) {
      toast.error('Error signing out')
    } else {
      toast.success('Signed out successfully')
    }
  }

  if (!user) return null

  return (
    <div className="flex items-center space-x-4">
      <span className="text-purple-200 text-sm">
        {user.email}
      </span>
      <button
        onClick={handleSignOut}
        className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
      >
        Sign Out
      </button>
    </div>
  )
}
