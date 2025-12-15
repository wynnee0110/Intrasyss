"use client";

import { Teko } from "next/font/google";

const teko = Teko({ 
  subsets: ["latin"],
  weight: ["400", "700"]
});

export default function Header() {
  return (
    <header className="w-full py-3 flex items-center justify-center">
      <nav className={`flex gap-6 ${teko.className}`}>
        <a 
          href="/"
          className="text-2xl lg:text-3xl font-semibold text-slate-800 hover:text-blue-600 transition-colors duration-200 uppercase"
        >
          Home
        </a>
        <a 
          href="/events"
          className="text-2xl lg:text-3xl font-semibold text-slate-800 hover:text-blue-600 transition-colors duration-200 uppercase"
        >
          Events
        </a>
      </nav>
    </header>
  );
}
