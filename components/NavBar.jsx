"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/generate', label: 'Generate' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/pricing', label: 'Pricing' },
];

export default function NavBar() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 backdrop-blur border-b border-white/10 bg-black/30">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-brand-500 to-pink-500" />
            <span className="font-semibold tracking-wide">Artistly</span>
          </Link>
          <nav className="flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`px-3 py-2 rounded-md text-sm transition-colors hover:bg-white/10 ${pathname===l.href? 'bg-white/10 text-white' : 'text-white/80'}`}
              >
                {l.label}
              </Link>
            ))}
            <Link href="/generate" className="ml-2 inline-flex items-center bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-md text-sm transition-colors">
              Try Free
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
