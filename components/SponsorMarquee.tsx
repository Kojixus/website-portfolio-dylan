import Image from "next/image";

const sponsors = [
  { name: "ABA", logo: "/sponsors/aba.svg" },
  { name: "ChampCar", logo: "/sponsors/champcar.svg" },
  { name: "Sparco", logo: "/sponsors/sparco.svg" },
  { name: "Motul", logo: "/sponsors/motul.svg" },
  { name: "Hawk Performance", logo: "/sponsors/hawk.svg" },
  { name: "Garmin", logo: "/sponsors/garmin.svg" },
  { name: "GoPro", logo: "/sponsors/gopro.svg" },
  { name: "Sebring Raceway", logo: "/sponsors/sebring.svg" },
  { name: "Bell Helmets", logo: "/sponsors/bell.svg" },
  { name: "Toyo Tires", logo: "/sponsors/toyo.svg" },
];

const sponsorLoop = [...sponsors, ...sponsors];

export default function SponsorMarquee() {
  return (
    <section className="reveal rounded-3xl border border-white/15 bg-black/40 px-4 py-5 sm:px-6">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <h2 className="font-display text-3xl uppercase tracking-[0.07em] sm:text-4xl">
          Sponsor Partners
        </h2>
        <p className="text-[0.62rem] uppercase tracking-[0.2em] text-zinc-400">
          Scrolling logo strip
        </p>
      </div>

      <div className="sponsor-marquee-shell">
        <div className="sponsor-marquee-track">
          {sponsorLoop.map((sponsor, index) => (
            <div
              key={`row-a-${sponsor.name}-${index}`}
              className="sponsor-logo-card"
              aria-label={sponsor.name}
            >
              <Image
                src={sponsor.logo}
                alt={`${sponsor.name} sponsor logo`}
                width={180}
                height={64}
                className="sponsor-logo-image"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="sponsor-marquee-shell mt-3">
        <div className="sponsor-marquee-track sponsor-marquee-track-reverse">
          {sponsorLoop.map((sponsor, index) => (
            <div
              key={`row-b-${sponsor.name}-${index}`}
              className="sponsor-logo-card"
              aria-label={sponsor.name}
            >
              <Image
                src={sponsor.logo}
                alt={`${sponsor.name} sponsor logo`}
                width={180}
                height={64}
                className="sponsor-logo-image"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
