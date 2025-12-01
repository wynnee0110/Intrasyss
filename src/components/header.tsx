"use client";

import { Teko } from "next/font/google";

const teko = Teko({ subsets: ["latin"] });

export default function Header() {
  return (
    <header className="bg-yellow-500 w-full py-4 shadow-md flex items-center justify-center">
      <nav className={`flex gap-12 text-4xl font-semibold text-black  ${teko.className}`}>
        <a 
          href="/"
          className="hover:text-white transition-colors duration-200"
        >
          Home
        </a>

        <a 
          href="/events"
          className="hover:text-white transition-colors duration-200"
        >
          Events
        </a>
      </nav>
    </header>
  );
}
