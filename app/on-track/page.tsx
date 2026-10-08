import Image from "next/image";
import PhotoGallery from "../../components/photo-gallery";
import RaceCalendar, { type RaceStatus } from "../../components/race-calendar";
import ResultsTable from "../../components/results-table";
import SiteHeader from "../../components/site-header";
import TransitionLink from "../../components/transition-link";
import { galleryOrder, photos } from "../../data/photos";
import {
  careerStats,
  completedRaces,
  raceEvents,
  teams,
  todayISO,
} from "../../data/raceEvents";

// The calendar marks today, so keep it fresh.
export const revalidate = 3600;

const SEASON = 2026;

const statusClasses: Record<RaceStatus, string> = {
  Complete: "border-sky-300/40 bg-sky-400/15 text-sky-100",
  Upcoming: "border-amber-300/50 bg-amber-300/15 text-amber-100",
};

const legend: { status: RaceStatus; label: string; tag: string }[] = [
  { status: "Complete", label: "Raced", tag: "tag-done" },
  { status: "Upcoming", label: "Entered", tag: "tag-live" },
];

const highlightCards = [
  {
    photo: photos.lowAngleClouds,
    title: "Race start",
    copy: "The first stint is about tires and patience, not places.",
    position: "object-[50%_58%]",
  },
  {
    photo: photos.driverChange,
    title: "Driver change",
    copy: "Belts, drink, radio check. Practised until it's boring.",
    position: "object-[50%_40%]",
  },
  {
    photo: photos.helmetCockpit,
    title: "On the grid",
    copy: "The last quiet ten minutes anyone gets all day.",
    position: "object-[50%_45%]",
  },
];

const weekendNotes = [
  {
    title: "Opening laps",
    copy: "Look after the tires through the traffic. The pace comes back once the field spreads out — the rubber doesn't.",
  },
  {
    title: "Mid-stint",
    copy: "Clean brake release and repeatable exits. If the lap times are within a couple of tenths of each other, it's working.",
  },
  {
    title: "On the radio",
    copy: "Short and specific. The pit wall can act on \"understeer from mid-corner in 3\"; it can't act on \"the car feels bad\".",
  },
];

const pageNav = [
  { href: "#results", label: "Results" },
  { href: "#calendar", label: "Calendar" },
  { href: "#notes", label: "Notes" },
  { href: "#highlights", label: "Highlights" },
  { href: "#gallery", label: "Gallery" },
  { href: "/", label: "Home" },
];

