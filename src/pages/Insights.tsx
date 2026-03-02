import { NavHeader } from '@/components/nav-header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendBadge } from '@/components/dashboard/trend-badge';
import { useParams, useNavigate } from 'react-router-dom';
import { mockSubjects, mockTopicMastery, mockRecommendations } from '@/lib/mock-data';
import { ArrowLeft, AlertTriangle, Zap, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ScatterChart, Scatter, ReferenceLine } from 'recharts';

// Mock trajectory data
const trajectoryData = [
  { session: 1, Limits: 0.4, Derivatives: 0.3, 'Chain Rule': 0.45, Continuity: 0.5 },
  { session: 2, Limits: 0.5, Derivatives: 0.35, 'Chain Rule': 0.42, Continuity: 0.6 },
  { session: 3, Limits: 0.6, Derivatives: 0.45, 'Chain Rule': 0.38, Continuity: 0.72 },
  { session: 4, Limits: 0.7, Derivatives: 0.5, 'Chain Rule': 0.35, Continuity: 0.8 },
  { session: 5, Limits: 0.82, Derivatives: 0.55, 'Chain Rule': 0.32, Continuity: 0.91 },
];

const calibrationData = [
  { confidence: 1, accuracy: 0.2 },
  { confidence: 2, accuracy: 0.35 },
  { confidence: 3, accuracy: 0.55 },
  { confidence: 4, accuracy: 0.75 },
  { confidence: 5, accuracy: 0.85 },
];

const topicColors: Record<string, string> = {
  Limits: 'hsl(var(--success))',
  Derivatives: 'hsl(var(--warning))',
  'Chain Rule': 'hsl(var(--destructive))',
  Continuity: 'hsl(var(--primary))',
};

export default function Insights() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const subject = mockSubjects.find(s => s.id === id);
  const topics = mockTopicMastery.filter(t => t.subject_id === id);
  const recs = mockRecommendations.filter(r => r.subject_id === id);

  if (!subject) return <div className="p-8 text-center">Subject not found</div>;

  return (
    <div className="min-h-screen bg-background">
      <NavHeader />
      <main className="container mx-auto px-4 py-8 space-y-8 max-w-4xl">
        <div>
          <Button variant="ghost" size="sm" onClick={() => navigate(`/dashboard/subjects/${id}`)} className="gap-1 -ml-2 mb-2">
            <ArrowLeft className="h-4 w-4" /> Back to Subject
          </Button>
          <h1 className="text-2xl font-bold">Why Am I Weak?</h1>
          <p className="text-muted-foreground">{subject.title} — Deep performance analysis</p>
        </div>

        {/* Topic Breakdown Table */}
        <Card className="glass-card">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-medium text-muted-foreground">Topic</th>
                    <th className="text-center p-4 font-medium text-muted-foreground">Accuracy</th>
                    <th className="text-center p-4 font-medium text-muted-foreground">Avg Time</th>
                    <th className="text-center p-4 font-medium text-muted-foreground">Mastery</th>
                    <th className="text-center p-4 font-medium text-muted-foreground">Trend</th>
                    <th className="text-center p-4 font-medium text-muted-foreground">Flags</th>
                  </tr>
                </thead>
                <tbody>
                  {topics.map(t => (
                    <tr key={t.id} className="border-b border-border/50 hover:bg-accent/30 transition-colors">
                      <td className="p-4 font-medium">{t.topic}</td>
                      <td className="p-4 text-center">{t.total_attempts > 0 ? Math.round((t.correct_count / t.total_attempts) * 100) : 0}%</td>
                      <td className="p-4 text-center">{t.avg_time_seconds}s</td>
                      <td className="p-4 text-center font-semibold">{Math.round(t.mastery_probability * 100)}%</td>
                      <td className="p-4 text-center"><TrendBadge trend={t.trend} /></td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          {t.mastery_probability < 0.4 && <span title="Weak mastery"><AlertTriangle className="h-4 w-4 text-destructive" /></span>}
                          {t.trend === 'regressing' && <span title="Regressing"><Zap className="h-4 w-4 text-warning" /></span>}
                          {t.mastery_probability > 0.8 && <span title="Strong"><Target className="h-4 w-4 text-success" /></span>}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Learning Trajectory */}
        <Card className="glass-card">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-lg font-semibold">Learning Trajectory</h2>
            <p className="text-sm text-muted-foreground">Mastery probability over quiz sessions per topic</p>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trajectoryData}>
                  <XAxis dataKey="session" label={{ value: 'Session', position: 'bottom', offset: -5 }} tick={{ fontSize: 12 }} />
                  <YAxis domain={[0, 1]} tickFormatter={v => `${(v * 100).toFixed(0)}%`} tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(v: number) => `${(v * 100).toFixed(0)}%`} />
                  {Object.keys(topicColors).map(topic => (
                    <Line key={topic} type="monotone" dataKey={topic} stroke={topicColors[topic]} strokeWidth={2} dot={{ r: 3 }} />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-4 text-xs">
              {Object.entries(topicColors).map(([t, c]) => (
                <span key={t} className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: c }} />
                  {t}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Confidence Calibration */}
        <Card className="glass-card">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-lg font-semibold">Confidence Calibration</h2>
            <p className="text-sm text-muted-foreground">Are you over-confident or under-confident? The diagonal = perfect calibration.</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart>
                  <XAxis dataKey="confidence" name="Confidence" type="number" domain={[0, 6]} label={{ value: 'Confidence Rating', position: 'bottom', offset: -5 }} tick={{ fontSize: 12 }} />
                  <YAxis dataKey="accuracy" name="Accuracy" domain={[0, 1]} tickFormatter={v => `${(v * 100).toFixed(0)}%`} tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(v: number, name: string) => name === 'Accuracy' ? `${(v * 100).toFixed(0)}%` : v} />
                  <ReferenceLine segment={[{ x: 1, y: 0.2 }, { x: 5, y: 1 }]} stroke="hsl(var(--muted-foreground))" strokeDasharray="4 4" />
                  <Scatter data={calibrationData} fill="hsl(var(--primary))" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recommendation History */}
        <Card className="glass-card">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-lg font-semibold">Recommendation History</h2>
            {recs.length > 0 ? (
              <div className="space-y-3">
                {recs.map((r, i) => (
                  <motion.div key={r.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                    className="p-4 rounded-lg border border-border bg-card/50 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium bg-accent text-accent-foreground px-2 py-0.5 rounded">{r.recommendation_type.replace(/_/g, ' ')}</span>
                      <span className="text-xs text-muted-foreground">{new Date(r.generated_at).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm">{r.recommendation_text}</p>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No recommendations yet.</p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
