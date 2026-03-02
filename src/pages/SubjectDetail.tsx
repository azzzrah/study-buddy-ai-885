import { NavHeader } from '@/components/nav-header';
import { TrendBadge } from '@/components/dashboard/trend-badge';
import { RecommendationCard } from '@/components/dashboard/recommendation-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useParams, useNavigate } from 'react-router-dom';
import { mockSubjects, mockTopicMastery, mockRecommendations, getSubjectMastery, getSubjectTrend } from '@/lib/mock-data';
import { getMasteryLabel } from '@/lib/mastery-engine';
import { ArrowLeft, Play, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SubjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const subject = mockSubjects.find(s => s.id === id);
  const topics = mockTopicMastery.filter(t => t.subject_id === id);
  const recs = mockRecommendations.filter(r => r.subject_id === id);
  const mastery = getSubjectMastery(id || '');
  const trend = getSubjectTrend(id || '');

  if (!subject) return <div className="p-8 text-center text-muted-foreground">Subject not found</div>;

  return (
    <div className="min-h-screen bg-background">
      <NavHeader />
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')} className="gap-1 -ml-2 mb-2">
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            <h1 className="text-2xl font-bold">{subject.title}</h1>
            <p className="text-muted-foreground">{subject.description}</p>
          </div>
          <div className="flex items-center gap-3">
            <TrendBadge trend={trend} size="md" />
            <span className="text-3xl font-bold text-foreground">{Math.round(mastery * 100)}%</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Topic Mastery Grid */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Topic Mastery</h2>
              <Button variant="outline" size="sm" onClick={() => navigate(`/dashboard/subjects/${id}/insights`)} className="gap-1.5">
                <Eye className="h-4 w-4" /> Why Am I Weak?
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {topics.map((topic, i) => (
                <motion.div key={topic.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                  <Card className="glass-card">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{topic.topic}</h3>
                        <TrendBadge trend={topic.trend} velocity={topic.learning_velocity} />
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{getMasteryLabel(topic.mastery_probability)}</span>
                          <span className="font-medium">{Math.round(topic.mastery_probability * 100)}%</span>
                        </div>
                        <Progress value={topic.mastery_probability * 100} className="h-2" />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{topic.correct_count}/{topic.total_attempts} correct</span>
                        <span>~{topic.avg_time_seconds}s avg</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Button onClick={() => navigate(`/dashboard/quiz/configure?subject=${id}`)} size="lg" className="w-full gap-2 mt-4">
              <Play className="h-5 w-5" /> Start Quiz
            </Button>
          </div>

          {/* Recommendations */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Recommendations</h2>
            {recs.length > 0 ? (
              recs.map(r => <RecommendationCard key={r.id} recommendation={r} />)
            ) : (
              <p className="text-sm text-muted-foreground">No recommendations yet. Take a quiz to get started!</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
