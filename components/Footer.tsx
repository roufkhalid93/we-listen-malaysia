"use client";

import Link from "next/link";
import Logo from "./Logo";

const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL || "http://localhost:4001";

export default function Footer() {
  return (
    <footer className="bg-blue-800 text-white/80 mt-24">
      <div className="container-page py-14 grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Logo dark />
          <p className="mt-4 text-sm leading-relaxed max-w-xs text-white/60">
            A community-powered platform connecting generous Malaysians with
            families and individuals who need it most.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold text-sm tracking-wide mb-4">
            Explore
          </h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/causes" className="hover:text-white transition-colors">Causes</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            <li><Link href="/donate" className="hover:text-white transition-colors">Donate</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold text-sm tracking-wide mb-4">
            Reach Us
          </h3>
          <ul className="space-y-2.5 text-sm text-white/70">
            <li>No. 12, Jalan Setia Bakti, Bukit Damansara, 50490 Kuala Lumpur</li>
            <li>hello@welisten.org.my</li>
            <li>+60 3-2201 4488</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page py-5 text-xs text-white/50 flex flex-col sm:flex-row justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} We Listen Malaysia Organisation. All rights reserved.</span>
          <a
            href={`${ADMIN_URL}/admin/login`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/80 transition-colors"
          >
            Admin Login
          </a>
        </div>
      </div>
    </footer>
  );
}
