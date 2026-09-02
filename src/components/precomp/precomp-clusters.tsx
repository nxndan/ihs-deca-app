"use client";

import { useState } from "react";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ResLink = { label: string; href: string; meta: string };
type Group = { title: string; links: ResLink[] };
type Cluster = { id: string; name: string; groups: Group[] };

const CLUSTERS: Cluster[] = [
  {
    id: "principles",
    name: "Principles",
    groups: [
      {
        title: "Vocab Practice",
        links: [
          { label: "DECA Principles", href: "https://quizlet.com/116413541/deca-principles-flash-cards/", meta: "Quizlet" },
          { label: "Business Management & Administration Vocab", href: "https://quizlet.com/164680934/deca-business-management-administration-vocab-flash-cards/", meta: "Quizlet" },
          { label: "Principles of Finance Vocab", href: "https://quizlet.com/863645688/deca-principles-of-finance-vocab-flash-cards/", meta: "Quizlet" },
          { label: "Principles of Entrepreneurship Vocab", href: "https://quizlet.com/974191575/principles-of-entrepreneurship-cluster-vocab-deca-flash-cards/", meta: "Quizlet" },
          { label: "DECA Principles Flashcards", href: "https://knowt.com/flashcards/b99f55f4-03f5-49be-827e-833e5367e797", meta: "Knowt" },
        ],
      },
      {
        title: "Practice Tests",
        links: [
          { label: "Principles 2012 — Sample Exam", href: "http://www.bhsdeca.org/uploads/1/1/0/1/110157709/principles_2012_sample.pdf", meta: "PDF" },
          { label: "Principles 2012 Exam", href: "http://www.bhsdeca.org/uploads/1/1/0/1/110157709/principles_2012.pdf", meta: "PDF" },
          { label: "Principles 2013 Exam", href: "http://www.bhsdeca.org/uploads/1/1/0/1/110157709/principles_2013.pdf", meta: "PDF" },
          { label: "Principles 2014 Exam", href: "http://www.bhsdeca.org/uploads/1/1/0/1/110157709/principles_2014.pdf", meta: "PDF" },
          { label: "Principles 2015 Exam", href: "http://www.bhsdeca.org/uploads/1/1/0/1/110157709/principles_2015.pdf", meta: "PDF" },
          { label: "Principles 2016 Exam", href: "http://www.bhsdeca.org/uploads/1/1/0/1/110157709/prinicples_2016.pdf", meta: "PDF" },
        ],
      },
    ],
  },
  {
    id: "business-admin",
    name: "Business Management & Administration",
    groups: [
      {
        title: "Vocab Practice",
        links: [
          { label: "Business Management & Administration", href: "https://quizlet.com/248568470/deca-business-management-and-administration-flash-cards/", meta: "Quizlet" },
          { label: "Business Administration Core Exam Vocabulary", href: "https://quizlet.com/962678703/deca-business-administration-core-exam-vocabulary-flash-cards/", meta: "Quizlet" },
          { label: "Business Management & Administration Terms", href: "https://quizlet.com/36259149/deca-business-management-and-administration-terms-flash-cards/", meta: "Quizlet" },
          { label: "Business Admin Vocab List", href: "https://www.quia.com/jg/2592052list.html", meta: "Quia" },
          { label: "DECA Vocabulary Words", href: "https://www.cram.com/flashcards/marketing-deca-vocabulary-words-6161913", meta: "Cram" },
        ],
      },
      {
        title: "Practice Tests",
        links: [
          { label: "Business Admin Core — Sample Exam 2024", href: "https://cdn.prod.website-files.com/635c470cc81318fc3e9c1e0e/65df46ecf9242065c35e1962_HS_Business_Administration_Core_Sample_Exam_24.pdf", meta: "PDF" },
          { label: "Business Admin Core — Sample Exam 2023", href: "https://cdn.prod.website-files.com/635c470cc81318fc3e9c1e0e/63f8eb8eb66608fec15e8214_HS_Business_Administration_Core_Sample_Exam_23.pdf", meta: "PDF" },
          { label: "Business Admin Core — Sample Exam 2022", href: "https://cdn.prod.website-files.com/635c470cc81318fc3e9c1e0e/63994ce36160af67a4fb5009_HS_Business_Administration_Core_Sample_Exam_22.pdf", meta: "PDF" },
          { label: "Business Admin Core — Sample Exam 2021", href: "https://cdn.prod.website-files.com/635c470cc81318fc3e9c1e0e/63994ccb56af0e223bd4737e_HS_Business_Administration_Core_Sample_Exam_21.pdf", meta: "PDF" },
          { label: "Business Admin Core — Sample Exam 2020", href: "https://cdn.prod.website-files.com/635c470cc81318fc3e9c1e0e/63994cad3051eb77b6561030_HS_Business_Administration_Core_Sample_Exam_20.pdf", meta: "PDF" },
          { label: "Business Admin Core — Sample Exam 2019", href: "https://cdn.prod.website-files.com/635c470cc81318fc3e9c1e0e/63994c8b110b434215e343c7_HS_Business_Administration_Core_Sample_Exam_19.pdf", meta: "PDF" },
          { label: "Business Admin Core — Sample Exam 2018", href: "https://cdn.prod.website-files.com/635c470cc81318fc3e9c1e0e/63994c64198d5a2a25e05e48_HS_Business_Administration_Core_Sample_Exam_18.pdf", meta: "PDF" },
          { label: "Business Admin Core — Sample Exam 2017", href: "https://cdn.prod.website-files.com/635c470cc81318fc3e9c1e0e/63994c1bd06de9523f85d08f_HS_Business_Administration_Core_Sample_Exam_17.pdf", meta: "PDF" },
        ],
      },
    ],
  },
  {
    id: "marketing",
    name: "Marketing",
    groups: [
      {
        title: "Vocab Practice",
        links: [
          { label: "DECA Marketing Vocabulary", href: "https://quizlet.com/33286138/deca-marketing-vocabulary-flash-cards/", meta: "Quizlet" },
          { label: "Marketing Cluster Vocab", href: "https://quizlet.com/241787735/deca-marketing-cluster-vocab-flash-cards/", meta: "Quizlet" },
          { label: "Marketing Vocab List", href: "https://www.quia.com/jg/413067list.html", meta: "Quia" },
          { label: "Marketing DECA Vocabulary Words", href: "https://www.cram.com/flashcards/marketing-deca-vocabulary-words-6161913", meta: "Cram" },
          { label: "DECA Marketing Flashcards", href: "https://knowt.com/flashcards/db2cb11c-3ea8-4940-81be-060795f4d369", meta: "Knowt" },
          { label: "DECA Marketing Flashcards", href: "https://www.studystack.com/flashcard-2256328", meta: "StudyStack" },
        ],
      },
      {
        title: "Practice Tests",
        links: [
          { label: "Marketing 2010 Exam", href: "http://www.bhsdeca.org/uploads/1/1/0/1/110157709/2010_marketing.pdf", meta: "PDF" },
          { label: "Marketing 2011 Exam", href: "http://www.bhsdeca.org/uploads/1/1/0/1/110157709/2011_marekting.pdf", meta: "PDF" },
          { label: "Marketing 2012 ICDC Exam", href: "http://www.bhsdeca.org/uploads/1/1/0/1/110157709/icdc_2012_marketing.pdf", meta: "PDF" },
          { label: "Marketing 2013 Exam", href: "http://www.bhsdeca.org/uploads/1/1/0/1/110157709/marketing_2013.pdf", meta: "PDF" },
          { label: "Marketing Cluster — Sample Exam 2014", href: "http://www.bhsdeca.org/uploads/1/1/0/1/110157709/hs_marketing_cluster_sample_exam2014.pdf", meta: "PDF" },
          { label: "Marketing Sample Exam — Set 1", href: "http://www.bhsdeca.org/uploads/1/1/0/1/110157709/165588_7584a339966f404495ff7f71c0124805.pdf", meta: "PDF" },
          { label: "Marketing Sample Exam — Set 2", href: "http://www.bhsdeca.org/uploads/1/1/0/1/110157709/165588_e1dee23dd0f04db696327e3e78fddf1d.pdf", meta: "PDF" },
          { label: "Marketing Sample Exam — Set 3", href: "http://www.bhsdeca.org/uploads/1/1/0/1/110157709/165588_79024acaf1224f00961cd9a0553c2c25.pdf", meta: "PDF" },
        ],
      },
    ],
  },
  {
    id: "entrepreneurship",
    name: "Entrepreneurship",
    groups: [
      {
        title: "Vocab Practice",
        links: [
          { label: "DECA Entrepreneurship Vocabulary", href: "https://quizlet.com/257986970/deca-entrepreneurship-vocabulary-flash-cards/", meta: "Quizlet" },
          { label: "Entrepreneurship Vocab", href: "https://quizlet.com/133264284/deca-entrepreneurship-vocab-flash-cards/", meta: "Quizlet" },
          { label: "Entrepreneurship Vocabulary Quiz", href: "https://wayground.com/admin/quiz/690209d13504bb9d50e26d8d/deca-entrepreneurship-vocabulary", meta: "Wayground" },
          { label: "Entrepreneurship Cluster Vocabulary", href: "https://quizlet.com/757271792/deca-entrepreneurship-cluster-vocabulary-flash-cards/", meta: "Quizlet" },
          { label: "Entrepreneurship Cluster Vocabulary (2)", href: "https://quizlet.com/945748645/deca-entrepreneurship-cluster-vocabulary-flash-cards/", meta: "Quizlet" },
          { label: "DECA Entrepreneurship Flashcards", href: "https://knowt.com/flashcards/84f4cb34-af8f-46b9-9b88-dd858a38b909", meta: "Knowt" },
        ],
      },
      {
        title: "Practice Tests",
        links: [
          { label: "Entrepreneurship — Sample Exam 2023", href: "https://assets-global.website-files.com/635c470cc81318fc3e9c1e0e/63f8eb823603a1c86dc634a4_HS_Entrepreneurship_Sample_Exam_23.pdf", meta: "PDF" },
          { label: "Entrepreneurship Exam Practice 2022", href: "https://novideca.weebly.com/uploads/1/3/8/7/13870728/entrepreneurship_exam_prct_22.pdf", meta: "PDF" },
          { label: "Entrepreneurship Sample Exam 2019", href: "https://novideca.weebly.com/uploads/1/3/8/7/13870728/2019_entrepreneurship_sample_exam.pdf", meta: "PDF" },
          { label: "Entrepreneurship Exam Practice 2022 (2)", href: "https://novideca.weebly.com/uploads/1/3/8/7/13870728/entrepreneurship_exam_practice_2022.pdf", meta: "PDF" },
          { label: "Entrepreneurship Sample Exam", href: "https://novideca.weebly.com/uploads/1/3/8/7/13870728/hs_entrepreneurship_sample_exam.pdf", meta: "PDF" },
          { label: "Entrepreneurship Sample Exam 2017", href: "https://novideca.weebly.com/uploads/1/3/8/7/13870728/2017_entrepreneurship_sample_exam.pdf", meta: "PDF" },
          { label: "Entrepreneurship Exam (1256T ENT B22)", href: "https://assets-global.website-files.com/614e10e1200f163424ddb67c/62e04d2610ae18e486b18a76_1256T_ENT_B22.pdf", meta: "PDF" },
        ],
      },
    ],
  },
  {
    id: "finance",
    name: "Finance",
    groups: [
      {
        title: "Vocab Practice",
        links: [
          { label: "DECA Finance Vocab", href: "https://quizlet.com/319308904/deca-finance-vocab-flash-cards/", meta: "Quizlet" },
          { label: "Finance Terms", href: "https://quizlet.com/70310064/deca-finance-terms-flash-cards/", meta: "Quizlet" },
          { label: "DECA Finance Flashcards", href: "https://knowt.com/flashcards/d97c54fe-f035-49ff-83c1-910f611dd179", meta: "Knowt" },
          { label: "DECA Finance Flashcards", href: "https://www.studystack.com/flashcard-3798179", meta: "StudyStack" },
          { label: "Principles of Finance Vocab", href: "https://quizlet.com/863645688/deca-principles-of-finance-vocab-flash-cards/", meta: "Quizlet" },
          { label: "Youth Financial Education Glossary", href: "https://www.consumerfinance.gov/consumer-tools/educator-tools/youth-financial-education/glossary/", meta: "CFPB" },
          { label: "Finance Cluster Vocabulary (Detailed)", href: "https://quizlet.com/214597339/deca-finance-cluster-vocabulary-detailed-flash-cards/", meta: "Quizlet" },
        ],
      },
      {
        title: "Practice Tests",
        links: [
          { label: "Finance 2011 Exam", href: "http://www.bhsdeca.org/uploads/1/1/0/1/110157709/2011_finance.pdf", meta: "PDF" },
          { label: "Finance 2012 Exam", href: "http://www.bhsdeca.org/uploads/1/1/0/1/110157709/2012_finance.pdf", meta: "PDF" },
          { label: "Finance 2013 ICDC Exam", href: "http://www.bhsdeca.org/uploads/1/1/0/1/110157709/2013_icdc_finance.pdf", meta: "PDF" },
          { label: "Finance 2014 Exam", href: "http://www.bhsdeca.org/uploads/1/1/0/1/110157709/2014_finance.pdf", meta: "PDF" },
          { label: "Finance 2015 Exam", href: "http://www.bhsdeca.org/uploads/1/1/0/1/110157709/2015_finance.pdf", meta: "PDF" },
          { label: "Finance 2016 Exam", href: "http://www.bhsdeca.org/uploads/1/1/0/1/110157709/2016_finance.pdf", meta: "PDF" },
          { label: "Finance Cluster — Sample Exam", href: "http://www.bhsdeca.org/uploads/1/1/0/1/110157709/hs_finance_cluster_sample_exam.pdf", meta: "PDF" },
          { label: "Finance Sample Exam (Teach DECA)", href: "https://teachdeca.org/wp-content/uploads/2019/08/Teach_DECA_Finance_Sample_Exam.pdf", meta: "PDF" },
        ],
      },
    ],
  },
  {
    id: "hospitality-tourism",
    name: "Hospitality & Tourism",
    groups: [
      {
        title: "Vocab Practice",
        links: [
          { label: "Hospitality & Tourism Vocabulary", href: "https://quizlet.com/238381985/deca-hospitality-and-tourism-vocabulary-flash-cards/", meta: "Quizlet" },
          { label: "Hospitality & Tourism Vocabulary (2)", href: "https://quizlet.com/257985344/deca-hospitality-and-tourism-vocabulary-flash-cards/", meta: "Quizlet" },
          { label: "Hospitality & Tourism Vocabulary Practice", href: "https://www.docsity.com/en/docs/deca-hospitality-and-tourism-vocabulary-practice-exams/12352077/", meta: "Docsity" },
          { label: "Hospitality & Tourism Cluster Vocabulary", href: "https://quizlet.com/355940904/deca-hospitality-and-tourism-cluster-vocabulary-flash-cards/", meta: "Quizlet" },
          { label: "Hospitality & Tourism Flashcards", href: "https://knowt.com/flashcards/ef2bf10d-35f6-4eeb-861c-35c731a28d50", meta: "Knowt" },
          { label: "Hospitality & Tourism Vocab", href: "https://quizlet.com/119586903/deca-hospitality-and-tourism-vocab-flash-cards/", meta: "Quizlet" },
          { label: "Buzzwords — Hospitality & Tourism", href: "https://static1.squarespace.com/static/5979c56846c3c439412b7195/t/61085619c6f9942964cce9ba/1627936281698/Buzzwords+-+Hospitality+%2B+Tourism.pdf", meta: "PDF" },
          { label: "Hospitality & Tourism Glossary", href: "https://quizlet.com/190436863/deca-hospitality-and-tourism-glossary-flash-cards/", meta: "Quizlet" },
        ],
      },
      {
        title: "Practice Tests",
        links: [
          { label: "Hospitality & Tourism Exam", href: "https://novideca.weebly.com/uploads/1/3/8/7/13870728/hosptour_test.pdf", meta: "PDF" },
          { label: "Hospitality & Tourism Exam + Key", href: "https://novideca.weebly.com/uploads/1/3/8/7/13870728/hospitality_toursim_exam_and_key_2.pdf", meta: "PDF" },
          { label: "H&T 2019 Sample Exam", href: "https://novideca.weebly.com/uploads/1/3/8/7/13870728/2019_h_t_sample_exam.pdf", meta: "PDF" },
          { label: "H&T 2017 Sample Exam", href: "https://novideca.weebly.com/uploads/1/3/8/7/13870728/2017_h_t_sample_exam.pdf", meta: "PDF" },
          { label: "H&T 2016 Sample Exam", href: "https://novideca.weebly.com/uploads/1/3/8/7/13870728/2016_h_t_sample_exam.pdf", meta: "PDF" },
          { label: "H&T 2015 Sample Exam", href: "https://novideca.weebly.com/uploads/1/3/8/7/13870728/2015_h_t_sample_exam.pdf", meta: "PDF" },
          { label: "H&T 2014 Sample Exam", href: "https://novideca.weebly.com/uploads/1/3/8/7/13870728/2014_h_t_sample_exam.pdf", meta: "PDF" },
          { label: "H&T 2012 ICDC Exam", href: "https://novideca.weebly.com/uploads/1/3/8/7/13870728/2012_h_t_icdc_exam.pdf", meta: "PDF" },
          { label: "H&T 2013 ICDC Exam", href: "https://novideca.weebly.com/uploads/1/3/8/7/13870728/2013_h_t_icdc_exam.pdf", meta: "PDF" },
        ],
      },
    ],
  },
];

