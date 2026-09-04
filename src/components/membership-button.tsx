import Link from "next/link";
import { Store } from "lucide-react";

export function MembershipButton() {
  return (
    <Link
      href="/market"
      className="shimmer glow-purple inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple to-magenta px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
    >
      <Store className="h-4 w-4" />
      Volunteer with Knights Market
    </Link>
  );
}
