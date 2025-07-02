import { useState, useEffect } from 'react'

interface LocationAutocompleteProps {
  value: string
  onChange: (value: string) => void
  onLocationSelect: (location: { name: string; latitude: number; longitude: number }) => void
  placeholder?: string
}

export function LocationAutocomplete({ 
  value, 
  onChange, 
  onLocationSelect, 
  placeholder = "Enter location..." 
}: LocationAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (value.length >= 2) {
      setLoading(true)
      fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${value}&limit=8`, {
        headers: {
          'X-RapidAPI-Key': '05add745acmshff28eb85df2e1aap16cea7jsne7c1f95a5c10', // <-- Your actual API key
          'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
      })
        .then(res => res.json())
        .then(data => {
          setSuggestions((data.data || []).map((city: any) => ({
            name: `${city.city}, ${city.country}`,
            latitude: city.latitude,
            longitude: city.longitude
          })))
          setShowSuggestions(true)
          setLoading(false)
        })
        .catch(() => {
          setSuggestions([])
          setShowSuggestions(true)
          setLoading(false)
        })
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [value])

  const handleSuggestionClick = (location: any) => {
    onChange(location.name)
    onLocationSelect(location)
    setShowSuggestions(false)
  }

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-purple-300 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 outline-none transition-all"
        onFocus={() => value.length >= 2 && setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
      />
      
      {showSuggestions && (
        <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-white/20 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {loading ? (
            <div className="p-3 text-purple-200 text-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-400 mx-auto"></div>
            </div>
          ) : suggestions.length > 0 ? (
            suggestions.map((location, index) => (
              <div
                key={index}
                onClick={() => handleSuggestionClick(location)}
                className="p-3 text-white hover:bg-white/10 cursor-pointer border-b border-white/10 last:border-b-0"
              >
                {location.name}
              </div>
            ))
          ) : (
            <div className="p-3 text-purple-200 text-center">No locations found</div>
          )}
        </div>
      )}
    </div>
  )
}
