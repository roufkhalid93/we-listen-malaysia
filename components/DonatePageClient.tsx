"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import type { Cause } from "@/lib/types";
import DonateModal from "./DonateModal";

export default function DonatePageClient({ causes }: { causes: Cause[] }) {
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState<Cause | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const causeId = searchParams.get("cause");
    if (causeId) {
      const match = causes.find((c) => c.id === causeId);
      if (match) {
        setSelected(match);
        setModalOpen(true);
      }
    }
  }, [searchParams, causes]);

  function openDonation(cause: Cause) {
    setSelected(cause);
    setModalOpen(true);
  }

  return (
    <div className="container-page py-16">
      <div className="max-w-2xl mb-12">
        <span className="text-pink-500 font-semibold text-sm">Donate</span>
        <h1 className="font-display text-4xl sm:text-[2.8rem] text-ink mt-2 mb-4">
          Choose who you'd like to help
        </h1>
        <p className="text-ink/60 leading-relaxed">
          Select a cause below to open the donation form. Your contribution
          goes directly toward that cause's goal, we'll show you exactly what
          it supports.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {causes.map((cause) => {
          const pct = Math.min(100, Math.round((cause.raised / cause.goal) * 100));
          return (
            <button
              key={cause.id}
              onClick={() => openDonation(cause)}
              className="text-left bg-white border border-ink/10 rounded-2xl overflow-hidden hover:shadow-[0_18px_40px_-16px_rgba(31,68,127,0.25)] transition-shadow focus-ring"
            >
              <div className="relative h-40 w-full">
                <Image
                  src={cause.image}
                  alt={cause.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                {cause.priority && (
                  <span className="absolute top-3 left-3 bg-pink-500 text-white text-[0.65rem] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full">
                    Top Priority
                  </span>
                )}
              </div>
              <div className="p-5">
                <p className="text-xs font-medium text-blue-600 mb-1.5">{cause.category}</p>
                <h3 className="font-display text-lg text-ink leading-snug mb-3">
                  {cause.title}
                </h3>
                <div className="h-1.5 w-full bg-ink/10 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-pink-500 rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <div className="flex justify-between text-xs text-ink/50">
                  <span>RM {cause.raised.toLocaleString("en-MY")} raised</span>
                  <span className="font-semibold text-blue-600">{pct}%</span>
                </div>
                <div className="mt-4 text-center bg-pink-50 text-pink-600 font-semibold text-sm py-2.5 rounded-full">
                  Donate to this cause
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {modalOpen && selected && (
        <DonateModal cause={selected} onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
}
