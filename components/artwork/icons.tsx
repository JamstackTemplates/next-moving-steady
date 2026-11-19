import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function BaseIcon({ size = 24, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

/** Deckhand wave mark used in the header, livery stripe and footer badge. */
export function WaveMark({ className = 'h-5 w-10', ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 20" fill="none" aria-hidden="true" className={className} {...props}>
      <path
        d="M2 13 C8 6, 15 16, 22 9 C29 2, 36 13, 46 6"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M6 17 C12 11, 18 19, 25 13 C31 8, 37 16, 44 11"
        stroke="var(--teal)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function HouseIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M3 11.5 L12 4 L21 11.5" />
      <path d="M5.5 10 V20 H18.5 V10" />
      <path d="M10 20 V14.5 H14 V20" />
    </BaseIcon>
  );
}

export function OfficeTowerIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="4" y="3" width="11" height="18" />
      <path d="M15 9 H20 V21 H15" />
      <path d="M7.5 7 H9.5 M11.5 7 H12 M7.5 11 H9.5 M11.5 11 H12 M7.5 15 H9.5 M11.5 15 H12" />
    </BaseIcon>
  );
}

export function HighwayIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M6 21 L10 3" />
      <path d="M18 21 L14 3" />
      <path d="M12 5 V8 M12 11.5 V14.5 M12 18 V20.5" />
    </BaseIcon>
  );
}

export function CartonIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="3" y="6" width="18" height="14" />
      <path d="M3 10.5 H21" />
      <path d="M10 6 V12.5 H14 V6" />
    </BaseIcon>
  );
}

export function TapeGunIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="9" cy="10" r="5" />
      <circle cx="9" cy="10" r="1.8" />
      <path d="M14 10 H20 L18 16 H14 L13 20 H9.5 L10.5 15" />
    </BaseIcon>
  );
}

export function HandTruckIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M5 4 H8 L11 18 H20" />
      <rect x="11" y="9" width="7" height="6" />
      <circle cx="10.5" cy="19" r="2.2" />
    </BaseIcon>
  );
}

export function FoldedBlanketIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="3" y="6" width="18" height="4.5" rx="1" />
      <rect x="3" y="10.5" width="18" height="4.5" rx="1" />
      <rect x="3" y="15" width="18" height="4.5" rx="1" />
      <path d="M7 6 V19.5 M17 6 V19.5" strokeDasharray="2 2" />
    </BaseIcon>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7 V12 L15.5 14" />
    </BaseIcon>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M6.5 3.5 H9.5 L11 8 L8.8 9.5 C9.9 11.9 12.1 14.1 14.5 15.2 L16 13 L20.5 14.5 V17.5 C20.5 19.2 19 20.5 17.3 20.3 C10.4 19.6 4.4 13.6 3.7 6.7 C3.5 5 4.8 3.5 6.5 3.5 Z" />
    </BaseIcon>
  );
}

export function EnvelopeIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="M3.5 6 L12 13 L20.5 6" />
    </BaseIcon>
  );
}

export function MarkerTickIcon(props: IconProps) {
  return (
    <BaseIcon strokeWidth={3.2} {...props}>
      <path d="M4.5 13 L9.5 18.5 L19.5 5.5" />
    </BaseIcon>
  );
}

export function UpArrowsIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M7.5 16 V6 M4.5 9 L7.5 6 L10.5 9" />
      <path d="M16.5 16 V6 M13.5 9 L16.5 6 L19.5 9" />
      <path d="M4 19.5 H20" />
    </BaseIcon>
  );
}

export function FragileGlassIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M7 3 H17 L15.5 11 C15 13 13.7 14 12 14 C10.3 14 9 13 8.5 11 Z" />
      <path d="M12 14 V20 M8.5 20 H15.5" />
      <path d="M12 4 L10.5 7 L13 9" />
    </BaseIcon>
  );
}

export function UmbrellaIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M3 12 C4.5 6.5 19.5 6.5 21 12 Z" />
      <path d="M12 12 V18.5 C12 20 10.8 21 9.5 21 C8.5 21 7.8 20.3 7.8 19.3" />
    </BaseIcon>
  );
}

export function SofaIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M4 11 V7.5 C4 6.5 4.8 6 6 6 H18 C19.2 6 20 6.5 20 7.5 V11" />
      <path d="M2.5 11 H5.5 V16 H18.5 V11 H21.5 V17.5 H2.5 Z" />
      <path d="M5 17.5 V20 M19 17.5 V20" />
    </BaseIcon>
  );
}

export function BedIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M3 7 V19 M21 12 V19 M3 15 H21" />
      <path d="M3 12 H10 V15" />
      <path d="M10 10.5 H19 C20.1 10.5 21 11.4 21 12.5 V15" />
      <circle cx="6.5" cy="9.5" r="1.5" />
    </BaseIcon>
  );
}

export function FridgeIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="6" y="3" width="12" height="18" rx="1" />
      <path d="M6 10 H18" />
      <path d="M9 6.5 V8 M9 12.5 V16" />
    </BaseIcon>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M3.5 6.5 H20.5 M3.5 12 H20.5 M3.5 17.5 H20.5" />
    </BaseIcon>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M5.5 5.5 L18.5 18.5 M18.5 5.5 L5.5 18.5" />
    </BaseIcon>
  );
}

export function PrinterIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M7 8 V4 H17 V8" />
      <rect x="3.5" y="8" width="17" height="8" rx="1" />
      <rect x="7" y="13" width="10" height="7" fill="var(--surface)" />
    </BaseIcon>
  );
}
