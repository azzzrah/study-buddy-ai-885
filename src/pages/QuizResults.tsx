import { NavHeader } from '@/components/nav-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import { mockQuestions, mockQuestionMastery } from '@/lib/mock-data';
import { getMasteryLabel } from '@/lib/mastery-engine';
import { Check, X, AlertTriangle, Star, RotateCcw, ArrowLeft, Lightbulb, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

// Simulated results
const simulatedAnswers = [
  { questionId: 'q-1', selected: 1, correct: true, timeTaken: 25, confidence: 4, hints: 0 },
  { questionId: 'q-2', selected: 0, correct: false, timeTaken: 18, confidence: 3, hints: 1 },
  { questionId: 'q-3', selected: 0, correct: true, timeTaken: 30, confidence: 5, hints: 0 },
  { questionId: 'q-4', selected: 3, correct: true, timeTaken: 22, confidence: 4, hints: 0 },
  { questionId: 'q-5', selected: 2, correct: false, timeTaken: 55, confidence: 2, hints: 2 },
];

export default function QuizResults() {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const score = simulatedAnswers.filter(a => a.correct).length;
  const total = simulatedAnswers.length;
  const pct = Math.round((score / total) * 100);

  const careless = mockQuestionMastery.filter(m => m.is_careless_flagged);
  const confident = mockQuestionMastery.filter(m => m.is_confident);
  const poorlyDone = mockQuestionMastery.filter(m => m.is_poorly_done);

  return (
    <div className="min-h-screen bg-background">
      <NavHeader />
      <main className="container mx-auto max-w-3xl px-4 py-8 space-y-8">
        <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')} className="gap-1 -ml-2">
          <ArrowLeft className="h-4 w-4" /> Dashboard
        </Button>

        {/* Score Summary */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <Card className="glass-card text-center p-8">
            <div className="text-6xl font-extrabold mb-2" style={{ color: pct >= 70 ? 'hsl(var(--success))' : pct >= 40 ? 'hsl(var(--warning))' : 'hsl(var(--destructive))' }}>
              {pct}%
            </div>
            <p className="text-lg text-muted-foreground">{score}/{total} correct</p>
            <p className="text-sm text-muted-foreground mt-1">{getMasteryLabel(pct / 100)}</p>
          </Card>
        </motion.div>

        {/* Flags */}
        <div className="grid sm:grid-cols-3 gap-4">
          {careless.length > 0 && (
            <Card className="border-warning/30 bg-warning/5">
              <CardContent className="p-4 flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                <div>
                  <p className="text-sm font-semibold">Careless Mistakes</p>
                  <p className="text-xs text-muted-foreground">{careless.length} question(s) you previously mastered but rushed</p>
                </div>
              </CardContent>
            </Card>
          )}
          {confident.length > 0 && (
            <Card className="border-success/30 bg-success/5">
              <CardContent className="p-4 flex items-start gap-3">
                <Star className="h-5 w-5 text-success mt-0.5" />
                <div>
                  <p className="text-sm font-semibold">Confident Questions</p>
                  <p className="text-xs text-muted-foreground">{confident.length} question(s) correct 3+ times non-consecutively</p>
                </div>
              </CardContent>
            </Card>
          )}
          {poorlyDone.length > 0 && (
            <Card className="border-destructive/30 bg-destructive/5">
              <CardContent className="p-4 flex items-start gap-3">
                <RotateCcw className="h-5 w-5 text-destructive mt-0.5" />
                <div>
                  <p className="text-sm font-semibold">Poorly Done</p>
                  <p className="text-xs text-muted-foreground">{poorlyDone.length} question(s) need 3 consecutive correct to clear</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Per-question review */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Question Review</h2>
          {simulatedAnswers.map((a, i) => {
            const q = mockQuestions.find(qq => qq.id === a.questionId);
            if (!q) return null;
            return (
              <motion.div key={a.questionId} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                <Card className={`glass-card border-l-4 ${a.correct ? 'border-l-success' : 'border-l-destructive'}`}>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {a.correct ? <Check className="h-5 w-5 text-success" /> : <X className="h-5 w-5 text-destructive" />}
                        <span className="font-medium text-sm">Q{i + 1}: {q.question_text}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{a.timeTaken}s</span>
                      <span>Confidence: {a.confidence}/5</span>
                      {a.hints > 0 && <span className="flex items-center gap-1"><Lightbulb className="h-3 w-3" />{a.hints} hint(s)</span>}
                      <span>Your answer: {q.options[a.selected]}</span>
                    </div>

                    {!a.correct && (
                      <div className="p-3 rounded-lg bg-accent/50 text-sm">
                        <p><span className="font-medium">Correct:</span> {q.options[q.correct_answer]}</p>
                        <p className="text-muted-foreground mt-1">{q.explanation}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={() => navigate('/dashboard/quiz/configure')}>
            <RotateCcw className="h-4 w-4 mr-2" /> Retry Quiz
          </Button>
          <Button className="flex-1" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </main>
    </div>
  );
}
