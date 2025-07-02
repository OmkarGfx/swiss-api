export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          user_id: string
          subscription_tier: 'free' | 'premium'
          subscription_expiry: string | null
          preferences: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          subscription_tier?: 'free' | 'premium'
          subscription_expiry?: string | null
          preferences?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          subscription_tier?: 'free' | 'premium'
          subscription_expiry?: string | null
          preferences?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      birth_charts: {
        Row: {
          id: string
          user_id: string
          name: string
          birth_date: string
          birth_time: string
          birth_location: string
          latitude: number
          longitude: number
          gender: 'male' | 'female' | 'other' | null
          timezone: string | null
          chart_data: Json
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          birth_date: string
          birth_time: string
          birth_location: string
          latitude: number
          longitude: number
          gender?: 'male' | 'female' | 'other' | null
          timezone?: string | null
          chart_data: Json
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          birth_date?: string
          birth_time?: string
          birth_location?: string
          latitude?: number
          longitude?: number
          gender?: 'male' | 'female' | 'other' | null
          timezone?: string | null
          chart_data?: Json
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      horoscopes: {
        Row: {
          id: string
          type: 'daily' | 'weekly' | 'monthly'
          sign: string
          date: string
          content: string
          ai_generated: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          type: 'daily' | 'weekly' | 'monthly'
          sign: string
          date: string
          content: string
          ai_generated?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          type?: 'daily' | 'weekly' | 'monthly'
          sign?: string
          date?: string
          content?: string
          ai_generated?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      compatibility_reports: {
        Row: {
          id: string
          user_id: string
          person1_chart_id: string
          person2_chart_id: string
          compatibility_score: number
          report: string
          synastry_aspects: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          person1_chart_id: string
          person2_chart_id: string
          compatibility_score: number
          report: string
          synastry_aspects: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          person1_chart_id?: string
          person2_chart_id?: string
          compatibility_score?: number
          report?: string
          synastry_aspects?: Json
          created_at?: string
          updated_at?: string
        }
      }
      consultations: {
        Row: {
          id: string
          user_id: string
          astrologer_id: string | null
          scheduled_date: string
          duration: number
          status: 'scheduled' | 'completed' | 'cancelled'
          notes: string | null
          price: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          astrologer_id?: string | null
          scheduled_date: string
          duration: number
          status?: 'scheduled' | 'completed' | 'cancelled'
          notes?: string | null
          price: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          astrologer_id?: string | null
          scheduled_date?: string
          duration?: number
          status?: 'scheduled' | 'completed' | 'cancelled'
          notes?: string | null
          price?: number
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          description: string
          price: number
          category: 'charts' | 'gemstones' | 'tarot' | 'books'
          image_url: string | null
          in_stock: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          price: number
          category: 'charts' | 'gemstones' | 'tarot' | 'books'
          image_url?: string | null
          in_stock?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          price?: number
          category?: 'charts' | 'gemstones' | 'tarot' | 'books'
          image_url?: string | null
          in_stock?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      chat_sessions: {
        Row: {
          id: string
          user_id: string
          messages: Json
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          messages: Json
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          messages?: Json
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      success_analyses: {
        Row: {
          id: string
          user_id: string
          chart_id: string
          analysis: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          chart_id: string
          analysis: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          chart_id?: string
          analysis?: Json
          created_at?: string
          updated_at?: string
        }
      }
      marriage_analyses: {
        Row: {
          id: string
          user_id: string
          chart_id: string
          analysis: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          chart_id: string
          analysis: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          chart_id?: string
          analysis?: Json
          created_at?: string
          updated_at?: string
        }
      }
      dosha_analyses: {
        Row: {
          id: string
          user_id: string
          chart_id: string
          analysis: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          chart_id: string
          analysis: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          chart_id?: string
          analysis?: Json
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// SQL Schema for Supabase
export const supabaseSchema = `
-- Enable RLS
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- User profiles table
CREATE TABLE user_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'premium')),
  subscription_expiry TIMESTAMP WITH TIME ZONE,
  preferences JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Birth charts table
CREATE TABLE birth_charts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  birth_date DATE NOT NULL,
  birth_time TIME NOT NULL,
  birth_location TEXT NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  gender TEXT CHECK (gender IN ('male', 'female', 'other')),
  timezone TEXT,
  chart_data JSONB NOT NULL,
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Horoscopes table
CREATE TABLE horoscopes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('daily', 'weekly', 'monthly')),
  sign TEXT NOT NULL,
  date DATE NOT NULL,
  content TEXT NOT NULL,
  ai_generated BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(type, sign, date)
);

-- Compatibility reports table
CREATE TABLE compatibility_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  person1_chart_id UUID REFERENCES birth_charts(id) ON DELETE CASCADE,
  person2_chart_id UUID REFERENCES birth_charts(id) ON DELETE CASCADE,
  compatibility_score DECIMAL(5, 2) NOT NULL,
  report TEXT NOT NULL,
  synastry_aspects JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Consultations table
CREATE TABLE consultations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  astrologer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  scheduled_date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration INTEGER NOT NULL,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
  notes TEXT,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('charts', 'gemstones', 'tarot', 'books')),
  image_url TEXT,
  in_stock BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chat sessions table
CREATE TABLE chat_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  messages JSONB NOT NULL DEFAULT '[]',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Success analyses table
CREATE TABLE success_analyses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  chart_id UUID REFERENCES birth_charts(id) ON DELETE CASCADE,
  analysis JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Marriage analyses table
CREATE TABLE marriage_analyses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  chart_id UUID REFERENCES birth_charts(id) ON DELETE CASCADE,
  analysis JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Dosha analyses table
CREATE TABLE dosha_analyses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  chart_id UUID REFERENCES birth_charts(id) ON DELETE CASCADE,
  analysis JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX idx_birth_charts_user_id ON birth_charts(user_id);
CREATE INDEX idx_horoscopes_type_sign_date ON horoscopes(type, sign, date);
CREATE INDEX idx_compatibility_reports_user_id ON compatibility_reports(user_id);
CREATE INDEX idx_consultations_user_id ON consultations(user_id);
CREATE INDEX idx_chat_sessions_user_id ON chat_sessions(user_id);
CREATE INDEX idx_success_analyses_user_id ON success_analyses(user_id);
CREATE INDEX idx_marriage_analyses_user_id ON marriage_analyses(user_id);
CREATE INDEX idx_dosha_analyses_user_id ON dosha_analyses(user_id);

-- Row Level Security Policies
-- User profiles
CREATE POLICY "Users can view own profile" ON user_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON user_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON user_profiles FOR UPDATE USING (auth.uid() = user_id);

-- Birth charts
CREATE POLICY "Users can view own charts" ON birth_charts FOR SELECT USING (auth.uid() = user_id OR is_public = TRUE);
CREATE POLICY "Users can insert own charts" ON birth_charts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own charts" ON birth_charts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own charts" ON birth_charts FOR DELETE USING (auth.uid() = user_id);

-- Horoscopes (public read)
CREATE POLICY "Anyone can view horoscopes" ON horoscopes FOR SELECT TO authenticated USING (TRUE);

-- Compatibility reports
CREATE POLICY "Users can view own reports" ON compatibility_reports FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own reports" ON compatibility_reports FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own reports" ON compatibility_reports FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own reports" ON compatibility_reports FOR DELETE USING (auth.uid() = user_id);

-- Consultations
CREATE POLICY "Users can view own consultations" ON consultations FOR SELECT USING (auth.uid() = user_id OR auth.uid() = astrologer_id);
CREATE POLICY "Users can insert own consultations" ON consultations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own consultations" ON consultations FOR UPDATE USING (auth.uid() = user_id OR auth.uid() = astrologer_id);

-- Products (public read)
CREATE POLICY "Anyone can view products" ON products FOR SELECT TO authenticated USING (TRUE);

-- Chat sessions
CREATE POLICY "Users can view own chat sessions" ON chat_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own chat sessions" ON chat_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own chat sessions" ON chat_sessions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own chat sessions" ON chat_sessions FOR DELETE USING (auth.uid() = user_id);

-- Success analyses
CREATE POLICY "Users can view own success analyses" ON success_analyses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own success analyses" ON success_analyses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own success analyses" ON success_analyses FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own success analyses" ON success_analyses FOR DELETE USING (auth.uid() = user_id);

-- Marriage analyses
CREATE POLICY "Users can view own marriage analyses" ON marriage_analyses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own marriage analyses" ON marriage_analyses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own marriage analyses" ON marriage_analyses FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own marriage analyses" ON marriage_analyses FOR DELETE USING (auth.uid() = user_id);

-- Dosha analyses
CREATE POLICY "Users can view own dosha analyses" ON dosha_analyses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own dosha analyses" ON dosha_analyses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own dosha analyses" ON dosha_analyses FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own dosha analyses" ON dosha_analyses FOR DELETE USING (auth.uid() = user_id);

-- Enable RLS on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE birth_charts ENABLE ROW LEVEL SECURITY;
ALTER TABLE horoscopes ENABLE ROW LEVEL SECURITY;
ALTER TABLE compatibility_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE success_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE marriage_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE dosha_analyses ENABLE ROW LEVEL SECURITY;

-- Functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_birth_charts_updated_at BEFORE UPDATE ON birth_charts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_horoscopes_updated_at BEFORE UPDATE ON horoscopes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_compatibility_reports_updated_at BEFORE UPDATE ON compatibility_reports FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_consultations_updated_at BEFORE UPDATE ON consultations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_chat_sessions_updated_at BEFORE UPDATE ON chat_sessions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_success_analyses_updated_at BEFORE UPDATE ON success_analyses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_marriage_analyses_updated_at BEFORE UPDATE ON marriage_analyses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_dosha_analyses_updated_at BEFORE UPDATE ON dosha_analyses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
`;
