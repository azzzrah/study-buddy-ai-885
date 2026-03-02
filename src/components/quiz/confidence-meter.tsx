import { getMasteryColor } from '@/lib/mastery-engine';

interface ConfidenceMeterProps {
  mastery: number;
  size?: number;
  showLabel?: boolean;
}

export function ConfidenceMeter({ mastery, size = 120, showLabel = true }: ConfidenceMeterProps) {
  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference * (1 - mastery);
  const color = getMasteryColor(mastery);
  const percentage = Math.round(mastery * 100);

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size} className="rotate-[-90deg]">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke={color} strokeWidth="8" strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={progress}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center" style={{ width: size, height: size }}>
        <span className="text-2xl font-bold text-foreground">{percentage}%</span>
      </div>
      {showLabel && <span className="text-sm font-medium text-muted-foreground">Mastery</span>}
    </div>
  );
}
