import Image from "next/image";
import TrackModelPanel from "../../components/track-model-panel";
import RaceCalendar, { type RaceStatus } from "../../components/race-calendar";
import TransitionLink from "../../components/transition-link";
import { raceEvents } from "../../data/raceEvents";

const seasonStats = [
  { label: "Starts", value: "22" },
  { label: "Podiums", value: "9" },
  { label: "Class Wins", value: "4" },
  { label: "Fastest Laps", value: "6" },
];

const statusClasses: Record<RaceStatus, string> = {
  Complete: "border-sky-200/35 bg-sky-500/15 text-sky-100",
  Upcoming: "border-amber-200/45 bg-amber-300/18 text-amber-100",
  Testing: "border-cyan-200/35 bg-cyan-400/15 text-cyan-100",
};

const statusLabels: Record<RaceStatus, string> = {
  Complete: "Race Weekend",
  Upcoming: "Race Weekend",
  Testing: "Testing",
};

const highlightCards = [
  {
    src: "/photos/dd-2026-02.jpg",
    title: "Race Start Focus",
    copy: "Early-stint composure and tire preservation strategy.",
    position: "object-[52%_26%]",
  },
  {
    src: "/photos/dd-2026-03.jpg",
    title: "Helmet Cam Briefing",
    copy: "Consistent communication between driver and pit wall.",
    position: "object-[56%_28%]",
  },
  {
    src: "/photos/dd-2026-04.jpg",
    title: "Grid Preparation",
    copy: "Pre-race routine focused on launch and first-lap positioning.",
    position: "object-[48%_26%]",
  },
];

const weekendNotes = [
  {
    title: "Opening Laps",
    copy: "Protect tires through traffic while building baseline pace in the first stint.",
  },
  {
    title: "Mid-Stint Rhythm",
    copy: "Stay clean on brake release and keep corner exits repeatable under pressure.",
  },
  {
    title: "Radio Feedback",
    copy: "Keep setup notes concise so pit strategy adjustments happen quickly.",
  },
];

