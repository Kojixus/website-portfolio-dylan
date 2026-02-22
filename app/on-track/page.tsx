import Image from "next/image";
import SponsorMarquee from "../../components/SponsorMarquee";
import TrackModelPanel from "../../components/TrackModelPanel";
import TransitionLink from "../../components/TransitionLink";

const SHOW_SPONSORS = false;

const seasonStats = [
  { label: "Starts", value: "22" },
  { label: "Podiums", value: "9" },
  { label: "Class Wins", value: "4" },
  { label: "Fastest Laps", value: "6" },
];

const scheduleRows = [
  {
    round: "01",
    event: "Daytona Endurance Weekend",
    track: "Daytona International Speedway",
    result: "P2 Class",
    status: "Complete",
  },
  {
    round: "02",
    event: "Spring Test and Tune",
    track: "Sebring International Raceway",
    result: "Test Session",
    status: "Complete",
  },
  {
    round: "03",
    event: "Sebring Race Weekend",
    track: "Sebring International Raceway",
    result: "Next",
    status: "Upcoming",
  },
  {
    round: "04",
    event: "Summer Enduro",
    track: "Road Atlanta",
    result: "-",
    status: "Upcoming",
  },
  {
    round: "05",
    event: "Night Event",
    track: "Virginia International Raceway",
    result: "-",
    status: "Upcoming",
  },
];

const highlightCards = [
  {
    src: "/photos/20250329_CHAMPCAR_DAYTONA_TDP-5563.jpg",
    title: "Race Start Focus",
    copy: "Early-stint composure and tire preservation strategy.",
    position: "object-[52%_26%]",
  },
  {
    src: "/photos/20250329_CHAMPCAR_DAYTONA_TDP-5596.jpg",
    title: "Helmet Cam Briefing",
    copy: "Consistent communication between driver and pit wall.",
    position: "object-[56%_28%]",
  },
  {
    src: "/photos/20250329_CHAMPCAR_DAYTONA_TDP-2687.jpg",
    title: "Grid Preparation",
    copy: "Pre-race routine focused on launch and first-lap positioning.",
    position: "object-[48%_26%]",
  },
];

export default function OnTrackPage() {
  return (
    <main className="ontrack-surface relative min-h-screen overflow-x-clip px-4 py-6 text-zinc-100 sm:px-8 sm:py-8 lg:px-12">
      <div className="track-grid pointer-events-none absolute inset-0 opacity-30" />
      <div className="pointer-events-none absolute -top-36 left-2/3 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-sky-500/25 blur-3xl" />
      <div className="pointer-events-none absolute top-20 right-[12%] h-72 w-72 rounded-full bg-amber-300/16 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[18%] left-[8%] h-60 w-60 rounded-full bg-amber-200/10 blur-3xl" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 pb-8 md:gap-10 md:pb-10">
        <header className="nav-shell reveal sticky top-3 z-40 flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-white/15 bg-black/45 px-5 py-3 backdrop-blur-md">
          <p className="font-display text-lg tracking-[0.22em]">
            DANA // ON TRACK <span className="gold-accent">&bull;</span>
          </p>
          <nav className="flex flex-wrap items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-zinc-300 sm:gap-3">
            <TransitionLink
              href="/"
              className="nav-chip rounded-full border border-white/20 px-3 py-1.5 transition hover:border-sky-200/70 hover:text-sky-100"
            >
              Home
            </TransitionLink>
            <a
              href="#schedule"
              className="nav-chip rounded-full border border-white/20 px-3 py-1.5 transition hover:border-sky-200/70 hover:text-sky-100"
            >
              Schedule
            </a>
            <a
              href="#highlights"
              className="nav-chip rounded-full border border-white/20 px-3 py-1.5 transition hover:border-sky-200/70 hover:text-sky-100"
            >
              Highlights
            </a>
          </nav>
        </header>

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div className="space-y-6">
            <p className="reveal text-xs font-semibold uppercase tracking-[0.25em] text-sky-200/90">
              On Track
            </p>
            <h1 className="reveal font-display text-4xl uppercase leading-[0.88] tracking-[0.04em] sm:text-6xl lg:text-7xl">
              Season
              <span className="block text-sky-300">Performance Hub</span>
            </h1>
            <p className="reveal max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg">
              Real race-weekend progression, current form, and Sebring-focused
              preparation. Built as a dedicated on-track page with an interactive
              3D track model display.
            </p>

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
              3D Section // On Track
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

        {SHOW_SPONSORS ? <SponsorMarquee /> : null}

        <section
          id="schedule"
          className="rounded-3xl border border-white/15 bg-black/40 p-5 sm:p-6 lg:p-8"
        >
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="reveal font-display text-4xl uppercase tracking-[0.07em] sm:text-5xl">
              Race Schedule
            </h2>
            <p className="reveal text-xs uppercase tracking-[0.2em] text-zinc-400">
              2026 on-track program
            </p>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
            <div className="overflow-x-auto">
              <div className="min-w-[760px]">
                <div className="grid grid-cols-[0.55fr_1.5fr_1.7fr_1fr_1fr] bg-zinc-900/90 px-4 py-3 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-zinc-400">
                  <p>Round</p>
                  <p>Event</p>
                  <p>Track</p>
                  <p>Result</p>
                  <p>Status</p>
                </div>
                {scheduleRows.map((row, index) => (
                  <div
                    key={row.round + row.event}
                    className="reveal grid grid-cols-[0.55fr_1.5fr_1.7fr_1fr_1fr] border-t border-white/10 bg-zinc-900/70 px-4 py-3 text-sm text-zinc-200 transition hover:bg-zinc-800/85"
                    style={{ animationDelay: `${120 + index * 70}ms` }}
                  >
                    <p className="font-display text-xl uppercase tracking-[0.08em] text-sky-300">
                      {row.round}
                    </p>
                    <p className="text-[0.72rem] uppercase tracking-[0.12em]">
                      {row.event}
                    </p>
                    <p className="text-[0.72rem] uppercase tracking-[0.12em] text-zinc-300">
                      {row.track}
                    </p>
                    <p className="text-[0.72rem] uppercase tracking-[0.12em]">
                      {row.result}
                    </p>
                    <p className="text-[0.72rem] uppercase tracking-[0.12em] text-sky-100">
                      {row.status}
                    </p>
                  </div>
                ))}
              </div>
            </div>
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
                src="/photos/20250329_CHAMPCAR_DAYTONA_TDP-5648.jpg"
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
              <a
                href="mailto:coaching@dylandana.com"
                className="rounded-full bg-sky-500 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-sky-950 transition hover:bg-sky-400"
              >
                Email Coaching
              </a>
              <TransitionLink
                href="/"
                className="rounded-full border border-white/30 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] transition hover:bg-white/10"
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
