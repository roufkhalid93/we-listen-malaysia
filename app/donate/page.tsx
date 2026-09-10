import { Suspense } from "react";
import { getCauses } from "@/lib/api";
import DonatePageClient from "@/components/DonatePageClient";

export const dynamic = "force-dynamic";

export const metadata = { title: "Donate | We Listen Malaysia" };

export default async function DonatePage() {
  const causes = await getCauses();
  const activeCauses = causes.filter((c) => c.status === "active");

  return (
    <Suspense fallback={<div className="container-page py-16">Loading...</div>}>
      <DonatePageClient causes={activeCauses} />
    </Suspense>
  );
}
