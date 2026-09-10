/** Short painted pink-to-cyan streak used as a section divider. */
export function Streak({ className }: { className?: string }) {
  return <div className={`streak-riot w-24 ${className ?? ""}`} aria-hidden="true" />;
}
