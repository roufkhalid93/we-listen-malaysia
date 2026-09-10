import { getCauses } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

function formatMYR(n: number) {
  return `RM ${n.toLocaleString("en-MY")}`;
}

export default async function CauseDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const causes = await getCauses();
  const cause = causes.find((c) => c.slug === params.slug);
  if (!cause) return notFound();

  const pct = Math.min(100, Math.round((cause.raised / cause.goal) * 100));
  const related = causes
    .filter((c) => c.id !== cause.id && c.category === cause.category)
    .slice(0, 3);

  return (
    <div className="container-page py-16">
      <Link href="/causes" className="text-sm text-blue-600 font-semibold hover:underline underline-offset-4">
        &larr; Back to all causes
      </Link>

      <div className="mt-6 grid lg:grid-cols-[1.4fr_1fr] gap-12">
        <div>
          <div className="relative h-[340px] sm:h-[420px] rounded-2xl overflow-hidden mb-8">
            <Image src={cause.image} alt={cause.title} fill className="object-cover" priority />
          </div>

          <div className="flex flex-wrap gap-2 mb-5">
            {cause.tags.map((tag) => (
              <span key={tag} className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="font-display text-3xl sm:text-[2.4rem] leading-tight text-ink mb-5">
            {cause.title}
          </h1>
          <p className="text-ink/65 leading-relaxed text-[1.05rem]">{cause.description}</p>
        </div>

        <aside className="lg:sticky lg:top-28 h-fit bg-white border border-ink/10 rounded-2xl p-7">
          <div className="h-2 w-full bg-ink/10 rounded-full overflow-hidden mb-3">
            <div className="h-full bg-pink-500 rounded-full" style={{ width: `${pct}%` }} />
          </div>
          <div className="flex justify-between items-baseline mb-1">
            <span className="font-display text-2xl text-ink">{formatMYR(cause.raised)}</span>
            <span className="font-semibold text-blue-600">{pct}%</span>
          </div>
          <p className="text-sm text-ink/50 mb-6">raised of {formatMYR(cause.goal)} goal</p>

          <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
            <div>
              <p className="text-ink/45">People Helped</p>
              <p className="font-semibold text-ink text-lg">{cause.peopleHelped}</p>
            </div>
            <div>
              <p className="text-ink/45">Location</p>
              <p className="font-semibold text-ink text-lg">{cause.location}</p>
            </div>
          </div>

          <Link
            href={`/donate?cause=${cause.id}`}
            className="block text-center bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3.5 rounded-full transition-colors focus-ring"
          >
            Donate to this Cause
          </Link>
        </aside>
      </div>

      {related.length > 0 && (
        <div className="mt-24">
          <h2 className="font-display text-2xl text-ink mb-6">More in {cause.category}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((r) => (
              <Link
                key={r.id}
                href={`/causes/${r.slug}`}
                className="block bg-white border border-ink/10 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-40">
                  <Image src={r.image} alt={r.title} fill className="object-cover" />
                </div>
                <div className="p-5">
                  <p className="font-display text-lg text-ink leading-snug">{r.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
