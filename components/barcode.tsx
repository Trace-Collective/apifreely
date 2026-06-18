/* Decorative deterministic barcode — bars derived from a seed string so the
   same seed always renders the same pattern. Inherits `currentColor`. */

function bars(seed: string, n: number) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h = (h ^ seed.charCodeAt(i)) >>> 0;
    h = (h * 16777619) >>> 0;
  }
  const out: number[] = [];
  for (let i = 0; i < n; i++) {
    h = (h * 1103515245 + 12345) >>> 0;
    out.push((h % 3) + 1);
  }
  return out;
}

export function Barcode({
  seed = "AF",
  count = 30,
  vertical = false,
  className = "",
}: {
  seed?: string;
  count?: number;
  vertical?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`flex ${vertical ? "flex-col" : ""} items-stretch ${className}`}
      aria-hidden
    >
      {bars(seed, count).map((w, i) => (
        <div
          key={i}
          style={vertical ? { height: `${w * 2}px` } : { width: `${w}px` }}
          className={`${vertical ? "w-full" : "h-full"} ${
            i % 2 === 0 ? "bg-current" : "bg-transparent"
          }`}
        />
      ))}
    </div>
  );
}
