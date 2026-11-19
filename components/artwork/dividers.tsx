/** Three angled truck-livery bands (orange, road, teal) with a wave cut-out. */
export function LiveryStripeDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`no-print w-full overflow-hidden leading-none ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1440 36"
        preserveAspectRatio="none"
        className="block h-7 w-full sm:h-9"
      >
        <rect x="0" y="0" width="1440" height="36" fill="var(--road)" />
        {/* Angled 12-degree orange band */}
        <polygon points="0,0 920,0 885,36 0,36" fill="var(--accent)" />
        {/* Teal accent wedge */}
        <polygon points="940,0 1160,0 1125,36 905,36" fill="var(--teal)" />
        {/* Wave cut-out ribbon */}
        <path
          d="M0 24 C180 12, 340 32, 540 18 C720 6, 890 28, 1080 16 C1240 6, 1360 22, 1440 14 L1440 22 C1360 30, 1240 14, 1080 24 C890 36, 720 14, 540 26 C340 40, 180 20, 0 32 Z"
          fill="var(--surface)"
          opacity="0.92"
        />
      </svg>
    </div>
  );
}

/** Tan packing-tape strip printed "THIS WAY UP · FRAGILE · HANDLE WITH CARE" with torn ends. */
export function PackingTapeDivider({
  label = 'THIS WAY UP  ·  FRAGILE  ·  HANDLE WITH CARE',
  className = '',
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={`no-print relative my-4 flex w-full justify-center overflow-hidden py-3 ${className}`}
      aria-hidden="true"
    >
      <div className="tape-strip -rotate-[0.9deg] border-y border-ink/30 px-8 py-1.5 text-xs tracking-[0.16em] sm:px-14 sm:text-sm">
        <span>{label}</span>
      </div>
    </div>
  );
}
