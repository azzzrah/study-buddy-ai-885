import { NavHeader } from '@/components/nav-header';
import { SubjectCard } from '@/components/dashboard/subject-card';
import { RecommendationCard } from '@/components/dashboard/recommendation-card';
import { Button } from '@/components/ui/button';
import { Plus, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockSubjects, mockRecommendations } from '@/lib/mock-data';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <NavHeader />
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Track your progress across all subjects</p>
          </div>
          <Button onClick={() => navigate('/dashboard/upload')} className="gap-2">
            <Plus className="h-4 w-4" /> Upload Subject
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Subjects */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-semibold">Your Subjects</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {mockSubjects.map((s, i) => (
                <motion.div key={s.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                  <SubjectCard subject={s} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" /> Recommendations
            </h2>
            <div className="space-y-3">
              {mockRecommendations.map((r) => (
                <RecommendationCard key={r.id} recommendation={r} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
