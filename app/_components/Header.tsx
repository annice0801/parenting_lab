"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSite } from "./site-context";

const NAV_LINKS = [
  { href: "#about", label: "關於我們" },
  { href: "#philosophy", label: "我們的理念" },
];

export default function Header() {
  const { nickname } = useSite();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all ${
        scrolled
          ? "bg-cream/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🌿</span>
          <span className="font-[family-name:var(--font-fredoka)] text-lg font-semibold text-ink sm:text-xl">
            Parenting Lab
            <span className="ml-1.5 hidden text-sm font-normal text-ink-soft sm:inline">
              育兒神助手實驗室
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-soft transition hover:text-clay"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/dog-game"
            className="text-sm font-medium text-ink-soft transition hover:text-clay"
          >
            coding小遊戲
          </Link>
          <Link
            href="/binomial-cube"
            className="text-sm font-medium text-ink-soft transition hover:text-clay"
          >
            積木教具
          </Link>
          <Link
            href="/blog"
            className="text-sm font-medium text-ink-soft transition hover:text-clay"
          >
            文章
          </Link>
          <Link
            href="/helper"
            className="text-sm font-medium text-ink-soft transition hover:text-clay"
          >
            家長幫手
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {nickname && (
            <span className="hidden rounded-full bg-sage/20 px-4 py-1.5 text-sm text-ink sm:block">
              嗨，{nickname} 👋
            </span>
          )}
          <a
            href="#subscribe"
            className="hidden rounded-full bg-clay px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-clay/90 active:scale-95 sm:block"
          >
            搶先體驗
          </a>
          <button
            aria-label="開啟選單"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition hover:bg-cream-soft md:hidden"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-cream-deep bg-cream px-5 pb-5 md:hidden">
          <nav className="flex flex-col gap-1 pt-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-2.5 text-ink-soft transition hover:bg-cream-soft hover:text-ink"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/dog-game"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-3 py-2.5 text-ink-soft transition hover:bg-cream-soft hover:text-ink"
            >
              coding小遊戲
            </Link>
            <Link
              href="/binomial-cube"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-3 py-2.5 text-ink-soft transition hover:bg-cream-soft hover:text-ink"
            >
              積木教具
            </Link>
            <Link
              href="/blog"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-3 py-2.5 text-ink-soft transition hover:bg-cream-soft hover:text-ink"
            >
              文章
            </Link>
            <Link
              href="/helper"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-3 py-2.5 text-ink-soft transition hover:bg-cream-soft hover:text-ink"
            >
              家長幫手
            </Link>
            {nickname && (
              <p className="px-3 pt-2 text-sm text-ink-soft">
                嗨，{nickname} 👋
              </p>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