export default function OnTrackPage() {
  return (
    <main className="ontrack-surface relative min-h-screen overflow-x-clip px-4 py-6 text-zinc-100 sm:px-8 sm:py-8 lg:px-12">
      <div className="track-grid pointer-events-none absolute inset-0 opacity-30" />
      <div
        className="pointer-events-none absolute -top-36 left-2/3 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-sky-500/25 blur-3xl"
      />
      <div
        className="pointer-events-none absolute top-20 right-[12%] h-72 w-72 rounded-full bg-amber-300/16 blur-3xl"
      />
      <div
        className="pointer-events-none absolute bottom-[18%] left-[8%] h-60 w-60 rounded-full bg-amber-200/10 blur-3xl"
      />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 pb-8 md:gap-10 md:pb-10">
        <header className="nav-shell reveal sticky top-2 z-40 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-white/15 bg-black/45 px-3 py-2 backdrop-blur-md sm:top-3 sm:gap-3 sm:rounded-3xl sm:px-5 sm:py-3">
          <p className="font-display text-base tracking-[0.2em] sm:text-lg sm:tracking-[0.22em]">
            DANA // ON TRACK <span className="gold-accent">&bull;</span>
          </p>
          <nav className="nav-links flex w-full flex-nowrap items-center gap-1.5 overflow-x-auto pb-1 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-zinc-300 sm:w-auto sm:flex-wrap sm:gap-3 sm:overflow-visible sm:pb-0 sm:text-[0.62rem] sm:tracking-[0.2em]">
            <TransitionLink
              href="/"
              className="nav-chip rounded-full border border-white/20 px-2.5 py-1 transition hover:border-sky-200/70 hover:text-sky-100 sm:px-3 sm:py-1.5"
            >
              Home
            </TransitionLink>
            <a
              href="#schedule"
              className="nav-chip rounded-full border border-white/20 px-2.5 py-1 transition hover:border-sky-200/70 hover:text-sky-100 sm:px-3 sm:py-1.5"
            >
              Schedule
            </a>
            <a
              href="#highlights"
              className="nav-chip rounded-full border border-white/20 px-2.5 py-1 transition hover:border-sky-200/70 hover:text-sky-100 sm:px-3 sm:py-1.5"
            >
              Highlights
            </a>
          </nav>
        </header>

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div className="space-y-5 sm:space-y-6">
            <p className="reveal text-xs font-semibold uppercase tracking-[0.25em] text-sky-200/90">
              On Track
            </p>
            <h1 className="reveal font-display text-[2.3rem] uppercase leading-[0.9] tracking-[0.04em] sm:text-6xl lg:text-7xl">
              Season
              <span className="block text-sky-300">Performance Hub</span>
            </h1>
            <p className="reveal max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg">
              Real race-weekend progression, current form, and Sebring-focused
              preparation. Built as a dedicated on-track page with an
              interactive 3D race telemetry visualization.
            </p>

            <div className="reveal flex flex-wrap gap-2.5">
              <a
                href="mailto:coaching@dylandana.com"
                className="cta-primary gold-outline"
              >
                Book Coaching
              </a>
              <a href="#schedule" className="cta-secondary">
                View Schedule
              </a>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <article className="reveal rounded-2xl border border-amber-300/35 bg-gradient-to-r from-sky-500/20 via-transparent to-amber-300/10 p-4">
                <p className="text-[0.62rem] uppercase tracking-[0.22em] text-amber-200/90">
                  Next Race
                </p>
                <p className="mt-2 font-display text-3xl uppercase tracking-[0.08em] text-sky-300">
                  Sebring
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-zinc-300">
                  Endurance weekend prep in progress
                </p>
              </article>

              <article className="reveal rounded-2xl border border-white/15 bg-black/40 p-4">
                <p className="text-[0.62rem] uppercase tracking-[0.22em] text-zinc-400">
                  Current Focus
                </p>
                <p className="mt-2 font-display text-2xl uppercase tracking-[0.06em] text-sky-300">
                  Long-Run Pace
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-zinc-300">
                  Brake release and mid-corner speed
                </p>
              </article>
            </div>
          </div>

          <div className="reveal rounded-3xl border border-white/15 bg-black/45 p-3 shadow-2xl backdrop-blur-sm">
            <p className="mb-3 px-1 text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-zinc-400">
              3D Telemetry // On Track
            </p>
            <TrackModelPanel />
          </div>
        </section>

        <section className="grid gap-3 sm:grid-cols-4">
          {seasonStats.map((stat, index) => (
            <article
              key={stat.label}
              className="reveal rounded-2xl border border-white/15 bg-zinc-900/75 p-4"
              style={{ animationDelay: `${110 + index * 80}ms` }}
            >
              <p className="text-[0.62rem] uppercase tracking-[0.2em] text-zinc-400">
                {stat.label}
              </p>
              <p className="mt-2 font-display text-4xl uppercase tracking-[0.08em] text-sky-300">
                {stat.value}
              </p>
            </article>
          ))}
        </section>

        <section
          id="schedule"
          className="gold-outline rounded-3xl border border-white/15 bg-black/40 p-5 sm:p-6 lg:p-8"
        >
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="reveal font-display text-4xl uppercase tracking-[0.07em] sm:text-5xl">
              Race Calendar
            </h2>
            <p className="reveal text-xs uppercase tracking-[0.2em] text-zinc-400">
              2026 on-track program
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full border border-white/20 bg-zinc-900/70 px-3 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-zinc-300">
              Status Legend
            </span>
            {(Object.keys(statusClasses) as RaceStatus[]).map((status) => (
              <span
                key={status}
                className={`rounded-full border px-3 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.2em] ${statusClasses[status]}`}
              >
                {statusLabels[status]}
              </span>
            ))}
            <span className="rounded-full border border-amber-200/40 bg-amber-300/15 px-3 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-amber-100">
              Holiday
            </span>
          </div>

          <RaceCalendar
            events={raceEvents}
            year={2026}
            statusClasses={statusClasses}
          />
        </section>

        <section className="rounded-3xl border border-white/15 bg-zinc-900/70 p-5 sm:p-6 lg:p-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="reveal font-display text-3xl uppercase tracking-[0.07em] sm:text-4xl">
              Weekend Notes
            </h2>
            <p className="reveal text-[0.62rem] uppercase tracking-[0.2em] text-zinc-400">
              Race plan checklist
            </p>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {weekendNotes.map((note, index) => (
              <article
                key={note.title}
                className="reveal rounded-2xl border border-sky-200/20 bg-zinc-900/85 p-4"
                style={{ animationDelay: `${120 + index * 80}ms` }}
              >
                <p className="text-[0.62rem] uppercase tracking-[0.2em] text-sky-200/85">
                  {note.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                  {note.copy}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="highlights"
          className="rounded-3xl border border-white/15 bg-black/35 p-5 sm:p-6 lg:p-8"
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="reveal font-display text-4xl uppercase tracking-[0.07em] sm:text-5xl">
              On-Track Highlights
            </h2>
            <p className="reveal text-xs uppercase tracking-[0.22em] text-zinc-400">
              Race weekend visuals
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {highlightCards.map((card, index) => (
              <article
                key={card.title}
                className="reveal overflow-hidden rounded-2xl border border-sky-200/20 bg-zinc-900/75"
                style={{ animationDelay: `${140 + index * 85}ms` }}
              >
                <div className="relative h-56 sm:h-64 lg:h-72">
                  <Image
                    src={card.src}
                    alt={`${card.title} race photograph.`}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className={`object-cover ${card.position}`}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent" />
                </div>
                <div className="p-4">
                  <h3 className="font-display text-2xl uppercase tracking-[0.06em]">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                    {card.copy}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-[0.92fr_1.08fr]">
          <article className="reveal overflow-hidden rounded-3xl border border-white/15 bg-zinc-900/70">
            <div className="relative h-full min-h-[240px] sm:min-h-[300px] lg:min-h-[330px]">
              <Image
                src="/photos/dd-2026-01.jpg"
                alt="Dylan Dana in the car preparing for a race session."
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover object-[54%_26%]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
            </div>
          </article>

          <article className="reveal rounded-3xl border border-sky-300/30 bg-gradient-to-r from-sky-500/20 via-blue-500/10 to-transparent p-5 sm:p-6 lg:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-100/90">
              Driver Coaching
            </p>
            <h2 className="mt-3 font-display text-4xl uppercase leading-[0.95] tracking-[0.07em] sm:text-5xl">
              Turn Data Into Faster Laps
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-200 sm:text-base">
              Book a coaching session focused on racecraft decisions, braking
              traces, and consistency under pressure.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="mailto:coaching@dylandana.com" className="cta-primary">
                Email Coaching
              </a>
              <TransitionLink
                href="/"
                className="cta-secondary"
              >
                Back To Home
              </TransitionLink>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}

