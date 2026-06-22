'use client';

import React, { useState } from 'react';

interface BarChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

interface BarChartProps {
  data: BarChartDataPoint[];
  height?: number;
  horizontal?: boolean;
}

export function BarChart({ data, height = 200, horizontal = false }: BarChartProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  if (data.length === 0) return null;

  const maxVal = Math.max(...data.map((d) => d.value)) || 1;

  if (horizontal) {
    return (
      <div className="space-y-3">
        {data.map((d, i) => (
          <div
            key={i}
            className="group"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-slate-600">{d.label}</span>
              <span className={`font-medium ${hovered === i ? 'text-primary' : 'text-slate-900'}`}>
                {d.value.toLocaleString()}
              </span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${(d.value / maxVal) * 100}%`,
                  backgroundColor: d.color ?? '#2563EB',
                  opacity: hovered === null || hovered === i ? 1 : 0.4,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const padding = { top: 10, right: 10, bottom: 40, left: 10 };
  const w = 400;
  const h = height;
  const chartW = w - padding.left - padding.right;
  const chartH = h - padding.top - padding.bottom;
  const barW = Math.min(chartW / data.length * 0.6, 50);
  const gap = (chartW - barW * data.length) / (data.length + 1);

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto">
      {data.map((d, i) => {
        const barH = (d.value / maxVal) * chartH;
        const x = padding.left + gap + i * (barW + gap);
        const y = padding.top + chartH - barH;

        return (
          <g
            key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <rect
              x={x}
              y={y}
              width={barW}
              height={barH}
              rx={4}
              fill={d.color ?? '#2563EB'}
              opacity={hovered === null || hovered === i ? 1 : 0.3}
              className="transition-opacity duration-200"
            />
            <text
              x={x + barW / 2}
              y={h - 8}
              textAnchor="middle"
              className="fill-slate-400"
              fontSize="11"
            >
              {d.label}
            </text>
            {hovered === i && (
              <text
                x={x + barW / 2}
                y={y - 8}
                textAnchor="middle"
                className="fill-slate-700"
                fontSize="12"
                fontWeight="600"
              >
                {d.value.toLocaleString()}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
