import Image from "next/image";
import ContactForm from "@/components/ContactForm";

export const metadata = { title: "Contact Us | We Listen Malaysia" };

const contacts = [
  {
    name: "Siti Nurhaliza binti Rahman",
    role: "Programme Director",
    phone: "+60 12-345 6789",
    email: "siti@welisten.org.my",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Arjun a/l Muthusamy",
    role: "Volunteer & Partnerships Lead",
    phone: "+60 17-234 5678",
    email: "arjun@welisten.org.my",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=600&auto=format&fit=crop",
  },
];

export default function ContactPage() {
  return (
    <div className="container-page py-16">
      <div className="max-w-2xl mb-14">
        <span className="text-pink-500 font-semibold text-sm">Contact Us</span>
        <h1 className="font-display text-4xl sm:text-[2.8rem] text-ink mt-2 mb-4">
          Let's talk
        </h1>
        <p className="text-ink/60 leading-relaxed">
          Have a question about a cause, want to volunteer, or know a family
          who needs support? Reach out to our team directly or send us a
          message below.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mb-16">
        {contacts.map((c) => (
          <div key={c.name} className="flex gap-5 bg-white border border-ink/10 rounded-2xl p-6">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0">
              <Image src={c.image} alt={c.name} fill className="object-cover" />
            </div>
            <div>
              <p className="font-display text-lg text-ink leading-snug">{c.name}</p>
              <p className="text-pink-500 text-sm font-medium mb-3">{c.role}</p>
              <p className="text-sm text-ink/60">{c.phone}</p>
              <p className="text-sm text-ink/60">{c.email}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_0.85fr] gap-12">
        <div className="bg-white border border-ink/10 rounded-2xl p-7 sm:p-9">
          <h2 className="font-display text-2xl text-ink mb-6">Send us a message</h2>
          <ContactForm />
        </div>

        <div>
          <div className="bg-blue-700 text-white rounded-2xl p-7 sm:p-9 mb-6">
            <h3 className="font-display text-xl mb-4">Our Address</h3>
            <p className="text-white/75 leading-relaxed text-sm">
              We Listen Malaysia Organisation
              <br />
              No. 12, Jalan Setia Bakti,
              <br />
              Bukit Damansara,
              <br />
              50490 Kuala Lumpur, Malaysia
            </p>
            <div className="mt-6 pt-6 border-t border-white/15 text-sm text-white/75 space-y-1.5">
              <p>hello@welisten.org.my</p>
              <p>+60 3-2201 4488</p>
              <p>Mon &ndash; Fri, 9:00 AM &ndash; 6:00 PM</p>
            </div>
          </div>

          <div className="relative h-[220px] rounded-2xl overflow-hidden border border-ink/10">
            <iframe
              title="We Listen Malaysia office location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=101.660%2C3.140%2C101.680%2C3.155&layer=mapnik&marker=3.1478%2C101.670"
              className="w-full h-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
