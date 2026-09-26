import type { Metadata } from "next";
import { Mail, Users, Store, Trophy, Megaphone, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Independence DECA — reach the officer team for general inquiries, membership, Knights Market, competition, and marketing.",
};

type Contact = { label?: string; emails: string[] };
type Group = {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  contacts: Contact[];
};

const GROUPS: Group[] = [
  {
    title: "General Inquiries",
    icon: Mail,
    contacts: [{ emails: ["varnit.khare.254@k12.friscoisd.org"] }],
  },
  {
    title: "Membership Team",
    icon: Users,
    contacts: [
      {
        emails: [
          "venkatasailokesh.abburi.283@k12.friscoisd.org",
          "prisha.bhatia.490@k12.friscoisd.org",
        ],
      },
    ],
  },
  {
    title: "Knights Market / SBE Team",
    icon: Store,
    contacts: [
      {
        emails: [
          "nandan.ramaswamy.075@k12.friscoisd.org",
          "saianish.palleti.360@k12.friscoisd.org",
          "aaryan.sharma.708@k12.friscoisd.org",
        ],
      },
    ],
  },
  {
    title: "Competition Team",
    icon: Trophy,
    contacts: [
      {
        label: "General Competition Information",
        emails: ["janani.jayaraj.332@k12.friscoisd.org"],
      },
      {
        label: "Roleplay Competition Information",
        emails: [
          "krish.bhindi.221@k12.friscoisd.org",
          "janani.jayaraj.332@k12.friscoisd.org",
        ],
      },
      {
        label: "Principles Competition Information",
        emails: [
          "sreekar.mali.211@k12.friscoisd.org",
          "janani.jayaraj.332@k12.friscoisd.org",
        ],
      },
      {
        label: "Written Competition Information",
        emails: [
          "kavin.jaganathan.088@k12.friscoisd.org",
          "janani.jayaraj.332@k12.friscoisd.org",
        ],
      },
      {
        label: "Virtual Competition Information",
        emails: [
          "vaghulvallaban.srivallaban.042@k12.friscoisd.org",
          "janani.jayaraj.332@k12.friscoisd.org",
        ],
      },
    ],
  },
  {
    title: "Marketing Team",
    icon: Megaphone,
    contacts: [
      {
        emails: [
          "avani.manika.466@k12.friscoisd.org",
          "gurnima.chadha.695@k12.friscoisd.org",
        ],
      },
    ],
  },
];

function EmailLink({ email }: { email: string }) {
  return (
    
      href={`mailto:${email}`}
      className="break-all text-sm font-medium text-foreground underline decoration-border-strong underline-offset-4 transition-colors hover:text-royal hover:decoration-royal"
    >
      {email}
    </a>
  );
}

function ContactCard({ group }: { group: Group }) {
  const Icon = group.icon;
  return (
    <section className="rounded-lg border border-border bg-surface-1 p-6">
      <div className="flex items-center gap-2.5">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border bg-surface-2 text-royal">
          <Icon className="h-4.5 w-4.5" />
        </span>
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          {group.title}
        </h2>
      </div>

      <div className="mt-5 space-y-4">
        {group.contacts.map((c, i) => (
          <div key={i}>
            {c.label && (
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {c.label}
              </p>
            )}
            <div className={`flex flex-col gap-1 ${c.label ? "mt-1.5" : ""}`}>
              {c.emails.map((email) => (
                <EmailLink key={email} email={email} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-10">
      <header>
        <p className="eyebrow">Independence DECA</p>
        <h1 className="mt-3 text-4xl tracking-tight sm:text-5xl">Contact</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Have a question? Reach out to the right team below, or message any
          officer directly on SportsYou.
        </p>
      </header>

      <div className="grid gap-5 md:grid-cols-2">
        {GROUPS.map((group) => (
          <ContactCard key={group.title} group={group} />
        ))}
      </div>

      <div className="rounded-lg border border-border border-l-2 border-l-royal bg-surface-1 p-5">
        <div className="flex items-center gap-2.5 text-base font-semibold text-foreground">
          <MessageCircle className="h-4.5 w-4.5 text-royal" />
          Prefer chat? Message any officer on SportsYou.
        </div>
      </div>
    </div>
  );
}
