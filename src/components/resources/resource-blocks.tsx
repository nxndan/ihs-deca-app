import type { Block, ListItem } from "@/data/resources";

const linkCls =
  "font-medium text-violet-glow underline decoration-purple-bright/40 underline-offset-2 transition-colors hover:text-foreground break-words";

// Parse inline [label](url) links and **bold** into React nodes.
function inline(text: string): React.ReactNode[] {
  const re = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  const out: React.ReactNode[] = [];
  let last = 0;
  let i = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1] !== undefined) {
      out.push(
        <a key={i++} href={m[2]} target="_blank" rel="noreferrer" className={linkCls}>
          {m[1]}
        </a>
      );
    } else {
      out.push(
        <strong key={i++} className="font-semibold text-foreground">
          {m[3]}
        </strong>
      );
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function List({ items }: { items: ListItem[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => {
        const text = typeof item === "string" ? item : item.t;
        const sub = typeof item === "string" ? undefined : item.sub;
        return (
          <li key={i} className="text-sm leading-relaxed text-muted-foreground">
            <span className="mr-2 text-purple-bright/70">–</span>
            {inline(text)}
            {sub && sub.length > 0 && (
              <div className="mt-1.5 ml-5 border-l border-white/10 pl-4">
                <List items={sub} />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function ResourceBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h3":
            return (
              <h3
                key={i}
                className="font-heading text-lg font-bold tracking-tight text-foreground"
              >
                {b.text}
              </h3>
            );
          case "p":
            return (
              <p key={i} className="text-sm leading-relaxed text-muted-foreground">
                {inline(b.text)}
              </p>
            );
          case "list":
            return <List key={i} items={b.items} />;
          case "callout":
            return (
              <div
                key={i}
                className="rounded-xl border border-purple-bright/25 bg-purple/10 p-4 text-sm leading-relaxed text-violet-glow"
              >
                {inline(b.text)}
              </div>
            );
          case "creds":
            return (
              <div
                key={i}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">
                    {b.href ? (
                      <a href={b.href} target="_blank" rel="noreferrer" className={linkCls}>
                        {b.site}
                      </a>
                    ) : (
                      b.site
                    )}
                  </span>
                </div>
                <dl className="mt-2 grid gap-1 text-sm sm:grid-cols-[auto_1fr] sm:gap-x-3">
                  {b.user && (
                    <>
                      <dt className="text-muted-foreground">Username</dt>
                      <dd className="font-mono text-foreground">{b.user}</dd>
                    </>
                  )}
                  {b.pass && (
                    <>
                      <dt className="text-muted-foreground">Password</dt>
                      <dd className="font-mono text-foreground">{b.pass}</dd>
                    </>
                  )}
                </dl>
                {b.note && (
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {inline(b.note)}
                  </p>
                )}
              </div>
            );
          case "links":
            return (
              <ul key={i} className="space-y-2">
                {b.items.map((l, j) => (
                  <li
                    key={j}
                    className="rounded-xl border border-white/10 bg-white/[0.02] p-3 transition-colors hover:border-purple-bright/40"
                  >
                    <a href={l.href} target="_blank" rel="noreferrer" className={linkCls}>
                      {l.label} ↗
                    </a>
                    {l.note && (
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {inline(l.note)}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            );
          case "table":
            return (
              <div
                key={i}
                className="overflow-x-auto rounded-xl border border-white/10"
              >
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.03]">
                      {b.head.map((h, j) => (
                        <th
                          key={j}
                          className="px-4 py-2.5 font-semibold text-foreground"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((row, r) => (
                      <tr key={r} className="border-b border-white/5 last:border-0">
                        {row.map((cell, c) => (
                          <td
                            key={c}
                            className={
                              c === 0
                                ? "whitespace-nowrap px-4 py-2.5 font-medium text-foreground"
                                : "px-4 py-2.5 text-muted-foreground"
                            }
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
