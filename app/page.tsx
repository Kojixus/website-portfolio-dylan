import Image from "next/image";
import SiteHeader from "../components/site-header";
import TrackModelPanel from "../components/track-model-panel";
import TransitionLink from "../components/transition-link";
import { ResultRow } from "../components/results-table";
import {
  careerStats,
  completedRaces,
  countdownLabel,
  daysUntil,
  raceEvents,
  teams,
  todayISO,
  type TeamId,
} from "../data/raceEvents";
import { photos, type Photo } from "../data/photos";

// "What's next" depends on today's date, so re-render at least hourly.
export const revalidate = 3600;

const leadPhoto = photos.portrait;

const INSTRUCTOR_ROLE = "Driving instructor at The Motor Enclave, Tampa";

const cars: { team: TeamId; photo: Photo; position: string }[] = [
  { team: "levelOne", photo: photos.sebringPan, position: "object-[40%_60%]" },
  { team: "kovi", photo: photos.integraFront, position: "object-[50%_45%]" },
];

const CONTACT_EMAIL = "coaching@dylandana.com";

function mailto(subject: string) {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
}

const primaryNav = [
  { href: "#cars", label: "Cars" },
  { href: "#results", label: "Results" },
  { href: "#video", label: "Video" },
  { href: "#coaching", label: "Coaching" },
  { href: "#partners", label: "Partners" },
  { href: "/on-track", label: "Full season" },
];

const accomplishments = [
  {
    season: "2021",
    title: "Summer league champion",
    detail:
      "Took the title, and the helmet has carried it ever since. It was a sprint series, which turned out to be the wrong habit to bring to endurance racing.",
  },
  {
    season: "2021",
    title: "ChampCar debut with Kovi Racing",
    detail:
      "Palm Beach Enduros in the #214 Integra. Different job entirely: tires have to last, fuel has to last, and so does concentration — a fast lap is worth nothing if it costs you the stint.",
  },
  {
    season: "2024",
    title: "Joined Level One Racing",
    detail:
      "Added the #412 Miata, racing in the deep A-class field. First time out: second in class at the Daytona 14-Hour.",
  },
  {
    season: "2025",
    title: "Overall win at Sebring",
    detail:
      "Level One's #412 won Sebring Under the Stars outright, and Kovi Racing's #214 took the F-class win in the same race.",
  },
  {
    season: "Now",
    title: "Instructing at The Motor Enclave",
    detail:
      "Driving instructor at The Motor Enclave in Tampa, turning what endurance racing teaches into laps for other drivers.",
  },
];

const coachingAreas = [
  "Racecraft and when an overtake is actually on",
  "Onboard review — braking points, line, and where the time really went",
  "Stint planning, tire management, and holding a pace",
  "Pre-session routine, so the first lap isn't the warm-up",
];

const partnerPackages = [
  { tier: "Title", detail: "Full livery, suit, and helmet placement" },
  { tier: "Technical", detail: "Parts, fluids, or data support" },
  { tier: "Support", detail: "Panel space and in-car camera time" },
  { tier: "Community", detail: "Karting and grassroots driver programs" },
];

