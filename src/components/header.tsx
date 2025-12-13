"use client";

import { Teko } from "next/font/google";

const teko = Teko({ 
  subsets: ["latin"],
  weight: ["400", "700"]
});

export default function Header() {
  return (
    <header className="w-full py-6 shadow-lg flex items-center justify-center">
      <nav className={`flex gap-16 ${teko.className}`}>
        <a 
          href="/"
          className="text-3xl lg:text-4xl font-black text-slate-200 hover:text-yellow-400 drop-shadow-lg hover:drop-shadow-[0_0_10px_rgba(251,191,36,0.5)] transition-all duration-300 tracking-[0.05em] uppercase"
        >
          Home
        </a>

        <a 
          href="/events"
          className="text-3xl lg:text-4xl font-black text-slate-200 hover:text-yellow-400 drop-shadow-lg hover:drop-shadow-[0_0_10px_rgba(251,191,36,0.5)] transition-all duration-300 tracking-[0.05em] uppercase"
        >
          Events
        </a>
      </nav>
    </header>
  );
}
