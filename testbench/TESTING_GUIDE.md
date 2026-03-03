# Testbench Guide – Study Buddy AI

## 1. Setup Instructions

1. Clone repository:
   git clone https://github.com/azzrah/study-buddy-ai-885.git
2. Install dependencies:
   npm install
3. Create .env.local file with:
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   OPENAI_API_KEY=
4. Run development server:
   npm run dev

## 2. How to Test

1. Sign up a new user
2. Upload sample_input.pdf
3. Generate quiz (10 questions)
4. Complete quiz
5. Observe:
   - Confidence Meter
   - Careless Mistakes detection
   - Poorly-done question repetition
   - Mastery tracking

## 3. Key Features to Verify

- Bayesian mastery updates
- Careless mistake detection logic
- Retry-until-mastery mode
- Topic-level analytics
- Explainable recommendation engine

