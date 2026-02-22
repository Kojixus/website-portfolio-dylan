import Image from "next/image";
import TrackModelPanel from "../components/track-model-panel";
import TransitionLink from "../components/transition-link";
import { raceEvents } from "../data/raceEvents";

const leadPhoto = "/photos/dd-2026-01.jpg";
const driverProfile = [
  { label: "Name", value: "Dylan Dana" },
  { label: "Discipline", value: "Endurance Racing" },
  { label: "Favorite Track", value: "Sebring International Raceway" },
  { label: "Series Focus", value: "ChampCar Platform" },
];

const drivingAccomplishments = [
  {
    season: "2021",
    title: "Summer League Champion",
    detail:
      "Championship achievement shown on helmet credentials and race identity.",
  },
  {
    season: "2022",
    title: "ChampCar Program Growth",
    detail:
      "Expanded race approach from sprint mindset to endurance strategy and tire management.",
  },
  {
    season: "2023",
    title: "ChampCar Competitive Campaign",
    detail:
      "Continued progression in stint consistency, traffic handling, and in-car communication.",
  },
  {
    season: "Daytona",
    title: "Endurance Event Participation",
    detail:
      "Built race-weekend execution flow with cockpit focus and repeatable prep routine.",
  },
];

const coachingAreas = [
  "Racecraft fundamentals and overtaking decisions",
  "Onboard review + braking and line analysis",
  "Stint planning, tire management, and consistency",
  "Driver mindset and pre-session preparation",
];

const primaryNav = [
  { href: "/on-track", label: "On Track Page" },
  { href: "#video-highlights", label: "Videos" },
  { href: "#sebring", label: "Favorite Track" },
  { href: "#contact", label: "Coaching" },
];

const raceFocus = [
  {
    title: "On Track",
    copy: "Dedicated race page with schedule, stats, and track-focused storytelling.",
    href: "/on-track",
  },
  {
    title: "Off Track",
    copy: "Media highlights, race-weekend storylines, and coaching content.",
    href: "#video-highlights",
  },
];

const socialLinks = [
  {
    href: "https://www.instagram.com/dylandana55",
    label: "Instagram",
    handle: "@dylandana55",
  },
  {
    href: "https://www.youtube.com/@DylanDana",
    label: "YouTube",
    handle: "@DylanDana",
  },
];

const videoHighlights = [
  {
    title: "Daytona Race Recap",
    copy: "Key moments, pace notes, and race execution highlights.",
    href: "https://www.youtube.com/@DylanDana/videos",
    thumbnail: "/photos/dd-2026-02.jpg",
    position: "object-[52%_28%]",
  },
  {
    title: "Sebring Prep Session",
    copy: "Track prep focus for braking zones, rhythm, and consistency.",
    href: "https://www.youtube.com/@DylanDana/videos",
    thumbnail: "/photos/dd-2026-03.jpg",
    position: "object-[55%_26%]",
  },
  {
    title: "Onboard Coaching Breakdown",
    copy: "Corner-entry and exit analysis for cleaner, faster laps.",
    href: "https://www.youtube.com/@DylanDana/videos",
    thumbnail: "/photos/dd-2026-04.jpg",
    position: "object-[50%_26%]",
  },
];

const scheduleDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});

const upcomingEvents = raceEvents
  .filter((event) => event.status !== "Complete")
  .sort((a, b) => a.date.localeCompare(b.date))
  .slice(0, 3);

const recentResults = [...raceEvents]
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 5);

