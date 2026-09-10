"use client";

import { useEffect, useState } from "react";
import type { Cause } from "@/lib/types";
import { submitDonation } from "@/lib/api";

const PRESET_AMOUNTS = [50, 100, 250, 500];

export default function DonateModal({
  cause,
  onClose,
}: {
  cause: Cause;
  onClose: () => void;
}) {
  const [amount, setAmount] = useState<number | "">(100);
  const [customAmount, setCustomAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const finalAmount = customAmount ? Number(customAmount) : amount;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!finalAmount || Number(finalAmount) <= 0) {
      setError("Please select or enter a valid amount.");
      return;
    }
    setStatus("loading");
    setError("");
    try {
      await submitDonation({
        causeId: cause.id,
        name,
        email,
        amount: Number(finalAmount),
        message,
      });
      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setError(err.message);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] bg-ink/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {status === "success" ? (
          <div className="p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-pink-50 text-pink-500 flex items-center justify-center mx-auto mb-5 text-2xl">
              &#10003;
            </div>
            <h3 className="font-display text-2xl text-ink mb-2">Terima kasih!</h3>
            <p className="text-ink/60 text-sm leading-relaxed mb-6">
              Your donation of RM {Number(finalAmount).toLocaleString("en-MY")} to{" "}
              <span className="font-medium text-ink">{cause.title}</span> has
              been recorded. A confirmation has been noted against{" "}
              {email}.
            </p>
            <button
              onClick={onClose}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-full transition-colors focus-ring"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="p-7 sm:p-8">
            <div className="flex items-start justify-between mb-1">
              <span className="text-xs font-semibold text-pink-500 uppercase tracking-wide">
                Donating to
              </span>
              <button
                onClick={onClose}
                aria-label="Close"
                className="text-ink/40 hover:text-ink text-xl leading-none focus-ring rounded"
              >
                &times;
              </button>
            </div>
            <h3 className="font-display text-xl text-ink mb-6">{cause.title}</h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-ink/70 mb-2">
                  Choose an amount (RM)
                </label>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {PRESET_AMOUNTS.map((preset) => (
                    <button
                      type="button"
                      key={preset}
                      onClick={() => {
                        setAmount(preset);
                        setCustomAmount("");
                      }}
                      className={`py-2.5 rounded-xl text-sm font-semibold border transition-colors focus-ring ${
                        amount === preset && !customAmount
                          ? "bg-blue-600 border-blue-600 text-white"
                          : "border-ink/15 text-ink/70 hover:border-ink/30"
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  min={1}
                  placeholder="Or enter a custom amount"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm focus-ring focus:border-blue-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ink/70 mb-1.5">
                  Full Name
                </label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm focus-ring focus:border-blue-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ink/70 mb-1.5">
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm focus-ring focus:border-blue-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ink/70 mb-1.5">
                  Message (optional)
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm focus-ring focus:border-blue-400 outline-none resize-none"
                  placeholder="A note of encouragement..."
                />
              </div>

              {error && <p className="text-sm text-pink-600">{error}</p>}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-pink-500 hover:bg-pink-600 disabled:opacity-60 text-white font-semibold py-3.5 rounded-full transition-colors focus-ring"
              >
                {status === "loading"
                  ? "Processing..."
                  : `Donate RM ${finalAmount || 0}`}
              </button>
              <p className="text-[0.7rem] text-ink/40 text-center leading-relaxed">
                This is a demo checkout for the We Listen Malaysia platform.
                No real payment is processed.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
