import Image from "next/image";
import SponsorMarquee from "../components/SponsorMarquee";
import TrackModelPanel from "../components/TrackModelPanel";
import TransitionLink from "../components/TransitionLink";

const leadPhoto = "/photos/20250329_CHAMPCAR_DAYTONA_TDP-5648.jpeg";
const SHOW_SPONSORS = false;

const driverProfile = [
  { label: "Name", value: "Dylan Dana" },
  { label: "Discipline", value: "Endurance Racing" },
  { label: "Favorite Track", value: "Sebring International Raceway" },
  { label: "Series Focus", value: "ChampCar Platform" },
];

const raceTraits = [
  {
    title: "Composure",
    copy: "Calm in-car decision making under pressure and traffic.",
  },
  {
    title: "Consistency",
    copy: "Repeatable pace and disciplined input over long stints.",
  },
  {
    title: "Technical Feedback",
    copy: "Clear communication to convert data and feel into setup changes.",
  },
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
  ...(SHOW_SPONSORS ? [{ href: "#sponsors", label: "Sponsors" }] : []),
  { href: "#sebring", label: "Favorite Track" },
  { href: "#contact", label: "Coaching" },
];

const raceFocus = [
  {
    title: "On Track",
    copy: "Dedicated race page with schedule, stats, and creative telemetry focus.",
    href: "/on-track",
  },
  {
    title: "Off Track",
    copy: "Media and sponsor-facing visuals from race weekends and coaching.",
    href: SHOW_SPONSORS ? "#sponsors" : "#video-highlights",
  },
];

const socialLinks = [
  {
    href: "https://www.instagram.com/dd_fc_t",
    label: "Instagram",
    handle: "@dd_fc_t",
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
    thumbnail: "/photos/20250329_CHAMPCAR_DAYTONA_TDP-5563.jpg",
    position: "object-[52%_28%]",
  },
  {
    title: "Sebring Prep Session",
    copy: "Track prep focus for braking zones, rhythm, and consistency.",
    href: "https://www.youtube.com/@DylanDana/videos",
    thumbnail: "/photos/20250329_CHAMPCAR_DAYTONA_TDP-5596.jpg",
    position: "object-[55%_26%]",
  },
  {
    title: "Onboard Coaching Breakdown",
    copy: "Corner-entry and exit analysis for cleaner, faster laps.",
    href: "https://www.youtube.com/@DylanDana/videos",
    thumbnail: "/photos/20250329_CHAMPCAR_DAYTONA_TDP-2687.jpg",
    position: "object-[50%_26%]",
  },
];

export default function Home() {
  return (
    <main className="race-surface relative min-h-screen overflow-x-clip px-4 py-6 text-zinc-100 sm:px-8 sm:py-8 lg:px-12">
      <div className="track-grid pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute -top-28 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-sky-500/30 blur-3xl" />
      <div className="pointer-events-none absolute top-14 right-[10%] h-72 w-72 rounded-full bg-amber-300/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[24%] left-[7%] h-64 w-64 rounded-full bg-amber-200/10 blur-3xl" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 pb-8 md:gap-10 md:pb-10">
        <header className="nav-shell reveal sticky top-3 z-40 flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-white/15 bg-black/40 px-5 py-3 backdrop-blur-md">
          <p className="font-display text-lg tracking-[0.22em]">
            DANA // DRIVER <span className="gold-accent">&bull;</span>
          </p>
          <nav className="flex flex-wrap items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-zinc-300 sm:gap-3">
            {primaryNav.map((item) => (
              item.href.startsWith("/") ? (
                <TransitionLink
                  key={item.label}
                  href={item.href}
                  className="nav-chip rounded-full border border-white/20 px-3 py-1.5 transition hover:border-sky-200/70 hover:text-sky-100"
                >
                  {item.label}
                </TransitionLink>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="nav-chip rounded-full border border-white/20 px-3 py-1.5 transition hover:border-sky-200/70 hover:text-sky-100"
                >
                  {item.label}
                </a>
              )
            ))}
          </nav>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-end">
          <div className="space-y-7">
            <p className="reveal text-xs font-semibold uppercase tracking-[0.25em] text-sky-200/90">
              Driver Identity
            </p>
            <h1 className="reveal font-display text-4xl uppercase leading-[0.88] tracking-[0.04em] text-balance sm:text-6xl lg:text-7xl">
              Precision,
              <span className="block text-sky-300">Pressure, Pace.</span>
            </h1>
            <p className="reveal max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg">
              Photo-first identity with a coaching-ready layout. The storytelling
              centers on in-car focus, race execution, and technical feedback.
            </p>

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
                  <p className="mt-2 font-display text-2xl tracking-[0.07em] text-sky-300">
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
            <div className="relative h-[300px] overflow-hidden rounded-2xl sm:h-[420px] lg:h-[520px]">
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
              Recommended Hero: cockpit portrait with eyes visible
            </figcaption>
          </figure>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {raceFocus.map((item, index) => (
            item.href.startsWith("/") ? (
              <TransitionLink
                key={item.title}
                href={item.href}
                className="reveal rounded-2xl border border-sky-200/20 bg-zinc-900/75 p-5 transition hover:border-sky-200/60 hover:bg-zinc-900"
                style={{ animationDelay: `${130 + index * 85}ms` }}
              >
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-sky-200/85">
                  {item.title}
                </p>
                <p className="mt-3 font-display text-3xl uppercase tracking-[0.08em]">
                  Explore
                </p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                  {item.copy}
                </p>
              </TransitionLink>
            ) : (
              <a
                key={item.title}
                href={item.href}
                className="reveal rounded-2xl border border-sky-200/20 bg-zinc-900/75 p-5 transition hover:border-sky-200/60 hover:bg-zinc-900"
                style={{ animationDelay: `${130 + index * 85}ms` }}
              >
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-sky-200/85">
                  {item.title}
                </p>
                <p className="mt-3 font-display text-3xl uppercase tracking-[0.08em]">
                  Explore
                </p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                  {item.copy}
                </p>
              </a>
            )
          ))}
        </section>

        <section
          id="traits"
          className="grid gap-4 md:grid-cols-3"
          aria-label="Driver strengths"
        >
          {raceTraits.map((trait, index) => (
            <article
              key={trait.title}
              className="reveal rounded-2xl border border-sky-200/15 bg-zinc-900/65 p-5"
              style={{ animationDelay: `${140 + index * 80}ms` }}
            >
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-sky-200/80">
                Driver Trait
              </p>
              <h2 className="mt-3 font-display text-2xl uppercase leading-tight tracking-[0.06em]">
                {trait.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                {trait.copy}
              </p>
            </article>
          ))}
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
              3D Track // Driver Focus
            </p>
            <TrackModelPanel />
            <div className="mt-4 space-y-2 px-1 pb-1">
              <p className="text-[0.68rem] uppercase tracking-[0.18em] text-sky-200/90">
                3D Track Model
              </p>
              <p className="text-[0.68rem] uppercase tracking-[0.18em] text-zinc-300">
                Built from your track reference with a live WebGL scene
              </p>
            </div>
          </aside>
        </section>

        {SHOW_SPONSORS ? (
          <div id="sponsors">
            <SponsorMarquee />
          </div>
        ) : null}

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
            <a
              href="mailto:coaching@dylandana.com"
              className="rounded-full bg-sky-500 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-sky-950 transition hover:bg-sky-400"
            >
              Email Coaching
            </a>
            <a
              href="#"
              className="rounded-full border border-white/30 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] transition hover:bg-white/10"
            >
              Add Booking Link
            </a>
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
        </footer>
      </div>
    </main>
  );
}
