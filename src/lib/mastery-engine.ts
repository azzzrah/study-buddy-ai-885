// Bayesian mastery engine — pure computation, no side effects

const P_CORRECT_GIVEN_MASTERED = 0.95;
const P_CORRECT_GIVEN_NOT_MASTERED = 0.25;

export function computeBayesianUpdate(
  prior: number,
  isCorrect: boolean,
  confidenceRating: number,
  timeTaken: number,
  avgTime: number
): number {
  const confidenceMultiplier = confidenceRating / 3.0;

  let likelihood: number;
  let likelihoodNot: number;

  if (isCorrect) {
    likelihood = P_CORRECT_GIVEN_MASTERED;
    likelihoodNot = P_CORRECT_GIVEN_NOT_MASTERED;
  } else {
    likelihood = 1 - P_CORRECT_GIVEN_MASTERED;
    likelihoodNot = 1 - P_CORRECT_GIVEN_NOT_MASTERED;
  }

  const numerator = likelihood * prior;
  const denominator = numerator + likelihoodNot * (1 - prior);
  let posterior = denominator > 0 ? numerator / denominator : prior;

  // Confidence weighting: scale the delta
  const delta = posterior - prior;
  posterior = prior + delta * confidenceMultiplier;

  // Time factor adjustments
  if (avgTime > 0) {
    const timeRatio = timeTaken / avgTime;
    if (!isCorrect && timeRatio < 0.5) {
      // Rushed and wrong — less penalty (careless, not ignorance)
      posterior = prior + (posterior - prior) * 0.5;
    } else if (timeRatio > 2.0) {
      // Struggled — slight penalty even if correct
      posterior = posterior - 0.02;
    }
  }

  return Math.max(0, Math.min(1, posterior));
}

export function computeLearningVelocity(recentMasteryValues: number[]): number {
  const n = recentMasteryValues.length;
  if (n < 2) return 0;

  // Simple linear regression: slope of mastery over session indices
  let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
  for (let i = 0; i < n; i++) {
    sumX += i;
    sumY += recentMasteryValues[i];
    sumXY += i * recentMasteryValues[i];
    sumX2 += i * i;
  }

  const denom = n * sumX2 - sumX * sumX;
  if (denom === 0) return 0;

  return (n * sumXY - sumX * sumY) / denom;
}

export function classifyTrend(velocity: number): 'improving' | 'plateauing' | 'regressing' {
  if (velocity > 0.02) return 'improving';
  if (velocity < -0.02) return 'regressing';
  return 'plateauing';
}

export function applyForgettingDecay(currentMastery: number, daysSinceLastAttempt: number): number {
  if (daysSinceLastAttempt <= 14) return currentMastery;
  return currentMastery * Math.exp(-0.05 * daysSinceLastAttempt);
}

export function detectCarelessMistake(
  previousCorrectCount: number,
  isCorrect: boolean,
  timeTaken: number,
  avgTime: number
): boolean {
  return (
    previousCorrectCount >= 3 &&
    !isCorrect &&
    avgTime > 0 &&
    timeTaken < avgTime * 0.7
  );
}

export function detectConfident(nonConsecutiveCorrectSessions: number): boolean {
  return nonConsecutiveCorrectSessions >= 3;
}

export function getMasteryColor(mastery: number): string {
  if (mastery >= 0.7) return 'hsl(var(--mastery-high))';
  if (mastery >= 0.4) return 'hsl(var(--mastery-mid))';
  return 'hsl(var(--mastery-low))';
}

export function getMasteryLabel(mastery: number): string {
  if (mastery >= 0.8) return 'Mastered';
  if (mastery >= 0.6) return 'Proficient';
  if (mastery >= 0.4) return 'Developing';
  if (mastery >= 0.2) return 'Emerging';
  return 'Beginning';
}
