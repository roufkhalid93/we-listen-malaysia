import Image from "next/image";

export const metadata = { title: "About Us | We Listen Malaysia" };

const values = [
  {
    title: "Listen First",
    text: "Before we fundraise, we sit down with every family to understand their real, specific needs, not assumptions.",
  },
  {
    title: "Full Transparency",
    text: "Every ringgit raised for a cause is tracked publicly, from donation to disbursement.",
  },
  {
    title: "Dignity Always",
    text: "We work with communities as partners, not charity cases, preserving privacy and dignity throughout.",
  },
  {
    title: "Local Roots",
    text: "Our volunteers live in the communities we serve, from Kelantan to Johor to Sabah.",
  },
];

const timeline = [
  { year: "2020", text: "We Listen Malaysia founded by a small group of volunteers in Kuala Lumpur, distributing food during the pandemic." },
  { year: "2021", text: "Expanded to support single mothers with livelihood grants across the Klang Valley." },
  { year: "2023", text: "Launched our education fund, sponsoring tuition for over 500 B40 students nationwide." },
  { year: "2026", text: "Now active in 21 communities across Peninsular and East Malaysia, powered by 138 volunteers." },
];

export default function AboutPage() {
  return (
    <div>
      <section className="container-page pt-16 pb-10 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-pink-500 font-semibold text-sm">About Us</span>
          <h1 className="font-display text-4xl sm:text-[2.9rem] leading-[1.1] text-ink mt-2 mb-5">
            We Listen Malaysia Organisation
          </h1>
          <p className="text-ink/65 leading-relaxed text-[1.05rem] mb-4">
            We Listen Malaysia Organisation is a community-driven, non-profit
            platform that connects generous Malaysians with underprivileged
            families, single mothers, students, and communities facing
            hardship, from flood victims in Kelantan to elderly residents
            living alone in the city.
          </p>
          <p className="text-ink/65 leading-relaxed text-[1.05rem]">
            We started with one simple belief: most people want to help, they
            just need a trustworthy, transparent way to do it. Every cause on
            our platform is verified in person by our case workers before it
            ever reaches this website.
          </p>
        </div>
        <div className="relative h-[380px] rounded-2xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?q=80&w=1000&auto=format&fit=crop"
            alt="We Listen Malaysia volunteers with a community family"
            fill
            className="object-cover"
          />
        </div>
      </section>

      <section className="bg-blue-50/60 mt-16">
        <div className="container-page py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => (
            <div key={v.title} className="bg-white rounded-2xl p-6 border border-ink/5">
              <h3 className="font-display text-xl text-blue-600 mb-2">{v.title}</h3>
              <p className="text-sm text-ink/60 leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-20">
        <span className="text-pink-500 font-semibold text-sm">Our Journey</span>
        <h2 className="font-display text-3xl sm:text-4xl text-ink mt-2 mb-12">
          How we got here
        </h2>
        <div className="space-y-0">
          {timeline.map((item, i) => (
            <div key={item.year} className="flex gap-6 sm:gap-10">
              <div className="flex flex-col items-center">
                <span className="font-display italic text-blue-600 text-lg w-16 sm:w-20 shrink-0">
                  {item.year}
                </span>
              </div>
              <div className={`flex-1 pb-10 ${i !== timeline.length - 1 ? "border-l border-ink/10 -ml-[1px] pl-6 sm:pl-10" : "pl-6 sm:pl-10"}`}>
                <p className="text-ink/65 leading-relaxed">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-blue-700 text-white">
        <div className="container-page py-16 text-center">
          <h2 className="font-display text-3xl sm:text-4xl italic mb-4">
            Registered non-profit, community owned
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto leading-relaxed">
            We Listen Malaysia Organisation operates as a registered society
            under the Malaysian Registry of Societies (ROS), governed by a
            volunteer board and audited annually to keep every donation
            accountable.
          </p>
        </div>
      </section>
    </div>
  );
}
