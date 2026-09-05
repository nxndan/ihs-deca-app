"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
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
          { label: "2018 Business Admin Core Practice Tests", href: "https://novideca.weebly.com/uploads/1/3/8/7/13870728/2018_practice_tests_business_admin_core.pdf", meta: "PDF" },
          { label: "Business Admin Core — Sample Exam 2020", href: "https://cdn.prod.website-files.com/635c470cc81318fc3e9c1e0e/63994cad3051eb77b6561030_HS_Business_Administration_Core_Sample_Exam_20.pdf", meta: "PDF" },
          { label: "Business Admin Core — Sample Exam 2017", href: "https://novideca.weebly.com/uploads/1/3/8/7/13870728/hs_business_administration_core_sample_exam_2017.pdf", meta: "PDF" },
          { label: "Business Admin Core — Sample Exam 2024", href: "https://cdn.prod.website-files.com/635c470cc81318fc3e9c1e0e/65df46ecf9242065c35e1962_HS_Business_Administration_Core_Sample_Exam_24.pdf", meta: "PDF" },
          { label: "Business Admin Core — 2013 Exam (Provincials)", href: "https://novideca.weebly.com/uploads/1/3/8/7/13870728/2013-business-administration-core-exam-provincials-1075.pdf", meta: "PDF" },
          { label: "Business Admin Core — Sample Exam 2021", href: "https://cdn.prod.website-files.com/635c470cc81318fc3e9c1e0e/63994ccb56af0e223bd4737e_HS_Business_Administration_Core_Sample_Exam_21.pdf", meta: "PDF" },
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
          { label: "DECA Business Management & Administration", href: "https://quizlet.com/248568470/deca-business-management-and-administration-flash-cards/", meta: "Quizlet" },
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
          { label: "DECA Vocabulary Words", href: "https://www.cram.com/flashcards/marketing-deca-vocabulary-words-6161913", meta: "Cram" },
          { label: "DECA Marketing Flashcards", href: "https://knowt.com/flashcards/db2cb11c-3ea8-4940-81be-060795f4d369", meta: "Knowt" },
          { label: "DECA Marketing Vocabulary", href: "https://www.studystack.com/flashcard-2256328", meta: "StudyStack" },
        ],
      },
      {
        title: "Practice Tests",
        links: [
          { label: "2010 Marketing ICDC Exam", href: "https://novideca.weebly.com/uploads/1/3/8/7/13870728/2010_marketing_icdc_exam.pdf", meta: "PDF" },
          { label: "2011 Marketing ICDC Exam", href: "https://novideca.weebly.com/uploads/1/3/8/7/13870728/2011_marketing_icdc_exam.pdf", meta: "PDF" },
          { label: "2012 Marketing ICDC Exam", href: "https://novideca.weebly.com/uploads/1/3/8/7/13870728/2012_marketing_icdc_exam.pdf", meta: "PDF" },
          { label: "2014 Marketing Sample Exam", href: "https://novideca.weebly.com/uploads/1/3/8/7/13870728/2014_marketing_sample_exam.pdf", meta: "PDF" },
          { label: "Marketing Cluster — Sample Exam 2021", href: "https://assets-global.website-files.com/614e10e1200f163424ddb67c/616dbd9eab8cf45080461acc_HS_Marketing_Cluster_Sample_Exam_21.pdf", meta: "PDF" },
          { label: "Marketing Cluster — Sample Exam 2018", href: "https://assets-global.website-files.com/614e10e1200f163424ddb67c/616dbd96dcca4ddfcf85e509_HS_Marketing_Cluster_Sample_Exam_2018.pdf", meta: "PDF" },
          { label: "Marketing Cluster — Sample Exam 2024", href: "https://cdn.prod.website-files.com/635c470cc81318fc3e9c1e0e/65df42a3765c3c9af7ef6459_HS_Marketing_Cluster_Sample_Exam_24.pdf", meta: "PDF" },
          { label: "Marketing Cluster — Sample Exam 2023", href: "https://assets-global.website-files.com/635c470cc81318fc3e9c1e0e/63f8ebb00a0a657ccf0f751c_HS_Marketing_Cluster_Sample_Exam_23.pdf", meta: "PDF" },
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
          { label: "Entrepreneurship Practice Exam (2022)", href: "https://novideca.weebly.com/uploads/1/3/8/7/13870728/entrepreneurship_exam_prct_22.pdf", meta: "PDF" },
          { label: "Entrepreneurship Sample Exam 2019", href: "https://novideca.weebly.com/uploads/1/3/8/7/13870728/2019_entrepreneurship_sample_exam.pdf", meta: "PDF" },
          { label: "Entrepreneurship Exam Practice 2022", href: "https://novideca.weebly.com/uploads/1/3/8/7/13870728/entrepreneurship_exam_practice_2022.pdf", meta: "PDF" },
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
          { label: "Finance Cluster — Sample Exam 2017", href: "https://assets-global.website-files.com/635c470cc81318fc3e9c1e0e/639956a85ce8b5d3f1abb5fe_HS_Finance_Cluster_Sample_Exam_17.pdf", meta: "PDF" },
          { label: "Finance Exam (1255T FIN B22)", href: "https://assets-global.website-files.com/614e10e1200f163424ddb67c/62e04d0873542638d95a4507_1255T_FIN_B22.pdf", meta: "PDF" },
          { label: "Finance Practice Exam", href: "https://lamarhsdeca.weebly.com/uploads/6/0/9/9/60998429/finance_practice_exam.pdf", meta: "PDF" },
          { label: "Finance Cluster Exam (C20 FIN)", href: "https://assets-global.website-files.com/614e10e1200f163424ddb67c/616dbd4d134c76c780ef5825_C20_FIN_Tp.pdf", meta: "PDF" },
          { label: "Finance Cluster — Sample Exam 2024", href: "https://cdn.prod.website-files.com/635c470cc81318fc3e9c1e0e/65df466d6a2308ca0ec22693_HS_Finance_Cluster_Sample_Exam_24.pdf", meta: "PDF" },
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
          { label: "H&T 2016 Sample Exam", href: "https://novideca.weebly.com/uploads/1/3/8/7/13870728/2016_h_t_sample_exam.pdf", meta: "PDF" },
          { label: "H&T 2017 Sample Exam", href: "https://novideca.weebly.com/uploads/1/3/8/7/13870728/2017_h_t_sample_exam.pdf", meta: "PDF" },
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
  const [activeId, setActiveId] = useState<string>(CLUSTERS[0].id);
  const active = CLUSTERS.find((c) => c.id === activeId) ?? CLUSTERS[0];

  return (
    <div>
      {/* Cluster tabs */}
      <div
        role="tablist"
        aria-label="Clusters"
        className="-mx-4 flex gap-1 overflow-x-auto border-b border-border px-4 sm:mx-0 sm:px-0"
      >
        {CLUSTERS.map((c) => {
          const isActive = c.id === active.id;
          return (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveId(c.id)}
              className={cn(
                "-mb-px shrink-0 whitespace-nowrap border-b-2 px-3 py-3 text-sm font-medium transition-colors",
                isActive
                  ? "border-royal text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {c.name}
            </button>
          );
        })}
      </div>

      {/* Active cluster header */}
      <div className="flex items-baseline justify-between gap-4 pt-8">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          {active.name}
        </h2>
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">
          {count(active)} resources
        </span>
      </div>

      {/* All sections for the active cluster — scroll through them */}
      <div className="grid gap-8 pt-6 sm:grid-cols-2">
        {active.groups.map((g) => (
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
    </div>
  );
}
