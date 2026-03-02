import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { mockQuestions } from '@/lib/mock-data';
import { Clock, ChevronLeft, ChevronRight, Lightbulb, CheckCircle } from 'lucide-react';

export default function ActiveQuiz() {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const questions = mockQuestions;
  const totalTime = 15 * 60; // 15 min

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, { selected: number | null; confidence: number; hints: number }>>({});
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [hintsRevealed, setHintsRevealed] = useState(0);

  const q = questions[currentIndex];
  const answer = answers[q.id] || { selected: null, confidence: 3, hints: 0 };

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(interval); navigate(`/dashboard/quiz/${sessionId}/results`); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [navigate, sessionId]);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  const timerColor = timeLeft > totalTime * 0.5 ? 'text-success' : timeLeft > totalTime * 0.2 ? 'text-warning' : 'text-destructive';

  const updateAnswer = useCallback((field: Partial<typeof answer>) => {
    setAnswers(prev => ({ ...prev, [q.id]: { ...answer, ...field } }));
  }, [q.id, answer]);

  const revealHint = () => {
    const next = Math.min(hintsRevealed + 1, q.hints.length);
    setHintsRevealed(next);
    updateAnswer({ hints: next });
  };

  const goTo = (i: number) => { setCurrentIndex(i); setHintsRevealed(answers[questions[i]?.id]?.hints || 0); };

  const handleSubmit = () => navigate(`/dashboard/quiz/${sessionId}/results`);

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="sticky top-0 z-50 border-b border-border bg-card/90 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Q {currentIndex + 1}/{questions.length}</span>
            <Progress value={((currentIndex + 1) / questions.length) * 100} className="w-32 h-2" />
          </div>
          <div className={`flex items-center gap-1.5 font-mono text-lg font-bold ${timerColor}`}>
            <Clock className="h-5 w-5" />
            {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      <main className="container mx-auto max-w-2xl px-4 py-8 space-y-6">
        {/* Question */}
        <Card className="glass-card">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-start gap-2">
              <span className="text-xs font-medium bg-accent text-accent-foreground px-2 py-0.5 rounded">{q.difficulty}</span>
              <span className="text-xs text-muted-foreground">{q.topic}</span>
            </div>

            <h2 className="text-xl font-semibold leading-relaxed">{q.question_text}</h2>

            {/* Options */}
            <div className="space-y-3">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => updateAnswer({ selected: i })}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    answer.selected === i
                      ? 'border-primary bg-accent ring-2 ring-primary/20'
                      : 'border-border hover:border-primary/40 hover:bg-accent/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium ${
                      answer.selected === i ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    }`}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="text-sm">{opt}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Confidence Rating */}
            <div className="space-y-2">
              <label className="text-sm font-medium">How confident are you? ({answer.confidence}/5)</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(n => (
                  <button
                    key={n}
                    onClick={() => updateAnswer({ confidence: n })}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                      answer.confidence === n
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-accent'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Guessing</span>
                <span>Very sure</span>
              </div>
            </div>

            {/* Hints */}
            <div className="space-y-2">
              <Button variant="outline" size="sm" onClick={revealHint} disabled={hintsRevealed >= q.hints.length} className="gap-1.5">
                <Lightbulb className="h-4 w-4" /> Reveal Hint ({hintsRevealed}/{q.hints.length})
              </Button>
              {hintsRevealed > 0 && (
                <div className="space-y-2">
                  {q.hints.slice(0, hintsRevealed).map((h, i) => (
                    <div key={i} className="p-3 rounded-lg bg-accent/50 text-sm text-accent-foreground animate-scale-in">
                      <span className="font-medium">Hint {i + 1}:</span> {h}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => goTo(currentIndex - 1)} disabled={currentIndex === 0} className="gap-1">
            <ChevronLeft className="h-4 w-4" /> Previous
          </Button>

          {/* Question dots */}
          <div className="flex gap-1.5 flex-wrap justify-center">
            {questions.map((qq, i) => (
              <button
                key={qq.id}
                onClick={() => goTo(i)}
                className={`h-8 w-8 rounded-lg text-xs font-medium transition-all ${
                  i === currentIndex
                    ? 'bg-primary text-primary-foreground'
                    : answers[qq.id]?.selected !== null && answers[qq.id]?.selected !== undefined
                    ? 'bg-success/20 text-success border border-success/30'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {currentIndex < questions.length - 1 ? (
            <Button onClick={() => goTo(currentIndex + 1)} className="gap-1">
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="gap-1">
              <CheckCircle className="h-4 w-4" /> Submit
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}
