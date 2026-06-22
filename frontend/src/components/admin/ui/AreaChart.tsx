'use client';

import React, { useState, useRef } from 'react';

interface DataPoint {
  label: string;
  value: number;
}

interface AreaChartProps {
  data: DataPoint[];
  height?: number;
  color?: string;
  showGrid?: boolean;
}

export function AreaChart({ data, height = 200, color = '#2563EB', showGrid = true }: AreaChartProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  if (data.length < 2) return null;

  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const w = 600;
  const h = height;
  const chartW = w - padding.left - padding.right;
  const chartH = h - padding.top - padding.bottom;

  const values = data.map((d) => d.value);
  const maxVal = Math.max(...values) * 1.1;
  const minVal = 0;
  const range = maxVal - minVal || 1;

  const stepX = chartW / (data.length - 1);
  const getX = (i: number) => padding.left + i * stepX;
  const getY = (v: number) => padding.top + chartH - ((v - minVal) / range) * chartH;

  const linePath = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.value)}`)
    .join(' ');

  const areaPath = `${linePath} L ${getX(data.length - 1)} ${padding.top + chartH} L ${getX(0)} ${padding.top + chartH} Z`;

  const gridLines = 5;
  const gridValues = Array.from({ length: gridLines }, (_, i) => minVal + (range / (gridLines - 1)) * i);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${w} ${h}`}
      className="w-full h-auto"
      onMouseLeave={() => setHovered(null)}
    >
      {/* Grid */}
      {showGrid &&
        gridValues.map((v, i) => (
          <g key={i}>
            <line
              x1={padding.left}
              y1={getY(v)}
              x2={w - padding.right}
              y2={getY(v)}
              stroke="#e2e8f0"
              strokeDasharray="4 4"
            />
            <text
              x={padding.left - 8}
              y={getY(v) + 4}
              textAnchor="end"
              className="fill-slate-400"
              fontSize="11"
            >
              {Math.round(v).toLocaleString()}
            </text>
          </g>
        ))}

      {/* Area fill */}
      <path d={areaPath} fill={color} opacity={0.08} />

      {/* Line */}
      <path d={linePath} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />

      {/* X labels */}
      {data.map((d, i) => {
        const showLabel = data.length <= 12 || i % Math.ceil(data.length / 8) === 0;
        if (!showLabel) return null;
        return (
          <text
            key={i}
            x={getX(i)}
            y={h - 8}
            textAnchor="middle"
            className="fill-slate-400"
            fontSize="11"
          >
            {d.label}
          </text>
        );
      })}

      {/* Hover areas */}
      {data.map((d, i) => (
        <g key={i} onMouseEnter={() => setHovered(i)}>
          <rect
            x={getX(i) - stepX / 2}
            y={padding.top}
            width={stepX}
            height={chartH}
            fill="transparent"
          />
          {hovered === i && (
            <>
              <line
                x1={getX(i)}
                y1={padding.top}
                x2={getX(i)}
                y2={padding.top + chartH}
                stroke={color}
                strokeDasharray="4 4"
                opacity={0.4}
              />
              <circle cx={getX(i)} cy={getY(d.value)} r={5} fill="white" stroke={color} strokeWidth={2} />
              <rect
                x={getX(i) - 40}
                y={getY(d.value) - 32}
                width={80}
                height={24}
                rx={6}
                fill="#1e293b"
              />
              <text
                x={getX(i)}
                y={getY(d.value) - 16}
                textAnchor="middle"
                fill="white"
                fontSize="12"
                fontWeight="600"
              >
                {d.value.toLocaleString()}
              </text>
            </>
          )}
        </g>
      ))}
    </svg>
  );
}
