"use client";

import { useState } from "react";
import { submitContactMessage } from "@/lib/api";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as {
      name: string;
      email: string;
      phone?: string;
      subject: string;
      message: string;
    };

    try {
      await submitContactMessage(data);
      setStatus("success");
      form.reset();
    } catch (err: any) {
      setStatus("error");
      setError(err.message || "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 text-center">
        <p className="font-display text-xl text-blue-700 mb-2">Message sent</p>
        <p className="text-ink/60 text-sm">
          Thank you for reaching out. Our team will get back to you within 2
          working days.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-5 text-sm font-semibold text-blue-600 underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full Name" name="name" required />
        <Field label="Email Address" name="email" type="email" required />
      </div>
      <Field label="Phone Number" name="phone" type="tel" />
      <Field label="Subject" name="subject" required />
      <div>
        <label className="block text-sm font-medium text-ink/70 mb-1.5" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full rounded-xl border border-ink/15 px-4 py-3 text-sm focus-ring focus:border-blue-400 outline-none resize-none"
          placeholder="Tell us how we can help, or how you'd like to help..."
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-pink-600">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold px-8 py-3 rounded-full transition-colors focus-ring"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-ink/70 mb-1.5" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl border border-ink/15 px-4 py-3 text-sm focus-ring focus:border-blue-400 outline-none"
      />
    </div>
  );
}
