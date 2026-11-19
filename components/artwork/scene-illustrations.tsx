/**
 * Side-on hand-truck that stretches to the full height of the "Pick your move" carton stack.
 * Fixed-size SVG caps (handle grip on top, axle + wheel at the base) are joined by a CSS rail
 * so the wheel stays round at any stack height. Pair with `HandTruckNosePlate` under the cartons.
 */
export function HandTruckArt({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`relative h-full w-[4.5rem] ${className}`}>
      {/* Upright rail (14px tube, flush right so the cartons rest against it) */}
      <div className="absolute top-[3.25rem] bottom-0 right-0 w-[14px] border-x-[2.5px] border-ink bg-accent" />
      {/* Handle: rail curves back into a rubber grip */}
      <svg viewBox="0 0 72 56" className="absolute top-0 right-0 block h-14 w-[4.5rem]" fill="none">
        <path d="M65 56 V30 C65 18, 56 12, 44 10 L22 7" stroke="var(--text)" strokeWidth="14" strokeLinecap="butt" />
        <path d="M65 57 V30 C65 18, 56 12, 44 10 L22 7" stroke="var(--accent)" strokeWidth="9" strokeLinecap="butt" />
        <path d="M24 7.5 L6 4.5" stroke="var(--text)" strokeWidth="15" strokeLinecap="round" />
        <path d="M24 7.5 L6 4.5" stroke="var(--road)" strokeWidth="10" strokeLinecap="round" />
        <path d="M11 2 L10 9 M16 3 L15 10" stroke="var(--road-muted)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      {/* Base: axle bracket, wheel on the floor line, and the rail turning 90° into the red nose plate */}
      <svg viewBox="0 0 72 64" className="absolute right-0 bottom-0 block h-16 w-[4.5rem]" fill="none">
        <path d="M64 24 L32 39" stroke="var(--text)" strokeWidth="8" strokeLinecap="round" />
        <path d="M64 24 L32 39" stroke="var(--road-muted)" strokeWidth="4" strokeLinecap="round" />
        <circle cx="32" cy="39" r="24" fill="var(--road)" stroke="var(--text)" strokeWidth="3" />
        <circle cx="32" cy="39" r="15" fill="none" stroke="var(--road-muted)" strokeWidth="1.5" strokeDasharray="3 4" />
        <circle cx="32" cy="39" r="9" fill="var(--kraft-soft)" stroke="var(--text)" strokeWidth="2.5" />
        <circle cx="32" cy="39" r="3" fill="var(--text)" />
        {/* L-corner: hides the rail's inner edge where it bends into the plate */}
        <rect x="60.5" y="44.5" width="11.5" height="17" fill="var(--accent)" />
        <rect x="58" y="61.5" width="14" height="2.5" fill="var(--text)" />
      </svg>
    </div>
  );
}

/**
 * Red steel nose plate the bottom carton rests on. 22px tall to meet the L-corner drawn at the base
 * of `HandTruckArt`, with a short upturned lip at the front edge.
 */
export function HandTruckNosePlate({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`relative h-[22px] border-[2.5px] border-l-0 border-ink bg-accent shadow-[3px_3px_0_var(--road)] ${className}`}
    >
      <span className="absolute -top-[14px] -right-[2.5px] block h-[14px] w-[10px] border-[2.5px] border-b-0 border-ink bg-accent" />
    </div>
  );
}

