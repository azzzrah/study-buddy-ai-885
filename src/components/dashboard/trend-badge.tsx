import { TrendingUp, Minus, TrendingDown } from 'lucide-react';

interface TrendBadgeProps {
  trend: 'improving' | 'plateauing' | 'regressing';
  velocity?: number;
  size?: 'sm' | 'md';
}

const config = {
  improving: { icon: TrendingUp, label: 'Improving', className: 'bg-improving/10 text-improving' },
  plateauing: { icon: Minus, label: 'Plateauing', className: 'bg-plateauing/10 text-plateauing' },
  regressing: { icon: TrendingDown, label: 'Regressing', className: 'bg-regressing/10 text-regressing' },
};

export function TrendBadge({ trend, velocity, size = 'sm' }: TrendBadgeProps) {
  const { icon: Icon, label, className } = config[trend];
  const sizeClass = size === 'sm' ? 'text-xs px-2 py-0.5 gap-1' : 'text-sm px-3 py-1 gap-1.5';

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${className} ${sizeClass}`}>
      <Icon className={size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'} />
      {label}
      {velocity !== undefined && (
        <span className="opacity-70">({velocity > 0 ? '+' : ''}{velocity.toFixed(3)})</span>
      )}
    </span>
  );
}
