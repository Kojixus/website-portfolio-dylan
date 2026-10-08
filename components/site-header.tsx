"use client";

import { useEffect, useState } from "react";
import TransitionLink from "./transition-link";

type NavItem = { href: string; label: string };

type SiteHeaderProps = {
  /** Shown after the slash in the wordmark, e.g. "Driver" or "On track". */
  section: string;
  items: NavItem[];
};

/**
 * Shared sticky header. The wordmark always leads home, and in-page anchors
 * light up as their section scrolls into view so you can tell where you are.
 */
export default function SiteHeader({ section, items }: SiteHeaderProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const targets = items
      .filter((item) => item.href.startsWith("#"))
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    if (targets.length === 0) return;

    // A section counts as "current" once it crosses the upper third of the
    // viewport, just under the sticky header.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        } else if (targets[0].getBoundingClientRect().top > window.innerHeight * 0.4) {
          // Scrolled back up into the hero: nothing is current.
          setActiveId(null);
        }
      },
      { rootMargin: "-88px 0px -60% 0px" },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <header className="nav-shell sticky top-0 z-40">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-3.5 sm:px-8">
        <TransitionLink href="/" className="wordmark text-lg" aria-label="Dylan Dana — home">
          Dylan Dana <span className="gold-accent">/</span>{" "}
          <span className="font-normal text-zinc-400">{section}</span>
        </TransitionLink>
        <nav
          aria-label="Primary"
          className="nav-links -mx-1 flex items-center gap-5 overflow-x-auto px-1"
        >
          {items.map((item) => {
            const isActive = item.href === `#${activeId}`;

            return item.href.startsWith("/") ? (
              <TransitionLink key={item.label} href={item.href} className="nav-chip">
                {item.label}
              </TransitionLink>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className={`nav-chip${isActive ? " is-active" : ""}`}
                aria-current={isActive ? "location" : undefined}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