/** Office tower & stacked teal IT crates illustration for /moves/#office. */
export function OfficeCrateArt({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 360 260"
      fill="none"
      role="img"
      aria-label="Office relocation crates stacked on a skate dolly outside an office building"
      className={`block h-auto w-full ${className}`}
    >
      <rect x="0" y="0" width="360" height="260" fill="var(--kraft-soft)" />
      <g stroke="var(--text)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Office building silhouette */}
        <rect x="28" y="24" width="144" height="200" fill="var(--surface)" />
        <rect x="172" y="80" width="66" height="144" fill="var(--bg)" />
        {/* Office window grid */}
        {[46, 82, 118, 154].map(y => (
          <g key={y}>
            <rect x="46" y={y} width="26" height="22" fill="var(--teal)" opacity="0.82" />
            <rect x="86" y={y} width="26" height="22" fill="var(--teal)" opacity="0.55" />
            <rect x="126" y={y} width="26" height="22" fill="var(--headlight)" opacity="0.85" />
          </g>
        ))}
        {/* Stacked IT crates on rolling dolly (right foreground) */}
        <rect x="206" y="212" width="124" height="12" fill="var(--road)" />
        <circle cx="226" cy="232" r="9" fill="var(--road)" />
        <circle cx="310" cy="232" r="9" fill="var(--road)" />
        {/* Bottom crate */}
        <rect x="212" y="160" width="112" height="50" rx="2" fill="var(--teal)" />
        <rect x="242" y="174" width="52" height="18" fill="#FFFBF4" />
        <text x="268" y="187" textAnchor="middle" fill="#1E1915" stroke="none" fontFamily="var(--font-marker)" fontSize="10">
          DESK 04
        </text>
        {/* Middle crate */}
        <rect x="216" y="110" width="104" height="50" rx="2" fill="var(--accent)" />
        <rect x="242" y="124" width="52" height="18" fill="#FFFBF4" />
        <text x="268" y="137" textAnchor="middle" fill="#1E1915" stroke="none" fontFamily="var(--font-marker)" fontSize="10">
          MONITORS
        </text>
        {/* Top crate */}
        <rect x="224" y="64" width="90" height="46" rx="2" fill="var(--kraft)" />
        <text x="269" y="92" textAnchor="middle" fill="#1E1915" stroke="none" fontFamily="var(--font-marker)" fontSize="10">
          CABLES
        </text>
      </g>
      {/* Floor line */}
      <line x1="12" y1="242" x2="348" y2="242" stroke="var(--text)" strokeWidth="3" />
    </svg>
  );
}

/** Open first-night carton with kettle, mugs, toilet roll and charger peeking out. */
export function FirstNightBoxArt({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 230"
      fill="none"
      role="img"
      aria-label="Open first-night moving carton with a kettle, mugs, toilet paper and phone charger peeking out"
      className={`block h-auto w-full ${className}`}
    >
      <g stroke="var(--text)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Back open flaps */}
        <polygon points="48,108 26,74 134,74 140,108" fill="var(--kraft-soft)" />
        <polygon points="140,108 146,74 254,74 232,108" fill="var(--kraft-soft)" />

        {/* Kettle peeking out left */}
        <path d="M68 110 C68 62, 122 62, 124 110 Z" fill="var(--teal)" />
        <path d="M120 78 C136 78, 136 102, 122 104" strokeWidth="3.5" fill="none" />
        <path d="M84 68 H108" strokeWidth="3.5" />

        {/* Toilet roll peeking out middle */}
        <rect x="134" y="54" width="38" height="56" rx="4" fill="#FFFBF4" />
        <ellipse cx="153" cy="54" rx="19" ry="6" fill="#FFFBF4" />
        <ellipse cx="153" cy="54" rx="6" ry="2.2" fill="var(--kraft)" />

        {/* Orange mug peeking out right */}
        <rect x="178" y="68" width="32" height="42" rx="3" fill="var(--accent)" />
        <path d="M210 78 C222 78, 222 98, 210 98" strokeWidth="3" fill="none" />

        {/* Phone charger cable curling over front rim */}
        <path d="M116 112 C110 132, 138 136, 132 152" stroke="var(--road)" strokeWidth="2.5" fill="none" />
        <rect x="126" y="150" width="12" height="14" rx="2" fill="#FFFBF4" />

        {/* Front carton body */}
        <rect x="48" y="108" width="184" height="106" fill="var(--kraft)" />
        {/* Tape strip & marker label */}
        <rect x="76" y="134" width="128" height="52" fill="var(--surface)" />
        <text
          x="140"
          y="158"
          textAnchor="middle"
          fill="var(--text)"
          stroke="none"
          fontFamily="var(--font-marker)"
          fontSize="16"
        >
          FIRST NIGHT
        </text>
        <text
          x="140"
          y="177"
          textAnchor="middle"
          fill="var(--accent-ink)"
          stroke="none"
          fontFamily="var(--font-display)"
          fontSize="11"
          letterSpacing="1.4"
        >
          OPEN ME FIRST ↑
        </text>
      </g>
    </svg>
  );
}

