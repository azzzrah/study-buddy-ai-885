import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Brain, Sparkles, Target, BarChart3, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  { icon: Sparkles, title: 'AI-Generated Quizzes', description: 'Upload any PDF and get instant MCQ quizzes tailored to your study material.' },
  { icon: Target, title: 'Bayesian Mastery Tracking', description: 'Probabilistic mastery modeling that adapts to your confidence, speed, and accuracy.' },
  { icon: BarChart3, title: 'Explainable Insights', description: 'Know exactly why you\'re weak on a topic with transparent, data-driven reasoning.' },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-2 font-bold text-lg">
            <Brain className="h-6 w-6 text-primary" />
            MasteryQuiz
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>Login</Button>
            <Button size="sm" onClick={() => navigate('/dashboard')}>Get Started</Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-24 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground mb-6">
            <Sparkles className="h-4 w-4" /> Adaptive Learning Engine
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-foreground mb-6 leading-tight">
            Study Smarter with<br />
            <span className="text-primary">AI-Powered Mastery</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Upload your study materials, take intelligent quizzes, and watch your understanding grow with Bayesian mastery tracking and personalized recommendations.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" onClick={() => navigate('/dashboard')} className="gap-2 text-base px-8">
              Start Learning <ArrowRight className="h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/dashboard')} className="text-base px-8">
              View Demo
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 pb-24">
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              className="glass-card rounded-xl p-6 text-center"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
                <f.icon className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 text-center text-sm text-muted-foreground">
        <p>MasteryQuiz — Adaptive learning powered by Bayesian intelligence</p>
      </footer>
    </div>
  );
};

export default Index;
