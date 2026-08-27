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
      { id: "test", label: "Test Prep" },
      { id: "presentation", label: "Presentation Prep" },
    ],
  },
  {
    slug: "principles-roleplays",
    title: "Principles",
    subtabs: [
      { id: "exam", label: "Exam Prep" },
      { id: "roleplay", label: "Roleplay Prep" },
    ],
  },
  {
    slug: "prepared-events",
    title: "Prepared Events",
    subtabs: [
      { id: "start", label: "Getting Started" },
      { id: "process", label: "Work Process" },
      { id: "design", label: "Design" },
      { id: "delivery", label: "Presentation" },
      { id: "resources", label: "Resources" },
    ],
  },
  {
    slug: "online-events",
    title: "Online Events",
    subtabs: [
      { id: "smg", label: "Stock Market Game" },
      { id: "vbc", label: "Virtual Business" },
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
      text: `Hey, Indy DECA! Congratulations on passing precomp. Here is a master document of everything you need to know for the competition (tips for districts, states, and ICDC). Everyone on the competition team has worked really hard to give their advice on how to get a medal at ICDC.`,
    },
    {
      type: "p",
      text: `Also, for tips on presentation, a lot of the events are connected. For example, tips that work for written-event presentations also work for roleplays and vice versa. We highly suggest that you look through all the tips that may apply to you to gain the most from these resources.`,
    },
    {
      type: "p",
      text: `We highly suggest that you guys properly look into these resources. Feel free to ask any questions to the competition team if you need anything.`,
    },
    { type: "h3", text: "Competition Team Contacts" },
    {
      type: "list",
      items: [
        `**Janani Jayaraj** — Executive VP of Career Development (can ask anything competition-related): janani.jayaraj.332@k12.friscoisd.org`,
        `**Vaghul Srivallaban** — Director of Online Competition (focused on Online Comp): vaghulvallaban.srivallaban.042@k12.friscoisd.org`,
        `**Krish Bhindi** — Director of Roleplay Competition (focused on roleplays minus principles): krish.bhindi.221@k12.friscoisd.org`,
        `**Sreekar Mali** — Director of Principles Competition (focused on principles events): sreekar.mali.211@k12.friscoisd.org`,
        `**Kavin Jaganathan** — Director of Prepared Events (focused on written events): kavin.jaganathan.088@k12.friscoisd.org`,
      ],
    },
    {
      type: "callout",
      text: `ALSO, keep in mind that there are many tabs and subtabs. Make sure you check out whatever you need for your success — hover **Resources** in the nav to jump straight to a section.`,
    },
  ],
};