/** Relative-size drawn carton or roll for the /packing/ depot shelf. */
export function SupplyShelfArt({ id, className = '' }: { id: string; className?: string }) {
  const stroke = 'var(--text)';
  switch (id) {
    case 'book-carton':
      return (
        <svg viewBox="0 0 120 100" fill="none" aria-hidden="true" className={className}>
          <rect x="26" y="38" width="68" height="52" fill="var(--kraft)" stroke={stroke} strokeWidth="2.5" />
          <rect x="52" y="38" width="16" height="11" fill="var(--tape)" stroke={stroke} strokeWidth="2" />
          <text x="60" y="72" textAnchor="middle" fill={stroke} fontFamily="var(--font-marker)" fontSize="11">BOOKS</text>
        </svg>
      );
    case 'standard-carton':
      return (
        <svg viewBox="0 0 120 100" fill="none" aria-hidden="true" className={className}>
          <rect x="18" y="26" width="84" height="64" fill="var(--kraft)" stroke={stroke} strokeWidth="2.5" />
          <rect x="50" y="26" width="20" height="12" fill="var(--tape)" stroke={stroke} strokeWidth="2" />
          <text x="60" y="66" textAnchor="middle" fill={stroke} fontFamily="var(--font-marker)" fontSize="11">STD</text>
        </svg>
      );
    case 'tea-chest':
      return (
        <svg viewBox="0 0 120 100" fill="none" aria-hidden="true" className={className}>
          <rect x="12" y="14" width="96" height="76" fill="var(--kraft)" stroke={stroke} strokeWidth="2.5" />
          <rect x="48" y="14" width="24" height="14" fill="var(--tape)" stroke={stroke} strokeWidth="2" />
          <text x="60" y="60" textAnchor="middle" fill={stroke} fontFamily="var(--font-marker)" fontSize="11">TEA CHEST</text>
        </svg>
      );
    case 'picture-carton':
      return (
        <svg viewBox="0 0 120 100" fill="none" aria-hidden="true" className={className}>
          <rect x="10" y="18" width="100" height="72" fill="var(--kraft-soft)" stroke={stroke} strokeWidth="2.5" />
          <rect x="24" y="30" width="72" height="48" fill="none" stroke={stroke} strokeWidth="1.8" strokeDasharray="4 3" />
          <text x="60" y="59" textAnchor="middle" fill={stroke} fontFamily="var(--font-marker)" fontSize="10.5">GLASS / ART</text>
        </svg>
      );
    case 'port-a-robe':
      return (
        <svg viewBox="0 0 120 100" fill="none" aria-hidden="true" className={className}>
          <rect x="30" y="6" width="60" height="84" fill="var(--kraft)" stroke={stroke} strokeWidth="2.5" />
          <line x1="36" y1="22" x2="84" y2="22" stroke={stroke} strokeWidth="3" />
          <path d="M50 22 L44 34 H56 Z M70 22 L64 34 H76 Z" stroke={stroke} strokeWidth="1.8" />
          <text x="60" y="66" textAnchor="middle" fill={stroke} fontFamily="var(--font-marker)" fontSize="9.5">ROBE</text>
        </svg>
      );
    case 'mattress-bag':
      return (
        <svg viewBox="0 0 120 100" fill="none" aria-hidden="true" className={className}>
          <rect x="16" y="18" width="88" height="68" rx="4" fill="var(--surface)" stroke={stroke} strokeWidth="2.5" />
          <path d="M24 32 H96 M24 52 H96 M24 72 H96" stroke="var(--teal)" strokeWidth="2" strokeDasharray="5 4" />
        </svg>
      );
    case 'butchers-paper':
      return (
        <svg viewBox="0 0 120 100" fill="none" aria-hidden="true" className={className}>
          <rect x="16" y="34" width="88" height="44" rx="8" fill="#FFFBF4" stroke={stroke} strokeWidth="2.5" />
          <ellipse cx="24" cy="56" rx="8" ry="22" fill="var(--kraft-soft)" stroke={stroke} strokeWidth="2.5" />
          <ellipse cx="24" cy="56" rx="3" ry="8" fill={stroke} />
        </svg>
      );
    case 'bubble-wrap':
      return (
        <svg viewBox="0 0 120 100" fill="none" aria-hidden="true" className={className}>
          <rect x="18" y="24" width="84" height="58" rx="10" fill="var(--teal)" opacity="0.28" stroke={stroke} strokeWidth="2.5" />
          <circle cx="44" cy="44" r="5" stroke={stroke} strokeWidth="1.5" />
          <circle cx="62" cy="44" r="5" stroke={stroke} strokeWidth="1.5" />
          <circle cx="80" cy="44" r="5" stroke={stroke} strokeWidth="1.5" />
          <circle cx="53" cy="60" r="5" stroke={stroke} strokeWidth="1.5" />
          <circle cx="71" cy="60" r="5" stroke={stroke} strokeWidth="1.5" />
        </svg>
      );
    default:
      // packing-tape
      return (
        <svg viewBox="0 0 120 100" fill="none" aria-hidden="true" className={className}>
          <circle cx="60" cy="54" r="30" fill="var(--tape)" stroke={stroke} strokeWidth="2.5" />
          <circle cx="60" cy="54" r="14" fill="var(--surface)" stroke={stroke} strokeWidth="2.5" />
        </svg>
      );
  }
}