const videoHighlights = [
  {
    title: "Daytona race recap",
    copy: "Where the race was won and lost, stint by stint.",
    href: "https://www.youtube.com/@DylanDana/videos",
    thumbnail: photos.integraPan.src,
    position: "object-[35%_55%]",
  },
  {
    title: "Sebring prep",
    copy: "Braking zones and rhythm on the roughest surface we run.",
    href: "https://www.youtube.com/@DylanDana/videos",
    thumbnail: photos.sebringPan.src,
    position: "object-[40%_60%]",
  },
  {
    title: "Onboard coaching breakdown",
    copy: "A corner pulled apart on entry and exit, with the fix.",
    href: "https://www.youtube.com/@DylanDana/videos",
    thumbnail: photos.sebringDirt.src,
    position: "object-[50%_58%]",
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

const shortDate = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

const longDate = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

function asDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`);
}

export default function Home() {
  const today = todayISO();

  // Decide "upcoming" by the calendar, not the stored status, so a test day
  // that has already happened drops off the list on its own.
  const upcomingEvents = raceEvents
    .filter((event) => event.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3);

  const nextEvent = upcomingEvents[0];
  const nextCountdown = nextEvent
    ? countdownLabel(daysUntil(nextEvent.date, today))
    : null;

  const recentResults = completedRaces.slice(0, 6);
  const career = careerStats(completedRaces);

  return (
    <>
      <SiteHeader section="Driver" items={primaryNav} />

      <main id="main" className="mx-auto w-full max-w-5xl px-5 pb-20 sm:px-8">
        {/* Hero */}
        <section className="grid gap-10 pt-14 pb-16 lg:grid-cols-[1fr_0.9fr] lg:items-start lg:gap-12">
          <div>
            <p className="eyebrow eyebrow-accent">Endurance racing · ChampCar</p>
            <h1 className="mt-4 text-5xl sm:text-6xl lg:text-[4.25rem]">
              <span className="text-amber-200">Dylan Dana</span>
              <span className="mt-1 block font-normal text-sky-200">
                Endurance driver
              </span>
            </h1>
            <p className="lede mt-6 max-w-xl text-lg">
              I race long-distance events on the ChampCar platform — Daytona,
              Sebring, and most of what falls between them — in two cars: Level
              One Racing&apos;s #412 Miata and Kovi Racing&apos;s #214 Integra.
              During the week I&apos;m a driving instructor at The Motor Enclave
              in Tampa.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#coaching" className="cta-primary">
                Book coaching
              </a>
              <TransitionLink href="/on-track" className="cta-secondary">
                Season and results
              </TransitionLink>
            </div>

            <dl className="mt-10 max-w-md">
              <div className="spec">
                <dt>Driving for</dt>
                <dd>
                  Level One #{teams.levelOne.number} · Kovi #{teams.kovi.number}
                </dd>
              </div>
              <div className="spec">
                <dt>ChampCar starts</dt>
                <dd>
                  {career.starts}{" "}
                  <span className="font-normal text-zinc-400">
                    · {career.classWins} class wins · {career.overallWins} overall
                  </span>
                </dd>
              </div>
              <div className="spec">
                <dt>Instructor</dt>
                <dd>The Motor Enclave, Tampa</dd>
              </div>
              {nextEvent ? (
                <div className="spec">
                  <dt>Next out</dt>
                  <dd>
                    <a
                      href="#schedule"
                      className="meta text-base font-semibold text-amber-200 transition-colors hover:text-amber-100"
                    >
                      {nextEvent.title} · {longDate.format(asDate(nextEvent.date))}
                    </a>
                    <span className="mt-0.5 block text-[0.78rem] font-normal text-zinc-400">
                      {nextCountdown}
                    </span>
                  </dd>
                </div>
              ) : null}
            </dl>
          </div>

          <figure className="m-0">
            <div className="relative h-[320px] overflow-hidden rounded-[4px] sm:h-[440px] lg:h-[520px]">
              <Image
                src={leadPhoto.src}
                alt={leadPhoto.alt}
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover object-[50%_30%]"
              />
            </div>
            <figcaption className="mt-3 text-[0.82rem] leading-relaxed text-zinc-500">
              {leadPhoto.caption}
            </figcaption>
          </figure>
        </section>

        {/* Cars */}
        <section className="band" id="cars">
          <div className="band-head">
            <h2 className="text-3xl">The cars</h2>
            <p className="meta">Two teams, two classes</p>
          </div>

          <div className="mt-6 grid gap-10 md:grid-cols-2">
            {cars.map(({ team: id, photo, position }) => {
              const team = teams[id];
              const stats = careerStats(
                completedRaces.filter((race) => race.team === id),
              );
              return (
                <article key={id} className="car-card">
                  <div className="relative h-56 overflow-hidden rounded-[4px] sm:h-64">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className={`object-cover ${position}`}
                    />
                  </div>
                  <div className="mt-4 flex items-baseline justify-between gap-4">
                    <h3 className="text-xl">{team.name}</h3>
                    <p className="car-badge">
                      <strong>#{team.number}</strong> {team.carClass} class
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-zinc-400">{team.car}</p>
                  <dl className="mt-3">
                    <div className="spec">
                      <dt>Starts</dt>
                      <dd className="meta">{stats.starts}</dd>
                    </div>
                    <div className="spec">
                      <dt>Class wins · podiums</dt>
                      <dd className="meta">
                        {stats.classWins} · {stats.classPodiums}
                      </dd>
                    </div>
                    <div className="spec">
                      <dt>Best overall</dt>
                      <dd className="meta text-amber-200">
                        {stats.bestOverall ? `P${stats.bestOverall}` : "—"}
                      </dd>
                    </div>
                  </dl>
                  <a
                    href={team.historyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="link-quiet mt-4 self-start text-sm"
                  >
                    ChampCar team history <span aria-hidden="true">↗</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </article>
              );
            })}
          </div>
        </section>

        {/* Schedule */}
        <section className="band mt-14" id="schedule">
          <div className="band-head">
            <h2 className="text-3xl">What&apos;s next</h2>
            <TransitionLink href="/on-track" className="link-quiet text-sm">
              Full calendar
            </TransitionLink>
          </div>

          {upcomingEvents.length === 0 ? (
            <p className="lede mt-6">
              The season is wrapped. Next year&apos;s calendar goes up as soon
              as it&apos;s confirmed.
            </p>
          ) : (
            <ul className="mt-6">
              {upcomingEvents.map((event, index) => {
                const isNext = index === 0;
                return (
                  <li
                    key={`${event.team}-${event.date}`}
                    className={`schedule-row${isNext ? " is-next" : ""}`}
                  >
                    <span className="meta w-16 shrink-0 text-amber-200/90 sm:w-20">
                      {shortDate.format(asDate(event.date))}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-zinc-100">
                        {event.title}
                      </span>
                      <span className="block text-sm text-zinc-400">
                        {event.track} · {teams[event.team].name} #{event.number}
                      </span>
                    </span>
                    <span className="flex shrink-0 flex-col items-end gap-1">
                      <span className="tag tag-live">
                        {event.carClass} class
                      </span>
                      {isNext ? (
                        <span className="meta text-[0.72rem] text-amber-100">
                          {nextCountdown}
                        </span>
                      ) : null}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        {/* Results */}
        <section className="band mt-14" id="results">
          <div className="band-head">
            <h2 className="text-3xl">Recent results</h2>
            <TransitionLink href="/on-track#results" className="link-quiet text-sm">
              Every result since 2021
            </TransitionLink>
          </div>

          <table className="results-table mt-6 w-full border-collapse text-left">
            <thead>
              <tr>
                <th className="eyebrow">Date</th>
                <th className="eyebrow">Race</th>
                <th className="eyebrow text-right">Overall</th>
                <th className="eyebrow text-right">Class</th>
              </tr>
            </thead>
            <tbody>
              {recentResults.map((race) => (
                <ResultRow key={`${race.team}-${race.date}`} race={race} />
              ))}
            </tbody>
          </table>
          <p className="meta mt-3">
            Overall finishes from ChampCar; class finishes from the official
            MyLaps Speedhive classifications.
          </p>
        </section>

        {/* Background */}
        <section className="band mt-14" id="background">
          <div className="band-head">
            <h2 className="text-3xl">How I got here</h2>
          </div>

          <div className="mt-6 grid gap-8 sm:grid-cols-2 sm:gap-x-10">
            {accomplishments.map((entry) => (
              <article key={entry.title}>
                <p className="meta text-amber-200/90">{entry.season}</p>
                <h3 className="mt-1.5 text-xl">{entry.title}</h3>
                <p className="lede mt-2 text-[0.95rem]">{entry.detail}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Sebring + 3D */}
        <section className="band mt-14" id="sebring">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-start">
            <div>
              <p className="eyebrow eyebrow-accent">Favourite track</p>
              <h2 className="mt-3 text-4xl">Sebring</h2>
              <p className="lede mt-5 max-w-xl">
                Sebring is bumpy, hot, and completely unsentimental. The old
                concrete will shake a setup apart over a long run, and the heat
                does the same to the driver. That&apos;s exactly why I like it:
                it&apos;s the most honest test of whether you can actually hold
                a pace, or whether you were only ever quick for one lap.
              </p>
              <p className="lede mt-4 max-w-xl">
                Turn 17 is the one everybody talks about. The corner that
                decides your race is Turn 1, three hours earlier, when you
                stopped being patient with the tires.
              </p>
            </div>

            <div>
              <p className="eyebrow">Lap visualiser</p>
              <div className="mt-3">
                <TrackModelPanel />
              </div>
            </div>
          </div>

          <figure className="m-0 mt-10">
            <div className="relative h-[240px] overflow-hidden rounded-[4px] sm:h-[380px] lg:h-[460px]">
              <Image
                src={photos.sebringChase.src}
                alt={photos.sebringChase.alt}
                fill
                sizes="(min-width: 1024px) 64rem, 100vw"
                className="object-cover object-[55%_60%]"
              />
            </div>
            <figcaption className="mt-3 text-[0.82rem] leading-relaxed text-zinc-500">
              {photos.sebringChase.caption}{" "}
              <TransitionLink href="/on-track#gallery" className="link-quiet">
                More photos
              </TransitionLink>
            </figcaption>
          </figure>
        </section>

        {/* Video */}
        <section className="band mt-14" id="video">
          <div className="band-head">
            <h2 className="text-3xl">Video</h2>
            <a
              href="https://www.youtube.com/@DylanDana/videos"
              target="_blank"
              rel="noreferrer"
              className="link-quiet text-sm"
            >
              Whole channel <span aria-hidden="true">↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {videoHighlights.map((video) => (
              <a
                key={video.title}
                href={video.href}
                target="_blank"
                rel="noreferrer"
                className="video-card group"
              >
                <div className="relative h-52 overflow-hidden rounded-[4px]">
                  <Image
                    src={video.thumbnail}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className={`video-thumb object-cover ${video.position}`}
                  />
                  <span className="video-play" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="18" height="18">
                      <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />
                    </svg>
                  </span>
                </div>
                <h3 className="mt-3 text-lg transition-colors group-hover:text-sky-200">
                  {video.title}
                  <span className="ext-arrow" aria-hidden="true">
                    ↗
                  </span>
                  <span className="sr-only"> (opens YouTube in a new tab)</span>
                </h3>
                <p className="mt-1 text-[0.92rem] leading-relaxed text-zinc-400">
                  {video.copy}
                </p>
              </a>
            ))}
          </div>
        </section>

        {/* Coaching */}
        <section className="band mt-14" id="coaching">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-start">
            <div>
              <p className="eyebrow eyebrow-accent">Coaching</p>
              <h2 className="mt-3 text-4xl">
                One-to-one, for drivers who are done guessing
              </h2>
              <p className="lede mt-5 max-w-xl">
                Sessions are built around your data and your onboard, not a
                generic curriculum. Most people arrive quick over one lap and
                leave knowing how to do it forty times in a row.
              </p>
              <p className="marker mt-5 max-w-xl text-[0.95rem] text-zinc-300">
                {INSTRUCTOR_ROLE} — so the coaching comes from working with
                drivers every week, not just from racing on weekends.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={mailto("Coaching session")} className="cta-primary">
                  Email about coaching
                </a>
                <TransitionLink href="/on-track" className="cta-secondary">
                  See the season
                </TransitionLink>
              </div>
              <p className="meta mt-4">
                Or write directly to{" "}
                <a href={mailto("Coaching session")} className="link-quiet">
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>

            <ul className="marker space-y-3">
              {coachingAreas.map((item) => (
                <li key={item} className="text-[0.95rem] text-zinc-300">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Partnership */}
        <section className="band mt-14" id="partners">
          <div className="band-head">
            <h2 className="text-3xl">Partnership</h2>
            <p className="meta">2027 inventory open</p>
          </div>

          <p className="lede mt-5 max-w-2xl">
            There&apos;s space available for next season — livery, in-car camera
            time, and hospitality on race weekends. Ask for the deck and
            you&apos;ll get the reach numbers and the pricing — exactly where
            your logo goes and what it costs.
          </p>

          <dl className="mt-7 max-w-xl">
            {partnerPackages.map((pkg) => (
              <div key={pkg.tier} className="spec">
                <dt className="text-zinc-300">{pkg.tier}</dt>
                <dd className="text-sm font-normal text-zinc-400">
                  {pkg.detail}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-7 flex flex-wrap gap-3">
            {/* The PDFs aren't hosted yet, so these request them by email
                rather than pointing at downloads that 404. */}
            <a href={mailto("2027 partnership deck")} className="cta-primary">
              Request the partnership deck
            </a>
            <a href={mailto("Media kit request")} className="cta-secondary">
              Request the media kit
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="band gold-rule mt-16">
          <div className="flex flex-wrap items-start justify-between gap-8">
            <div>
              <p className="eyebrow">Elsewhere</p>
              <ul className="mt-3 space-y-1.5">
                {socialLinks.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="link-quiet text-sm"
                    >
                      {item.label} — {item.handle}
                    </a>
                  </li>
                ))}
                <li>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="link-quiet text-sm">
                    Email — {CONTACT_EMAIL}
                  </a>
                </li>
              </ul>
            </div>

            <div className="text-right">
              <p className="text-sm text-zinc-400">
                Always bringing the fight.
              </p>
              <p className="mt-2 text-[0.8rem] text-zinc-600">
                Built by{" "}
                <a
                  href="https://www.linkedin.com/in/dezsokovi/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-500 transition-colors hover:text-amber-200"
                >
                  Dezso Kovi
                </a>
                .
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
