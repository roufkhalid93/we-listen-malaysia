import Image from "next/image";
import Link from "next/link";

type Stats = {
  peopleAssisted: number;
  volunteers: number;
  causesCount: number;
};

export default function Hero({ stats }: { stats: Stats }) {
  return (
    <section className="relative overflow-hidden">
      <div className="paper-texture absolute inset-0 opacity-60" />
      <div className="container-page relative pt-14 pb-20 md:pt-20 md:pb-28 grid md:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
        <div>
          <span className="inline-block text-pink-500 font-semibold text-sm tracking-wide mb-5">
            We Listen Malaysia Organisation
          </span>
          <h1 className="font-display text-[2.6rem] leading-[1.08] sm:text-[3.3rem] sm:leading-[1.06] text-ink">
            Every story deserves
            <br />
            <span className="italic text-blue-600">someone who listens</span>.
          </h1>
          <p className="mt-6 text-ink/65 text-lg leading-relaxed max-w-md">
            We connect everyday Malaysians with single mothers, underprivileged
            children, and communities in crisis, turning small acts of giving
            into lasting change.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/donate"
              className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-7 py-3.5 rounded-full transition-colors focus-ring"
            >
              Donate to a Cause
            </Link>
            <Link
              href="/causes"
              className="border border-ink/20 hover:border-ink/40 text-ink font-semibold px-7 py-3.5 rounded-full transition-colors focus-ring"
            >
              View All Causes
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] shadow-[0_30px_60px_-24px_rgba(31,68,127,0.35)]">
            <Image
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop"
              alt="Volunteers distributing food and supplies to a family in need"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 500px"
              className="object-cover"
            />
          </div>

          <div className="absolute -bottom-8 -left-6 sm:-left-10 bg-white rounded-2xl shadow-[0_20px_40px_-14px_rgba(27,32,51,0.25)] px-6 py-5 grid grid-cols-3 gap-6 w-[calc(100%-1rem)] sm:w-[420px]">
            <StatBlock value={stats.peopleAssisted} label="People Assisted" />
            <StatBlock value={stats.volunteers} label="Volunteers" />
            <StatBlock value={stats.causesCount} label="Active Causes" />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <div className="font-display text-2xl sm:text-[1.7rem] text-blue-600">
        {value.toLocaleString("en-MY")}
        <span className="text-pink-500">+</span>
      </div>
      <div className="text-[0.68rem] text-ink/50 mt-1 leading-tight">{label}</div>
    </div>
  );
}