/** 404 "Lost in transit" scene: lone carton on road shoulder, tyre tracks, "WRONG TURN" sign. */
export function LostInTransitArt({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 280"
      fill="none"
      role="img"
      aria-label="A single cardboard carton labelled ??? ROOM sitting on the road shoulder beside a WRONG TURN sign with tyre tracks leading away"
      className={`block h-auto w-full ${className}`}
    >
      {/* Sky */}
      <rect x="0" y="0" width="560" height="185" fill="var(--sky-bottom)" />
      {/* Road */}
      <rect x="0" y="185" width="560" height="95" fill="var(--road)" />
      <line x1="0" y1="185" x2="560" y2="185" stroke="var(--text)" strokeWidth="3" />
      <path d="M20 232 H90 M130 232 H200 M240 232 H310 M350 232 H420 M460 232 H530" stroke="var(--kraft-soft)" strokeWidth="4" opacity="0.55" />

      {/* Tyre tracks curving away to the right */}
      <path d="M180 218 C270 214, 380 202, 550 198" stroke="var(--kraft-soft)" strokeWidth="3" strokeDasharray="10 8" opacity="0.4" />
      <path d="M180 242 C270 238, 380 226, 550 222" stroke="var(--kraft-soft)" strokeWidth="3" strokeDasharray="10 8" opacity="0.4" />

      {/* Road sign: WRONG TURN */}
      <g stroke="var(--text)" strokeWidth="2.5" strokeLinejoin="round">
        <line x1="416" y1="84" x2="416" y2="192" strokeWidth="5" />
        <g transform="rotate(6 416 74)">
          <rect x="348" y="42" width="136" height="58" rx="4" fill="var(--accent)" />
          <text x="416" y="68" textAnchor="middle" fill="#FFFBF4" stroke="none" fontFamily="var(--font-display)" fontSize="20" letterSpacing="1.2">
            WRONG TURN
          </text>
          <text x="416" y="88" textAnchor="middle" fill="#FFFBF4" stroke="none" fontFamily="var(--font-sans)" fontWeight="700" fontSize="11" letterSpacing="2">
            ROUTE 404
          </text>
        </g>
      </g>

      {/* Lonely carton on the shoulder */}
      <g stroke="var(--text)" strokeWidth="2.5" strokeLinejoin="round">
        <ellipse cx="164" cy="212" rx="64" ry="8" fill="#000000" opacity="0.3" stroke="none" />
        <rect x="108" y="122" width="112" height="86" fill="var(--kraft)" />
        {/* Open slightly askew top flaps */}
        <polygon points="108,122 96,104 162,108 164,122" fill="var(--kraft-soft)" />
        <polygon points="220,122 232,104 166,108 164,122" fill="var(--kraft-soft)" />
        <rect x="122" y="144" width="84" height="44" fill="var(--surface)" />
        <text x="164" y="172" textAnchor="middle" fill="var(--text)" stroke="none" fontFamily="var(--font-marker)" fontSize="16">
          ??? ROOM
        </text>
      </g>
    </svg>
  );
}