export default function Home() {
  return (
    <main className="race-surface relative min-h-screen overflow-x-clip px-4 py-6 text-zinc-100 sm:px-8 sm:py-8 lg:px-12">
      <div className="track-grid pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute -top-28 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-sky-500/30 blur-3xl" />
      <div className="pointer-events-none absolute top-14 right-[10%] h-72 w-72 rounded-full bg-amber-300/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[24%] left-[7%] h-64 w-64 rounded-full bg-amber-200/10 blur-3xl" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 pb-8 md:gap-10 md:pb-10">
        <header className="nav-shell reveal sticky top-2 z-40 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-white/15 bg-black/40 px-3 py-2 backdrop-blur-md sm:top-3 sm:gap-3 sm:rounded-3xl sm:px-5 sm:py-3">
          <p className="font-display text-base tracking-[0.2em] sm:text-lg sm:tracking-[0.22em]">
            DANA // DRIVER <span className="gold-accent">&bull;</span>
          </p>
          <nav className="nav-links flex w-full flex-nowrap items-center gap-1.5 overflow-x-auto pb-1 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-zinc-300 sm:w-auto sm:flex-wrap sm:gap-3 sm:overflow-visible sm:pb-0 sm:text-[0.62rem] sm:tracking-[0.2em]">
            {primaryNav.map((item) =>
              item.href.startsWith("/") ? (
                <TransitionLink
                  key={item.label}
                  href={item.href}
                  className="nav-chip rounded-full border border-white/20 px-2.5 py-1 transition hover:border-sky-200/70 hover:text-sky-100 sm:px-3 sm:py-1.5"
                >
                  {item.label}
                </TransitionLink>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="nav-chip rounded-full border border-white/20 px-2.5 py-1 transition hover:border-sky-200/70 hover:text-sky-100 sm:px-3 sm:py-1.5"
                >
                  {item.label}
                </a>
              ),
            )}
          </nav>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-end">
          <div className="space-y-5 sm:space-y-7">
            <p className="reveal text-xs font-medium uppercase tracking-[0.25em] text-zinc-100/90">
              Driver Identity
            </p>
            <h1 className="reveal font-display text-[2.35rem] uppercase leading-[0.9] tracking-[0.04em] text-balance sm:text-6xl lg:text-7xl">
              <span className="text-amber-200">Precision,</span>
              <span className="block font-normal text-sky-200">
                Pressure, Pace.
              </span>
            </h1>
            <p className="reveal max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg">
              Photo-first identity with a coaching-ready layout. The
              storytelling centers on in-car focus, race execution, and
              technical feedback.
            </p>

            <div className="reveal flex flex-wrap gap-2.5">
              <a
                href="mailto:coaching@dylandana.com"
                className="cta-primary gold-outline"
              >
                Book Coaching
              </a>
              <TransitionLink href="/on-track" className="cta-secondary">
                View On Track
              </TransitionLink>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {driverProfile.map((item, index) => (
                <article
                  key={item.label}
                  className="reveal rounded-2xl border border-white/15 bg-black/35 p-4 backdrop-blur-sm"
                  style={{ animationDelay: `${120 + index * 90}ms` }}
                >
                  <p className="text-[0.65rem] uppercase tracking-[0.22em] text-zinc-400">
                    {item.label}
                  </p>
                  <p className="mt-2 font-display text-2xl tracking-[0.07em] text-zinc-100">
                    {item.value}
                  </p>
                </article>
              ))}
            </div>

            <article className="reveal rounded-2xl border border-amber-300/35 bg-gradient-to-r from-sky-500/20 via-transparent to-amber-300/10 p-4">
              <p className="text-[0.62rem] uppercase tracking-[0.22em] text-amber-200/90">
                Next Race
              </p>
              <p className="mt-2 font-display text-3xl uppercase tracking-[0.08em] text-sky-300">
                Sebring Weekend
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-zinc-300">
                Endurance Preparation Block
              </p>
            </article>
          </div>

          <figure className="reveal overflow-hidden rounded-3xl border border-sky-200/25 bg-zinc-900/80 p-3 shadow-2xl">
            <div className="relative h-[260px] overflow-hidden rounded-2xl sm:h-[390px] lg:h-[500px]">
              <Image
                src={leadPhoto}
                alt="Dylan Dana seated in race car wearing a blue and white helmet."
                fill
                priority
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover object-[52%_24%]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent" />
            </div>
            <figcaption className="px-2 pt-4 text-xs uppercase tracking-[0.2em] text-zinc-400">
              Photo: Dylan Dana in the cockpit during a practice session at
              Daytona International Speedway, 2025. Credit: Tyler Duane
            </figcaption>
          </figure>
        </section>

        <section className="reveal gold-outline rounded-3xl border border-white/15 bg-zinc-900/70 p-5 sm:p-6 lg:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-sky-200/90">
                Schedule Snapshot
              </p>
              <h2 className="mt-2 font-display text-3xl uppercase tracking-[0.07em] sm:text-4xl">
                Upcoming Race Weekends
              </h2>
            </div>
            <TransitionLink href="/on-track" className="cta-secondary">
              View Full Schedule
            </TransitionLink>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {upcomingEvents.map((event) => {
              const badgeClass =
                event.status === "Testing"
                  ? "border-cyan-200/35 bg-cyan-400/15 text-cyan-100"
                  : "border-amber-200/45 bg-amber-300/18 text-amber-100";
              const badgeLabel =
                event.status === "Testing" ? "Testing" : "Race Weekend";

              return (
                <article
                  key={`${event.date}-${event.title}`}
                  className="rounded-2xl border border-white/10 bg-black/40 p-4"
                >
                  <p className="text-[0.62rem] uppercase tracking-[0.22em] text-zinc-400">
                    {scheduleDateFormatter.format(
                      new Date(`${event.date}T00:00:00`),
                    )}
                  </p>
                  <p className="mt-2 font-display text-2xl uppercase tracking-[0.06em] text-sky-300">
                    {event.title}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-[0.18em] text-zinc-300">
                    {event.track}
                  </p>
                  <span
                    className={`mt-3 inline-flex rounded-full border px-2.5 py-1 text-[0.5rem] font-semibold uppercase tracking-[0.2em] ${badgeClass}`}
                  >
                    {badgeLabel}
                  </span>
                </article>
              );
            })}
          </div>
        </section>

        <section className="reveal rounded-3xl border border-white/15 bg-black/35 p-5 sm:p-6 lg:p-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">
                Recent Results
              </p>
              <h2 className="mt-2 font-display text-3xl uppercase tracking-[0.07em] sm:text-4xl">
                Last 5 Events
              </h2>
            </div>
            <TransitionLink href="/on-track" className="cta-secondary">
              Full Calendar
            </TransitionLink>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {recentResults.map((event) => (
              <article
                key={`${event.date}-${event.title}`}
                className="rounded-2xl border border-white/10 bg-zinc-900/70 p-4"
              >
                <p className="text-[0.6rem] uppercase tracking-[0.22em] text-zinc-400">
                  {scheduleDateFormatter.format(
                    new Date(`${event.date}T00:00:00`),
                  )}
                </p>
                <p className="mt-2 text-sm uppercase tracking-[0.14em] text-zinc-200">
                  {event.track}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-zinc-400">
                  {event.status === "Complete"
                    ? event.result
                    : event.status === "Testing"
                      ? "Data Session"
                      : "Result TBD"}
                </p>
              </article>
            ))}
          </div>
        </section>
        <section
          id="accomplishments"
          className="rounded-3xl border border-white/15 bg-black/35 p-5 sm:p-6 lg:p-8"
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="reveal font-display text-4xl uppercase tracking-[0.07em] sm:text-5xl">
              Driving Accomplishments
            </h2>
            <p className="reveal text-xs uppercase tracking-[0.22em] text-zinc-400">
              Progression and performance milestones
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {drivingAccomplishments.map((entry, index) => (
              <article
                key={`${entry.season}-${entry.title}`}
                className="reveal rounded-2xl border border-sky-200/20 bg-zinc-900/80 p-5"
                style={{ animationDelay: `${130 + index * 85}ms` }}
              >
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-sky-200/85">
                  {entry.season}
                </p>
                <h3 className="mt-2 font-display text-2xl uppercase tracking-[0.06em]">
                  {entry.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                  {entry.detail}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/partner-deck.pdf" className="cta-primary" download>
              Partnership Deck
            </a>
            <a href="/media-kit.pdf" className="cta-secondary" download>
              Media Kit
            </a>
            <a href="mailto:coaching@dylandana.com" className="cta-secondary">
              Sponsor Inquiry
            </a>
          </div>
        </section>

        <section
          id="partners"
          className="reveal gold-outline rounded-3xl border border-sky-200/25 bg-gradient-to-r from-sky-500/12 via-black/40 to-transparent p-5 sm:p-6 lg:p-8"
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-200/90">
                Partnerships
              </p>
              <h2 className="mt-2 font-display text-4xl uppercase tracking-[0.07em] sm:text-5xl">
                Sponsor-Ready Program
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <a href="/partner-deck.pdf" className="cta-primary" download>
                Partnership Deck
              </a>
              <a href="/media-kit.pdf" className="cta-secondary" download>
                Media Kit
              </a>
            </div>
          </div>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-zinc-200 sm:text-base">
            Open inventory for 2026 includes branded livery placement, in-car
            content, and race-weekend hospitality. Replace the placeholders
            below with sponsor logos or partners you are highlighting.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-4">
            {[
              "Title Partner",
              "Technical Partner",
              "Support Partner",
              "Community Partner",
            ].map((label) => (
              <div
                key={label}
                className="rounded-2xl border border-sky-200/20 bg-black/35 px-4 py-6 text-center text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-sky-100/80"
              >
                {label}
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="mailto:coaching@dylandana.com" className="cta-secondary">
              Sponsor Inquiry
            </a>
            <TransitionLink href="/on-track" className="cta-secondary">
              View Schedule
            </TransitionLink>
          </div>
        </section>

        <section
          id="video-highlights"
          className="rounded-3xl border border-white/15 bg-black/35 p-5 sm:p-6 lg:p-8"
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="reveal font-display text-4xl uppercase tracking-[0.07em] sm:text-5xl">
              Video Highlights
            </h2>
            <p className="reveal text-xs uppercase tracking-[0.22em] text-amber-200/90">
              Latest clips from Dylan&apos;s channel
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {videoHighlights.map((video, index) => (
              <a
                key={video.title}
                href={video.href}
                target="_blank"
                rel="noreferrer"
                className="reveal overflow-hidden rounded-2xl border border-amber-200/20 bg-zinc-900/80 transition hover:border-amber-200/50 hover:bg-zinc-900"
                style={{ animationDelay: `${130 + index * 90}ms` }}
              >
                <div className="relative h-60">
                  <Image
                    src={video.thumbnail}
                    alt={`${video.title} preview image.`}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className={`object-cover ${video.position}`}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
                  <div className="pointer-events-none absolute left-3 top-3 rounded-full border border-amber-200/60 bg-black/40 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-amber-100">
                    Watch
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-display text-2xl uppercase tracking-[0.06em]">
                    {video.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                    {video.copy}
                  </p>
                </div>
              </a>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="https://www.youtube.com/@DylanDana/videos"
              target="_blank"
              rel="noreferrer"
              className="cta-primary"
            >
              Watch Full Channel
            </a>
            <TransitionLink href="/on-track" className="cta-secondary">
              View On Track
            </TransitionLink>
          </div>
        </section>

        <section
          id="sebring"
          className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start"
        >
          <article className="reveal rounded-3xl border border-sky-300/35 bg-gradient-to-r from-sky-500/20 via-blue-400/10 to-transparent p-5 sm:p-6 lg:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.23em] text-sky-100/90">
              Favorite Track
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-4xl uppercase leading-[0.95] tracking-[0.06em] sm:text-5xl">
              Sebring International Raceway
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-200 sm:text-base">
              High-commitment corners, heavy braking zones, and rough surface
              behavior make Sebring a strong benchmark for discipline and
              consistency over long race runs.
            </p>
          </article>

          <aside className="reveal rounded-3xl border border-white/15 bg-black/45 p-3 shadow-2xl backdrop-blur-sm">
            <p className="mb-3 px-1 text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-zinc-400">
              3D Analytics // Driver Focus
            </p>
            <TrackModelPanel />
            <div className="mt-4 space-y-2 px-1 pb-1">
              <p className="text-[0.68rem] uppercase tracking-[0.18em] text-sky-200/90">
                Interactive WebGL Analytics
              </p>
              <p className="text-[0.68rem] uppercase tracking-[0.18em] text-zinc-300">
                Race-car data measuring animation with live speed/load HUD
              </p>
            </div>
          </aside>
          <div className="reveal flex flex-wrap gap-3 lg:col-span-2">
            <a href="mailto:coaching@dylandana.com" className="cta-primary">
              Sponsor Inquiry
            </a>
            <a href="#contact" className="cta-secondary">
              Book Coaching
            </a>
          </div>
        </section>

        <section
          id="contact"
          className="reveal rounded-3xl border border-white/15 bg-zinc-900/75 p-5 sm:p-6 lg:p-8"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.23em] text-sky-100/90">
            Driver Coaching
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl uppercase leading-[0.95] tracking-[0.06em] sm:text-5xl">
            Book Dylan Dana For 1:1 Driver Coaching
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-200 sm:text-base">
            Coaching sessions are designed for developing drivers who want
            cleaner laps, stronger racecraft decisions, and better race-weekend
            preparation.
          </p>

          <div className="mt-6 grid gap-2 sm:grid-cols-2">
            {coachingAreas.map((item, index) => (
              <p
                key={item}
                className="reveal rounded-xl border border-sky-200/20 bg-zinc-800/50 px-3 py-2 text-xs uppercase tracking-[0.16em] text-sky-100/90"
                style={{ animationDelay: `${160 + index * 70}ms` }}
              >
                {item}
              </p>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href="mailto:coaching@dylandana.com" className="cta-primary">
              Email Coaching
            </a>
            <TransitionLink href="/on-track" className="cta-secondary">
              Explore On Track
            </TransitionLink>
          </div>
        </section>

        <footer className="reveal rounded-3xl border border-white/15 bg-black/45 px-5 py-6">
          <p className="text-[0.62rem] uppercase tracking-[0.22em] text-zinc-400">
            What&apos;s Up On Socials
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-sky-200/35 bg-zinc-900/70 px-4 py-3 transition hover:bg-sky-400/15"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-100">
                  {item.label}
                </p>
                <p className="mt-1 text-[0.66rem] uppercase tracking-[0.14em] text-zinc-300">
                  {item.handle}
                </p>
              </a>
            ))}
          </div>
          <p className="mt-3 text-[0.62rem] uppercase tracking-[0.16em] text-zinc-500">
            Social links are live and ready for followers.
          </p>
          <p className="mt-5 text-xs uppercase tracking-[0.2em] text-zinc-500">
            Dylan Dana // Always bringing the fight.
          </p>
          <p className="mt-2 text-[0.62rem] uppercase tracking-[0.18em] text-zinc-500">
            Built by{" "}
            <a
              href="https://www.linkedin.com/in/dezsokovi/"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-200 transition hover:text-amber-200"
            >
              Dezso Kovi
            </a>
            .
          </p>
        </footer>
      </div>
    </main>
  );
}
