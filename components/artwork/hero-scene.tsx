/**
 * "Loading day" hero scene:
 * - Sun (day) / crescent moon & stars (night), soft clouds, CBD towers and the Story Bridge far behind
 * - Highset Queenslander with corrugated hipped roof, front gable, verandah balustrade,
 *   timber stairs and lattice between the stumps; jacaranda tree on the left
 * - Two movers in hi-vis carrying a sofa wrapped in a teal quilted blanket
 * - Hand-truck loaded with "LINEN" / "BOOKS" cartons waiting on the lowered tail-lift
 * - The Schooner removal truck side-on with orange livery, wave stripe, wordmark and wheel arches;
 *   wheels turn on primary CTA hover
 * - Dark mode ("Night run"): dusk sky, lit headlights, verandah lamp & warm house windows
 */

const SKIN_A = '#E2B48C';
const SKIN_B = '#B57A50';
const CREAM = '#FFFBF4';

function Wheel({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g className="hero-wheel" style={{ transformOrigin: `${cx}px ${cy}px` }}>
      <circle cx={cx} cy={cy} r="26" fill="var(--road)" stroke="var(--text)" strokeWidth="3" />
      <circle cx={cx} cy={cy} r="13" fill="var(--kraft-soft)" stroke="var(--text)" strokeWidth="2.5" />
      <circle cx={cx} cy={cy} r="3.5" fill="var(--text)" />
      <path
        d={`M${cx} ${cy - 13} V${cy - 7} M${cx} ${cy + 7} V${cy + 13} M${cx - 13} ${cy} H${cx - 7} M${cx + 7} ${cy} H${cx + 13}`}
        stroke="var(--text)"
        strokeWidth="2.2"
      />
    </g>
  );
}

