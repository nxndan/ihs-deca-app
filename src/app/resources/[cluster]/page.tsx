import { Suspense } from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { CLUSTERS } from "@/data/resources";
import { cookieName } from "../_lib";
import { PasswordGate } from "@/components/resources/password-gate";
import { ClusterView } from "@/components/resources/cluster-view";

// Reads cookies to decide gate vs. content, so render per request.
export const dynamic = "force-dynamic";

type Params = { cluster: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { cluster } = await params;
  const c = CLUSTERS.find((x) => x.slug === cluster);
  return { title: c ? c.title : "Resources" };
}

export default async function ClusterPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { cluster } = await params;
  const c = CLUSTERS.find((x) => x.slug === cluster);
  if (!c) notFound();

  const jar = await cookies();
  const unlocked = jar.get(cookieName(c.slug))?.value === "1";

  if (!unlocked) {
    return <PasswordGate slug={c.slug} title={c.title} />;
  }

  return (
    <Suspense>
      <ClusterView cluster={c} />
    </Suspense>
  );
}
