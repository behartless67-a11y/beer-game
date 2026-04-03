import { useEffect, useRef } from 'react';

interface GaugeProps {
  value: number;
  max: number;
  label: string;
  min?: number;
  size?: number;
  warningThreshold?: number;
}

export function Gauge({
  value,
  max,
  label,
  min = 0,
  size = 180,
  warningThreshold,
}: GaugeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2 - 20;

    // Draw brass background circle
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    gradient.addColorStop(0, '#8B7355');
    gradient.addColorStop(1, '#6B5638');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fill();

    // Draw outer ring
    ctx.strokeStyle = '#4A3728';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.stroke();

    // Draw gauge markings
    ctx.strokeStyle = '#2F2416';
    ctx.lineWidth = 2;
    for (let i = 0; i <= 10; i++) {
      const angle = -Math.PI + (i / 10) * Math.PI;
      const startX = centerX + Math.cos(angle) * (radius - 15);
      const startY = centerY + Math.sin(angle) * (radius - 15);
      const endX = centerX + Math.cos(angle) * (radius - 5);
      const endY = centerY + Math.sin(angle) * (radius - 5);

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
    }

    // Calculate needle angle based on value
    const clampedValue = Math.max(min, Math.min(max, value));
    const normalizedValue = (clampedValue - min) / (max - min);
    const needleAngle = -Math.PI + normalizedValue * Math.PI;

    // Determine needle color
    let needleColor = '#2F2416';
    if (warningThreshold !== undefined && value > warningThreshold) {
      needleColor = '#8B0000'; // Dark red for warning
    }

    // Draw needle
    ctx.strokeStyle = needleColor;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';

    const needleLength = radius - 25;
    const needleX = centerX + Math.cos(needleAngle) * needleLength;
    const needleY = centerY + Math.sin(needleAngle) * needleLength;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(needleX, needleY);
    ctx.stroke();

    // Draw center pin
    ctx.fillStyle = '#2F2416';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 6, 0, 2 * Math.PI);
    ctx.fill();

    // Draw value text
    ctx.fillStyle = '#F4E8D0';
    ctx.font = `bold ${size / 8}px 'IM Fell English', serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(value.toString(), centerX, centerY + radius / 2);
  }, [value, max, min, size, warningThreshold]);

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="drop-shadow-lg"
      />
      <div className="mt-2 vintage-text text-aged-paper text-center font-semibold">
        {label}
      </div>
    </div>
  );
}
