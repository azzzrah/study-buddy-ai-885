import { NavHeader } from '@/components/nav-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { mockSubjects } from '@/lib/mock-data';
import { useState } from 'react';
import { Play, Brain, Zap, RotateCcw, AlertTriangle } from 'lucide-react';

const quizModes = [
  { value: 'normal', label: 'Normal', desc: 'Standard quiz mode', icon: Play },
  { value: 'smart', label: 'Smart (Recommended)', desc: 'AI picks the optimal mode based on your data', icon: Brain },
  { value: 'slow_mode', label: 'Slow Mode', desc: 'Enforces minimum 30s per question to reduce careless mistakes', icon: AlertTriangle },
  { value: 'reinforcement', label: 'Reinforcement Mix', desc: '60% easy + 40% medium to rebuild confidence', icon: RotateCcw },
  { value: 'retry_poorly_done', label: 'Retry Poorly Done', desc: 'Focus only on poorly-done questions', icon: Zap },
];

export default function QuizConfigure() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const preselectedSubject = params.get('subject') || '';

  const [subjectId, setSubjectId] = useState(preselectedSubject);
  const [numQuestions, setNumQuestions] = useState('5');
  const [duration, setDuration] = useState('15');
  const [mode, setMode] = useState('smart');

  const handleStart = () => {
    navigate('/dashboard/quiz/session-demo');
  };

  return (
    <div className="min-h-screen bg-background">
      <NavHeader />
      <main className="container mx-auto max-w-xl px-4 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Configure Quiz</h1>
          <p className="text-muted-foreground">Set up your quiz parameters</p>
        </div>

        <Card className="glass-card">
          <CardContent className="p-6 space-y-6">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Subject</label>
              <Select value={subjectId} onValueChange={setSubjectId}>
                <SelectTrigger><SelectValue placeholder="Select a subject" /></SelectTrigger>
                <SelectContent>
                  {mockSubjects.map(s => <SelectItem key={s.id} value={s.id}>{s.title}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Questions</label>
                <Select value={numQuestions} onValueChange={setNumQuestions}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="30">30</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Duration (min)</label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15</SelectItem>
                    <SelectItem value="30">30</SelectItem>
                    <SelectItem value="45">45</SelectItem>
                    <SelectItem value="60">60</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-3 block">Quiz Mode</label>
              <div className="space-y-2">
                {quizModes.map(m => (
                  <button
                    key={m.value}
                    onClick={() => setMode(m.value)}
                    className={`w-full flex items-start gap-3 p-3 rounded-lg border text-left transition-all ${
                      mode === m.value ? 'border-primary bg-accent' : 'border-border hover:border-primary/30'
                    }`}
                  >
                    <m.icon className={`h-5 w-5 mt-0.5 ${mode === m.value ? 'text-primary' : 'text-muted-foreground'}`} />
                    <div>
                      <p className="text-sm font-medium">{m.label}</p>
                      <p className="text-xs text-muted-foreground">{m.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <Button onClick={handleStart} size="lg" className="w-full gap-2" disabled={!subjectId}>
              <Play className="h-5 w-5" /> Start Quiz
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