export function HeroLoadingScene({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="24 100 796 312"
      fill="none"
      role="img"
      aria-label="Two Deckhand Removals movers carrying a blanket-wrapped sofa from a Brisbane Queenslander house to the truck, with cartons waiting on the tail-lift and the Story Bridge behind"
      className={`block h-auto w-full select-none ${className}`}
    >
      <defs>
        <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--sky-top)" />
          <stop offset="100%" stopColor="var(--sky-bottom)" />
        </linearGradient>
        <linearGradient id="headlight-beam" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--headlight)" stopOpacity="0.65" />
          <stop offset="100%" stopColor="var(--headlight)" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="verandah-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--headlight)" stopOpacity="0.7" />
          <stop offset="100%" stopColor="var(--headlight)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="sun-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--tape)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--tape)" stopOpacity="0" />
        </radialGradient>
        <pattern id="hero-blanket-quilt" width="12" height="12" patternUnits="userSpaceOnUse">
          <path d="M0 6 L6 0 L12 6 L6 12 Z" stroke={CREAM} strokeOpacity="0.3" strokeWidth="1" fill="none" />
        </pattern>
        <pattern id="hero-lattice" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M0 0 L10 10 M10 0 L0 10" stroke="var(--text)" strokeOpacity="0.35" strokeWidth="1.4" />
        </pattern>
        <pattern id="hero-balusters" width="7" height="28" patternUnits="userSpaceOnUse">
          <line x1="3.5" y1="0" x2="3.5" y2="28" stroke="var(--text)" strokeWidth="1.6" />
        </pattern>
        <clipPath id="truck-box-clip">
          <rect x="470" y="140" width="222" height="160" rx="4" />
        </clipPath>
      </defs>

      {/* Sky backdrop */}
      <rect x="0" y="80" width="820" height="276" fill="url(#hero-sky)" />

      {/* Sun by day, crescent moon & stars by night */}
      <g className="day-only">
        <circle cx="300" cy="146" r="44" fill="url(#sun-halo)" />
        <circle cx="300" cy="146" r="19" fill="var(--tape)" stroke="var(--text)" strokeWidth="2.5" />
      </g>
      <g className="night-only">
        <path
          d="M306 128 A20 20 0 1 0 312 162 A15 15 0 1 1 306 128 Z"
          fill="var(--headlight)"
          stroke="var(--text)"
          strokeWidth="2"
        />
        <g fill="var(--headlight)">
          <circle cx="130" cy="118" r="1.8" />
          <circle cx="240" cy="112" r="2" />
          <circle cx="420" cy="124" r="1.6" />
          <circle cx="520" cy="112" r="2" />
          <circle cx="640" cy="118" r="1.8" />
          <circle cx="690" cy="150" r="2.2" />
        </g>
      </g>

      {/* Soft clouds */}
      <g className="day-only" fill={CREAM} stroke="var(--text)" strokeWidth="2" strokeOpacity="0.28">
        <path d="M368 132 C368 122, 381 117, 389 124 C394 112, 414 112, 419 125 C429 123, 435 130, 433 138 H370 C366 138, 366 134, 368 132 Z" />
        <path d="M206 128 C206 120, 216 116, 222 121 C227 112, 242 112, 245 122 C253 120, 258 126, 256 132 H208 C204 132, 204 130, 206 128 Z" />
      </g>

      {/* Distant CBD towers (peek above the cab) */}
      <g fill="var(--text)" opacity="0.13">
        <rect x="700" y="96" width="26" height="140" />
        <rect x="730" y="70" width="22" height="166" />
        <polygon points="756,236 756,88 770,74 784,88 784,236" />
        <rect x="788" y="112" width="30" height="124" />
      </g>

      {/* Story Bridge cantilever silhouette, sitting between the house and the truck */}
      <g opacity="0.3" stroke="var(--text)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M282 236 H820" strokeWidth="3.5" />
        <path d="M300 236 L344 166 L388 236" />
        <path d="M344 166 L420 196 L500 196 L576 166 L620 236" />
        <path d="M344 166 V236 M366 202 L344 236 M366 202 L388 236 M420 196 L404 236 M420 196 L452 236 L500 196" strokeWidth="1.6" />
        <path d="M338 236 V340 M350 236 V340" strokeWidth="2.6" />
      </g>

      {/* Jacaranda tree (behind the house corner) */}
      <g>
        <path d="M34 340 C36 290, 40 240, 52 196" stroke="var(--text)" strokeWidth="7" strokeLinecap="round" />
        <path d="M40 262 L12 234 M45 236 L80 210" stroke="var(--text)" strokeWidth="4.5" strokeLinecap="round" />
        <g stroke="var(--text)" strokeWidth="2.5" strokeLinejoin="round">
          <circle cx="16" cy="196" r="32" fill="#8B6AAE" />
          <circle cx="58" cy="168" r="36" fill="#9D7CC2" />
          <circle cx="94" cy="196" r="26" fill="#7D5CA0" />
          <circle cx="30" cy="150" r="24" fill="#A989CC" />
        </g>
        <g fill="#C9B1E4" opacity="0.8">
          <circle cx="44" cy="150" r="3" />
          <circle cx="70" cy="180" r="2.5" />
          <circle cx="20" cy="186" r="2.5" />
          <circle cx="92" cy="200" r="2" />
        </g>
      </g>

      {/* Highset Queenslander */}
      <g stroke="var(--text)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Lattice between the stumps */}
        <rect x="84" y="296" width="172" height="44" fill="var(--kraft-soft)" />
        <rect x="84" y="296" width="172" height="44" fill="url(#hero-lattice)" />
        <path d="M84 296 V340 M126 296 V340 M214 296 V340 M256 296 V340" strokeWidth="4" />

        {/* Weatherboard wall behind the verandah */}
        <rect x="84" y="206" width="172" height="90" fill="var(--surface)" />
        <path d="M84 222 H256 M84 238 H256 M84 254 H256" strokeWidth="1.2" opacity="0.25" />

        {/* Windows & front door (warm glow at night) */}
        <rect x="98" y="216" width="28" height="40" fill="var(--kraft-soft)" />
        <rect x="98" y="216" width="28" height="40" fill="var(--headlight)" className="night-only" />
        <path d="M112 216 V256 M98 236 H126" strokeWidth="1.8" />
        <rect x="214" y="216" width="28" height="40" fill="var(--kraft-soft)" />
        <rect x="214" y="216" width="28" height="40" fill="var(--headlight)" className="night-only" />
        <path d="M228 216 V256 M214 236 H242" strokeWidth="1.8" />
        <rect x="156" y="222" width="28" height="74" fill="var(--kraft)" />
        <rect x="161" y="228" width="18" height="18" fill="var(--headlight)" className="night-only" />
        <circle cx="179" cy="262" r="1.8" fill="var(--text)" />

        {/* Verandah balustrade, rails & posts */}
        <rect x="84" y="268" width="72" height="28" fill="url(#hero-balusters)" stroke="none" />
        <rect x="184" y="268" width="72" height="28" fill="url(#hero-balusters)" stroke="none" />
        <path d="M84 268 H156 M184 268 H256" strokeWidth="3" />
        <path d="M80 296 H260" strokeWidth="4" />
        <path d="M88 208 V296 M152 208 V296 M188 208 V296 M252 208 V296" strokeWidth="3.5" />
        {/* Post brackets */}
        <path d="M88 218 Q96 212 102 208 M252 218 Q244 212 238 208 M152 218 Q144 212 138 208 M188 218 Q196 212 202 208" strokeWidth="1.8" />

        {/* Corrugated hipped roof + front gable */}
        <polygon points="66,210 114,150 226,150 274,210" fill="var(--teal)" />
        <path d="M92 210 L128 150 M120 210 L146 150 M148 210 L164 150 M196 210 L180 150 M224 210 L198 150 M250 210 L216 150" strokeWidth="1.3" opacity="0.32" />
        <polygon points="132,210 170,164 208,210" fill="var(--teal-deep)" />
        <path d="M152 210 V196 M170 210 V184 M188 210 V196 M160 202 H180" strokeWidth="1.4" opacity="0.6" />
        <path d="M170 164 V154" strokeWidth="2.5" />

        {/* Verandah lamp glow in dark mode */}
        <circle cx="170" cy="222" r="30" fill="url(#verandah-glow)" stroke="none" className="night-only" />

        {/* Timber stairs down to the footpath */}
        <polygon points="156,296 184,296 196,340 144,340" fill="var(--kraft-soft)" />
        <path d="M153 307 H187 M150 318 H190 M147 329 H193" strokeWidth="2" />
        <path d="M156 296 L144 340 M184 296 L196 340" strokeWidth="3" />
      </g>

      {/* Footpath, kerb and road */}
      <rect x="0" y="340" width="820" height="16" fill="var(--kraft-soft)" />
      <line x1="0" y1="340" x2="820" y2="340" stroke="var(--text)" strokeWidth="2.5" />
      <rect x="0" y="356" width="820" height="64" fill="var(--road)" />
      <line x1="0" y1="356" x2="820" y2="356" stroke="var(--text)" strokeWidth="3" />
      <path
        d="M24 392 H114 M154 392 H244 M284 392 H374 M414 392 H504 M544 392 H634 M674 392 H764"
        stroke="var(--kraft-soft)"
        strokeWidth="4"
        opacity="0.55"
      />

      {/* FRAGILE carton waiting at the foot of the stairs */}
      <g stroke="var(--text)" strokeWidth="2.5" strokeLinejoin="round">
        <rect x="206" y="308" width="46" height="34" fill="var(--kraft)" />
        <rect x="222" y="308" width="14" height="9" fill="var(--tape)" />
        <text x="229" y="331" textAnchor="middle" fill="var(--text)" stroke="none" fontFamily="var(--font-marker)" fontSize="8.5">
          FRAGILE ↑
        </text>
      </g>

      {/* ================================================================
          THE SCHOONER REMOVAL TRUCK
          ================================================================ */}
      <g>
        <ellipse cx="640" cy="360" rx="186" ry="9" fill="#000000" opacity="0.28" />

        {/* Lowered tail-lift: platform at kerb height + lift arms to the box floor */}
        <g stroke="var(--text)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M466 300 L432 342 M474 318 L446 342" strokeWidth="3.5" />
          <rect x="398" y="340" width="76" height="7" fill="var(--road-muted)" />
          <path d="M398 347 H474" strokeWidth="1.5" />
        </g>

        {/* Main cargo box */}
        <g stroke="var(--text)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="470" y="140" width="222" height="160" rx="4" fill="var(--accent)" />
          <g clipPath="url(#truck-box-clip)">
            <polygon points="460,248 702,198 702,228 460,278" fill={CREAM} stroke="none" />
            <polygon points="460,274 702,224 702,240 460,290" fill="var(--teal)" stroke="none" />
            <path
              d="M484 258 C500 246, 516 262, 532 250 C548 238, 564 254, 580 242"
              stroke="var(--accent)"
              strokeWidth="4"
              fill="none"
            />
          </g>
          <rect x="470" y="140" width="222" height="160" rx="4" fill="none" strokeWidth="2.8" />
          {/* Rear door seam, hinges & lock rods */}
          <path d="M482 140 V300" strokeWidth="1.8" />
          <path d="M476 160 H482 M476 280 H482" strokeWidth="2.5" />
          <path d="M488 168 V196 M488 244 V272" strokeWidth="1.8" opacity="0.7" />
          {/* Roof marker lights */}
          <rect x="500" y="134" width="8" height="6" fill="var(--headlight)" />
          <rect x="670" y="134" width="8" height="6" fill="var(--headlight)" />
          <text
            x="587"
            y="184"
            textAnchor="middle"
            fill={CREAM}
            stroke="none"
            fontFamily="var(--font-display)"
            fontSize="34"
            letterSpacing="4"
          >
            DECKHAND
          </text>
          <text
            x="587"
            y="199"
            textAnchor="middle"
            fill={CREAM}
            stroke="none"
            fontFamily="var(--font-sans)"
            fontWeight="700"
            fontSize="10.5"
            letterSpacing="2.5"
          >
            BRISBANE REMOVALS
          </text>
          {/* Chassis skirt with wheel arch */}
          <path
            d="M470 300 H498 A32 32 0 0 1 562 300 H692 V320 H562 V316 H498 V320 H470 Z"
            fill="var(--road)"
          />
          <circle cx="600" cy="310" r="2" fill="var(--kraft-soft)" stroke="none" />
          <circle cx="660" cy="310" r="2" fill="var(--kraft-soft)" stroke="none" />
        </g>

        {/* Cab (facing right) */}
        <g stroke="var(--text)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M692 188 H752 C768 188, 778 202, 784 226 L798 262 V322 H780 A30 30 0 0 0 722 322 H692 Z"
            fill="var(--accent)"
          />
          <path d="M708 202 H748 C758 202, 765 212, 770 230 L773 246 H708 Z" fill="var(--surface)" />
          <path d="M708 202 H748 C758 202, 765 212, 770 230 L773 246 H708 Z" fill="var(--headlight)" opacity="0.25" className="night-only" />
          {/* Mirror */}
          <path d="M704 210 H696 V232 H704" strokeWidth="2" />
          {/* Door seam & handle */}
          <path d="M704 252 V320 M712 262 H726" strokeWidth="2" />
          <text x="736" y="290" textAnchor="middle" fill={CREAM} stroke="none" fontFamily="var(--font-display)" fontSize="9.5" letterSpacing="0.8">
            THE SCHOONER
          </text>
          <rect x="786" y="304" width="20" height="16" rx="2" fill="var(--road)" />
          <rect x="792" y="276" width="10" height="14" rx="2" fill="var(--headlight)" />
          <polygon points="802,274 820,260 820,312 802,292" fill="url(#headlight-beam)" stroke="none" className="night-only" />
        </g>

        <Wheel cx={530} cy={330} />
        <Wheel cx={751} cy={330} />
      </g>

      {/* ================================================================
          HAND-TRUCK WITH CARTONS ON THE TAIL-LIFT
          ================================================================ */}
      <g stroke="var(--text)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Frame, handle grip and nose plate */}
        <path d="M398 262 L408 262 L414 268 V338 H456" stroke="var(--accent)" strokeWidth="5" />
        <path d="M398 262 L408 262 L414 268 V338 H456" strokeWidth="1.3" />
        <path d="M392 262 H402" stroke="var(--road)" strokeWidth="6" />
        <circle cx="408" cy="332" r="8" fill="var(--road)" />
        <circle cx="408" cy="332" r="3" fill="var(--kraft-soft)" />
        {/* Cartons */}
        <rect x="417" y="304" width="40" height="32" fill="var(--kraft)" />
        <rect x="430" y="304" width="14" height="8" fill="var(--tape)" />
        <text x="437" y="327" textAnchor="middle" fill="var(--text)" stroke="none" fontFamily="var(--font-marker)" fontSize="9">
          BOOKS
        </text>
        <rect x="419" y="274" width="36" height="30" fill="var(--kraft-soft)" />
        <rect x="430" y="274" width="14" height="8" fill="var(--tape)" />
        <text x="437" y="295" textAnchor="middle" fill="var(--text)" stroke="none" fontFamily="var(--font-marker)" fontSize="9">
          LINEN
        </text>
      </g>

      {/* ================================================================
          TWO MOVERS CARRYING A SOFA WRAPPED IN A TEAL QUILTED BLANKET
          ================================================================ */}
      <g stroke="var(--text)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="282" cy="344" rx="18" ry="3" fill="#000000" opacity="0.18" stroke="none" />
        <ellipse cx="380" cy="344" rx="18" ry="3" fill="#000000" opacity="0.18" stroke="none" />

        {/* Rear mover (left) — legs, shorts, torso */}
        <path d="M276 322 L270 340 M287 322 L294 340" strokeWidth="7.5" />
        <path d="M276 322 L270 340 M287 322 L294 340" stroke={SKIN_A} strokeWidth="4" />
        <path d="M265 341 H274 M290 341 H300" stroke="var(--road)" strokeWidth="5" />
        <path d="M271 312 H293 L295 326 H269 Z" fill="var(--road)" />
        <path d="M272 286 H292 L294 314 H270 Z" fill="var(--accent)" />
        <path d="M271 302 H294" stroke="var(--tape)" strokeWidth="3" />
        <circle cx="282" cy="274" r="9" fill={SKIN_A} />
        <path d="M273 272 C274 262, 290 262, 291 272 Z" fill="var(--accent)" />
        <path d="M289 272 H297" strokeWidth="2.5" />

        {/* Front mover (right) — walking toward the truck */}
        <path d="M374 322 L368 340 M386 322 L392 340" strokeWidth="7.5" />
        <path d="M374 322 L368 340 M386 322 L392 340" stroke={SKIN_B} strokeWidth="4" />
        <path d="M363 341 H372 M388 341 H398" stroke="var(--road)" strokeWidth="5" />
        <path d="M369 312 H391 L393 326 H367 Z" fill="var(--road)" />
        <path d="M370 286 H390 L392 314 H368 Z" fill="var(--accent)" />
        <path d="M369 302 H392" stroke="var(--tape)" strokeWidth="3" />
        <circle cx="380" cy="274" r="9" fill={SKIN_B} />
        <path d="M371 272 C372 262, 388 262, 389 272 Z" fill="var(--accent)" />
        <path d="M387 272 H395" strokeWidth="2.5" />

        {/* Blanket-wrapped sofa (arms at each end) carried at waist height */}
        <path d="M300 288 H316 V296 H352 V288 H368 V322 H300 Z" fill="var(--teal)" />
        <path d="M300 288 H316 V296 H352 V288 H368 V322 H300 Z" fill="url(#hero-blanket-quilt)" stroke="none" />
        <path d="M324 296 V322 M344 296 V322" stroke="var(--tape)" strokeWidth="4" />
        <path d="M304 322 V328 M364 322 V328" strokeWidth="3" />

        {/* Arms gripping the sofa ends */}
        <path d="M290 292 L298 306 L306 310" strokeWidth="7.5" />
        <path d="M290 292 L298 306 L306 310" stroke={SKIN_A} strokeWidth="4" />
        <path d="M372 292 L366 306 L360 310" strokeWidth="7.5" />
        <path d="M372 292 L366 306 L360 310" stroke={SKIN_B} strokeWidth="4" />
      </g>
    </svg>
  );
}
