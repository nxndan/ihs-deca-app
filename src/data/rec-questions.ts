// ============================================================
//  Letter of Recommendation questionnaire — shared schema.
//  Used by the form (rendering) AND the API route (email body),
//  so the two never drift. To add/edit a question, edit here.
// ============================================================

export type FieldKind =
  | "text"
  | "email"
  | "tel"
  | "date"
  | "textarea"
  | "radio"
  | "checkboxes";

export type Field = {
  id: string;
  label: string;
  kind: FieldKind;
  required?: boolean;
  help?: string;
  placeholder?: string;
  options?: string[]; // for radio / checkboxes
  half?: boolean; // render two-up on wide screens
};

export type Section = {
  title: string;
  description?: string;
  fields: Field[];
};

export const AWARD_OPTIONS = [
  "AP Scholar With Distinction",
  "AP Capstone Diploma",
  "Dual Credit",
  "Graduating High School With AA/AAS",
  "National Honor Society",
  "Top 20",
  "Top 10% — Automatic admission into Texas public colleges",
  "Top 25%",
  "CNA",
];

export const REC_SECTIONS: Section[] = [
  {
    title: "Legal Name",
    description:
      "Please list your legal name as it appears on your transcripts and government-issued ID.",
    fields: [
      { id: "legalFirst", label: "First name", kind: "text", required: true, half: true },
      { id: "legalLast", label: "Last name", kind: "text", required: true, half: true },
    ],
  },
  {
    title: "Nickname",
    description:
      "The name you go by, if it differs from your legal name. e.g. if your legal name is Jonathon and you go by Jon or Jack, list that here.",
    fields: [{ id: "nickname", label: "Nickname", kind: "text" }],
  },
  {
    title: "Contact & Logistics",
    fields: [
      {
        id: "email",
        label: "Email",
        kind: "email",
        required: true,
        help: "Please list an email address that you regularly check.",
      },
      {
        id: "phone",
        label: "Where can he call in case of last-minute questions?",
        kind: "tel",
        required: true,
      },
      {
        id: "deadline",
        label: "When does your letter need to be submitted?",
        kind: "date",
        required: true,
      },
      {
        id: "submitMethod",
        label: "How does your letter need to be submitted?",
        kind: "text",
        required: true,
        placeholder: "e.g. Email, Naviance, Common App, mailed…",
      },
    ],
  },
  {
    title: "You & Mr. Chiles",
    fields: [
      {
        id: "yearsKnown",
        label: "How many years have you known Mr. Chiles?",
        kind: "text",
        required: true,
      },
      {
        id: "wasTeacher",
        label: "Was Mr. Chiles your teacher?",
        kind: "radio",
        required: true,
        options: ["Yes", "No"],
      },
      {
        id: "teacherClasses",
        label: "If so, what classes did you take or are you currently enrolled in?",
        kind: "textarea",
      },
      {
        id: "wasAdvisor",
        label: "Was Mr. Chiles your DECA advisor?",
        kind: "radio",
        required: true,
        options: ["Yes", "No"],
      },
      {
        id: "wasApIntern",
        label: "Was Mr. Chiles your Assistant Principal Intern?",
        kind: "radio",
        options: ["Yes", "No"],
      },
      {
        id: "apInternCapacity",
        label: "If so, in what capacity did you interact with one another?",
        kind: "textarea",
      },
    ],
  },
  {
    title: "About You",
    fields: [
      {
        id: "aboutYou",
        label: "Please tell him about you.",
        kind: "textarea",
        required: true,
        help: "Pretend like you have not met. What would you like the people reading your letter to know? What makes you different? Why are you exceptional? What are your strengths? What makes you stand out?",
      },
      {
        id: "futurePlans",
        label: "What are your plans for the future?",
        kind: "textarea",
        help: "What are your career goals and aspirations?",
      },
      {
        id: "scholarship",
        label: "Have you received a scholarship?",
        kind: "textarea",
      },
    ],
  },
  {
    title: "Academics",
    fields: [
      { id: "gpa", label: "What is your GPA?", kind: "text", required: true, half: true },
      {
        id: "weightedGpa",
        label: "What is your weighted GPA?",
        kind: "text",
        required: true,
        half: true,
      },
      {
        id: "classRank",
        label: "What is your class rank?",
        kind: "text",
        required: true,
        placeholder: "e.g. 12 of 480",
      },
      {
        id: "apCourses",
        label: "Please list all of the AP courses you have taken.",
        kind: "textarea",
        help: "If you have taken the tests, please list the results as well.",
      },
      {
        id: "sat",
        label: "What is your SAT score?",
        kind: "text",
        required: true,
        help: "If you have taken it multiple times, give your average score and your best score.",
      },
      {
        id: "act",
        label: "What is your ACT score?",
        kind: "text",
        required: true,
        help: "If you have taken it multiple times, give your average score and your best score.",
      },
      {
        id: "testExplanation",
        label:
          "If you have not taken the SAT/ACT, or are not including them, please share why.",
        kind: "textarea",
      },
    ],
  },
  {
    title: "In Your Own Words",
    fields: [
      {
        id: "thirdPerson",
        label:
          "Write a third-person paragraph about yourself that details how you have used one or more of the traits below.",
        kind: "textarea",
        required: true,
        help: "Leadership · Potential · Skills/Abilities · Strengths · Dependability · Consistency · Persistence · Motivation · Character · Contributions (to class or community) · Accomplishments",
      },
      {
        id: "academicInterests",
        label: "What are your academic interests and goals?",
        kind: "textarea",
        required: true,
        help: "Be as detailed as you like — this is one of the primary elements they look for.",
      },
      {
        id: "personalStrengths",
        label: "What are your personal strengths and values?",
        kind: "textarea",
        required: true,
        help: "Be as detailed as you like — this is one of the primary elements they look for.",
      },
      {
        id: "memorableMoments",
        label:
          "Do you have any memorable moments where Mr. Chiles was present that you'd like to share?",
        kind: "textarea",
        help: "Be as detailed as you like.",
      },
    ],
  },
  {
    title: "Activities & Awards",
    fields: [
      {
        id: "activities",
        label:
          "Please list all extracurricular, co-curricular, and outside leadership positions.",
        kind: "textarea",
        help: "Start with the most current dates, working backward to your freshman year.",
        placeholder:
          "- Student Council, President, 2021–2022\n- DECA, VP of Membership & Communications, 2021–2022\n- Subway, Shift Lead, 2021–present\n- Speech & Debate, Treasurer, 2019–2020\n- DECA, Historian, 2018–2019",
      },
      {
        id: "awards",
        label: "Please list any awards you have received. Select those that apply.",
        kind: "checkboxes",
        options: AWARD_OPTIONS,
      },
    ],
  },
  {
    title: "Anything Else",
    fields: [
      {
        id: "anythingElse",
        label: "Is there anything else that you would like to have added?",
        kind: "textarea",
        required: true,
        help: "Is there something that you think Mr. Chiles would like to know?",
      },
    ],
  },
];

// Flat list of all fields (handy for the email builder + validation).
export const REC_FIELDS: Field[] = REC_SECTIONS.flatMap((s) => s.fields);
