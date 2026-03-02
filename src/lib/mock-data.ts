import type { Subject, Question, QuizSession, TopicMastery, Recommendation, QuestionMastery } from './types';

// Mock subjects
export const mockSubjects: Subject[] = [
  {
    id: 'sub-1',
    user_id: 'user-1',
    title: 'Calculus I — Limits & Derivatives',
    description: 'Foundational calculus covering limits, continuity, and differentiation techniques.',
    pdf_url: '/mock.pdf',
    created_at: '2026-02-10T10:00:00Z',
  },
  {
    id: 'sub-2',
    user_id: 'user-1',
    title: 'Organic Chemistry — Reaction Mechanisms',
    description: 'SN1, SN2, elimination, and addition reactions with stereochemistry.',
    pdf_url: '/mock.pdf',
    created_at: '2026-02-18T14:00:00Z',
  },
  {
    id: 'sub-3',
    user_id: 'user-1',
    title: 'Data Structures & Algorithms',
    description: 'Arrays, linked lists, trees, graphs, sorting, and dynamic programming.',
    pdf_url: '/mock.pdf',
    created_at: '2026-01-05T09:00:00Z',
  },
];

// Mock topic mastery
export const mockTopicMastery: TopicMastery[] = [
  { id: 'tm-1', user_id: 'user-1', subject_id: 'sub-1', topic: 'Limits', mastery_probability: 0.82, learning_velocity: 0.03, total_attempts: 24, correct_count: 20, avg_time_seconds: 45, trend: 'improving', last_attempted_at: '2026-02-28T10:00:00Z', updated_at: '2026-02-28T10:00:00Z' },
  { id: 'tm-2', user_id: 'user-1', subject_id: 'sub-1', topic: 'Derivatives', mastery_probability: 0.55, learning_velocity: -0.01, total_attempts: 18, correct_count: 10, avg_time_seconds: 60, trend: 'plateauing', last_attempted_at: '2026-02-27T10:00:00Z', updated_at: '2026-02-27T10:00:00Z' },
  { id: 'tm-3', user_id: 'user-1', subject_id: 'sub-1', topic: 'Chain Rule', mastery_probability: 0.32, learning_velocity: -0.04, total_attempts: 12, correct_count: 4, avg_time_seconds: 75, trend: 'regressing', last_attempted_at: '2026-02-25T10:00:00Z', updated_at: '2026-02-25T10:00:00Z' },
  { id: 'tm-4', user_id: 'user-1', subject_id: 'sub-1', topic: 'Continuity', mastery_probability: 0.91, learning_velocity: 0.01, total_attempts: 15, correct_count: 14, avg_time_seconds: 30, trend: 'improving', last_attempted_at: '2026-02-28T10:00:00Z', updated_at: '2026-02-28T10:00:00Z' },
  { id: 'tm-5', user_id: 'user-1', subject_id: 'sub-2', topic: 'SN1 Reactions', mastery_probability: 0.68, learning_velocity: 0.02, total_attempts: 20, correct_count: 14, avg_time_seconds: 55, trend: 'improving', last_attempted_at: '2026-02-26T10:00:00Z', updated_at: '2026-02-26T10:00:00Z' },
  { id: 'tm-6', user_id: 'user-1', subject_id: 'sub-2', topic: 'SN2 Reactions', mastery_probability: 0.45, learning_velocity: 0.0, total_attempts: 16, correct_count: 7, avg_time_seconds: 65, trend: 'plateauing', last_attempted_at: '2026-02-24T10:00:00Z', updated_at: '2026-02-24T10:00:00Z' },
  { id: 'tm-7', user_id: 'user-1', subject_id: 'sub-3', topic: 'Binary Trees', mastery_probability: 0.78, learning_velocity: 0.04, total_attempts: 22, correct_count: 18, avg_time_seconds: 40, trend: 'improving', last_attempted_at: '2026-01-20T10:00:00Z', updated_at: '2026-01-20T10:00:00Z' },
  { id: 'tm-8', user_id: 'user-1', subject_id: 'sub-3', topic: 'Dynamic Programming', mastery_probability: 0.25, learning_velocity: -0.03, total_attempts: 10, correct_count: 3, avg_time_seconds: 90, trend: 'regressing', last_attempted_at: '2026-01-15T10:00:00Z', updated_at: '2026-01-15T10:00:00Z' },
];

