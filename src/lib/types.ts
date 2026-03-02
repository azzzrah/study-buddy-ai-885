// Core domain types for the adaptive quiz platform

export interface Subject {
  id: string;
  user_id: string;
  title: string;
  description: string;
  pdf_url: string;
  created_at: string;
}

export interface Question {
  id: string;
  subject_id: string;
  question_text: string;
  options: string[];
  correct_answer: number;
  explanation: string;
  hints: string[];
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  created_at: string;
}

export interface QuizSession {
  id: string;
  user_id: string;
  subject_id: string;
  num_questions: number;
  duration_minutes: number;
  started_at: string;
  completed_at: string | null;
  score: number | null;
  total_questions: number;
  status: 'in_progress' | 'completed' | 'abandoned';
  quiz_mode: 'normal' | 'slow_mode' | 'reinforcement';
}

export interface QuestionAttempt {
  id: string;
  user_id: string;
  session_id: string;
  question_id: string;
  selected_answer: number | null;
  is_correct: boolean;
  time_taken_seconds: number;
  confidence_rating: number; // 1-5
  hints_used: number;
  created_at: string;
}

export interface QuestionMastery {
  id: string;
  user_id: string;
  question_id: string;
  total_attempts: number;
  correct_count: number;
  consecutive_correct: number;
  non_consecutive_correct_sessions: number;
  is_confident: boolean;
  is_poorly_done: boolean;
  is_careless_flagged: boolean;
  avg_time_seconds: number;
  mastery_probability: number;
  learning_velocity: number;
  last_attempted_at: string;
  updated_at: string;
}

export interface TopicMastery {
  id: string;
  user_id: string;
  subject_id: string;
  topic: string;
  mastery_probability: number;
  learning_velocity: number;
  total_attempts: number;
  correct_count: number;
  avg_time_seconds: number;
  trend: 'improving' | 'plateauing' | 'regressing';
  last_attempted_at: string;
  updated_at: string;
}

export interface Recommendation {
  id: string;
  user_id: string;
  subject_id: string | null;
  recommendation_text: string;
  reasoning_json: ReasoningData;
  recommendation_type: RecommendationType;
  generated_at: string;
}

export type RecommendationType =
  | 'concept_review'
  | 'slow_mode'
  | 'harder_difficulty'
  | 'reinforcement'
  | 'spaced_revision'
  | 'retry_poorly_done';

export interface ReasoningData {
  weak_topics?: string[];
  careless_detected?: boolean;
  velocity?: number;
  mastery_before?: number;
  mastery_after?: number;
  sessions_analyzed?: number;
  inactivity_days?: number;
  confidence_mismatch?: boolean;
  avg_time_ratio?: number;
  reason: string;
}

// Quiz configuration
export interface QuizConfig {
  subject_id: string;
  num_questions: number;
  duration_minutes: number;
  quiz_mode: 'normal' | 'slow_mode' | 'reinforcement' | 'smart' | 'retry_poorly_done';
}

// Active quiz state
export interface ActiveQuizState {
  session: QuizSession;
  questions: Question[];
  currentIndex: number;
  answers: Map<string, { selected: number | null; confidence: number; hintsUsed: number; startTime: number }>;
  timeRemaining: number;
}
