import type { Truck } from '../../content/trucks';

interface TruckIllustrationProps {
  truck: Truck;
  /** Fraction of cargo capacity filled (0 to 1). */
  fillRatio?: number;
  /** Highlight this truck as the active recommendation. */
  highlighted?: boolean;
  /** Show the signwritten capacity gauge inside/alongside the cargo box. */
  showGauge?: boolean;
  /** Compact mode for the Home teaser lineup. */
  compact?: boolean;
  className?: string;
}

/**
 * Side-on removal truck drawn to physical scale by truck.bodyLengthM.
 * Cutaway cargo box reveals stacked furniture & cartons up to fillRatio.
 */
export function TruckIllustration({
  truck,
  fillRatio = 0,
  highlighted = false,
  showGauge = true,
  compact = false,
  className = '',
}: TruckIllustrationProps) {
  const clamped = Math.max(0, Math.min(1, fillRatio));
  // Scale cargo box width proportionally to bodyLengthM (3.2m..7.4m -> 130..275 units)
  const boxWidth = Math.round(62 + truck.bodyLengthM * 29);
  const cabWidth = 88;
  const boxHeight = truck.tonnes >= 6 ? 124 : truck.tonnes >= 4.5 ? 112 : 98;
  const totalWidth = boxWidth + cabWidth + 32;
  const viewH = 195;
  const boxX = 16;
  const floorY = 148;
  const boxY = floorY - boxHeight;
  const cabX = boxX + boxWidth + 4;

  // Inner cargo area
  const innerX = boxX + 8;
  const innerY = boxY + 12;
  const innerW = boxWidth - 16;
  const innerH = boxHeight - 20;

  // Build deterministic stacked cargo columns from front (right, near cab) to rear (left)
  const colW = 28;
  const cols = Math.max(3, Math.floor(innerW / colW));
  const totalSlots = cols * 3;
  const filledSlots = clamped > 0 ? Math.max(1, Math.round(clamped * totalSlots)) : 0;

  const cargoItems: Array<{
    key: string;
    x: number;
    y: number;
    w: number;
    h: number;
    kind: 'carton' | 'sofa' | 'fridge' | 'bed' | 'wardrobe';
    delay: number;
  }> = [];

  let count = 0;
  for (let c = cols - 1; c >= 0; c--) {
    for (let row = 0; row < 3; row++) {
      if (count >= filledSlots) break;
      const cellW = innerW / cols;
      const cellH = innerH / 3;
      const x = innerX + c * cellW + 2;
      const y = innerY + innerH - (row + 1) * cellH + 2;
      const w = cellW - 4;
      const h = cellH - 3;

      let kind: 'carton' | 'sofa' | 'fridge' | 'bed' | 'wardrobe' = 'carton';
      if (row === 0 && c === cols - 1) kind = 'fridge';
      else if (row === 0 && c % 3 === 1) kind = 'sofa';
      else if (row === 1 && c === cols - 2) kind = 'wardrobe';
      else if (row === 0 && c === 0) kind = 'bed';

      cargoItems.push({
        key: `${truck.id}-${c}-${row}`,
        x,
        y,
        w,
        h,
        kind,
        delay: Math.min(150, count * 8),
      });
      count++;
    }
  }

  const rearWheelX = boxX + Math.round(boxWidth * 0.28);
  const frontWheelX = cabX + 50;
  const wheelY = floorY + 18;
  const fillPercent = Math.round(clamped * 100);

  return (
    <svg
      viewBox={`0 -22 ${totalWidth} ${viewH + 22}`}
      fill="none"
      role="img"
      aria-label={`${truck.name} (${truck.capacityM3} cubic metres)${clamped > 0 ? `, loaded to ${fillPercent}%` : ''}`}
      className={`block h-auto max-w-full ${className}`}
    >
      {/* Ground shadow */}
      <ellipse
        cx={totalWidth / 2}
        cy={wheelY + 20}
        rx={totalWidth * 0.44}
        ry="7"
        fill="#000000"
        opacity="0.28"
      />

      {/* Cargo box exterior shell */}
      <rect
        x={boxX}
        y={boxY}
        width={boxWidth}
        height={boxHeight}
        rx="3"
        fill={highlighted ? 'var(--accent)' : 'var(--kraft-soft)'}
        stroke="var(--text)"
        strokeWidth="2.5"
      />

      {/* Cutaway interior bay */}
      <rect
        x={innerX}
        y={innerY}
        width={innerW}
        height={innerH}
        fill={highlighted ? 'var(--surface)' : 'var(--bg)'}
        stroke="var(--text)"
        strokeWidth="2"
      />

      {/* Subtle interior ribs */}
      {Array.from({ length: Math.max(2, Math.floor(innerW / 36)) }).map((_, i) => (
        <line
          key={i}
          x1={innerX + (i + 1) * 36}
          y1={innerY}
          x2={innerX + (i + 1) * 36}
          y2={innerY + innerH}
          stroke="var(--line)"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
      ))}

      {/* Stacked cargo items */}
      {cargoItems.map(item => (
        <g
          key={item.key}
          className="cargo-item-drop"
          style={{ animationDelay: `${item.delay}ms` }}
        >
          {item.kind === 'sofa' ? (
            <g stroke="var(--text)" strokeWidth="1.8" strokeLinejoin="round">
              <rect x={item.x} y={item.y + 4} width={item.w} height={item.h - 4} rx="2" fill="var(--teal)" />
              <line x1={item.x + 3} y1={item.y + item.h * 0.55} x2={item.x + item.w - 3} y2={item.y + item.h * 0.55} stroke="#FFFBF4" strokeWidth="1.2" opacity="0.6" />
            </g>
          ) : item.kind === 'fridge' ? (
            <g stroke="var(--text)" strokeWidth="1.8">
              <rect x={item.x} y={item.y - 4} width={item.w} height={item.h + 4} rx="1" fill="#E6E1D8" />
              <line x1={item.x} y1={item.y + item.h * 0.38} x2={item.x + item.w} y2={item.y + item.h * 0.38} strokeWidth="1.5" />
            </g>
          ) : item.kind === 'bed' ? (
            <g stroke="var(--text)" strokeWidth="1.8">
              <rect x={item.x} y={item.y + 2} width={item.w} height={item.h - 2} rx="1.5" fill="var(--teal)" />
              <rect x={item.x + 3} y={item.y + 5} width={item.w - 6} height={item.h * 0.4} fill="#FFFBF4" strokeWidth="1.2" />
            </g>
          ) : item.kind === 'wardrobe' ? (
            <g stroke="var(--text)" strokeWidth="1.8">
              <rect x={item.x} y={item.y} width={item.w} height={item.h} fill="var(--kraft)" />
              <line x1={item.x + item.w / 2} y1={item.y} x2={item.x + item.w / 2} y2={item.y + item.h} strokeWidth="1.2" />
            </g>
          ) : (
            <g stroke="var(--text)" strokeWidth="1.8">
              <rect x={item.x} y={item.y} width={item.w} height={item.h} fill="var(--kraft)" />
              <rect x={item.x + item.w * 0.32} y={item.y} width={item.w * 0.36} height="5" fill="var(--tape)" stroke="none" />
            </g>
          )}
        </g>
      ))}

      {/* Signwritten capacity gauge along top of cargo box */}
      {showGauge && !compact && (
        <g>
          <rect
            x={boxX + 8}
            y={boxY - 12}
            width={boxWidth - 16}
            height="10"
            fill="var(--road)"
            stroke="var(--text)"
            strokeWidth="1.8"
          />
          <rect
            x={boxX + 9.5}
            y={boxY - 10.5}
            width={Math.max(0, (boxWidth - 19) * clamped)}
            height="7"
            fill={clamped > 0.88 ? 'var(--accent)' : 'var(--teal)'}
          />
          <text
            x={boxX + boxWidth - 8}
            y={boxY - 16}
            textAnchor="end"
            fill="currentColor"
            fontFamily="var(--font-display)"
            fontSize="11"
            letterSpacing="0.8"
          >
            {fillPercent}% OF {truck.capacityM3} M³
          </text>
        </g>
      )}

      {/* Side skirt under cargo box */}
      <rect
        x={boxX}
        y={floorY}
        width={boxWidth}
        height="16"
        fill="var(--road)"
        stroke="var(--text)"
        strokeWidth="2.2"
      />
      {/* Orange livery trim along skirt */}
      <rect x={boxX + 4} y={floorY + 5} width={boxWidth - 8} height="4" fill="var(--accent)" />

      {/* Cab (facing right) */}
      <g stroke="var(--text)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path
          d={`M${cabX} ${floorY - 76} H${cabX + 46} C${cabX + 60} ${floorY - 76}, ${cabX + 68} ${floorY - 62}, ${cabX + 74} ${floorY - 40} L${cabX + 82} ${floorY - 12} V${floorY + 14} H${cabX} Z`}
          fill={highlighted ? 'var(--accent)' : 'var(--accent)'}
          opacity={highlighted ? 1 : 0.85}
        />
        {/* Windshield */}
        <path
          d={`M${cabX + 12} ${floorY - 66} H${cabX + 44} C${cabX + 52} ${floorY - 66}, ${cabX + 58} ${floorY - 56}, ${cabX + 63} ${floorY - 38} H${cabX + 12} Z`}
          fill="var(--surface)"
        />
        {/* Boat name painted on cab door */}
        <text
          x={cabX + 8}
          y={floorY - 16}
          fill="#FFFBF4"
          stroke="none"
          fontFamily="var(--font-display)"
          fontSize="9"
          letterSpacing="0.5"
        >
          {truck.name.toUpperCase()}
        </text>
        {/* Headlight */}
        <rect x={cabX + 74} y={floorY - 8} width="8" height="10" rx="1.5" fill="var(--headlight)" />
      </g>

      {/* Rear wheel */}
      <g>
        <circle cx={rearWheelX} cy={wheelY} r="18" fill="var(--road)" stroke="var(--text)" strokeWidth="2.5" />
        <circle cx={rearWheelX} cy={wheelY} r="8.5" fill="var(--kraft-soft)" stroke="var(--text)" strokeWidth="2" />
        <circle cx={rearWheelX} cy={wheelY} r="2.5" fill="var(--text)" />
      </g>

      {/* Front wheel */}
      <g>
        <circle cx={frontWheelX} cy={wheelY} r="18" fill="var(--road)" stroke="var(--text)" strokeWidth="2.5" />
        <circle cx={frontWheelX} cy={wheelY} r="8.5" fill="var(--kraft-soft)" stroke="var(--text)" strokeWidth="2" />
        <circle cx={frontWheelX} cy={wheelY} r="2.5" fill="var(--text)" />
      </g>
    </svg>
  );
}

