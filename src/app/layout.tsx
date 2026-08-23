import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { RouteLoader } from "@/components/route-loader";
import { CookieConsent } from "@/components/cookie-consent";

// Body + UI — clean, legible sans.
const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Display — high-character sans for headings, with strong weight contrast.
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
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
      className={`dark ${geistSans.variable} ${geistMono.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {/* Page-transition loading screen (≥1s, Knights mark + "loading"). */}
        <RouteLoader />

        {/* Giant Knight watermark — kept as a still, low-contrast background
            emblem (no colored glow, no float animation). */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10 flex items-center justify-center overflow-hidden"
        >
          <img
            src="/ihs-deca-combined.png"
            alt=""
            className="w-[min(1100px,92vw)] max-w-none translate-y-16 opacity-[0.05] grayscale"
          />
        </div>

        <Navbar />

        {/* Dynamic page area */}
        <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-12 sm:px-6 sm:py-16">
          {children}
        </main>

        <Footer />

        {/* First-visit cookie notice (bottom of screen). */}
        <CookieConsent />
      </body>
    </html>
  );
}