function count(c: Cluster) {
  return c.groups.reduce((n, g) => n + g.links.length, 0);
}

export function PrecompClusters() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="border-y border-border">
      {CLUSTERS.map((c, i) => {
        const isOpen = openId === c.id;
        return (
          <div key={c.id} className={i > 0 ? "border-t border-border" : ""}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenId(isOpen ? null : c.id)}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className="flex items-baseline gap-3">
                <span className="font-mono text-xs font-medium tracking-[0.2em] text-royal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-lg font-semibold tracking-tight text-foreground">
                  {c.name}
                </span>
              </span>
              <span className="flex shrink-0 items-center gap-3">
                <span className="hidden font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70 sm:inline">
                  {count(c)} resources
                </span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-muted-foreground transition-transform duration-200",
                    isOpen && "rotate-180 text-foreground"
                  )}
                />
              </span>
            </button>

            {isOpen && (
              <div className="grid gap-8 pb-9 sm:grid-cols-2">
                {c.groups.map((g) => (
                  <div key={g.title}>
                    <p className="eyebrow mb-1">{g.title}</p>
                    <ul>
                      {g.links.map((l) => (
                        <li key={l.href}>
                          <a
                            href={l.href}
                            target="_blank"
                            rel="noreferrer"
                            className="group flex items-center justify-between gap-3 border-t border-border py-3 first:border-t-0"
                          >
                            <span className="min-w-0 text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                              {l.label}
                            </span>
                            <span className="flex shrink-0 items-center gap-2.5">
                              <span className="hidden font-mono text-[10px] uppercase tracking-wider text-muted-foreground/50 sm:inline">
                                {l.meta}
                              </span>
                              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