export default function OnTrackPage() {
  const season = careerStats(
    completedRaces.filter((race) => race.date.startsWith(String(SEASON))),
  );
  const seasonStats = [
    { label: "Starts", value: season.starts },
    { label: "Class wins", value: season.classWins },
    { label: "Class podiums", value: season.classPodiums },
    { label: "Best overall", value: season.bestOverall ? `P${season.bestOverall}` : "—" },
  ];

  return (
    <>
      <SiteHeader section="On track" items={pageNav} />

      <main id="main" className="mx-auto w-full max-w-5xl px-5 pb-20 sm:px-8">
        {/* Intro */}
        <section className="grid gap-10 pt-14 pb-14 lg:grid-cols-[1fr_0.95fr] lg:items-start lg:gap-12">
          <div>
            <p className="eyebrow eyebrow-accent">ChampCar · since 2021</p>
            <h1 className="mt-4 text-5xl sm:text-6xl">
              On track
              <span className="mt-1 block font-normal text-sky-200">
                Every race, both cars
              </span>
            </h1>
            <p className="lede mt-6 max-w-xl text-lg">
              Every ChampCar start since 2021 — {teams.levelOne.name}&apos;s
              #{teams.levelOne.number} Miata in {teams.levelOne.carClass} class
              and {teams.kovi.name}&apos;s #{teams.kovi.number} Integra in{" "}
              {teams.kovi.carClass} class — with overall and class finishes for
              each one.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#results" className="cta-primary">
                See every result
              </a>
              <TransitionLink href="/" className="cta-secondary">
                Back to home
              </TransitionLink>
            </div>

            <p className="eyebrow mt-10">{SEASON} so far</p>
            <dl className="mt-1 grid max-w-md grid-cols-2 gap-x-8">
              {seasonStats.map((stat) => (
                <div key={stat.label} className="spec">
                  <dt>{stat.label}</dt>
                  <dd className="meta text-lg text-sky-200">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <figure className="m-0">
            <div className="relative h-[340px] overflow-hidden rounded-[4px] sm:h-[440px] lg:h-[480px]">
              <Image
                src={photos.portrait.src}
                alt={photos.portrait.alt}
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover object-[50%_30%]"
              />
            </div>
            <figcaption className="mt-3 text-[0.82rem] leading-relaxed text-zinc-500">
              {photos.portrait.caption}
            </figcaption>
          </figure>
        </section>

        {/* Results */}
        <section className="band" id="results">
          <div className="band-head">
            <h2 className="text-3xl">Results</h2>
            <p className="meta">
              Sources:{" "}
              <a
                href={teams.levelOne.historyUrl}
                target="_blank"
                rel="noreferrer"
                className="link-quiet"
              >
                Level One
              </a>
              ,{" "}
              <a
                href={teams.kovi.historyUrl}
                target="_blank"
                rel="noreferrer"
                className="link-quiet"
              >
                Kovi
              </a>
              , MyLaps Speedhive
            </p>
          </div>

          <ResultsTable races={completedRaces} />
        </section>

        {/* Calendar */}
        <section className="band mt-14" id="calendar">
          <div className="band-head">
            <h2 className="text-3xl">{SEASON} calendar</h2>
            <div className="flex flex-wrap gap-x-5 gap-y-1">
              {legend.map((item) => (
                <span key={item.status} className={`tag ${item.tag}`}>
                  {item.label}
                </span>
              ))}
              <span className="tag tag-today">Today</span>
            </div>
          </div>

          <RaceCalendar
            events={raceEvents}
            year={SEASON}
            today={todayISO()}
            statusClasses={statusClasses}
          />
        </section>

        {/* Notes */}
        <section className="band mt-14" id="notes">
          <div className="band-head">
            <h2 className="text-3xl">Weekend notes</h2>
            <p className="meta">The three things I keep repeating</p>
          </div>

          <div className="mt-6 grid gap-8 md:grid-cols-3">
            {weekendNotes.map((note) => (
              <article key={note.title}>
                <h3 className="text-xl">{note.title}</h3>
                <p className="lede mt-2 text-[0.95rem]">{note.copy}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Highlights */}
        <section className="band mt-14" id="highlights">
          <div className="band-head">
            <h2 className="text-3xl">From the weekend</h2>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {highlightCards.map((card) => (
              <figure key={card.title} className="m-0">
                <div className="relative h-56 overflow-hidden rounded-[4px] sm:h-64">
                  <Image
                    src={card.photo.src}
                    alt={card.photo.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className={`object-cover ${card.position}`}
                  />
                </div>
                <figcaption className="mt-3">
                  <h3 className="text-lg">{card.title}</h3>
                  <p className="mt-1 text-[0.92rem] leading-relaxed text-zinc-400">
                    {card.copy}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Gallery */}
        <section className="band mt-14" id="gallery">
          <div className="band-head">
            <h2 className="text-3xl">Gallery</h2>
            <p className="meta">Tap a photo to see it full-size</p>
          </div>

          <PhotoGallery photos={galleryOrder} />
        </section>

        {/* Coaching */}
        <section className="band mt-14">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1fr] lg:items-center">
            <div className="relative h-[340px] overflow-hidden rounded-[4px] lg:h-[420px]">
              <Image
                src={photos.dylanHelmet.src}
                alt={photos.dylanHelmet.alt}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover object-[55%_22%]"
              />
            </div>

            <div>
              <p className="eyebrow eyebrow-accent">Coaching</p>
              <h2 className="mt-3 text-4xl">Turn the data into laps</h2>
              <p className="lede mt-5 max-w-xl">
                Bring your onboard and your logs. We&apos;ll find the corners
                that are costing you real time — usually not the ones you think
                — and work out what to change on entry.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="mailto:coaching@dylandana.com?subject=Coaching%20session"
                  className="cta-primary"
                >
                  Email about coaching
                </a>
                <TransitionLink href="/" className="cta-secondary">
                  Back to home
                </TransitionLink>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
