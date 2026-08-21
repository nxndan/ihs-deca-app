// ============================================================
//  Competition resources content (from the DECA Comp Prep doc).
//  Text supports inline [label](url) links and **bold**.
//  NO passwords here — those live server-only in
//  src/app/resources/_lib.ts. This file is safe to render, but
//  content is only sent to the client after a cluster is unlocked.
// ============================================================

export type ListItem = string | { t: string; sub?: ListItem[] };

export type Block =
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "list"; items: ListItem[] }
  | { type: "callout"; text: string }
  | {
      type: "creds";
      site: string;
      href?: string;
      user?: string;
      pass?: string;
      note?: string;
    }
  | { type: "links"; items: { label: string; href: string; note?: string }[] }
  | { type: "table"; head: string[]; rows: string[][] };

export type SubTab = { id: string; label: string; blocks: Block[] };

export type Cluster = {
  slug: string;
  title: string;
  blurb: string;
  intro?: Block[];
  subtabs: SubTab[];
};

// ---- Nav mega-menu (labels + hrefs only; safe for the client navbar) ----
export const RESOURCE_MENU: {
  slug: string;
  title: string;
  subtabs: { id: string; label: string }[];
}[] = [
  {
    slug: "general-roleplays",
    title: "General Roleplays",
    subtabs: [
      { id: "test", label: "Roleplay Test" },
      { id: "roleplay", label: "Roleplay" },
    ],
  },
  {
    slug: "principles-roleplays",
    title: "Principles Roleplays",
    subtabs: [
      { id: "test", label: "Test" },
      { id: "roleplay", label: "Roleplay" },
    ],
  },
  {
    slug: "prepared-events",
    title: "Prepared Events",
    subtabs: [
      { id: "tips", label: "Tips" },
      { id: "presentation", label: "Presentation" },
    ],
  },
  {
    slug: "online-events",
    title: "Online Events",
    subtabs: [
      { id: "smg", label: "Stock Market Game" },
      { id: "vbc", label: "Virtual Business Challenge" },
      { id: "corp", label: "Corporate Challenges" },
    ],
  },
];

// ---- General landing (open, no password) ----
export const GENERAL: { blurb: string; blocks: Block[] } = {
  blurb:
    "Everything you need to know for the competition — tips for districts, states, and ICDC.",
  blocks: [
    {
      type: "p",
      text: "Hey, Indy DECA! Congratulations on passing precomp. This is a master hub of everything you need for competition. Everyone on the competition team worked hard to share their advice on how to get a medal at ICDC.",
    },
    {
      type: "p",
      text: "A lot of the events are connected. For example, tips that work for written-event presentations also work for roleplays and vice versa. We highly suggest looking through all the tips that may apply to you to get the most out of these resources.",
    },
    { type: "h3", text: "Competition Team Contacts" },
    {
      type: "list",
      items: [
        "**Janani Jayaraj** — Executive VP of Career Development (anything competition-related): janani.jayaraj.332@k12.friscoisd.org",
        "**Vaghul Srivallaban** — Director of Online Competition: vaghulvallaban.srivallaban.042@k12.friscoisd.org",
        "**Krish Bhindi** — Director of Roleplay Competition (roleplays minus principles): krish.bhindi.221@k12.friscoisd.org",
        "**Sreekar Mali** — Director of Principles Competition: sreekar.mali.211@k12.friscoisd.org",
        "**Kavin Jaganathan** — Director of Prepared Events (written events): kavin.jaganathan.088@k12.friscoisd.org",
      ],
    },
    {
      type: "callout",
      text: "Keep in mind there are many tabs and subtabs. Pick the section that fits your event — hover **Resources** in the nav to jump straight to what you need.",
    },
  ],
};

