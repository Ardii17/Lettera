export function StatCard({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-2xl border border-line bg-paper p-5">
      <p className="text-sm text-ink-soft">{label}</p>
      <p className="mt-2 font-display text-3xl font-semibold text-ink tabular-nums">{value}</p>
      {hint ? <p className="mt-1 text-xs text-ink-muted">{hint}</p> : null}
    </div>
  );
}
