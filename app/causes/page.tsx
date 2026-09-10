import { getCauses } from "@/lib/api";
import CausesExplorer from "@/components/CausesExplorer";

export const dynamic = "force-dynamic";

export const metadata = { title: "Causes | We Listen Malaysia" };

export default async function CausesPage() {
  const causes = await getCauses();

  return (
    <div className="container-page py-16">
      <div className="max-w-2xl mb-12">
        <span className="text-pink-500 font-semibold text-sm">Our Causes</span>
        <h1 className="font-display text-4xl sm:text-[2.8rem] text-ink mt-2 mb-4">
          Real people, real needs, right here in Malaysia
        </h1>
        <p className="text-ink/60 leading-relaxed">
          Every cause listed here is verified by our case workers before it
          goes live. Choose one that speaks to you, and see exactly how your
          donation is being used.
        </p>
      </div>

      <CausesExplorer causes={causes} />
    </div>
  );
}
