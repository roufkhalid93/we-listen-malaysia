import Link from "next/link";
import Hero from "@/components/Hero";
import CauseCard from "@/components/CauseCard";
import ContactForm from "@/components/ContactForm";
import { getCauses, getOrgStats } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [causes, orgStats] = await Promise.all([
    getCauses(),
    getOrgStats(),
  ]);

  const peopleAssisted = causes.reduce((sum, c) => sum + c.peopleHelped, 0);
  const activeCauses = causes.filter((c) => c.status === "active");
  const priorityCauses = activeCauses
    .filter((c) => c.priority)
    .concat(activeCauses.filter((c) => !c.priority))
    .slice(0, 3);

  return (
    <>
      <Hero
        stats={{
          peopleAssisted,
          volunteers: orgStats.volunteers,
          causesCount: activeCauses.length,
        }}
      />

      <section className="container-page py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-pink-500 font-semibold text-sm">Top Priority</span>
            <h2 className="font-display text-3xl sm:text-4xl text-ink mt-2">
              Causes that need you now
            </h2>
          </div>
          <Link
            href="/causes"
            className="text-blue-600 font-semibold text-sm hover:underline underline-offset-4 whitespace-nowrap"
          >
            View all causes &rarr;
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {priorityCauses.map((cause) => (
            <CauseCard key={cause.id} cause={cause} />
          ))}
        </div>
      </section>

      <section className="bg-blue-600 text-white">
        <div className="container-page py-16 grid md:grid-cols-3 gap-8 text-center">
          <PillarStat number="100%" label="Of your donation reaches the cause you choose" />
          <PillarStat number={`${orgStats.yearsActive}+`} label="Years supporting Malaysian communities" />
          <PillarStat number={`${orgStats.partnerCommunities}`} label="Partner communities across Malaysia" />
        </div>
      </section>

      <section id="contact" className="container-page py-20 grid md:grid-cols-2 gap-14">
        <div>
          <span className="text-pink-500 font-semibold text-sm">Get in Touch</span>
          <h2 className="font-display text-3xl sm:text-4xl text-ink mt-2 mb-5">
            Questions? We're listening.
          </h2>
          <p className="text-ink/60 leading-relaxed mb-8 max-w-md">
            Whether you'd like to volunteer, refer a family in need, or ask
            about a cause, send us a message and our team will respond
            personally.
          </p>
          <ul className="space-y-3 text-sm text-ink/70">
            <li>hello@welisten.org.my</li>
            <li>+60 3-2201 4488</li>
            <li>No. 12, Jalan Setia Bakti, Bukit Damansara, 50490 Kuala Lumpur</li>
          </ul>
        </div>
        <div className="bg-white border border-ink/10 rounded-2xl p-7 sm:p-9">
          <ContactForm />
        </div>
      </section>
    </>
  );
}

function PillarStat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="font-display text-4xl italic">{number}</div>
      <p className="text-white/70 text-sm mt-2 max-w-[220px] mx-auto">{label}</p>
    </div>
  );
}