export const CLUSTERS: Cluster[] = [
  // ================= GENERAL ROLEPLAYS =================
  {
    slug: "general-roleplays",
    title: "General Roleplays",
    blurb:
      "Individual Series & Team Decision Making events — the test and the roleplay.",
    intro: [
      { type: "h3", text: "Introduction to Roleplays" },
      {
        type: "list",
        items: [
          {
            t: `A roleplay is an on-the-spot event where you are asked to present a 10–15 minute real-world situation to a judge with only 10–30 minutes of preparation time.`,
            sub: [
              `There are 3 main types of roleplays`,
              `All of these events have a test and a presentation`,
            ],
          },
        ],
      },
      { type: "h3", text: "3 Main Events" },
      {
        type: "list",
        items: [
          `**Principles of Business Administration** (look at the Principles tab)`,
          {
            t: `**Individual Series Events** — challenges students to solve specific business problems in a specific career field`,
            sub: [
              `10 minute preparation`,
              `10 minute presentation`,
              `5 performance indicators`,
            ],
          },
          {
            t: `**Team Decision Making** — two students are tasked with analyzing a business case study`,
            sub: [
              `30 minute preparation`,
              `15 minute presentation`,
              `7 performance indicators`,
            ],
          },
        ],
      },
      {
        type: "callout",
        text: `Look at the Principles tab too — a lot of the roleplay advice is shared. All the events are connected.`,
      },
    ],
    subtabs: [
      {
        id: "test",
        label: "Test Prep",
        blocks: [
          { type: "h3", text: "Exam — Roleplay Test Prep" },
          {
            type: "p",
            text: `Look at the Principles Exam Prep too — they're all connected.`,
          },
          {
            type: "creds",
            site: "DECA+",
            href: "http://decaplus.org/login",
            user: "chilesj@friscoisd.org",
            pass: "business#53",
            note: `Has past exams, performance indicators, sample roleplays, and other resources.`,
          },
          {
            type: "links",
            items: [
              {
                label: "AnswerWrite",
                href: "https://practice.answerwrite.com/Login.aspx?id=473",
                note: `District testing website; only has district tests. This is the exact format your district test will use, so the best thing you can do before district is finishing every practice test on AnswerWrite.`,
              },
              {
                label: "Guide on how to use AnswerWrite",
                href: "https://static1.squarespace.com/static/5979c56846c3c439412b7195/t/5c590946652deafb6bdaf699/1549338951310/D7+-+Updated.pdf",
              },
              {
                label: "DECA Resources",
                href: "https://www.deca.org/resources",
                note: `Use the filters to find past exams and roleplays for your event. They will only be district level.`,
              },
              {
                label: "ClusterMaxx",
                href: "https://clustermaxx.com/",
                note: `Uses AI trained on past ICDC tests to create an infinite amount of practice questions you can answer. Costs a few dollars but definitely worth it. Answers to questions are not always correct, but the questions are very high quality. For this reason, make sure you double check with AI what the right answer is and record this in a master doc or wherever else you keep your notes. I have found that fixing these "wrong" questions actually helps commit the content to memory very well.`,
              },
            ],
          },
          {
            type: "list",
            items: [
              `For State/Association and ICDC level tests, you can easily look them up and find them in PDFs online.`,
              `The most important thing is doing as many tests as you possibly can. Test questions are repeated all the time, and questions you see on district/state practice tests are VERY LIKELY to show up again at actual comp.`,
            ],
          },
          {
            type: "h3",
            text: "Workflow that got Krish a 97 on his ICDC Exam",
          },
          {
            type: "list",
            items: [
              `Begin by using whatever AI you prefer to generate a massive doc full of vocab terms that might show up in your cluster/event (a good method is uploading a couple of practice tests/roleplays for it to pull vocab from).`,
              `Make a tab in your master doc for each instructional area in your event. For each concept, include a definition and example/statistic (good to use in roleplay).`,
              `Then, each time you complete a practice test or do ClusterMaxx questions, add the definition/example pair of new terms you don't know. Each event has a huge base of information you should memorize, so slowly adding to this doc over time is a great way to prepare for the exam AND roleplay simultaneously.`,
              `Example of how Krish formatted his master doc last year: [Master Doc](https://docs.google.com/document/d/1oWZLBZz8hVPKEKUJqlhKQfvakUSIQTXyAs4L8mcrivc/edit?usp=sharing)`,
            ],
          },
        ],
      },
      {
        id: "presentation",
        label: "Presentation Prep",
        blocks: [
          { type: "h3", text: "Roleplay Presentation Prep" },
          {
            type: "list",
            items: [
              `The most important part of roleplay prep is simply having an extremely large knowledge base so you are prepared for whatever the event situation throws at you. The best way to prepare is by creating a list of all the vocab terms you find when studying for the exam (see the workflow in Test Prep).`,
              `[How to find PIs for your event](https://docs.google.com/document/d/1Q4vcyLwMqBhoJSJGINARi3_j1KzUwzzpgWNXn74eGZs/edit?tab=t.0)`,
              `For district, find your instructional area and study the PIs within that area extra (you still need to study all the content for the exam, but specifically memorize terms within this area).`,
              {
                t: `Make sure you know the format of a roleplay extremely well.`,
                sub: [
                  `[This resource by Texas DECA](https://drive.google.com/file/d/1vN1bojT7UR9xra8gwN_WUBFy-7fpuhyh/view) has a great outline you can use for your roleplay.`,
                ],
              },
              `[DECA Method to explain performance indicators](https://docs.google.com/document/d/1DjtiO8AlgNMlbx1Y2_1oVsYC35YjRTMwhw511pRC5Vk/edit?tab=t.0)`,
              `For visual aids and props, try to be as creative as possible and think about a bunch of different types of visuals you can create for common PIs — have "templates" in your mind that you can use on comp day. You can also ask AI to generate examples of good visual aids and start from there. Do not only rely on cheap tricks like making a business card (which you should do anyway, it's pretty standard now).`,
              {
                t: `[ICDC-level sample roleplay](https://www.youtube.com/watch?v=uj75zJAuxRA)`,
                sub: [
                  `[Video that breaks down each part of this exact roleplay.](https://www.youtube.com/watch?v=38IoF_qblmk)`,
                  `The other videos by Bowtie GOAT are also great for preparation and tips.`,
                ],
              },
              `[Bowtie Goats roleplay tips](https://docs.google.com/document/d/1yhfD9i1TEWMh1g5QeidbAfrnexPZhMfEvmEqgahyukA/edit?tab=t.0)`,
              {
                t: `As soon as the timer starts, the first thing you should write on your scratch paper is your role, the judge's role, the event situation, and EACH PERFORMANCE INDICATOR (WORD FOR WORD). Remember, you do NOT get the event situation during the roleplay, so make sure you write everything down in detail.`,
                sub: [
                  `After this, you can begin making your notes/visual aids using whatever system works best for you.`,
                ],
              },
              {
                t: `**Communication Skills**`,
                sub: [
                  `Getting comfortable with the terms and concepts of your events is important, but the way you deliver them is arguably more important.`,
                  `If you struggle talking on the spot, a good exercise is talking to a wall for 5–10 minutes without stopping. You can talk about absolutely anything. While you talk, focus on your pace, tone, articulation, posture, and facial expressions.`,
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // ================= PRINCIPLES =================
  {
    slug: "principles-roleplays",
    title: "Principles Events",
    blurb:
      "For first-year members — the Business Administration Core Exam and the roleplay.",
    intro: [
      { type: "h3", text: "Introduction to Principles Events" },
      {
        type: "list",
        items: [
          `Principles events are designed for first-year DECA members, introducing core business concepts.`,
          {
            t: `Competition includes:`,
            sub: [
              `Business Administration Core Exam (100 questions)`,
              `Roleplay`,
            ],
          },
          `Build foundational business skills for more advanced events (such as series events).`,
          `Strongly recommended for first-year members!`,
        ],
      },
      { type: "h3", text: "Competition Format" },
      {
        type: "list",
        items: [
          {
            t: `Split between roleplay (worth 50% of total score at districts; worth 66% at states and ICDC) and the Business Administration Core Exam (worth 50% at districts; worth 33% at states and ICDC).`,
            sub: [
              `**Exam** — 100-question multiple-choice exam (based on business administration core performance indicators, which can be found online).`,
              `Competitors are given 90 minutes to complete the exam.`,
              `**Roleplay** — competitors receive a business scenario and are assigned a specific role, such as a marketing assistant, financial consultant, or store manager.`,
              `First, there is a 10-minute preparation period, where competitors analyze the situation, organize ideas, and create realistic business solutions using the provided performance indicators.`,
              `Then, there is a 10-minute presentation with a judge who is usually experienced in the field of the event. Competitors explain their solution to the scenario, acting as a business professional.`,
              `Judges score competitors based on a rubric, which is mainly focused around the four performance indicators given in the scenario.`,
            ],
          },
        ],
      },
      { type: "h3", text: "5 Main Principles Events" },
      {
        type: "list",
        items: [
          `**Principles of Entrepreneurship (PEN)** — focuses on starting and managing businesses, innovation, leadership, and entrepreneurial thinking.`,
          `**Principles of Marketing (PMK)** — covers advertising, promotion, selling, branding, and understanding customer behavior.`,
          `**Principles of Finance (PFN)** — introduces budgeting, financial planning, banking, investing, and business finance concepts.`,
          `**Principles of Hospitality & Tourism (PHT)** — focuses on travel, tourism, hotels, restaurants, and creating positive customer experiences.`,
          `**Principles of Business Administration and Management (PBM)** — covers general business skills such as communication, management, professionalism, and workplace decision-making.`,
        ],
      },
    ],
    subtabs: [
      {
        id: "exam",
        label: "Exam Prep",
        blocks: [
          { type: "h3", text: "Intro to the Exam" },
          {
            type: "p",
            text: `Look at the General Roleplays Test Prep too — they're all connected.`,
          },
          {
            type: "list",
            items: [
              {
                t: `All Principles competitors take the Business Administration Core Exam.`,
                sub: [
                  `The exam is 100 questions, with around 90 minutes to complete the test.`,
                  {
                    t: `Districts — the exam is worth 50% of a competitor's total score.`,
                    sub: [
                      `To advance, aim for a score of around 80–85, assuming you score around the same on the roleplay.`,
                    ],
                  },
                  {
                    t: `States/ICDC — the exam is worth 33% of a competitor's total score.`,
                    sub: [
                      `To advance to ICDC, aim for a score of high 80s to low 90s.`,
                      `To do well at ICDC, aim for a score of 90+.`,
                    ],
                  },
                  {
                    t: `Usually, time isn't a problem on this exam, so take your time and READ EACH QUESTION CAREFULLY.`,
                    sub: [
                      `Many times, competitors lose valuable points just from misreading a question, so really pay close attention to the wording given.`,
                    ],
                  },
                ],
              },
            ],
          },
          { type: "h3", text: "How to Prepare" },
          {
            type: "list",
            items: [
              {
                t: `The best way to prepare is to take as many practice and past exams as possible!`,
                sub: [
                  `At first, the answers to a good amount of questions may not make sense. However, as you take more of these tests, you start noticing a pattern with these tricky questions.`,
                  `At districts and states, there are usually a good amount of questions that repeat from tests of past years (around 5–10 questions). Doing as many past exams as possible gains you easy points this way.`,
                ],
              },
            ],
          },
          {
            type: "creds",
            site: "Practice Testing Website (VERY IMPORTANT)",
            href: "https://practice.answerwrite.com/Login.aspx?id=473",
            user: "Member ID (which will be sent to you)",
            pass: "district7",
            note: `This website is the BEST resource to prepare for these exams — it has many official exams from previous years. For Principles Events, do all of the Business Administration Core exams. Pro tip: if you finish all the exams, do them again — this fixes past mistakes, helps you remember questions, and spots more patterns. For questions you get wrong, AnswerWrite sometimes has a rationale, but it can be confusing; put the question into Gemini or Claude and ask it to explain not only the correct answer, but why the incorrect answers are wrong. This will help you learn from your mistakes more effectively, and prepare you well for the actual exam.`,
          },
          {
            type: "list",
            items: [
              `**Performance Indicators** — PIs are basically business standards essential in all DECA events. Not only are they used in the roleplay, they also provide the basis for test questions on the exam! A great way to prepare is to go through the list of PIs, paste each one into Gemini, and ask it to explain the PI in depth and provide an application. This helps you solve many of the "weird" questions that often appear on the exam.`,
            ],
          },
          {
            type: "links",
            items: [
              {
                label: "Performance Indicators — Business Admin Core (VERY IMPORTANT)",
                href: "https://cdn.prod.website-files.com/635c470cc81318fc3e9c1e0e/686531687c9ff5c8e4ec94bb_25_High%20School_Performance%20Indicators_BA%20Core.pdf",
                note: `For districts, focus on studying PIs from the instructional area (which is given ahead of time!). For states and ICDC, you need to know EVERY SINGLE PI on this document — make sure you have enough time to go through each one.`,
              },
            ],
          },
          { type: "h3", text: "General Exam Tips" },
          {
            type: "list",
            items: [
              {
                t: `What is the "best action" question? Use this order to decide:`,
                sub: [
                  `Legal compliance → customer safety/trust → documented, measurable fix → long-term brand protection`,
                ],
              },
              `If two answers sound ethical, choose the one that prevents harm upstream and includes a specific policy or process.`,
              `Numbers questions — make sure you know the correct term (like markup vs margin, fixed vs variable); they might throw similar words in as trick questions.`,
              `DECA usually does not like trick questions; usually, their "hard" questions can be easily solved with a simple business principle.`,
              {
                t: `When stuck, choose the answer that is:`,
                sub: [
                  `Most professional`,
                  `Most ethical`,
                  `Most customer-focused`,
                  `Most realistic for long-term business success`,
                ],
              },
            ],
          },
          { type: "h3", text: "Content to Know" },
          {
            type: "links",
            items: [
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
        label: "Roleplay Prep",
        blocks: [
          { type: "h3", text: "Introduction to the Roleplay" },
          {
            type: "list",
            items: [
              {
                t: `All Principles competitors complete 1 roleplay (other than ICDC finalists, who complete 2 roleplays).`,
                sub: [
                  `First, competitors receive the scenario and have 10 minutes to prepare (making talking points, an outline, graphics, etc.).`,
                  `Principles roleplays typically have 4 Performance Indicators (like TEKS) that competitors MUST structure their presentation around.`,
                  {
                    t: `Then, competitors have 10 minutes to present to the judge.`,
                    sub: [
                      `Aim to present for about 7–8 minutes in order to leave the judge 2–3 minutes to ask questions. Leaving time for questions is ESSENTIAL because answering questions is an easy way to boost your score.`,
                    ],
                  },
                  {
                    t: `Districts — the roleplay is worth 50% of a competitor's total score.`,
                    sub: [
                      `To advance, aim for a score of around 80–85, assuming you score around the same on the exam.`,
                    ],
                  },
                  {
                    t: `States/ICDC — the roleplay is worth 66% of a competitor's total score.`,
                    sub: [
                      `To advance to ICDC, aim for a score in the 80s.`,
                      `To do well at ICDC, aim for a score of high 80s to low 90s.`,
                    ],
                  },
                  {
                    t: `Time is a huge element that many competitors struggle with during the roleplay.`,
                    sub: [
                      `Manage your time well during BOTH the preparation and presentation periods (refer to the ideal structure below).`,
                    ],
                  },
                ],
              },
            ],
          },
          { type: "h3", text: "Ideal Roleplay Structure" },
          {
            type: "list",
            items: [
              {
                t: `**Preparation period (10 minutes)**`,
                sub: [
                  `1–1.5 min — read the scenario, performance indicators, and take quick notes (you will not get the scenario paper during your presentation).`,
                  `1.5–3 min — write down your main talking points for the 1st PI.`,
                  `3–4.5 min — write down your main talking points for the 2nd PI.`,
                  `4.5–6 min — write down your main talking points for the 3rd PI.`,
                  {
                    t: `6–7.5 min — write down your main talking points for the 4th PI.`,
                    sub: [
                      `For each PI, use the **DECA method**: **D**efine it, **E**xplain how it is relevant in the real world (e.g. why it's important to a business), **C**onnect it to the scenario (relating the PI to the scenario and explaining how it can solve the problem or directly addresses the scenario), and go **A**bove & beyond (this can include showing a graphic, making another real-world or personal connection, etc.).`,
                    ],
                  },
                  {
                    t: `7.5–10 min — make supporting graphics for your talking points, such as simple graphs, pictures, flowcharts, diagrams, etc.`,
                    sub: [
                      `Graphics are ESSENTIAL, but do not have to be the best drawings; the main purpose is to support what you are saying and to display creativity.`,
                    ],
                  },
                ],
              },
              {
                t: `**Presentation period (10 minutes)**`,
                sub: [
                  `0–1.5 min — introduce yourself to the judge, greet them politely, and introduce the scenario.`,
                  `1.5–3 min — talk about your first PI.`,
                  `3–4.5 min — talk about your second PI.`,
                  `4.5–6 min — talk about your third PI.`,
                  `6–7.5 min — talk about your fourth PI.`,
                  {
                    t: `7.5–10 min — answer questions, end by thanking the judge.`,
                    sub: [
                      `When answering questions, reference your PIs. This is a good way to get extra points for the PIs, which make up the bulk of the rubric.`,
                    ],
                  },
                ],
              },
              `**Pro tip** — you are allowed to bring an analog (non-smart) watch. This is VERY useful for keeping track of time, especially during the presentation period (where you can expect little to no time warnings).`,
            ],
          },
          { type: "h3", text: "How to Prepare" },
          {
            type: "list",
            items: [
              {
                t: `**Study your PIs** — every Principles scenario usually has 4 PIs, and how well you address them is what the judge is mainly grading.`,
                sub: [
                  `The full list of PIs: [Business Admin Core PIs](https://cdn.prod.website-files.com/635c470cc81318fc3e9c1e0e/686531687c9ff5c8e4ec94bb_25_High%20School_Performance%20Indicators_BA%20Core.pdf). For districts, study all the PIs under the given instructional area (known ahead of time). For states and ICDC, study ALL of these PIs.`,
                  `These PIs are also used on the exam, so it is essential to know them.`,
                  `The best way to study is to paste each PI into Gemini or Claude and ask it to define it, explain how it's relevant, and HOW IT CAN BE APPLIED.`,
                ],
              },
              {
                t: `**Practice as many roleplays as possible** — once you know your PIs, get comfortable giving a 10-minute presentation on a random scenario.`,
                sub: [
                  `First, complete all official roleplays from past years on the [DECA Website](https://www.deca.org/) — click your career cluster, scroll down, click your Principles Event, and there should be a good amount of roleplays there.`,
                  {
                    t: `Once you finish the official roleplays, upload official roleplays from your event into Gemini and ask it to generate roleplays that follow THAT FORMAT. Also give it the PI list so it can choose four random ones.`,
                    sub: [
                      `This is a great way to prepare because you truly have an infinite amount of practice by generating these roleplays, which is really helpful for getting a high score.`,
                    ],
                  },
                ],
              },
              {
                t: `**WATCH THESE VIDEOS:**`,
                sub: [
                  `[Roleplay Preparation](https://drive.google.com/file/d/1zszz6fPqTsZzQUF2XVsJ4qTdMi337csO/view?usp=sharing)`,
                  `[Roleplay Presentation](https://drive.google.com/file/d/1FYh7VxaDoGxsbrGTxiGUIyUtNWxgmsEx/view?usp=sharing)`,
                ],
              },
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
                label: "Example roleplay video (with roleplay document in description)",
                href: "https://www.youtube.com/watch?v=aXrHGvyeBcI&t=461s",
              },
              {
                label: "Another great roleplay example video",
                href: "https://www.youtube.com/watch?v=uj75zJAuxRA",
              },
              {
                label:
                  "Roleplay video (explains how to interpret a scenario + how to use the DECA method)",
                href: "https://www.youtube.com/watch?v=QFMVIErCL2c",
              },
            ],
          },
          { type: "h3", text: "Official 2026 District Roleplays" },
          {
            type: "links",
            items: [
              {
                label: "PBM — Principles of Business Administration & Management",
                href: "https://cdn.prod.website-files.com/635c470cc81318fc3e9c1e0e/69a1ed33b265a7940d824efe_DECA_PBM_2026_District_Event.pdf",
              },
              {
                label: "PEN — Principles of Entrepreneurship",
                href: "https://cdn.prod.website-files.com/635c470cc81318fc3e9c1e0e/69a1ed7fcc15ece18fb1fa9a_DECA_PEN_2026_District_Event.pdf",
              },
              {
                label: "PFN — Principles of Finance",
                href: "https://cdn.prod.website-files.com/635c470cc81318fc3e9c1e0e/69a1edb20b6cf11264cfc221_DECA_PFN_2026_District_Event.pdf",
              },
              {
                label: "PHT — Principles of Hospitality & Tourism",
                href: "https://cdn.prod.website-files.com/635c470cc81318fc3e9c1e0e/69a1ed6ba0f434243a419617_DECA_PHT_2026_District_Event.pdf",
              },
              {
                label: "PMK — Principles of Marketing",
                href: "https://cdn.prod.website-files.com/635c470cc81318fc3e9c1e0e/69a1ed96df265ed43108d33c_DECA_PMK_2026_District_Event.pdf",
              },
            ],
          },
          {
            type: "creds",
            site: "DECA+ Website",
            href: "https://www.decaplus.org/login",
            user: "chilesj@friscoisd.org",
            pass: "business#53",
            note: `This website has many great resources, including PI flashcards, sample roleplays, sample exam questions, and much more!`,
          },
          { type: "h3", text: "Sample Roleplay Rubric" },
          {
            type: "list",
            items: [
              `A large portion of the rubric is centered around PIs, so really make sure to explain EACH PI well during your presentation.`,
              `This rubric can also be used to grade yourself as you complete practice roleplays.`,
            ],
          },
          {
            type: "links",
            items: [
              {
                label: "Sample Roleplay Rubric",
                href: "https://decaroleplays.weebly.com/uploads/1/1/0/7/110798425/screen-shot-2017-10-01-at-7-24-52-pm_orig.png",
              },
            ],
          },
        ],
      },
    ],
  },

  // ================= PREPARED (WRITTEN) EVENTS =================
  {
    slug: "prepared-events",
    title: "Prepared Events",
    blurb:
      "Written & pitch events — research, design, and present an original business solution.",
    intro: [
      {
        type: "links",
        items: [
          {
            label: "Introductory Slideshow",
            href: "https://canva.link/w9gw3zlg5dc89rk",
          },
        ],
      },
      {
        type: "p",
        text: `Written Events are aimed at people who have skills in design, presentation, and the ability to research and analyze sources to create an independent and unique business solution.`,
      },
      {
        type: "p",
        text: `Written Plan events are split into 5 main categories, each composed of 3–6 events that share common themes, skills, DECA business categories, and opportunities. They are as follows:`,
      },
      {
        type: "list",
        items: [
          {
            t: `**Business Operations Research Events** (Mixed Clusters)`,
            sub: [
              `Targets research-oriented individuals. You conduct research and analyze the findings to consult with an organization, presenting a strategic plan based on research to target a topic that DECA gives out each year.`,
            ],
          },
          {
            t: `**Project Management Events** (Business Management & Administration Cluster)`,
            sub: [
              `Targets business management and organizational skills. You oversee the various phases of a project — planning, executing, and controlling it overall. Each event has a different type of project and process needed to manage.`,
            ],
          },
          {
            t: `**Entrepreneurship Events** (Entrepreneurship Cluster)`,
            sub: [
              `Targets entrepreneurial mindsets with a knack for problem solving and strategy. You use entrepreneurial skills such as idea generation, purchasing power, consultation, and creativity.`,
            ],
          },
          {
            t: `**Integrated Marketing Campaign Events** (Marketing Cluster)`,
            sub: [
              `Targets marketing skills and creativity. You craft an in-depth marketing campaign for an event, product, or service — including an executive summary, campaign objectives, timeline, budget, etc.`,
            ],
          },
          {
            t: `**Professional Selling and Consulting Events** (Mixed Clusters)`,
            sub: [
              `Targets sales and consultation skills. You use skills in customer service, public outreach, and marketing to improve a business through strategy, digital solutions, and budget awareness.`,
            ],
          },
        ],
      },
      {
        type: "callout",
        text: `Categories highlighted in red on the official list need to take a DECA 100-question Cluster Exam in their respective business clusters, which contributes 30% of their total composite score needed for final ranking.`,
      },
    ],
    subtabs: [
      {
        id: "start",
        label: "Getting Started",
        blocks: [
          {
            type: "p",
            text: `This tab will serve as a general overview of advice, tips, and tricks for producing a good-quality written event. The subtabs below go more in-depth into the 5 different categories housed inside prepared events, and specific strategies that apply to them.`,
          },
          {
            type: "callout",
            text: `It might seem complex, but do not get overwhelmed or scared by prepared events. This is simply a fleshed-out guide, and each part is broken down into other sections. Keep your pace and plan accordingly. Do not get stressed — that's for the roleplay kids.`,
          },
          { type: "h3", text: "Start Early" },
          {
            type: "p",
            text: `When you compete in a prepared event, time is your most valuable asset, and it is what separates good from mediocre. The time you have to plan, create, and practice your presentation is what makes it different (arguably easier) than roleplays.`,
          },
          {
            type: "list",
            items: [
              `Ideally, by now you should have gravitated towards a category of written event, or even picked an event that looks good. It doesn't have to be locked in, but picking an event early — early in the school year, or even in the summer — and creating a solid plan puts you ahead of the competition.`,
              `A lot of people procrastinate and try to cram their entire written event into the last 72 hours, which is why they don't make it to states. When you start 3 months earlier — which might sound crazy — you spread out your work, making it so much easier on yourself.`,
            ],
          },
          {
            type: "callout",
            text: `**IMPORTANT** — The 2026–2027 DECA competition timeline will be a little different from previous ones. District CDC for District 7 has been moved to **December 7th and 8th** (split across two days, so different people go on different days). This means the written-event submission deadline is also pushed up — not released yet, but predicted around **November 20th**, meaning Mr. Chiles will probably want it by around **November 15th**. It may be earlier; the doc will be updated when the official District 7 timeline releases. This gives us less time and, unfortunately, no Thanksgiving break for the written event or winter break to rehearse — which is why we started even earlier. We still have almost 3 months.`,
          },
          { type: "h3", text: "Organization" },
          {
            type: "p",
            text: `After you have chosen an event, read the entire guideline and rubric at least 3 times; it should be clear to you what the event is about, including objectives and risks. Create a Google Drive folder, and share it with your teammates if you have some.`,
          },
          { type: "h3", text: "Recommended File Structure" },
          {
            type: "list",
            items: [
              {
                t: `📁 DECA 2026 Written Event`,
                sub: [
                  {
                    t: `📁 Written Event`,
                    sub: [
                      `📄 Rough Report Outline`,
                      `📄 Content Dump`,
                      `📄 Final Content Info`,
                      `📒 Budget (Revenue, Expenditure, Profit)`,
                      `📄 Prepared Event All Feedback (Continuous Doc)`,
                    ],
                  },
                  {
                    t: `📁 Presentation`,
                    sub: [
                      `📄 Script Rough Draft`,
                      `📄 Script Final Draft`,
                      `📄 Questions Prep`,
                    ],
                  },
                  {
                    t: `📁 Other`,
                    sub: [
                      `📄 Team Timeline`,
                      `📄 Source Link Dump (separated by sources and images)`,
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "p",
            text: `You absolutely do not have to do this; it's just an example. But at least some level of organization throughout the 3 months makes your system much more efficient — you know where to get information when needed and can access it easily.`,
          },
          {
            type: "list",
            items: [
              `Creating a link-dump document is extremely helpful, as sometimes you use sources and forget to cite them because it's tedious. EVERYTHING you get information from needs to be sourced, and EVERY image needs to be cited. Not doing this results in a deduction of points on the rubric, so accountability matters.`,
            ],
          },
        ],
      },
      {
        id: "process",
        label: "Work Process",
        blocks: [
          { type: "h3", text: "Rough Report Outline" },
          {
            type: "p",
            text: `This should be done in the early stages and should be a general outline split by the content sections graded in the rubric (executive summary, target market, budget, key metrics, etc.).`,
          },
          {
            type: "list",
            items: [
              `This does not have to be extremely detailed; it just serves as a guide for the rest of the process.`,
              `Simple bullet points suffice — just brainstorm and keep multiple perspectives. As you delve into the process, you can narrow down to what you need.`,
              `This is the first idea-generation process for ideas, budget, etc.`,
            ],
          },
          { type: "h3", text: "Content Dump" },
          {
            type: "p",
            text: `This part takes a lot of writing, but it shouldn't be formal — it should be detailed. Use the rough report outline and flesh all the simple bullets out. For example, if your primary target market is teenagers living in California, make it more detailed (their traits and how you can impact them).`,
          },
          {
            type: "list",
            items: [
              `Should be 15–20 pages in length ideally, in order to have enough content to be fully in-depth and unique.`,
              `Keep your pace — it does not need to be done in one night. Take your time and flesh everything out.`,
              `It is known as a dump, so anything that could be a possibility, just put it out — anything could be useful in the future.`,
              `Keep it organized based on sections; within those, feel free to use bullets, highlights, and even tables.`,
              `Research is a core part of the process. This stage takes a while but is important to be accurate and detailed. Remember to put all sources in the link dump.`,
            ],
          },
          { type: "h3", text: "Final Content Information" },
          {
            type: "p",
            text: `This might be the difficult part — now you narrow down the information to only what you need.`,
          },
          {
            type: "list",
            items: [
              `For example, a target market should be detailed with primary, secondary, and tertiary markets. You may go more in-depth (demographic, social, etc.), but that's up to you.`,
              `Narrow the content to only what you will use. Make sure everything you go forward with has strong evidence and most of the holes are patched. When asking questions, judges try to poke holes in your argument, so be prepared with ample evidence.`,
              `This step doesn't have to be clean, because information will get revised as you transfer it from a simple Google Doc to your prepared-event Canva.`,
            ],
          },
          { type: "h3", text: "Budget" },
          {
            type: "p",
            text: `Budget is honestly one of the most important features of a prepared event. It comes near the end, has the most numbers, and as a result is the part most competitors mess up on. Most events will have a dedicated section on the rubric just for budget, so it is something that you need to take your time and consideration into. I recommend assigning a dedicated member of the team to this, creating a Google Sheet, and splitting it into revenue and expenditure items.`,
          },
          {
            type: "list",
            items: [
              `A TON of judges target the budget because it's often a competitor's weak angle. They'll pick out an inconsistency, and if you can't defend it, you'll lose points on the budget section.`,
              {
                t: `Every single number needs to have a source. Cross-check multiple sources, because numbers aren't always consistent across sources.`,
                sub: [
                  `This leads to a more accurate number and, when repeated, a more realistic budget that judges will be pleased with.`,
                ],
              },
              {
                t: `Have the itemization of the budget shown, because judges want to see where the money came from and where it's flowing to.`,
                sub: [`This can also minimize the damage if you only get a section of expenses.`],
              },
            ],
          },
          {
            type: "callout",
            text: `BE REALISTIC. If you're doing a marketing campaign for a small pet expo, you do not have $5 million to spend as a marketing campaign, and you certainly don't have a gross profit of $3 million. The point of the budget isn't to earn as much money as possible, but to be realistic and match the scale of whatever you are doing.`,
          },
          {
            type: "list",
            items: [
              `A tip is to almost underestimate. For example, the profit should have a 10% margin of error communicated to the judge, so they know you understand risk and backup. It shows nothing is absolutely guaranteed, but even so, your idea is still successful.`,
              {
                t: `When formatting the budget for the actual written event, use tables, charts, pie charts, etc. Visual aids alongside tables communicate the numbers more easily. Judges look at budgets for 4–5 hours even before they see your work, and numbers often don't pass through their heads.`,
                sub: [
                  `Using tables to format your numbers, then a graph underneath, shows relative scale and helps judges process the numbers.`,
                  `It shows the effort and quality of the budget.`,
                ],
              },
              `Have a positive ROI.`,
              `Judges will target most questions toward the budget and compare it against the strategy presented. They'll try to poke holes, so make sure you and your teammates know each part of the budget inside out — this can easily make or break your presentation.`,
            ],
          },
          { type: "h3", text: "Information Feedback Loop" },
          {
            type: "p",
            text: `The feedback and revision process is one of, if not the most important part of the process. Take the presentation and get feedback from as many people as possible — DECA and non-DECA members, adults and students alike. Multiple perspectives help you locate and fix holes.`,
          },
          {
            type: "list",
            items: [
              `Encourage these people to actively find and point out inconsistencies.`,
              {
                t: `Ask them to be harsh about it, too.`,
                sub: [`This will lead to growth that will be 100% worth it.`],
              },
            ],
          },
          {
            type: "p",
            text: `Part of this revision process also includes cutting unnecessary fluff, tightening arguments, and increasing readability and format. Remember to put all feedback received into a Google Doc, so you don't forget or make the same mistakes twice. This also increases accountability to fix it.`,
          },
          { type: "h3", text: "Presentation Feedback Loop" },
          {
            type: "p",
            text: `After your prepared event is done and you've rehearsed numerous times, it's time for more feedback. This feedback is more important because it's what goes in front of the judge.`,
          },
          {
            type: "list",
            items: [
              `Similar to the information, present to as many people as possible.`,
              `Hand them the same rubric the judges will use on competition day; that way you see exactly which sections you struggle with, and patch them.`,
              {
                t: `Make sure the information is clear and understandable to the judges. Present to people unfamiliar with DECA — your presentation should be able to inform them exactly what the goal is and get the point across clearly.`,
                sub: [`If they are confused, it is your problem.`],
              },
            ],
          },
        ],
      },
      {
        id: "design",
        label: "Design",
        blocks: [
          { type: "h3", text: "Design" },
          {
            type: "list",
            items: [
              `Design matters a ton to the written event. It communicates quality and effort, and makes readability and information organization easier.`,
              `Having a core color palette is extremely useful because the consistency is nice on the eyes — and conformity, especially if your palette matches the organization's, will be much better to look at.`,
            ],
          },
          {
            type: "list",
            items: [
              {
                t: `Readability is a HUGE aspect. Do not cram as many words as possible into a slideshow; this is a big red flag to the judges.`,
                sub: [
                  `Readability means including only necessary words, having graphics and images, and being properly spaced out in an organized manner that leads the judges' eyes without overwhelming them.`,
                  {
                    t: `Do not add fluff and pad your information to sound more complicated.`,
                    sub: [
                      `Judges can tell, and can easily pick real information out of a whole lot of nothing. This can lead to a deduction of points.`,
                      `Be simple, straightforward, and easy to understand; this is what ensures more points, rather than trying to sound like a technical wizard. It might work in some places, but not at DECA.`,
                    ],
                  },
                ],
              },
              {
                t: `Use headers, bold important information, and use white space as needed. You can have up to 10 pages for a report and 20 slides for a slideshow.`,
                sub: [
                  `Most information is communicated orally and through visual aids, so use the slides just as a reference to organize information into sections and as transitions.`,
                  `Also use the slideshows for graphs and images.`,
                ],
              },
              {
                t: `The guidelines also have exact formatting rules that must be followed, or else they'll penalize you.`,
                sub: [
                  `Ex: 16:9 setup for pitch decks and margins for the reports.`,
                  `These are free points, so before exporting, make sure all formatting guidelines are met.`,
                  `The page count might be tricky; read up on exactly what they include, because often the title and cover slide don't count, and you want to maximize what you're given.`,
                ],
              },
            ],
          },
          {
            type: "p",
            text: `Throughout the design process, make sure you are continually getting feedback and always proofreading. Things can always slip by the writer, and readability issues might not stick out to you because you've already read the information — so skim, double-check, and receive feedback from multiple sources.`,
          },
          { type: "h3", text: "Teammates" },
          {
            type: "p",
            text: `The decision to have or not have teammates must be made early on. I highly recommend picking teammates, but ones that respect and rival your work ethic and motivation.`,
          },
          {
            type: "list",
            items: [
              `If they don't match your drive, you'll end up failing due to the team falling behind, communication issues, etc.`,
              `Pick your teammates wisely, because if you do, you can work together to victory.`,
              {
                t: `If you do the prepared event as a team, always split up the workflow equally, and by individual strengths too.`,
                sub: [
                  `Teams can fail easily by not dividing work properly — split up work by sections (timeline, key metrics, etc.) and assign them to members with strengths in them.`,
                  `If genuine interest is displayed, it can motivate teams to work together way more efficiently.`,
                ],
              },
              {
                t: `A divide-and-conquer strategy doesn't mean you shouldn't know what your teammates worked on. Every person should know the entire presentation inside out, because questions can come from any angle to every person.`,
                sub: [
                  `If someone messes up on their portion, another person must be there to back them up — which reinforces the need for the whole team to know all the information.`,
                ],
              },
              {
                t: `Communication is key. The team should have a dedicated group chat only for DECA work. Have many meetings to check up on progress between online messages.`,
                sub: [
                  `Meeting up together is much more effective — all voices can be heard, discussed, and equally distributed.`,
                ],
              },
              `All final review and revision processes should be made together as a team. One person may slip up in an accident, so reviewing as a team can catch inconsistencies altogether and fix them.`,
            ],
          },
        ],
      },
      {
        id: "delivery",
        label: "Presentation & Props",
        blocks: [
          { type: "h3", text: "Oral Presentation" },
          {
            type: "p",
            text: `This section contributes 66% of your overall composite score and covers speaking skills and what should be included in the script. The number one thing I recommend is to be passionate about the topic — be bold, be loud, be enthusiastic, and be funny. Judges love it when competitors are fully into the act: funny jokes, getting serious when needed, and synergy across the whole presentation.`,
          },
          {
            type: "list",
            items: [
              `**MAKE IT FUNNY.** Put a couple of puns here and there. Don't overdo it — find a good balance so the judge finds it enjoyable to be there.`,
              `**Have a good hook.** Obviously, we all learned this, but we need something that can pull the audience in. This will be a hook, and it can be an interesting or fun fact, something to zoom into the scope of the project, etc. Please do not make the hook a rhetorical question.`,
              `**Speak with passion.** You and your teammates should put your hearts into the presentation, speaking with a lot of emotion. Enthusiasm is an extremely powerful tool in persuasion, and you can take advantage of it to perform well in the presentation. Be genuinely excited about it and have fun.`,
              `No monotone voice — there must be a lot of ups and downs in the vocal range.`,
              `Vary the pace of your delivery. It shouldn't be the same monotone speed the entire time; change it up! It makes delivery better and more unique, and doesn't seem like straight memorization.`,
              {
                t: `Cut out the filler words. You have 10–15 minutes for delivery, and every second counts. Take out the fluff and minimize the "ums."`,
                sub: [
                  `If you struggle with "ums," instead of saying um, just pause — a space of silence is better than nonstop filler words.`,
                ],
              },
              `Posture should be upright, with your hands OUT of your pockets and used for hand gestures frequently. Instead of slouching, stand upright and boost your chest; it makes you look and sound more confident.`,
              `**USE YOUR HANDS.** Don't just keep them by your side or in your pockets. Use hand gestures specific to what you're talking about. When not talking, have them in front of you or pointing at a prop or poster. Do not fidget.`,
              `Try not to rock or do any nervous body language. The purpose is to be confident and professional; rocking or fidgeting doesn't communicate professionalism.`,
              `Eye contact with the judge should be natural. If there are multiple judges, evenly split up eye contact between them.`,
              `Smile and have fun. It sounds cheesy, but smiling is contagious and can make the judges have a better time — therefore a better score.`,
            ],
          },
          {
            type: "callout",
            text: `Although notecards are technically allowed for the oral presentation, I HIGHLY HIGHLY HIGHLY don't recommend using them — memorize the entire presentation. It might seem daunting to memorize 10–13 minutes of words, but it's split up with your teammates, and you have time.`,
          },
          {
            type: "list",
            items: [
              {
                t: `Draft the script and start practicing as early as possible. By practicing, I mean standing up, pacing around the room, and rehearsing the lines.`,
                sub: [
                  `Standing up instead of sitting at your desk pseudo-simulates competition vibes, and standing creates a sense of readiness that helps with memorization.`,
                ],
              },
              `I recommend recording yourself and watching it back — you might not notice, but there are a lot of times a competitor can stutter, use filler words, or mess up, and watching it back catches those slips.`,
            ],
          },
          {
            type: "callout",
            text: `PRACTICE PRACTICE PRACTICE, with your teammates in person too. By the end of this process, and before the competition, the team should have rehearsed the presentation at LEAST 50 times. I'm not joking — this presentation should be able to be rehearsed in your sleep.`,
          },
          {
            type: "list",
            items: [
              `This level of memorization lets the earlier tips shine, such as using hand gestures and speaking with passion while having facial expressions.`,
              `If a teammate slips, you should be able to back them up and recover; that's the level of familiarity you should have before walking in.`,
              `Practice in front of real people, hand them the judge rubric, and ask them to assess. This directly simulates the competition and gives valuable feedback, content- or presentation-wise.`,
            ],
          },
          { type: "h3", text: "Props / Visual Aids" },
          {
            type: "list",
            items: [
              `Having physical props and visual aids is an extremely important factor in the presentation. They can reinforce the content while providing the judges with something memorable, which can be recalled later on.`,
              {
                t: `They are extremely useful for bringing abstract ideas to life — a product, a brand, or a concept.`,
                sub: [
                  `Some say an image is worth a thousand words; a prop can communicate an idea much more effectively than simply speaking and showing it on a slideshow.`,
                ],
              },
              `Judges may sit through 10–15 presentations before even seeing yours, so investing in props communicates both preparation and professionalism.`,
            ],
          },
          {
            type: "list",
            items: [
              {
                t: `A good visual aid has multiple properties that make it stick out. It can communicate something visually that cannot be conveyed by words.`,
                sub: [
                  `If you have a product you designed, making it can encourage physical connection with the judge.`,
                  `Printing out a flyer you might use in a marketing campaign.`,
                ],
              },
              {
                t: `It needs to be good quality, not something scraped together at the last minute.`,
                sub: [
                  `If you make a poster, have it laminated, or at LEAST out of stiff paper.`,
                  `If the product is premium, the props should also be premium.`,
                ],
              },
              `It should be handed at a moment communicated to the rest of the team. Handing a prop right when a specific word is said communicates relevancy and strengthens an argument.`,
            ],
          },
          {
            type: "list",
            items: [
              {
                t: `Even if you have a pitch deck, a poster is highly recommended as a supplementary slideshow. Limit the number of words on the poster and use it as a guide only.`,
                sub: [
                  `Make sure you print these posters professionally and have a sturdy stand, because things can go wrong at any time, extremely quickly.`,
                ],
              },
              `Put in the script the exact time a prop is being handed out. Having that intentional moment can make the prop extra worthwhile.`,
            ],
          },
          { type: "h3", text: "Questions" },
          {
            type: "p",
            text: `At the end of the presentation, leave around 2–3 minutes for the judge to ask questions. These questions can make or break the presentation — they show the judge whether you actually know the content and can patch the holes they try to poke.`,
          },
          {
            type: "list",
            items: [
              `It shows the judges that you actually care about the topic. If you or a teammate freezes, it gives away the idea that you may have just memorized without actually understanding.`,
              {
                t: `I suggest using Claude or any other AI chatbot to generate questions and poke holes based on the written event and script. Using AI as Devil's Advocate finds weaknesses and prepares your speaking skills with new, unexpected questions.`,
                sub: [
                  `Ask AI to interrogate the budget and the appendix, as those are things judges will also ask.`,
                  `If there is a question about where a number is from, you should be prepared.`,
                  `Target the weakest section always.`,
                ],
              },
              {
                t: `Ask people who have never seen the presentation before to ask questions, and be harsh about feedback.`,
                sub: [
                  `This leads to significant growth in Q&A skills, because they don't know the content beforehand, just like the judge.`,
                ],
              },
              `When answering the question, allow yourself to pause for 1–2 seconds, think about the 3–4 main key points you'll cover, then start.`,
              {
                t: `When working with teammates, have a system so everyone can speak, but also not overlap.`,
                sub: [
                  `Everyone speaking per question communicates that everybody knows the content equally well — but if you don't know the information, simply don't talk.`,
                ],
              },
            ],
          },
          { type: "h3", text: "Research and Sourcing" },
          {
            type: "p",
            text: `This subsection is going to be pretty short since most people who are competing already know how to get credible sources.`,
          },
          {
            type: "callout",
            text: `Let me reinforce that EVERY PIECE OF INFORMATION NEEDS SOME SOURCE ATTRIBUTED IN THE BIBLIOGRAPHY. Sources do not need to be verbally or visually cited, but if the judge wants to know where you got the information from, it must be able to be found in the bibliography somewhere.`,
          },
          {
            type: "list",
            items: [
              `Additionally, all images need to be cited, no matter what. You do not need to cite Canva elements or anything of that sort, but any visual aids gotten from the internet need to be sourced. No need for any sourcing formats — just keep the links of all the information and images you sorted on a Google Doc, and transfer it to the presentation when you are done.`,
              {
                t: `Examples of common information needed and recommended sources:`,
                sub: [
                  `Market overview (size and trends) should come from sources such as IBISWorld and annual sales reports from the industry.`,
                  `Target market evaluation should come from census reports, behavioral data, demographic evaluations, and consumer reports.`,
                ],
              },
              {
                t: `Always use data and statistics to support an argument instead of simply throwing the stat up.`,
                sub: [
                  `If you have a statistic like "73% of Gen Z consumers prefer sustainable packaging," transition into an objective of the strategy you're communicating. This strengthens your argument with evidence and leads back to the core objectives.`,
                ],
              },
              {
                t: `The use of AI is permitted within DECA prepared events, but not entirely.`,
                sub: [
                  `You cannot have the entry and results of the written event be AI; they must be the competitor's original work, or you face disqualification.`,
                  `I encourage the use of AI for other uses, such as brainstorming, source mining (while making them credible on your own), and practicing Q&A (this will be covered in more detail in the questions section).`,
                ],
              },
            ],
          },
          { type: "h3", text: "Timeline" },
          {
            type: "table",
            head: ["Deadline", "Task", "Extra Notes"],
            rows: [
              [
                "August 20th",
                "Start brainstorming which event, and possible ideas for those.",
                "",
              ],
              [
                "September 1st",
                "Pick events, teammates, and thoroughly read the guideline and rubric. Understand the event.",
                "",
              ],
              [
                "September 10th",
                "Do base research, figure out specific topics, general plan, look at other presentations, analyze the rubric to see what they do well.",
                "Find real sources.",
              ],
              [
                "September 20th",
                "Have an outline on a Google Doc, and simple overviews of target market, budget, etc.",
                "",
              ],
            ],
          },
        ],
      },
      {
        id: "resources",
        label: "Resources",
        blocks: [
          { type: "h3", text: "Resources for Prepared Events" },
          {
            type: "links",
            items: [
              {
                label: "GoForGlass — YouTube",
                href: "https://www.youtube.com/@GoForGlassOfficial/videos",
                note: `Great content about the individual parts of a prepared event — target markets, executive summaries, key metrics, etc.`,
              },
              {
                label: "Bowtie GOAT — YouTube",
                href: "https://www.youtube.com/@BowtieGOAT",
                note: `Covers written content, plus tips on how to present like a glass winner, how to format slideshows, etc.`,
              },
              {
                label: "Texas DECA Written Event Resources",
                href: "https://www.texasdeca.org/resources-for-writtenprepared-events",
              },
            ],
          },
          {
            type: "creds",
            site: "Practice Testing Website",
            href: "https://practice.answerwrite.com/Login.aspx?id=473",
            user: "Member ID sent on SportsYou",
            pass: "district7",
          },
          {
            type: "creds",
            site: "DECA+ Website",
            href: "https://www.decaplus.org/login",
            user: "chilesj@friscoisd.org",
            pass: "business#53",
          },
          { type: "h3", text: "Present Like an ICDC Winner" },
          {
            type: "links",
            items: [
              {
                label: "Present Like an ICDC Winner",
                href: "https://www.youtube.com/watch?v=3rlQWvVoD9o",
              },
              {
                label:
                  "4th Internationally — DECA ICDC McDonald's Project 2024 (HTOR Event)",
                href: "https://www.youtube.com/watch?v=atcX7E9VbWM",
              },
              {
                label:
                  "DECA ICDC Winning Written Event Presentation 2025 (HTOR)",
                href: "https://www.youtube.com/watch?v=iTKX0dpc1WY",
              },
              {
                label: "IMCE ICDC 2nd place 2026 — Independence DECA",
                href: "https://drive.google.com/file/d/1H7wsS_ZBXYUbGGnsaXr8Ii7XpJ7kUBrx/view?usp=sharing",
              },
            ],
          },
        ],
      },
    ],
  },

  // ================= ONLINE EVENTS =================
  {
    slug: "online-events",
    title: "Online Events",
    blurb:
      "Stock Market Game, Virtual Business Challenges, and Corporate Challenges.",
    intro: [
      {
        type: "p",
        text: `Look through the different subtabs to get a deeper understanding of the different types of online events.`,
      },
      {
        type: "callout",
        text: `Good luck guys — make ICDC bc it's in Disneyland this time.`,
      },
    ],
    subtabs: [
      {
        id: "smg",
        label: "Stock Market Game",
        blocks: [
          { type: "h3", text: "Stock Market Game" },
          {
            type: "p",
            text: `Overview: "Participants in the Stock Market Game develop and manage an investment portfolio. Each participating team manages all aspects of the portfolio including stock selection, buying and selling. The goal of the competition is to increase the value of the beginning portfolio."`,
          },
          {
            type: "links",
            items: [
              {
                label: "Stock Market Game (DECA)",
                href: "https://www.deca.org/compete/stock-market-game",
              },
            ],
          },
          {
            type: "list",
            items: [
              `1–3 people per team`,
              `Trades go in at the end of the day (3 PM)`,
              `Starting Portfolio: ~$100,000, ICDC goal: ~$200,000`,
              {
                t: `Basic terminology (look into all of these and more before doing trades):`,
                sub: [
                  `**Longs** — stocks you buy because you think they're going up; if it goes up you get a profit equal to the percent it went up. Sell when you are done.`,
                  `**Shorts** — stocks you short because you think they're going down; if it goes down you get a profit equal to the percent it went down. Cover when you are done.`,
                  `**Volatility** — the extent to which a stock price changes over time; high volatility means high change.`,
                  `**Bullish** — stock expected to rise in value (like a charging bull).`,
                  `**Bearish** — stocks expected to decrease in value (like a slow bear?).`,
                  `**Mutual Funds, ETFs, Bonds** — more important for real-life trading; don't really worry about these for this competition.`,
                  `**Market Cap(ital)** — basically the net worth of a company. Companies for SMG have to have a cap over $25M.`,
                  `**Stock price** — amount one share costs; usually cheaper means more volatile (not always). Companies for SMG have to have a stock price over $3.00.`,
                  `**Market Sentiment** — what analysts believe will happen to a stock; ranges from Strong/Moderate Buy, Buy, Hold, Sell, Strong/Moderate Sell.`,
                  `**Price target** — prediction for what a stock's price is expected to be.`,
                  `**Over/Undervalued** — if a stock is overvalued it costs more than its worth and might go down to the target.`,
                  `**Earnings report** — a report of a company's financials; if a company performs better than investors predicted, the stock price could surge, and vice versa.`,
                ],
              },
              `**3-month time period** — because the time is so short you can't really diversify. This means you have to take high risks when trading. For example, prioritize shorts with high volatility, as you can gain the most when they lose money. However, this means sometimes you'll take hard hits — one day you might gain 10k and another you might lose 8k.`,
            ],
          },
          { type: "h3", text: "Average day during SMG to make ICDC" },
          {
            type: "list",
            items: [
              `**Before school (4 AM)** — premarket opens; high volatility because stocks aren't open to trade for most people. Around 7 AM, morning earnings reports come out and the stock price could greatly change.`,
              {
                t: `**In school (8:30 AM – 3 PM)** — regular trading (do this when you're free, like lunch or advisory, so your teachers don't hate you).`,
                sub: [
                  {
                    t: `Look at the [top gaining stocks](https://www.tradingview.com/markets/stocks-usa/market-movers-gainers/) of the day if you want to make a short (meaning they increased the most).`,
                    sub: [
                      `Sometimes, when a stock gains value more than something like 20%, then it could be a sign that it's overhyped and will go down. This usually happens when good (overhyped) news comes out, or maybe a clinical trial for a biomed company went positive and a bunch of people try to invest into the company to make a profit. Some days a stock can go up even 1000%. However, usually the stock will go down the next day, and by shorting such a stock you can make a fast profit. Before you make decisions like this, make sure to thoroughly research into the company, such as the financial stability or times in the past when such an event happened, to make sure you have confidence in your trade.`,
                    ],
                  },
                  `Look at earnings reports for risky companies you want to long, and invest in the Mag7 or tech/AI companies with a high cap if you want a steady cash cow and want to larp in your ICDC presentation.`,
                  {
                    t: `Make a decision on whether you should trade.`,
                    sub: [
                      `Usually make trades of around 20k–30k (without going over the limit) and increase it as you earn more money. You'll earn a lot more when a stock performs how you expected, but also lose more when it doesn't.`,
                    ],
                  },
                  `Keep looking into the stock throughout the day to make sure you made the right decision.`,
                ],
              },
              `**After school (3 PM – 7 PM)** — aftermarket opens, similar to premarket except more stuff happens. Earnings reports come out at 3 PM, so keep on the lookout.`,
            ],
          },
          {
            type: "callout",
            text: `Remember, be smarter than the market and don't make rash decisions based on what you initially think looks good (like don't invest in a company that just went up 50% because you think it'll go up more the next day).`,
          },
          {
            type: "p",
            text: `For more research, look at past ICDC winners' presentations as they explain their methodology.`,
          },
        ],
      },
      {
        id: "vbc",
        label: "Virtual Business Challenges",
        blocks: [
          { type: "h3", text: "Virtual Business Challenges" },
          {
            type: "p",
            text: `Overview: "DECA high school members will be able to participate in all eight Virtual Business Tracks (VBC) of this event — VBC Entrepreneurship, VBC Fashion, VBC Accounting, DECA Hotel Challenge, VBC Personal Finance, VBC Restaurant, VBC Retailing and VBC Sports. Each track encourages DECA members to test their skills within its particular Virtual Business environment — individually or as a team of up to three members."`,
          },
          {
            type: "links",
            items: [
              {
                label: "Virtual Business Challenges (Knowledge Matters)",
                href: "https://www.knowledgematters.com/high-school/competitions/deca/",
              },
            ],
          },
          {
            type: "list",
            items: [
              `Make one of their businesses and run as many simulations as you want until you max out on the most money.`,
            ],
          },
          { type: "h3", text: "Challenge Overviews" },
          {
            type: "list",
            items: [
              {
                t: `**Retail Management** — run a retail store by managing inventory, pricing, promotions, staffing, merchandising, customer service, and expansion.`,
                sub: [
                  `Focus: inventory turnover, profit margins, customer satisfaction, marketing effectiveness.`,
                ],
              },
              {
                t: `**Fashion** — manage a clothing retailer while responding to changing customer trends and seasonal demand.`,
                sub: [
                  `Focus: fashion trends, pricing, marketing, inventory, customer demographics.`,
                ],
              },
              {
                t: `**Sports** — operate a professional sports franchise by selling tickets, hiring staff, managing sponsorships, concessions, and fan engagement.`,
                sub: [
                  `Focus: ticket pricing, marketing, fan satisfaction, revenue, stadium operations.`,
                ],
              },
              {
                t: `**Hotel** — manage a hotel while balancing occupancy, staffing, pricing, guest satisfaction, and profitability.`,
                sub: [
                  `Focus: room pricing, housekeeping, customer reviews, marketing, staffing.`,
                ],
              },
              {
                t: `**Restaurant** — run a restaurant by managing employees, menu prices, food inventory, advertising, customer satisfaction, and profitability.`,
                sub: [`Focus: labor costs, food waste, menu optimization, customer service.`],
              },
              {
                t: `**Personal Finance** — instead of managing a business, you manage someone's financial life.`,
                sub: [`Focus: budgeting, saving, investing, credit, insurance, taxes.`],
              },
              {
                t: `**Accounting** — manage the financial operations of a business by analyzing transactions, preparing financial records, tracking expenses, and making decisions based on accounting data.`,
                sub: [
                  `Focus: financial statements, revenue and expenses, budgeting, cash flow management, accounting accuracy.`,
                ],
              },
              {
                t: `**Entrepreneurship** — create and grow a startup by developing a business idea, managing resources, making financial decisions, and building a sustainable company.`,
                sub: [
                  `Focus: business planning, startup costs, market research, pricing strategy, growth decisions, risk management.`,
                ],
              },
            ],
          },
          {
            type: "callout",
            text: `Overall advice: search up timelapse videos online to see how people usually earn a lot of money doing these simulations.`,
          },
        ],
      },
      {
        id: "corp",
        label: "Corporate Challenges",
        blocks: [
          { type: "h3", text: "Corporate Challenges" },
          {
            type: "p",
            text: `Overview: "DECA's Challenges provide members opportunities to demonstrate the knowledge and skills learned in the classroom through innovative challenges in partnership with several corporate partners. Each challenge has a unique focus and specific set of required tasks and timelines. The top performers will receive recognition on-stage at the DECA International Career Development Conference (ICDC), with approval from the chartered association advisor."`,
          },
          {
            type: "links",
            items: [
              {
                label: "Corporate Challenges (DECA)",
                href: "https://www.deca.org/challenges",
              },
            ],
          },
          {
            type: "list",
            items: [
              `Basically, they give you a topic and you make a short video about it.`,
              `Corporate challenges usually have more money and less competition for the same recognition, and you can do them much faster in your own time (usually in about 1–7 days). There are also 12 corporate challenges, so a lot of opportunities.`,
            ],
          },
          { type: "h3", text: "Typical Workflow" },
          {
            type: "list",
            items: [
              `Find a team if the challenge requires one.`,
              `Look at the requirements and research into it.`,
              `Make a script that checks off each point in the rubric and PIs.`,
              `Record your videos (try to borrow a green screen and other equipment from our school library so it looks professional).`,
              {
                t: `Edit your videos using your preferred software:`,
                sub: [
                  `Recommended: use **Canva** if you want to do it fast with a short learning curve.`,
                  `Use **WeVideo** if you want to use FISD's free WeVideo premium and are used to it (still way worse than Canva imo).`,
                  `Use other software like **DaVinci** (free) or **Adobe** (paid, free at Frisco Library) if you want to spend a lot more time learning complex stuff, hate yourself, and want more features with slightly more professional quality.`,
                ],
              },
              {
                t: `Upload it to the dashboard (different for each corporate challenge).`,
                sub: [
                  `Don't do this late — I lowkey did each of my challenges right on the deadline, had to get an extension for one, and didn't even know if they received it until the award.`,
                ],
              },
            ],
          },
          { type: "h3", text: "Each Corporate Challenge (Deadlines)" },
          {
            type: "table",
            head: ["Challenge", "Deadline"],
            rows: [
              ["DECA at the Bell Challenge", "October 30, 2026"],
              ["Social Influence in the Real-World Challenge", "November 30, 2026"],
              ["Social Media Marketing Simternship Challenge", "December 1, 2026"],
              ["Hospitality Sustainability Innovation Challenge", "December 11, 2026"],
              ["Disability Is Diversity Challenge", "December 18, 2026"],
              ["Personal Branding Challenge", "December 18, 2026"],
              ["Social Impact Leader Challenge", "January 8, 2027"],
              ["Procurement for the Public Good Challenge", "January 8, 2027"],
              ["The Future of Accounting Challenge", "January 11, 2027"],
              ["Food Truck Challenge", "January 15, 2027"],
              ["Digital Presentation Skills Challenge", "February 1, 2027"],
              ["Insurance Pathways Innovation in Action Challenge", "February 1, 2027"],
            ],
          },
        ],
      },
    ],
  },
];
