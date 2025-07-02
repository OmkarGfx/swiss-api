import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useSupabaseMutation } from "../hooks/useSupabase";
import { LocationAutocomplete } from "./LocationAutocomplete";
import { toast } from "sonner";

export function BirthChartGenerator() {
  const { user } = useAuth();
  const { insert: insertChart, loading: isGenerating } = useSupabaseMutation('birth_charts');
  
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    birthTime: "",
    birthLocation: "",
    latitude: 0,
    longitude: 0,
    gender: "male" as "male" | "female" | "other",
    timezone: "UTC",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.birthDate || !formData.birthTime || !formData.birthLocation) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!user) {
      toast.error("Please sign in to generate a birth chart");
      return;
    }

    try {
      // Generate mock chart data for now
      const chartData = {
        userInfo: {
          name: formData.name,
          birthDate: formData.birthDate,
          birthTime: formData.birthTime,
          gender: formData.gender,
          birthLocation: formData.birthLocation,
          latitude: formData.latitude,
          longitude: formData.longitude,
          timezone: formData.timezone,
          julianDay: 2460000, // Mock value
        },
        birthSummary: {
          ascendantSign: "Aries",
          ascendantLord: "Mars",
          moonSign: "Cancer",
          sunSign: "Leo",
          nakshatra: "Pushya",
          nakshatraLord: "Saturn",
          charan: 2,
        },
        planets: [
          {
            name: "Sun",
            degree: 15.5,
            sign: "Leo",
            house: 5,
            retrograde: false,
            nakshatra: "Magha",
            nakshatraLord: "Ketu",
            pad: 1,
          },
          // Add more mock planetary data as needed
        ],
        houses: Array.from({ length: 12 }, (_, i) => ({
          number: i + 1,
          sign: ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"][i],
          degree: Math.random() * 30,
        })),
      };

      const { data, error } = await insertChart({
        user_id: user.id,
        name: formData.name,
        birth_date: formData.birthDate,
        birth_time: formData.birthTime,
        birth_location: formData.birthLocation,
        latitude: formData.latitude,
        longitude: formData.longitude,
        gender: formData.gender,
        timezone: formData.timezone,
        chart_data: chartData,
        is_public: false,
      });

      if (error) {
        toast.error("Error generating chart: " + error.message);
        return;
      }

      toast.success("Birth chart generated successfully!");
      
      // Reset form
      setFormData({
        name: "",
        birthDate: "",
        birthTime: "",
        birthLocation: "",
        latitude: 0,
        longitude: 0,
        gender: "male",
        timezone: "UTC",
      });
    } catch (error) {
      console.error("Error generating chart:", error);
      toast.error("An unexpected error occurred");
    }
  };

  const handleLocationSelect = (location: { name: string; latitude: number; longitude: number }) => {
    setFormData(prev => ({
      ...prev,
      birthLocation: location.name,
      latitude: location.latitude,
      longitude: location.longitude,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Generate Comprehensive Birth Chart</h2>
        <p className="text-purple-200">Create your detailed Vedic astrology birth chart with complete analysis</p>
      </div>

      <div className="bg-white/5 rounded-lg p-6 border border-white/10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white font-medium mb-2">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-purple-300 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 outline-none transition-all"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-white font-medium mb-2">Birth Date</label>
              <input
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData(prev => ({ ...prev, birthDate: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:border-purple-400 focus:ring-1 focus:ring-purple-400 outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Birth Time</label>
              <input
                type="time"
                value={formData.birthTime}
                onChange={(e) => setFormData(prev => ({ ...prev, birthTime: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:border-purple-400 focus:ring-1 focus:ring-purple-400 outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value as "male" | "female" | "other" }))}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:border-purple-400 focus:ring-1 focus:ring-purple-400 outline-none transition-all"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Birth Location</label>
            <LocationAutocomplete
              value={formData.birthLocation}
              onChange={(location) => setFormData(prev => ({ ...prev, birthLocation: location }))}
              onLocationSelect={handleLocationSelect}
              placeholder="Start typing your birth city..."
            />
            <p className="text-purple-300 text-sm mt-2">
              Type at least 2 characters to search for locations. Select from the dropdown for accurate coordinates.
            </p>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Timezone (Optional)</label>
            <select
              value={formData.timezone}
              onChange={(e) => setFormData(prev => ({ ...prev, timezone: e.target.value }))}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:border-purple-400 focus:ring-1 focus:ring-purple-400 outline-none transition-all"
            >
              <option value="UTC">UTC</option>
              <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
              <option value="America/New_York">America/New_York (EST)</option>
              <option value="America/Los_Angeles">America/Los_Angeles (PST)</option>
              <option value="Europe/London">Europe/London (GMT)</option>
              <option value="Australia/Sydney">Australia/Sydney (AEST)</option>
            </select>
          </div>

          {formData.latitude !== 0 && formData.longitude !== 0 && (
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="text-white font-medium mb-2">Selected Coordinates</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-purple-200">Latitude: </span>
                  <span className="text-white">{formData.latitude.toFixed(6)}</span>
                </div>
                <div>
                  <span className="text-purple-200">Longitude: </span>
                  <span className="text-white">{formData.longitude.toFixed(6)}</span>
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isGenerating || !formData.name || !formData.birthDate || !formData.birthTime || !formData.birthLocation}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Generating Comprehensive Chart...</span>
              </div>
            ) : (
              "Generate Complete Birth Chart"
            )}
          </button>
        </form>

        <div className="mt-6 p-4 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-lg border border-purple-500/30">
          <h4 className="text-white font-medium mb-2">🔮 What You'll Get</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-purple-200 text-sm">
            <div>• Complete planetary positions with degrees</div>
            <div>• Nakshatra details with Charan & Lords</div>
            <div>• Lagna, Moon, Navamsa & Chalit charts</div>
            <div>• Vimshottari & Yogini Dasha periods</div>
            <div>• Panchang details (Tithi, Yoga, Karana)</div>
            <div>• Comprehensive Yoga & Dosha analysis</div>
            <div>• Ashtakavarga & Shadbala calculations</div>
            <div>• Detailed personality interpretations</div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded-lg border border-orange-500/30">
          <h4 className="text-white font-medium mb-2">📍 Accuracy Tips</h4>
          <div className="space-y-1 text-orange-200 text-sm">
            <div>• Exact birth time is crucial for accurate house positions</div>
            <div>• Use 24-hour format for birth time (e.g., 14:30 for 2:30 PM)</div>
            <div>• Select precise location from dropdown for correct coordinates</div>
            <div>• Choose appropriate timezone for your birth location</div>
          </div>
        </div>
      </div>
    </div>
  );
}
