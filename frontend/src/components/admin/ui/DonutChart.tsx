'use client';

import React, { useState } from 'react';

interface DonutSegment {
  label: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  data: DonutSegment[];
  size?: number;
  showLegend?: boolean;
}

export function DonutChart({ data, size = 160, showLegend = true }: DonutChartProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  const total = data.reduce((sum, d) => sum + d.value, 0) || 1;
  const r = size / 2 - 8;
  const cx = size / 2;
  const cy = size / 2;
  const strokeWidth = 20;

  let cumAngle = -90;

  const segments = data.map((d, i) => {
    const angle = (d.value / total) * 360;
    const startAngle = cumAngle;
    cumAngle += angle;

    const start = polarToCartesian(cx, cy, r, startAngle);
    const end = polarToCartesian(cx, cy, r, startAngle + angle);
    const largeArc = angle > 180 ? 1 : 0;

    const pathD = `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;

    return { ...d, pathD, index: i };
  });

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size}>
          {segments.map((seg) => (
            <path
              key={seg.index}
              d={seg.pathD}
              fill="none"
              stroke={seg.color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              opacity={hovered === null || hovered === seg.index ? 1 : 0.3}
              className="transition-opacity duration-200"
              onMouseEnter={() => setHovered(seg.index)}
              onMouseLeave={() => setHovered(null)}
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-slate-900">
            {hovered !== null ? `${Math.round((data[hovered].value / total) * 100)}%` : total.toLocaleString()}
          </span>
          <span className="text-xs text-slate-500">
            {hovered !== null ? data[hovered].label : 'Total'}
          </span>
        </div>
      </div>

      {showLegend && (
        <div className="flex flex-col gap-2">
          {data.map((d, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-sm cursor-pointer"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: d.color }} />
              <span className="text-slate-600">{d.label}</span>
              <span className="text-slate-400 ml-auto">{Math.round((d.value / total) * 100)}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}