// Mock questions
export const mockQuestions: Question[] = [
  {
    id: 'q-1', subject_id: 'sub-1', question_text: 'What is the limit of (sin x)/x as x approaches 0?',
    options: ['0', '1', '∞', 'Does not exist'], correct_answer: 1,
    explanation: 'This is a fundamental limit. Using L\'Hôpital\'s rule or the squeeze theorem, lim(x→0) sin(x)/x = 1.',
    hints: ['Think about what happens to sin(x) near 0.', 'Consider using L\'Hôpital\'s rule.', 'sin(x) ≈ x for small x, so sin(x)/x ≈ 1.'],
    topic: 'Limits', difficulty: 'easy', created_at: '2026-02-10T10:00:00Z',
  },
  {
    id: 'q-2', subject_id: 'sub-1', question_text: 'What is the derivative of e^(3x)?',
    options: ['e^(3x)', '3e^(3x)', '3xe^(3x)', 'e^(3x)/3'], correct_answer: 1,
    explanation: 'By the chain rule, d/dx[e^(3x)] = e^(3x) · 3 = 3e^(3x).',
    hints: ['This requires the chain rule.', 'The derivative of e^u is e^u · du/dx.', 'Here u = 3x, so du/dx = 3.'],
    topic: 'Chain Rule', difficulty: 'medium', created_at: '2026-02-10T10:00:00Z',
  },
  {
    id: 'q-3', subject_id: 'sub-1', question_text: 'If f(x) = x³ - 3x + 2, what is f\'(1)?',
    options: ['0', '2', '3', '-1'], correct_answer: 0,
    explanation: 'f\'(x) = 3x² - 3. f\'(1) = 3(1) - 3 = 0.',
    hints: ['First find the general derivative.', 'f\'(x) = 3x² - 3.', 'Substitute x = 1.'],
    topic: 'Derivatives', difficulty: 'easy', created_at: '2026-02-10T10:00:00Z',
  },
  {
    id: 'q-4', subject_id: 'sub-1', question_text: 'Which of the following functions is NOT continuous at x = 0?',
    options: ['sin(x)/x', '|x|', 'x²', '1/x'], correct_answer: 3,
    explanation: '1/x is undefined at x = 0, so it is not continuous there.',
    hints: ['A function must be defined at a point to be continuous there.', 'Check which function has x = 0 in its domain.', '1/x → ±∞ as x → 0.'],
    topic: 'Continuity', difficulty: 'easy', created_at: '2026-02-10T10:00:00Z',
  },
  {
    id: 'q-5', subject_id: 'sub-1', question_text: 'What is the derivative of ln(x²+1)?',
    options: ['1/(x²+1)', '2x/(x²+1)', '2x·ln(x²+1)', 'x/(x²+1)'], correct_answer: 1,
    explanation: 'By the chain rule: d/dx[ln(u)] = (1/u)·du/dx = 2x/(x²+1).',
    hints: ['Use the chain rule with u = x²+1.', 'd/dx[ln(u)] = (1/u)·du/dx.', 'du/dx = 2x.'],
    topic: 'Chain Rule', difficulty: 'hard', created_at: '2026-02-10T10:00:00Z',
  },
];

// Mock quiz session
export const mockQuizSession: QuizSession = {
  id: 'session-1',
  user_id: 'user-1',
  subject_id: 'sub-1',
  num_questions: 5,
  duration_minutes: 15,
  started_at: '2026-02-28T10:00:00Z',
  completed_at: '2026-02-28T10:12:00Z',
  score: 3,
  total_questions: 5,
  status: 'completed',
  quiz_mode: 'normal',
};

