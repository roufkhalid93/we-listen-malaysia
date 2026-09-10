import Image from "next/image";
import Link from "next/link";
import type { Cause } from "@/lib/types";

function formatMYR(n: number) {
  return `RM ${n.toLocaleString("en-MY")}`;
}

export default function CauseCard({ cause }: { cause: Cause }) {
  const pct = Math.min(100, Math.round((cause.raised / cause.goal) * 100));

  return (
    <div className="group flex flex-col bg-white border border-ink/10 rounded-2xl overflow-hidden hover:shadow-[0_18px_40px_-16px_rgba(31,68,127,0.25)] transition-shadow">
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={cause.image}
          alt={cause.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {cause.priority && (
          <span className="absolute top-3 left-3 bg-pink-500 text-white text-[0.68rem] font-semibold tracking-wide uppercase px-3 py-1 rounded-full">
            Top Priority
          </span>
        )}
        {cause.status === "completed" && (
          <span className="absolute top-3 right-3 bg-blue-700 text-white text-[0.68rem] font-semibold tracking-wide uppercase px-3 py-1 rounded-full">
            Fully Funded
          </span>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {cause.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[0.7rem] font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-display text-xl text-ink leading-snug mb-2">
          {cause.title}
        </h3>
        <p className="text-sm text-ink/60 leading-relaxed mb-5 line-clamp-2">
          {cause.summary}
        </p>

        <div className="mt-auto">
          <div className="h-1.5 w-full bg-ink/10 rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-pink-500 rounded-full"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="flex justify-between text-sm mb-4">
            <span className="font-semibold text-ink">
              {formatMYR(cause.raised)}{" "}
              <span className="font-normal text-ink/45">
                raised of {formatMYR(cause.goal)}
              </span>
            </span>
            <span className="font-semibold text-blue-600">{pct}%</span>
          </div>

          <div className="flex gap-2">
            <Link
              href={`/causes/${cause.slug}`}
              className="flex-1 text-center text-sm font-semibold border border-blue-600 text-blue-600 rounded-full py-2.5 hover:bg-blue-50 transition-colors focus-ring"
            >
              Learn More
            </Link>
            <Link
              href={`/donate?cause=${cause.id}`}
              className="flex-1 text-center text-sm font-semibold bg-blue-600 text-white rounded-full py-2.5 hover:bg-blue-700 transition-colors focus-ring"
            >
              Donate
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
