# AstroMystic - Vedic Astrology App

A comprehensive Vedic astrology application built with React, TypeScript, and Supabase.

## Features

- **Birth Chart Generation**: Create detailed Vedic astrology birth charts
- **Chart Management**: View and manage your saved birth charts
- **Horoscope Predictions**: Daily, weekly, and monthly horoscope readings
- **Compatibility Analysis**: Check relationship compatibility between charts
- **AI Astrologer Chat**: Interactive chat with AI for astrological guidance
- **Success Analysis**: Career and financial insights based on your chart
- **Marriage Timing**: Predictions for marriage timing and partner traits
- **Dosha Analysis**: Analysis of planetary doshas and remedies
- **Remedies**: Personalized astrological remedies and suggestions
- **Products**: Spiritual products and services marketplace
- **Premium Features**: Subscription-based advanced features

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Backend**: Supabase (Database, Authentication, Real-time)
- **Routing**: React Router DOM
- **Notifications**: Sonner
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd astromystic
```

2. Install dependencies:
```bash
npm install
```

3. Set up Supabase:
   - Create a new Supabase project
   - Copy your project URL and anon key
   - Update `.env.local` with your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Set up the database schema in Supabase:
   - Copy the SQL schema from `src/lib/supabase.ts`
   - Run it in your Supabase SQL editor to create all required tables

5. Start the development server:
```bash
npm run dev
```

## Database Schema

The app uses the following main tables:

- `user_profiles` - User subscription and preference data
- `birth_charts` - Birth chart data and calculations
- `horoscopes` - Daily/weekly/monthly horoscope content
- `compatibility_reports` - Relationship compatibility analyses
- `consultations` - Astrologer consultation bookings
- `products` - Marketplace products
- `chat_sessions` - AI chat conversation history
- `success_analyses` - Career and success predictions
- `marriage_analyses` - Marriage timing predictions
- `dosha_analyses` - Planetary dosha analysis results

## Setting up Supabase Database

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the SQL schema from `src/lib/supabase.ts`
4. Run the SQL to create all tables, indexes, and RLS policies

## Project Structure

```
src/
├── components/          # React components
│   ├── auth/           # Authentication components
│   ├── BirthChartGenerator.tsx
│   ├── ChartViewer.tsx
│   ├── HoroscopeSection.tsx
│   └── ...
├── hooks/              # Custom React hooks
├── lib/                # Library configurations
├── utils/              # Utility functions
└── types/              # TypeScript type definitions
```

## Features Overview

### Authentication
- Email/password authentication via Supabase Auth
- Password reset functionality
- Protected routes

### Birth Charts
- Generate comprehensive Vedic birth charts
- Store multiple charts per user
- View detailed chart information

### Horoscope System
- Daily, weekly, and monthly horoscopes
- Zodiac sign-based predictions
- AI-generated content

### Compatibility Analysis
- Compare two birth charts
- Detailed compatibility scoring
- Relationship insights and recommendations

### AI Astrologer Chat
- Interactive chat interface
- Astrological guidance and insights
- Quick question templates

### Success & Career Guidance
- Career predictions based on birth charts
- Financial insights and recommendations
- Personality trait analysis

### Marriage Timing
- Predict favorable marriage periods
- Ideal partner trait analysis
- Compatibility recommendations

### Dosha Analysis
- Mangal Dosha detection
- Kaal Sarpa Dosha analysis
- Pitru Dosha identification
- Remedies for each dosha

### Remedies & Products
- Categorized astrological remedies
- Gemstone recommendations
- Mantra suggestions
- Spiritual product marketplace

### Subscription System
- Free and premium tiers
- Feature-based access control
- Subscription management

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