/** Decorative truck-tail slice for inner page heads. */
export function TruckLineupSlice({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 260 120" fill="none" aria-hidden="true" className={`block h-auto w-full ${className}`}>
      <g stroke="#1E1915" strokeWidth="2.5" strokeLinejoin="round">
        <rect x="20" y="18" width="150" height="78" rx="3" fill="#FFFBF4" />
        <polygon points="20,66 170,40 170,56 20,82" fill="#1F6E73" stroke="none" />
        <rect x="20" y="18" width="150" height="78" rx="3" fill="none" stroke="#1E1915" strokeWidth="2.5" />
        <path d="M174 40 H218 C230 40, 238 52, 244 74 V96 H174 Z" fill="#2A2522" />
        <path d="M184 50 H214 C222 50, 228 58, 232 72 H184 Z" fill="#FFFBF4" />
        <circle cx="72" cy="98" r="15" fill="#2A2522" />
        <circle cx="72" cy="98" r="6.5" fill="#E8D3B4" />
        <circle cx="212" cy="98" r="15" fill="#2A2522" />
        <circle cx="212" cy="98" r="6.5" fill="#E8D3B4" />
      </g>
    </svg>
  );
}

/** Decorative carton stack slice for Packing / Checklist / Contact page heads. */
export function CartonStackSlice({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 120" fill="none" aria-hidden="true" className={`block h-auto w-full ${className}`}>
      <g stroke="#1E1915" strokeWidth="2.5" strokeLinejoin="round">
        {/* Bottom wide carton */}
        <rect x="18" y="64" width="110" height="48" fill="#E8D3B4" />
        <rect x="62" y="64" width="22" height="12" fill="#CFA25B" />
        <text x="73" y="96" textAnchor="middle" fill="#1E1915" stroke="none" fontFamily="var(--font-marker)" fontSize="13">
          KITCHEN
        </text>
        {/* Right tall carton */}
        <rect x="132" y="42" width="70" height="70" fill="#C99A62" />
        <rect x="157" y="42" width="20" height="12" fill="#CFA25B" />
        <text x="167" y="84" textAnchor="middle" fill="#1E1915" stroke="none" fontFamily="var(--font-marker)" fontSize="12">
          FRAGILE ↑
        </text>
        {/* Top tilted book carton */}
        <g transform="rotate(-4 80 44)">
          <rect x="34" y="20" width="84" height="44" fill="#FFFBF4" />
          <rect x="67" y="20" width="18" height="10" fill="#CFA25B" />
          <text x="76" y="48" textAnchor="middle" fill="#1E1915" stroke="none" fontFamily="var(--font-marker)" fontSize="12">
            BOOKS
          </text>
        </g>
      </g>
    </svg>
  );
}
