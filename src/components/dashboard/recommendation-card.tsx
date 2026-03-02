import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, ChevronUp, Lightbulb, Zap, BookOpen, RotateCcw, Clock, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import type { Recommendation } from '@/lib/types';

const typeConfig: Record<string, { icon: React.ElementType; color: string }> = {
  concept_review: { icon: BookOpen, color: 'text-primary' },
  slow_mode: { icon: Clock, color: 'text-warning' },
  harder_difficulty: { icon: Zap, color: 'text-improving' },
  reinforcement: { icon: RotateCcw, color: 'text-plateauing' },
  spaced_revision: { icon: AlertTriangle, color: 'text-warning' },
  retry_poorly_done: { icon: Lightbulb, color: 'text-regressing' },
};

interface RecommendationCardProps {
  recommendation: Recommendation;
}

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const [expanded, setExpanded] = useState(false);
  const cfg = typeConfig[recommendation.recommendation_type] || typeConfig.concept_review;
  const Icon = cfg.icon;

  return (
    <Card className="glass-card animate-fade-in">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={`mt-0.5 ${cfg.color}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm leading-relaxed">{recommendation.recommendation_text}</p>
            <button onClick={() => setExpanded(!expanded)} className="mt-2 text-xs font-medium text-primary hover:underline flex items-center gap-1">
              {expanded ? 'Hide' : 'Why?'}
              {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </button>
            {expanded && (
              <div className="mt-3 p-3 rounded-lg bg-muted/50 text-xs space-y-1 animate-scale-in">
                <p className="font-medium text-foreground">Reasoning:</p>
                <p className="text-muted-foreground">{recommendation.reasoning_json.reason}</p>
                {recommendation.reasoning_json.weak_topics && (
                  <p><span className="font-medium">Weak topics:</span> {recommendation.reasoning_json.weak_topics.join(', ')}</p>
                )}
                {recommendation.reasoning_json.velocity !== undefined && (
                  <p><span className="font-medium">Velocity:</span> {recommendation.reasoning_json.velocity.toFixed(3)}/session</p>
                )}
                {recommendation.reasoning_json.inactivity_days !== undefined && recommendation.reasoning_json.inactivity_days > 0 && (
                  <p><span className="font-medium">Inactive:</span> {recommendation.reasoning_json.inactivity_days} days</p>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
