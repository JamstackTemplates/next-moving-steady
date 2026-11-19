import type { InterstateRoute } from '../../content/routes';

interface RouteMapProps {
  routes: readonly InterstateRoute[];
  className?: string;
}

const CITY_COORDS: Record<string, { x: number; y: number; labelDx: number; labelDy: number; anchor: 'start' | 'end' }> = {
  'brisbane-townsville': { x: 248, y: 58, labelDx: -12, labelDy: 4, anchor: 'end' },
  'brisbane-sydney': { x: 288, y: 268, labelDx: -14, labelDy: 4, anchor: 'end' },
  'brisbane-canberra': { x: 252, y: 304, labelDx: -14, labelDy: 4, anchor: 'end' },
  'brisbane-melbourne': { x: 214, y: 344, labelDx: -14, labelDy: 4, anchor: 'end' },
  'brisbane-adelaide': { x: 112, y: 316, labelDx: -10, labelDy: -12, anchor: 'start' },
};

const BRISBANE = { x: 314, y: 176 };

/**
 * Stylised east-coast Australia freight map on a depot wall:
 * Brisbane as the orange depot node with dashed highway routes to all five cities.
 */
export function RouteBoardMap({ routes, className = '' }: RouteMapProps) {
  return (
    <svg
      viewBox="0 0 390 400"
      fill="none"
      role="img"
      aria-label="East coast Australia interstate route map showing weekly runs out of Brisbane to Townsville, Sydney, Canberra, Melbourne and Adelaide"
      className={`block h-auto w-full ${className}`}
    >
      {/* Depot wall grid */}
      <rect x="0" y="0" width="390" height="400" fill="var(--surface)" />
      <g stroke="var(--line)" strokeWidth="1" opacity="0.45">
        <path d="M0 80 H390 M0 160 H390 M0 240 H390 M0 320 H390" />
        <path d="M80 0 V400 M160 0 V400 M240 0 V400 M320 0 V400" />
      </g>

      {/* Stylised eastern Australian landmass */}
      <path
        d="M30 24 L216 24 L256 64 L298 122 L322 178 L314 232 L292 276 L264 334 L212 362 L152 346 L108 326 L68 338 L30 310 Z"
        fill="var(--kraft-soft)"
        stroke="var(--text)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Subtle state border lines */}
      <g stroke="var(--muted)" strokeWidth="1.2" strokeDasharray="4 4" opacity="0.55">
        <path d="M90 198 H316" />
        <path d="M140 296 L278 318" />
        <path d="M138 198 V344" />
      </g>

      {/* Dashed highway lines from Brisbane */}
      {routes.map(route => {
        const pt = CITY_COORDS[route.id];
        if (!pt) return null;
        const active = route.running;
        const midX = (BRISBANE.x + pt.x) / 2 + (route.id === 'brisbane-adelaide' ? -12 : 10);
        const midY = (BRISBANE.y + pt.y) / 2;
        return (
          <g key={route.id}>
            <path
              d={`M${BRISBANE.x} ${BRISBANE.y} Q${midX} ${midY} ${pt.x} ${pt.y}`}
              stroke={active ? 'var(--accent)' : 'var(--muted)'}
              strokeWidth={active ? '3' : '2'}
              strokeDasharray={active ? '7 5' : '3 5'}
              strokeLinecap="round"
              fill="none"
            />
            <circle
              cx={pt.x}
              cy={pt.y}
              r="6"
              fill={active ? 'var(--teal)' : 'var(--line)'}
              stroke="var(--text)"
              strokeWidth="2.2"
            />
            <text
              x={pt.x + pt.labelDx}
              y={pt.y + pt.labelDy}
              textAnchor={pt.anchor}
              fill="var(--text)"
              fontFamily="var(--font-display)"
              fontSize="13.5"
              letterSpacing="0.8"
            >
              {route.to.toUpperCase()}
            </text>
            <text
              x={pt.x + pt.labelDx}
              y={pt.y + pt.labelDy + 13}
              textAnchor={pt.anchor}
              fill="var(--muted)"
              fontFamily="var(--font-sans)"
              fontWeight="700"
              fontSize="10"
            >
              {route.running ? `${route.departs.slice(0, 3)} · $${route.sharedPerM3}/m³` : 'Dedicated only'}
            </text>
          </g>
        );
      })}

      {/* Brisbane Depot hub marker */}
      <g>
        <circle cx={BRISBANE.x} cy={BRISBANE.y} r="13" fill="var(--accent)" opacity="0.22" />
        <circle cx={BRISBANE.x} cy={BRISBANE.y} r="8" fill="var(--accent)" stroke="var(--text)" strokeWidth="2.5" />
        <rect x="200" y="158" width="98" height="24" rx="2" fill="var(--road)" stroke="var(--text)" strokeWidth="2" />
        <text
          x="249"
          y="174"
          textAnchor="middle"
          fill="#FFFBF4"
          fontFamily="var(--font-display)"
          fontSize="12"
          letterSpacing="1"
        >
          BRISBANE DEPOT
        </text>
      </g>

      {/* Compass & legend corner stamp */}
      <g transform="translate(24, 348)">
        <rect x="0" y="0" width="132" height="36" fill="var(--bg)" stroke="var(--text)" strokeWidth="2" />
        <line x1="10" y1="18" x2="36" y2="18" stroke="var(--accent)" strokeWidth="3" strokeDasharray="5 4" />
        <text x="44" y="22" fill="var(--text)" fontFamily="var(--font-sans)" fontWeight="700" fontSize="10">
          WEEKLY SHARED
        </text>
      </g>
    </svg>
  );
}
