"use client";

import { useEffect, useState } from "react";

type Props = {
  text: string;
  /** classes applied to the typed characters (e.g. the brand gradient) */
  textClassName?: string;
  /** ms before typing begins — timed to start as the loader fades */
  startDelay?: number;
  /** ms per character */
  speed?: number;
};

/** Types `text` out character-by-character with a blinking neon caret. */
export function TypedTitle({
  text,
  textClassName,
  startDelay = 1000,
  speed = 115,
}: Props) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setStarted(true), startDelay);
    return () => window.clearTimeout(t);
  }, [startDelay]);

  useEffect(() => {
    if (!started || count >= text.length) return;
    const t = window.setTimeout(() => setCount((c) => c + 1), speed);
    return () => window.clearTimeout(t);
  }, [started, count, text.length, speed]);

  const finished = count >= text.length;

  return (
    <>
      {/* Visible, animated text (caret kept outside the gradient clip). */}
      <span aria-hidden="true" className={textClassName}>
        {text.slice(0, count)}
      </span>
      <span
        aria-hidden="true"
        className={`typed-caret ${finished ? "typed-caret--blink" : ""}`}
      >
        |
      </span>
      {/* Full text for screen readers / SEO. */}
      <span className="sr-only">{text}</span>
    </>
  );
}
