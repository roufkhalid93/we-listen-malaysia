import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page py-32 text-center">
      <p className="text-pink-500 font-semibold text-sm mb-3">404</p>
      <h1 className="font-display text-3xl sm:text-4xl text-ink mb-5">
        We couldn't find that page
      </h1>
      <Link
        href="/"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3 rounded-full transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
