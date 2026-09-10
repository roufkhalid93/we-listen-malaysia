"use client";

import { useMemo, useState } from "react";
import CauseCard from "./CauseCard";
import type { Cause } from "@/lib/types";

export default function CausesExplorer({ causes }: { causes: Cause[] }) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(causes.map((c) => c.category)))],
    [causes]
  );
  const [activeCategory, setActiveCategory] = useState("All");
  const [showPriorityOnly, setShowPriorityOnly] = useState(false);

  const filtered = causes.filter((c) => {
    if (activeCategory !== "All" && c.category !== activeCategory) return false;
    if (showPriorityOnly && !c.priority) return false;
    return true;
  });

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2.5 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-sm font-medium px-4 py-2 rounded-full border transition-colors focus-ring ${
              activeCategory === cat
                ? "bg-blue-600 border-blue-600 text-white"
                : "border-ink/15 text-ink/60 hover:border-ink/30"
            }`}
          >
            {cat}
          </button>
        ))}
        <span className="w-px h-6 bg-ink/10 mx-1 hidden sm:block" />
        <button
          onClick={() => setShowPriorityOnly((v) => !v)}
          className={`text-sm font-medium px-4 py-2 rounded-full border transition-colors focus-ring ${
            showPriorityOnly
              ? "bg-pink-500 border-pink-500 text-white"
              : "border-ink/15 text-ink/60 hover:border-ink/30"
          }`}
        >
          Top Priority Only
        </button>
      </div>

      {filtered.length === 0 ? (
        <p className="text-ink/50 text-sm py-16 text-center">
          No causes match these filters right now. Try a different category.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((cause) => (
            <CauseCard key={cause.id} cause={cause} />
          ))}
        </div>
      )}
    </div>
  );
}
