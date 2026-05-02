/** Soft bottom fade into the next section’s background — keeps transitions subtle. */
export function SectionBlend({ className }: { className: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 bottom-0 z-[12] h-[4.5rem] bg-gradient-to-b from-transparent ${className}`}
      aria-hidden
    />
  )
}
