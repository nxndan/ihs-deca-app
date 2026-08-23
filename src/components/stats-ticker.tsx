const STATS = [
  "Top 10 Texas DECA Chapter",
  "100+ State Annual Competitors",
  "200+ Annual District Competitors",
  "30+ State Champions",
  "7 International Top 10 Finishers",
  "Top 20 School Store Internationally",
  "Gold Certified School Business Enterprise",
  "400+ Members",
];

function Row() {
  return (
    <div className="ticker__row" aria-hidden="true">
      {STATS.map((s) => (
        <span key={s} className="ticker__item">
          <span className="ticker__diamond" />
          {s}
        </span>
      ))}
    </div>
  );
}

/** Newscast-style auto-scrolling chapter-stats bar. */
export function StatsTicker() {
  return (
    <div className="ticker border-y border-border bg-surface-1" role="marquee">
      {/* Visually-hidden static copy for screen readers. */}
      <span className="sr-only">
        IHS DECA chapter stats: {STATS.join(", ")}.
      </span>
      <div className="ticker__track">
        <Row />
        <Row />
      </div>
    </div>
  );
}
