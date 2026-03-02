import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendBadge } from '@/components/dashboard/trend-badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Subject } from '@/lib/types';
import { getSubjectMastery, getSubjectTrend, getDaysSinceLastAttempt, mockTopicMastery } from '@/lib/mock-data';

interface SubjectCardProps {
  subject: Subject;
}

export function SubjectCard({ subject }: SubjectCardProps) {
  const navigate = useNavigate();
  const mastery = getSubjectMastery(subject.id);
  const trend = getSubjectTrend(subject.id);
  const daysSince = getDaysSinceLastAttempt(subject.id);
  const topicCount = mockTopicMastery.filter(t => t.subject_id === subject.id).length;
  const masteryPct = Math.round(mastery * 100);

  return (
    <Card className="glass-card hover:shadow-md transition-all duration-200 cursor-pointer group" onClick={() => navigate(`/dashboard/subjects/${subject.id}`)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2">
            {subject.title}
          </CardTitle>
          <TrendBadge trend={trend} />
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{subject.description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Overall Mastery</span>
            <span className="font-semibold">{masteryPct}%</span>
          </div>
          <Progress value={masteryPct} className="h-2" />
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" />{topicCount} topics</span>
          {daysSince > 14 && (
            <span className="flex items-center gap-1 text-warning"><AlertTriangle className="h-3.5 w-3.5" />{daysSince}d inactive</span>
          )}
        </div>

        <Button variant="outline" size="sm" className="w-full" onClick={(e) => { e.stopPropagation(); navigate(`/dashboard/quiz/configure?subject=${subject.id}`); }}>
          Start Quiz
        </Button>
      </CardContent>
    </Card>
  );
}
