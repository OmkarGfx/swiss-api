import { useState } from 'react'
import { toast } from 'sonner'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

export function AstrologyChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Welcome! I\'m your AI astrologer. Ask me anything about astrology, birth charts, or cosmic guidance. How can I help you today?',
      timestamp: Date.now()
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: Date.now()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    // Mock AI response
    setTimeout(() => {
      const responses = [
        "Based on the cosmic energies, I sense that you're seeking clarity in your life path. The stars suggest focusing on your inner wisdom and trusting your intuition.",
        "Your question touches on deep astrological themes. The planetary alignments indicate a time of transformation and growth ahead.",
        "From an astrological perspective, this situation calls for patience and understanding. The current Mercury position suggests clear communication will be key.",
        "The cosmic forces are aligning to bring new opportunities your way. Stay open to unexpected possibilities and trust in divine timing.",
        "Your birth chart would reveal more specific insights, but generally, this energy pattern suggests focusing on balance and harmony in your relationships."
      ]

      const aiMessage: Message = {
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: Date.now()
      }

      setMessages(prev => [...prev, aiMessage])
      setLoading(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">AI Astrologer Chat</h2>
        <p className="text-purple-200">Get personalized astrological guidance and insights</p>
      </div>

      <div className="bg-white/5 rounded-lg border border-white/10 h-96 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/10 text-purple-100'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white/10 text-purple-100 px-4 py-2 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-400"></div>
                  <span className="text-sm">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-white/10">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about your stars, relationships, career..."
              className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-purple-300 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 outline-none transition-all"
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => setInput("What does my birth chart say about my career?")}
          className="p-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 text-purple-200 text-sm transition-colors"
        >
          💼 Career Guidance
        </button>
        <button
          onClick={() => setInput("How are the planetary transits affecting me?")}
          className="p-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 text-purple-200 text-sm transition-colors"
        >
          🌟 Current Transits
        </button>
        <button
          onClick={() => setInput("What should I know about my relationships?")}
          className="p-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 text-purple-200 text-sm transition-colors"
        >
          💕 Love & Relationships
        </button>
      </div>
    </div>
  )
}
