import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expectations",
  description:
    "Indy DECA member expectations — academics, representation, commitment, and conduct.",
};

const GROUPS: { title: string; items: string[] }[] = [
  {
    title: "Academics & Representation",
    items: [
      "Maintain a passing grade in ALL classes, including AP, Dual Credit, and Advanced courses.",
      "Represent Indy DECA with professionalism, confidence, and poise at all times.",
      "Remember that your behavior reflects not only on yourself, but on Indy DECA and our school.",
      "Dress appropriately and follow all required dress codes when representing Indy DECA.",
      "Conduct yourself respectfully around judges, business professionals, teachers, advisors, competitors, and other chapters.",
      "Maintain a positive and professional presence on social media when posting about Indy DECA.",
      "Avoid any behavior that could negatively impact the reputation of Indy DECA.",
    ],
  },
  {
    title: "Commitment & Preparation",
    items: [
      "Attend required chapter meetings, practices, competitions, conferences, and events.",
      "Arrive on time and prepared for all DECA activities.",
      "Take your competitive event seriously and dedicate sufficient time to preparation.",
      "Complete all required written components, presentations, role-plays, exams, and other materials by their deadlines.",
      "Attend scheduled competition practices and preparation sessions.",
      "Participate in chapter events, fundraisers, community service, and other activities.",
      "Regularly check the chapter's official communication channels for announcements, deadlines, and updates.",
    ],
  },
  {
    title: "Respect & Conduct",
    items: [
      "Treat all members, officers, advisors, teachers, judges, and competitors with respect.",
      "Follow all school, DECA, conference, hotel, transportation, and event rules.",
      "Maintain appropriate behavior during conferences, competitions, trips, and overnight events.",
    ],
  },
];

export default function ExpectationsPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <header className="border-b border-border pb-8">
        <p className="eyebrow">Indy DECA</p>
        <h1 className="mt-3 text-4xl tracking-tight sm:text-5xl">
          Member Expectations
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          The standards every member is expected to uphold when they represent
          Indy DECA.
        </p>
      </header>

      <div className="divide-y divide-border">
        {GROUPS.map((group, i) => (
          <section
            key={group.title}
            className="grid gap-x-12 gap-y-5 py-10 md:grid-cols-[minmax(170px,230px)_1fr]"
          >
            <div className="md:pt-1">
              <span className="font-mono text-xs font-medium tracking-[0.2em] text-royal">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-2 text-lg font-semibold tracking-tight">
                {group.title}
              </h2>
            </div>

            <ul>
              {group.items.map((item) => (
                <li
                  key={item}
                  className="border-t border-border py-4 text-sm leading-relaxed text-foreground/85 first:border-t-0 first:pt-0"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