export const CLUSTERS: Cluster[] = [
  // ================= GENERAL ROLEPLAYS =================
  {
    slug: "general-roleplays",
    title: "General Roleplays",
    blurb: "Series & Team Decision Making events — the test and the roleplay.",
    intro: [
      { type: "h3", text: "Introduction to Roleplays" },
      {
        type: "list",
        items: [
          {
            t: "A roleplay is an on-the-spot event where you present a 10–15 minute real-world situation to a judge with only 10–30 minutes of prep time.",
            sub: [
              "There are 3 main types of roleplays",
              "All of these events have a test and a presentation",
            ],
          },
        ],
      },
      { type: "h3", text: "3 Main Events" },
      {
        type: "list",
        items: [
          "**Principles of Business Administration** (see the Principles Roleplays tab)",
          {
            t: "**Individual Series Events** — solve specific business problems in a career field",
            sub: ["10 minute preparation", "10 minute presentation", "5 performance indicators"],
          },
          {
            t: "**Team Decision Making** — two students analyze a business case study",
            sub: ["30 minute preparation", "15 minute presentation", "7 performance indicators"],
          },
        ],
      },
    ],
    subtabs: [
      {
        id: "test",
        label: "Roleplay Test",
        blocks: [
          { type: "h3", text: "Exam Prep" },
          {
            type: "p",
            text: "Look at the Principles Test prep too — they're all connected. The most important thing is doing as many tests as you possibly can: questions repeat all the time, and questions you see on district/state practice tests are **very likely** to show up again at actual comp.",
          },
          {
            type: "creds",
            site: "DECA+",
            href: "http://decaplus.org/login",
            user: "chilesj@friscoisd.org",
            pass: "business#53",
            note: "Past exams, performance indicators, sample roleplays, and other resources.",
          },
          {
            type: "links",
            items: [
              {
                label: "AnswerWrite",
                href: "https://practice.answerwrite.com/Login.aspx?id=473",
                note: "District testing website — the exact format your district test uses. Finishing every practice test here is the best thing you can do before districts.",
              },
              {
                label: "Guide on how to use AnswerWrite",
                href: "https://static1.squarespace.com/static/5979c56846c3c439412b7195/t/5c590946652deafb6bdaf699/1549338951310/D7+-+Updated.pdf",
              },
              {
                label: "DECA Resources",
                href: "https://www.deca.org/resources",
                note: "Use the filters to find past (district-level) exams and roleplays for your event.",
              },
              {
                label: "ClusterMaxx",
                href: "https://clustermaxx.com/",
                note: "AI trained on past ICDC tests generates infinite practice questions. Costs a few dollars but worth it. Double-check answers with AI and record corrections — fixing “wrong” questions helps commit content to memory.",
              },
            ],
          },
          {
            type: "p",
            text: "For State/Association and ICDC-level tests, you can look them up and find them as PDFs online.",
          },
          { type: "h3", text: "Workflow that got Krish a 97 on his ICDC exam" },
          {
            type: "list",
            items: [
              "Use whatever AI you prefer to generate a massive doc of vocab terms that might show up in your cluster/event (upload a couple of practice tests/roleplays for it to pull vocab from).",
              "Make a tab in your master doc for each instructional area in your event. For each concept, include a definition and an example/statistic (great to use in roleplay).",
              "Each time you complete a practice test or ClusterMaxx questions, add the definition/example pair of new terms you don't know. Slowly building this doc over time prepares you for the exam AND the roleplay at once.",
            ],
          },
          {
            type: "links",
            items: [
              {
                label: "Example master doc (Krish's, last year)",
                href: "https://docs.google.com/document/d/1oWZLBZz8hVPKEKUJqlhKQfvakUSIQTXyAs4L8mcrivc/edit?usp=sharing",
              },
            ],
          },
        ],
      },
      {
        id: "roleplay",
        label: "Roleplay",
        blocks: [
          { type: "h3", text: "Roleplay Presentation Prep" },
          {
            type: "list",
            items: [
              "The most important part of roleplay prep is having an extremely large knowledge base so you're ready for whatever the situation throws at you. Build a list of every vocab term you find while studying for the exam (see the Test tab workflow).",
              {
                t: "For district, find your instructional area and study those PIs extra (you still need all the content for the exam, but specifically memorize terms within this area).",
                sub: [],
              },
              "Know the format of a roleplay extremely well.",
              "For visual aids and props, be as creative as possible — build “templates” in your mind for common PIs that you can reuse on comp day. Ask AI to generate examples of good visual aids to start from. Don't rely only on cheap tricks like a business card (do that anyway — it's standard now).",
              {
                t: "As soon as the timer starts, write on your scratch paper: your role, the judge's role, the event situation, and **each performance indicator (word for word)**. You do NOT get the event situation during the roleplay, so write everything down in detail.",
                sub: ["After this, make your notes/visual aids with whatever system works best."],
              },
              {
                t: "**Communication skills** — how you deliver is arguably more important than the terms themselves.",
                sub: [
                  "If you struggle talking on the spot, practice talking to a wall for 5–10 minutes without stopping about anything, focusing on pace, tone, articulation, posture, and facial expressions.",
                ],
              },
            ],
          },
          { type: "h3", text: "Links & Videos" },
          {
            type: "links",
            items: [
              {
                label: "How to find PIs for your event",
                href: "https://docs.google.com/document/d/1Q4vcyLwMqBhoJSJGINARi3_j1KzUwzzpgWNXn74eGZs/edit?tab=t.0",
              },
              {
                label: "Texas DECA roleplay outline",
                href: "https://drive.google.com/file/d/1vN1bojT7UR9xra8gwN_WUBFy-7fpuhyh/view",
                note: "A great outline you can use for your roleplay.",
              },
              {
                label: "DECA Method to explain performance indicators",
                href: "https://docs.google.com/document/d/1DjtiO8AlgNMlbx1Y2_1oVsYC35YjRTMwhw511pRC5Vk/edit?tab=t.0",
              },
              {
                label: "ICDC-level sample roleplay",
                href: "https://www.youtube.com/watch?v=uj75zJAuxRA",
              },
              {
                label: "Video breaking down each part of that roleplay",
                href: "https://www.youtube.com/watch?v=38IoF_qblmk",
                note: "Other videos by Bowtie GOAT are also great for prep and tips.",
              },
              {
                label: "Bowtie GOATs roleplay tips",
                href: "https://docs.google.com/document/d/1yhfD9i1TEWMh1g5QeidbAfrnexPZhMfEvmEqgahyukA/edit?tab=t.0",
              },
            ],
          },
        ],
      },
    ],
  },

  // ================= PRINCIPLES ROLEPLAYS =================
  {
    slug: "principles-roleplays",
    title: "Principles Roleplays",
    blurb: "First-year events — the Business Admin Core exam and the roleplay.",
    intro: [
      { type: "h3", text: "Introduction to Principles Events" },
      {
        type: "list",
        items: [
          "Principles events are designed for first-year DECA members, introducing core business concepts.",
          {
            t: "Competition includes:",
            sub: ["Business Administration Core Exam (100 questions)", "Roleplay"],
          },
          "They build foundational skills for more advanced events (like series events) — strongly recommended for first-year members!",
        ],
      },
      { type: "h3", text: "Competition Format" },
      {
        type: "list",
        items: [
          "Split between roleplay (50% of score at districts; 66% at states/ICDC) and the Business Administration Core Exam (50% at districts; 33% at states/ICDC).",
          "Exam: 100-question multiple choice, 90 minutes, based on the business administration core performance indicators.",
          "Roleplay: 10-minute prep + 10-minute presentation to a judge. Scored on a rubric focused on the four PIs in the scenario.",
        ],
      },
      { type: "h3", text: "5 Main Principles Events" },
      {
        type: "list",
        items: [
          "**PEN — Principles of Entrepreneurship:** starting/managing businesses, innovation, leadership.",
          "**PMK — Principles of Marketing:** advertising, promotion, selling, branding, customer behavior.",
          "**PFN — Principles of Finance:** budgeting, financial planning, banking, investing.",
          "**PHT — Principles of Hospitality & Tourism:** travel, hotels, restaurants, customer experiences.",
          "**PBM — Principles of Business Administration & Management:** communication, management, professionalism, workplace decision-making.",
        ],
      },
    ],
    subtabs: [
      {
        id: "test",
        label: "Test",
        blocks: [
          { type: "h3", text: "Intro to the Exam" },
          {
            type: "p",
            text: "Look at the general Roleplay Test prep too — they're all connected. All Principles competitors take the 100-question Business Administration Core Exam (~90 minutes).",
          },
          {
            type: "list",
            items: [
              "Districts — worth 50% of your score. To advance, aim for ~80–85 (assuming a similar roleplay score).",
              "States/ICDC — worth 33%. To advance to ICDC, aim for high 80s–low 90s; to do well at ICDC, aim for 90+.",
              "Time usually isn't a problem, so **read each question carefully** — competitors often lose points just from misreading.",
            ],
          },
          { type: "h3", text: "How to Prepare" },
          {
            type: "list",
            items: [
              {
                t: "Take as many practice and past exams as possible.",
                sub: [
                  "Tricky questions start making sense as you take more tests and notice patterns.",
                  "Districts and states usually repeat ~5–10 questions from past years — easy points.",
                ],
              },
              {
                t: "For wrong questions, AnswerWrite sometimes has a rationale, but it can be confusing. Put the question into Gemini or Claude and ask why the correct answer is right AND why the wrong ones are wrong.",
              },
              {
                t: "**Performance Indicators** are business standards used in both the roleplay and the exam. Paste each PI into Gemini and ask it to explain the PI in depth and give an application.",
                sub: [
                  "Districts — focus on PIs from your instructional area (given ahead of time).",
                  "States/ICDC — you need to know every single PI.",
                ],
              },
            ],
          },
          { type: "h3", text: "General Exam Tips" },
          {
            type: "list",
            items: [
              "Best-action questions — decide in this order: legal compliance → customer safety/trust → documented, measurable fix → long-term brand protection.",
              "If two answers sound ethical, choose the one that prevents harm upstream and includes a specific policy or process.",
              "Numbers questions — know the correct term (markup vs margin, fixed vs variable); they throw similar words in as traps.",
              "DECA usually avoids trick questions — “hard” questions are usually solved with a simple business principle.",
              "When stuck, choose the answer that's most professional, most ethical, most customer-focused, and most realistic for long-term success.",
            ],
          },
          {
            type: "creds",
            site: "Practice Testing Website (AnswerWrite) — VERY IMPORTANT",
            href: "https://practice.answerwrite.com/Login.aspx?id=473",
            user: "Member ID (sent to you)",
            pass: "district7",
            note: "The best resource for these exams — many official past exams. For Principles, do all of the Business Administration Core exams. Finish them all, then do them again.",
          },
          {
            type: "links",
            items: [
              {
                label: "Business Admin Core Performance Indicators",
                href: "https://cdn.prod.website-files.com/635c470cc81318fc3e9c1e0e/686531687c9ff5c8e4ec94bb_25_High%20School_Performance%20Indicators_BA%20Core.pdf",
              },
              {
                label: "DECA Principles Content to Know",
                href: "https://docs.google.com/document/d/1oPh-58zlkKQvLiNjMPCqIcOapjwJRt-rydqKGbn6ap8/edit?usp=sharing",
              },
            ],
          },
        ],
      },
      {
        id: "roleplay",
        label: "Roleplay",
        blocks: [
          { type: "h3", text: "Introduction to the Roleplay" },
          {
            type: "list",
            items: [
              "All Principles competitors do 1 roleplay (except ICDC finalists, who do 2).",
              "You get the scenario and 10 minutes to prepare (talking points, outline, graphics).",
              "Principles roleplays typically have **4 performance indicators** you MUST structure your presentation around.",
              "Then 10 minutes to present. Aim to present for ~7–8 minutes to leave the judge 2–3 minutes for questions — answering questions is an easy way to boost your score.",
              "Manage your time well in both the prep and presentation periods.",
            ],
          },
          { type: "h3", text: "Ideal Roleplay Structure" },
          {
            type: "list",
            items: [
              {
                t: "**Preparation period (10 min):**",
                sub: [
                  "1–1.5 min — read the scenario, PIs, and take quick notes (you won't get the scenario paper during the presentation).",
                  "1.5–3 / 3–4.5 / 4.5–6 / 6–7.5 min — write talking points for PI 1, 2, 3, 4. For each, use the **DECA method**: Define it, Explain its real-world relevance, Connect it to the scenario, and go Above & beyond (a graphic, another connection, etc.).",
                  "7.5–10 min — make supporting graphics (simple graphs, pictures, flowcharts). Graphics are essential; they don't need to be perfect — they support what you say and show creativity.",
                ],
              },
              {
                t: "**Presentation period (10 min):**",
                sub: [
                  "0–1.5 min — greet the judge, introduce yourself and the scenario.",
                  "1.5–3 / 3–4.5 / 4.5–6 / 6–7.5 min — talk about PI 1, 2, 3, 4.",
                  "7.5–10 min — answer questions, end by thanking the judge. Reference your PIs when answering — it's extra points.",
                ],
              },
            ],
          },
          {
            type: "callout",
            text: "Pro tip — you're allowed an analog (non-smart) watch. It's very useful for tracking time during the presentation, where you get little to no time warnings.",
          },
          { type: "h3", text: "How to Prepare" },
          {
            type: "list",
            items: [
              "Study your PIs — how well you address them is what the judge grades most. For districts, study all PIs under your given instructional area; for states/ICDC, study ALL of them. Paste each into Gemini/Claude and ask it to define it, explain relevance, and how it can be applied.",
              "Practice as many roleplays as possible. Complete all official roleplays from past years on the DECA website, then upload official roleplays into Gemini and ask it to generate new ones in that format (give it the PI list) for infinite practice.",
            ],
          },
          { type: "h3", text: "Roleplay Resources" },
          {
            type: "links",
            items: [
              {
                label: "Roleplay Preparation (video)",
                href: "https://drive.google.com/file/d/1zszz6fPqTsZzQUF2XVsJ4qTdMi337csO/view?usp=sharing",
              },
              {
                label: "Roleplay Presentation (video)",
                href: "https://drive.google.com/file/d/1FYh7VxaDoGxsbrGTxiGUIyUtNWxgmsEx/view?usp=sharing",
              },
              {
                label: "Business Admin Core PIs",
                href: "https://cdn.prod.website-files.com/635c470cc81318fc3e9c1e0e/686531687c9ff5c8e4ec94bb_25_High%20School_Performance%20Indicators_BA%20Core.pdf",
              },
              {
                label: "Example roleplay video (with roleplay doc in description)",
                href: "https://www.youtube.com/watch?v=aXrHGvyeBcI&t=461s",
              },
              {
                label: "Another great roleplay example video",
                href: "https://www.youtube.com/watch?v=uj75zJAuxRA",
              },
              {
                label: "Roleplay video — interpreting a scenario + using the DECA method",
                href: "https://www.youtube.com/watch?v=QFMVIErCL2c",
              },
            ],
          },
          { type: "h3", text: "Official 2026 District Roleplays" },
          {
            type: "links",
            items: [
              { label: "PBM", href: "https://cdn.prod.website-files.com/635c470cc81318fc3e9c1e0e/69a1ed33b265a7940d824efe_DECA_PBM_2026_District_Event.pdf" },
              { label: "PEN", href: "https://cdn.prod.website-files.com/635c470cc81318fc3e9c1e0e/69a1ed7fcc15ece18fb1fa9a_DECA_PEN_2026_District_Event.pdf" },
              { label: "PFN", href: "https://cdn.prod.website-files.com/635c470cc81318fc3e9c1e0e/69a1edb20b6cf11264cfc221_DECA_PFN_2026_District_Event.pdf" },
              { label: "PHT", href: "https://cdn.prod.website-files.com/635c470cc81318fc3e9c1e0e/69a1ed6ba0f434243a419617_DECA_PHT_2026_District_Event.pdf" },
              { label: "PMK", href: "https://cdn.prod.website-files.com/635c470cc81318fc3e9c1e0e/69a1ed96df265ed43108d33c_DECA_PMK_2026_District_Event.pdf" },
            ],
          },
          {
            type: "creds",
            site: "DECA+",
            href: "https://www.decaplus.org/login",
            user: "chilesj@friscoisd.org",
            pass: "business#53",
            note: "PI flashcards, sample roleplays, sample exam questions, and much more.",
          },
          {
            type: "links",
            items: [
              {
                label: "Sample Roleplay Rubric",
                href: "https://decaroleplays.weebly.com/uploads/1/1/0/7/110798425/screen-shot-2017-10-01-at-7-24-52-pm_orig.png",
                note: "A large portion of the rubric is centered on PIs — explain each one well. Use it to grade yourself on practice roleplays.",
              },
              { label: "DECA Website", href: "https://www.deca.org/" },
            ],
          },
        ],
      },
    ],
  },

  // ================= PREPARED EVENTS =================
  {
    slug: "prepared-events",
    title: "Prepared Events",
    blurb: "Written plan events — the report/process and the oral presentation.",
    intro: [
      {
        type: "p",
        text: "Written events reward design, presentation skills, and the ability to research and analyze sources into a unique business solution.",
      },
      {
        type: "list",
        items: [
          "**Business Operations Research Events** (mixed clusters) — research and analyze findings to consult an organization and present a strategic plan on a yearly topic.",
          "**Project Management Events** (Business Management & Administration) — plan, execute, and control a project.",
          "**Entrepreneurship Events** — idea generation, purchasing power, consultation, and creativity.",
          "**Integrated Marketing Campaign Events** (Marketing) — craft an in-depth marketing campaign with executive summary, objectives, timeline, budget, etc.",
          "**Professional Selling & Consulting Events** (mixed clusters) — customer service, public outreach, and marketing to improve a business.",
        ],
      },
      {
        type: "callout",
        text: "Some categories must take a 100-question DECA Cluster Exam in their business cluster, contributing 30% of the total composite score.",
      },
      {
        type: "links",
        items: [
          { label: "Introductory Slideshow", href: "https://canva.link/w9gw3zlg5dc89rk" },
        ],
      },
    ],
    subtabs: [
      {
        id: "tips",
        label: "Tips",
        blocks: [
          {
            type: "callout",
            text: "Don't get overwhelmed by prepared events. It's a fleshed-out guide broken into sections — keep your pace and plan accordingly. Don't get stressed; that's for the roleplay kids.",
          },
          { type: "h3", text: "Start Early" },
          {
            type: "list",
            items: [
              "Time is your most valuable asset — the time to plan, create, and practice is what separates good from mediocre.",
              "Gravitate toward a category (or pick an event) early — even in summer. It doesn't have to be locked in, but an early start and a solid plan puts you ahead.",
              "People who cram their entire written event into the last 72 hours are the ones who don't make states. Start ~3 months early and spread the work out.",
            ],
          },
          {
            type: "callout",
            text: "**2026–2027 timeline note:** District 7 CDC moved to December 7–8, split across two days. The written-event submission deadline will be pushed up (predicted ~Nov 20, so Mr. Chiles will likely want it ~Nov 15 — possibly earlier). This means no Thanksgiving break for the written event and no winter break to rehearse, which is why we started early.",
          },
          { type: "h3", text: "Organization" },
          {
            type: "list",
            items: [
              "After choosing an event, read the entire guideline and rubric at least 3 times — you should clearly understand objectives and risks.",
              "Create a Google Drive folder and share it with teammates.",
              "Suggested structure: a Written Event folder (rough outline, content dump, final content, budget, feedback doc), a Presentation folder (script rough/final draft, questions prep), and an Other folder (team timeline, source-link dump).",
              "Keep a **link-dump doc** — every piece of info and every image needs a source in the bibliography, or you lose rubric points.",
            ],
          },
          { type: "h3", text: "Work Process" },
          {
            type: "list",
            items: [
              "**Rough Report Outline** — early, general outline split by the graded rubric sections (executive summary, target market, budget, key metrics). Simple bullets suffice; it's the first idea-generation pass.",
              "**Content Dump** — flesh every bullet out in detail (not formal). Ideally 15–20 pages so you have enough to be in-depth and unique. Keep it organized by section; use bullets, highlights, tables. Research is core — be accurate and put all sources in the link dump.",
              "**Final Content Info** — narrow down to only what you'll use. Every claim needs strong evidence; judges try to poke holes, so patch them. Detail things like primary/secondary/tertiary markets.",
              {
                t: "**Budget** — often the most important and most-messed-up section. Assign a dedicated member, use a Google Sheet split into revenue and expenditure.",
                sub: [
                  "Judges target the budget looking for inconsistencies — if you can't defend it, you lose points.",
                  "Every number needs a source; cross-check multiple sources for accuracy.",
                  "Show itemization — where money came from and where it flows.",
                  "**Be realistic** — match the scale of your idea. Almost underestimate; communicate a ~10% margin of error to show you understand risk.",
                  "Format with tables + charts/pie charts. Judges look at budgets for hours before seeing your work; visuals help numbers land. Have a positive ROI.",
                ],
              },
              "**Information Feedback Loop** — get feedback from as many people as possible (DECA and non-DECA, adults and students). Ask them to be harsh and find inconsistencies. Log all feedback in a doc. Cut fluff, tighten arguments, improve readability.",
              "**Presentation Feedback Loop** — after rehearsing, present to many people and hand them the judge's rubric so you see exactly what sections you struggle with. Present to people unfamiliar with DECA — if they're confused, it's your problem.",
            ],
          },
          { type: "h3", text: "Design" },
          {
            type: "list",
            items: [
              "Design communicates quality and effort and improves readability. Use a consistent core color palette (ideally matching the organization's).",
              "Readability is huge — don't cram words (a red flag to judges). Include only necessary words, use graphics/images, and space it out to lead the judge's eyes. Don't pad with fluff — judges can tell.",
              "Use headers, bold important info, and white space. You can have up to 10 pages for a report and 20 slides for a slideshow. Most info is communicated orally + through visuals, so use slides as reference/transitions and for graphs and images.",
              "Follow the exact formatting rules in the guidelines (e.g., 16:9 pitch decks, report margins) — these are free points. Read what counts toward the page count (title/cover slides often don't).",
              "Continually proofread and get feedback — readability issues can slip past you because you already know the content.",
            ],
          },
          { type: "h3", text: "Teammates" },
          {
            type: "list",
            items: [
              "Decide early. Pick teammates who match your work ethic and motivation — if they don't match your drive, the team falls behind.",
              "Split the workflow equally and by individual strengths (timeline, key metrics, etc.).",
              "Everyone should know the entire presentation inside out — questions can come from any angle, and teammates must be able to back each other up.",
              "Communication is key — a dedicated DECA-only group chat plus frequent in-person meetings. Do final review/revision together to catch inconsistencies.",
            ],
          },
          { type: "h3", text: "Research & Sourcing" },
          {
            type: "list",
            items: [
              "Every piece of information needs a source in the bibliography. Sources don't need to be cited verbally/visually, but the judge must be able to find them.",
              "Every image needs to be cited (Canva elements don't). No specific format — just keep links in a doc and transfer them at the end.",
              "Common sources: market overview/size/trends → IBISWorld and industry annual reports; target market → census reports, behavioral data, demographic evaluations, consumer reports.",
              "Use data to support an argument — transition a stat into a strategy objective rather than just stating it.",
              "AI is permitted but not entirely — the entry and results must be the competitor's original work (AI content there = disqualification). AI is fine for brainstorming, source mining, and practicing Q&A.",
            ],
          },
          { type: "h3", text: "Timeline" },
          {
            type: "table",
            head: ["Deadline", "Task"],
            rows: [
              ["August 20th", "Start brainstorming which event, and possible ideas."],
              ["September 1st", "Pick events + teammates; thoroughly read the guideline and rubric."],
              ["September 10th", "Base research: specific topics, general plan, analyze other presentations and the rubric. Find real sources."],
              ["September 20th", "Have an outline on a Google Doc with overviews of target market, budget, etc."],
            ],
          },
        ],
      },
      {
        id: "presentation",
        label: "Presentation",
        blocks: [
          {
            type: "p",
            text: "The oral presentation contributes 66% of your overall composite score and covers speaking skills and what goes in the script.",
          },
          { type: "h3", text: "Delivery" },
          {
            type: "list",
            items: [
              "Be passionate — bold, loud, enthusiastic, and funny. Judges love competitors who are fully into the act.",
              "**Make it funny** — a couple of puns here and there, but don't overdo it; find a balance.",
              "Have a good hook to pull the audience in (an interesting fun fact, zooming into the scope). Don't make the hook a rhetorical question.",
              "Speak with passion and emotion — enthusiasm is a powerful persuasion tool. No monotone; vary your vocal range and pace so it doesn't feel memorized.",
              "Cut filler words — every second of your 10–15 minutes counts. If you struggle with “um,” pause instead; silence beats filler.",
              "Posture upright, hands OUT of pockets and used for gestures. Use your hands specifically to what you're saying; when not talking, keep them in front or pointing at a prop. Don't fidget, rock, or show nervous body language.",
              "Natural eye contact — split evenly between multiple judges. Smile and have fun; it's contagious and improves scores.",
            ],
          },
          {
            type: "callout",
            text: "Notecards are technically allowed, but it's **highly** recommended to memorize the entire presentation. Draft the script early and practice by standing up and pacing while rehearsing. Record yourself and watch it back to catch stutters and filler. By comp day, the team should have rehearsed at least **50 times**.",
          },
          { type: "h3", text: "Props / Visual Aids" },
          {
            type: "list",
            items: [
              "Physical props reinforce content and give judges something memorable. They bring abstract ideas (a product, brand, concept) to life.",
              "Judges may sit through 10–15 presentations before yours, so investing in props signals preparation and professionalism.",
              "A good visual aid communicates something words can't, is high quality (laminated or stiff paper; premium props for premium products), and is handed over at an intentional, communicated moment.",
              "Even with a pitch deck, a poster is highly recommended as a supplement — limit words and use it as a guide. Print professionally with a sturdy stand.",
              "Put the exact time a prop is handed out in the script.",
            ],
          },
          { type: "h3", text: "Questions" },
          {
            type: "list",
            items: [
              "Leave ~2–3 minutes for judge questions — they make or break the presentation and show whether you truly know the content.",
              "Use Claude or another AI as devil's advocate to generate questions and poke holes based on your script — especially the budget and appendix.",
              "Ask people who've never seen the presentation to ask questions and be harsh — it mirrors the judge.",
              "When answering, pause 1–2 seconds, pick 3–4 key points, then start. With teammates, have a system so everyone speaks without overlapping — and if you don't know it, don't talk.",
            ],
          },
          { type: "h3", text: "Resources for Prepared Events" },
          {
            type: "links",
            items: [
              {
                label: "GoForGlass — YouTube",
                href: "https://www.youtube.com/@GoForGlassOfficial/videos",
                note: "Great content on individual parts of a prepared event (target markets, executive summaries, key metrics).",
              },
              {
                label: "Bowtie GOAT — YouTube",
                href: "https://www.youtube.com/@BowtieGOAT",
                note: "Written content plus how to present like a glass winner and format slideshows.",
              },
              {
                label: "Texas DECA Written Event Resources",
                href: "https://www.texasdeca.org/resources-for-writtenprepared-events",
              },
              {
                label: "Present Like an ICDC Winner",
                href: "https://www.youtube.com/watch?v=3rlQWvVoD9o",
              },
              {
                label: "4th Internationally — DECA ICDC McDonald's Project 2024 (HTOR)",
                href: "https://www.youtube.com/watch?v=atcX7E9VbWM",
              },
              {
                label: "DECA ICDC Winning Written Event Presentation 2025 (HTOR)",
                href: "https://www.youtube.com/watch?v=iTKX0dpc1WY",
              },
              {
                label: "IMCE ICDC 2nd place 2026 — Independence DECA",
                href: "https://drive.google.com/file/d/1H7wsS_ZBXYUbGGnsaXr8Ii7XpJ7kUBrx/view?usp=sharing",
              },
            ],
          },
          {
            type: "creds",
            site: "Practice Testing Website (AnswerWrite)",
            href: "https://practice.answerwrite.com/Login.aspx?id=473",
            user: "Member ID (sent on SportsYou)",
            pass: "district7",
          },
          {
            type: "creds",
            site: "DECA+",
            href: "https://www.decaplus.org/login",
            user: "chilesj@friscoisd.org",
            pass: "business#53",
          },
        ],
      },
    ],
  },

  // ================= ONLINE EVENTS =================
  {
    slug: "online-events",
    title: "Online Events",
    blurb: "Stock Market Game, Virtual Business Challenges, and Corporate Challenges.",
    intro: [
      {
        type: "p",
        text: "Look through the tabs to understand the different online events. Good luck — make ICDC, it's in Disneyland this time.",
      },
    ],
    subtabs: [
      {
        id: "smg",
        label: "Stock Market Game",
        blocks: [
          {
            type: "p",
            text: "Teams develop and manage an investment portfolio — stock selection, buying, and selling. The goal is to increase the value of the beginning portfolio.",
          },
          {
            type: "list",
            items: [
              "1–3 people per team.",
              "Trades go in at the end of the day (3 PM).",
              "Starting portfolio: ~$100,000. ICDC goal: ~$200,000.",
            ],
          },
          { type: "h3", text: "Basic Terminology" },
          {
            type: "list",
            items: [
              "**Longs** — buy because you think it's going up; profit equals the percent it rises. Sell when done.",
              "**Shorts** — short because you think it's going down; profit equals the percent it falls. Cover when done.",
              "**Volatility** — how much a stock's price changes over time.",
              "**Bullish** — expected to rise. **Bearish** — expected to fall.",
              "**Mutual Funds, ETFs, Bonds** — more for real-life trading; don't worry about them here.",
              "**Market Cap** — the net worth of a company (SMG requires a cap over $25M).",
              "**Stock price** — cost of one share (SMG requires over $3.00); cheaper often means more volatile.",
              "**Market Sentiment** — what analysts believe will happen (Strong/Moderate Buy, Buy, Hold, Sell, Strong/Moderate Sell).",
              "**Price target** — the predicted future price. **Over/Undervalued** — costs more/less than its worth.",
              "**Earnings report** — a company's financials; beating investor predictions can surge the price, and vice-versa.",
            ],
          },
          {
            type: "callout",
            text: "3-month time period: the window is so short you can't really diversify, so you have to take high risks — prioritize shorts with high volatility. Some days you might gain $10k and lose $8k the next.",
          },
          { type: "h3", text: "Average Day to Make ICDC" },
          {
            type: "list",
            items: [
              "**Before school (4 AM):** premarket opens (high volatility). Morning earnings reports come out ~7 AM and can move prices a lot.",
              {
                t: "**In school (8:30 AM–3 PM, on your own time like lunch/advisory):** regular trading.",
                sub: [
                  "Look at the top gaining stocks if you want to short — a stock up 20%+ can be overhyped and drop the next day, so research the company first (financial stability, past events).",
                  "Look at earnings reports for risky companies to long; invest in the Mag7 / high-cap tech-AI companies for a steady cash cow.",
                  "Usually trade ~$20k–$30k (without going over the limit) and scale up as you earn.",
                ],
              },
              "**After school (3 PM–7 PM):** aftermarket opens (more happens than premarket). Earnings reports come out at 3 PM.",
            ],
          },
          {
            type: "callout",
            text: "Be smarter than the market — don't make rash decisions on what initially looks good (don't buy a company just because it jumped 50%).",
          },
          {
            type: "links",
            items: [
              {
                label: "Stock Market Game (DECA)",
                href: "https://www.deca.org/compete/stock-market-game",
              },
              {
                label: "Top gaining stocks (TradingView)",
                href: "https://www.tradingview.com/markets/stocks-usa/market-movers-gainers/",
              },
            ],
          },
        ],
      },
      {
        id: "vbc",
        label: "Virtual Business Challenge",
        blocks: [
          {
            type: "p",
            text: "Compete in any of eight Virtual Business tracks — individually or in a team of up to three. Make one of their businesses and run as many simulations as you want until you max out on the most money.",
          },
          { type: "h3", text: "Challenge Overviews" },
          {
            type: "list",
            items: [
              "**Retail Management** — run a retail store (inventory, pricing, promotions, staffing). Focus: inventory turnover, profit margins, customer satisfaction, marketing effectiveness.",
              "**Fashion** — manage a clothing retailer responding to trends and seasonal demand. Focus: fashion trends, pricing, marketing, inventory, customer demographics.",
              "**Sports** — operate a sports franchise (tickets, staff, sponsorships, concessions). Focus: ticket pricing, marketing, fan satisfaction, revenue, stadium operations.",
              "**Hotel** — manage a hotel (occupancy, staffing, pricing, guest satisfaction). Focus: room pricing, housekeeping, customer reviews, marketing, staffing.",
              "**Restaurant** — run a restaurant (employees, menu prices, food inventory, advertising). Focus: labor costs, food waste, menu optimization, customer service.",
              "**Personal Finance** — manage someone's financial life. Focus: budgeting, saving, investing, credit, insurance, taxes.",
              "**Accounting** — analyze transactions, prepare records, track expenses. Focus: financial statements, revenue/expenses, budgeting, cash flow, accuracy.",
              "**Entrepreneurship** — create and grow a startup. Focus: business planning, startup costs, market research, pricing strategy, growth, risk management.",
            ],
          },
          {
            type: "callout",
            text: "Overall advice: search up timelapse videos online to see how people usually earn a lot of money in these simulations.",
          },
          {
            type: "links",
            items: [
              {
                label: "Virtual Business Challenges (KnowledgeMatters)",
                href: "https://www.knowledgematters.com/high-school/competitions/deca/",
              },
            ],
          },
        ],
      },
      {
        id: "corp",
        label: "Corporate Challenges",
        blocks: [
          {
            type: "p",
            text: "DECA's Challenges let members demonstrate classroom skills through innovative challenges with corporate partners. Each has a unique focus, required tasks, and timeline; top performers are recognized on-stage at ICDC. Basically: they give you a topic and you make a short video about it.",
          },
          {
            type: "callout",
            text: "Corporate challenges usually have more money and less competition for the same recognition, and you can do them fast in your own time (~1–7 days). There are 12 of them — a lot of opportunities.",
          },
          { type: "h3", text: "Typical Workflow" },
          {
            type: "list",
            items: [
              "Find a team if the challenge requires one.",
              "Look at the requirements and research the topic.",
              "Make a script that checks off each rubric point and PI.",
              "Record your videos (borrow a green screen and equipment from the school library to look professional).",
              {
                t: "Edit your videos:",
                sub: [
                  "Canva — fast, short learning curve (recommended).",
                  "WeVideo — use FISD's free WeVideo premium if you're used to it.",
                  "DaVinci (free) or Adobe (free at Frisco Library) for more features and time investment.",
                ],
              },
              "Upload to the dashboard (different for each challenge). Don't do it late.",
            ],
          },
          { type: "h3", text: "2026–2027 Corporate Challenge Deadlines" },
          {
            type: "table",
            head: ["Challenge", "Deadline"],
            rows: [
              ["DECA at the Bell", "October 30, 2026"],
              ["Social Influence in the Real-World", "November 30, 2026"],
              ["Social Media Marketing Simternship", "December 1, 2026"],
              ["Hospitality Sustainability Innovation", "December 11, 2026"],
              ["Disability Is Diversity", "December 18, 2026"],
              ["Personal Branding", "December 18, 2026"],
              ["Social Impact Leader", "January 8, 2027"],
              ["Procurement for the Public Good", "January 8, 2027"],
              ["The Future of Accounting", "January 11, 2027"],
              ["Food Truck", "January 15, 2027"],
              ["Digital Presentation Skills", "February 1, 2027"],
              ["Insurance Pathways: Innovation in Action", "February 1, 2027"],
            ],
          },
          {
            type: "links",
            items: [
              { label: "Corporate Challenges (DECA)", href: "https://www.deca.org/challenges" },
            ],
          },
        ],
      },
    ],
  },
];