// Mock recommendations
export const mockRecommendations: Recommendation[] = [
  {
    id: 'rec-1', user_id: 'user-1', subject_id: 'sub-1',
    recommendation_text: 'Your Chain Rule mastery dropped from 0.45 to 0.32 over the last 3 sessions. Try a Reinforcement Mix quiz to rebuild confidence with easier problems first.',
    reasoning_json: { weak_topics: ['Chain Rule'], careless_detected: false, velocity: -0.04, mastery_before: 0.45, mastery_after: 0.32, sessions_analyzed: 3, inactivity_days: 0, reason: 'Mastery dropped over 3 sessions. Reinforcement recommended.' },
    recommendation_type: 'reinforcement', generated_at: '2026-02-28T10:00:00Z',
  },
  {
    id: 'rec-2', user_id: 'user-1', subject_id: 'sub-3',
    recommendation_text: 'You haven\'t practiced Data Structures in 41 days. Your Dynamic Programming mastery has likely decayed. Spaced revision is recommended.',
    reasoning_json: { weak_topics: ['Dynamic Programming'], inactivity_days: 41, velocity: 0, mastery_before: 0.25, mastery_after: 0.25, sessions_analyzed: 0, reason: 'Inactivity > 14 days. Forgetting curve decay applied.' },
    recommendation_type: 'spaced_revision', generated_at: '2026-03-01T10:00:00Z',
  },
  {
    id: 'rec-3', user_id: 'user-1', subject_id: 'sub-1',
    recommendation_text: 'Careless mistakes detected on Limits questions — you answered correctly 3+ times before but rushed recent attempts. Try Slow-Mode quiz.',
    reasoning_json: { careless_detected: true, avg_time_ratio: 0.6, velocity: 0.03, mastery_before: 0.80, mastery_after: 0.82, sessions_analyzed: 2, inactivity_days: 0, reason: 'Careless pattern: fast wrong answers on previously mastered questions.' },
    recommendation_type: 'slow_mode', generated_at: '2026-02-28T10:00:00Z',
  },
];

// Mock question mastery for results
export const mockQuestionMastery: QuestionMastery[] = [
  { id: 'qm-1', user_id: 'user-1', question_id: 'q-1', total_attempts: 5, correct_count: 4, consecutive_correct: 2, non_consecutive_correct_sessions: 3, is_confident: true, is_poorly_done: false, is_careless_flagged: true, avg_time_seconds: 40, mastery_probability: 0.85, learning_velocity: 0.02, last_attempted_at: '2026-02-28T10:00:00Z', updated_at: '2026-02-28T10:00:00Z' },
  { id: 'qm-2', user_id: 'user-1', question_id: 'q-2', total_attempts: 4, correct_count: 1, consecutive_correct: 0, non_consecutive_correct_sessions: 1, is_confident: false, is_poorly_done: true, is_careless_flagged: false, avg_time_seconds: 70, mastery_probability: 0.30, learning_velocity: -0.03, last_attempted_at: '2026-02-28T10:00:00Z', updated_at: '2026-02-28T10:00:00Z' },
  { id: 'qm-3', user_id: 'user-1', question_id: 'q-3', total_attempts: 3, correct_count: 3, consecutive_correct: 3, non_consecutive_correct_sessions: 2, is_confident: false, is_poorly_done: false, is_careless_flagged: false, avg_time_seconds: 35, mastery_probability: 0.88, learning_velocity: 0.04, last_attempted_at: '2026-02-28T10:00:00Z', updated_at: '2026-02-28T10:00:00Z' },
];

// Helpers
export function getSubjectMastery(subjectId: string): number {
  const topics = mockTopicMastery.filter(t => t.subject_id === subjectId);
  if (topics.length === 0) return 0;
  return topics.reduce((sum, t) => sum + t.mastery_probability, 0) / topics.length;
}

export function getSubjectTrend(subjectId: string): 'improving' | 'plateauing' | 'regressing' {
  const topics = mockTopicMastery.filter(t => t.subject_id === subjectId);
  if (topics.length === 0) return 'plateauing';
  const avgVelocity = topics.reduce((sum, t) => sum + t.learning_velocity, 0) / topics.length;
  if (avgVelocity > 0.02) return 'improving';
  if (avgVelocity < -0.02) return 'regressing';
  return 'plateauing';
}

export function getDaysSinceLastAttempt(subjectId: string): number {
  const topics = mockTopicMastery.filter(t => t.subject_id === subjectId);
  if (topics.length === 0) return 999;
  const latest = topics.reduce((max, t) => {
    const d = new Date(t.last_attempted_at).getTime();
    return d > max ? d : max;
  }, 0);
  return Math.floor((Date.now() - latest) / (1000 * 60 * 60 * 24));
}
