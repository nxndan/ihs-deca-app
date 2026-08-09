import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Distinctive display face for headings and the brand mark.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "IHS DECA",
    template: "%s · IHS DECA",
  },
  description:
    "Independence High School DECA — announcements, menu, rec forms, store signups, and competition resources.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {/* Animated purple aurora + grid — fixed behind all content. */}
        <div className="aurora" aria-hidden="true">
          <div className="aurora__blob aurora__blob--1" />
          <div className="aurora__blob aurora__blob--2" />
          <div className="aurora__blob aurora__blob--3" />
        </div>
        <div className="grid-overlay" aria-hidden="true" />

        {/* HUGE faded combined logo — the "mega evolution" ghost behind the site. */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-[15] flex items-center justify-center overflow-hidden"
        >
          <img
            src="/ihs-deca-combined.png"
            alt=""
            className="float-slow w-[min(1150px,94vw)] max-w-none translate-y-20 opacity-[0.12] drop-shadow-[0_0_120px_rgba(168,85,247,0.35)]"
          />
        </div>

        <Navbar />

        {/* Dynamic page area */}
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 sm:py-12">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
