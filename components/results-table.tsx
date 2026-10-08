"use client";

import { useState } from "react";
import {
  careerStats,
  classLabel,
  teams,
  type RaceEvent,
  type TeamId,
} from "../data/raceEvents";

type Filter = "all" | TeamId;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "Both cars" },
  { id: "kovi", label: `${teams.kovi.name} #${teams.kovi.number}` },
  { id: "levelOne", label: `${teams.levelOne.name} #${teams.levelOne.number}` },
];

const shortDate = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

/** Full race history, grouped by year, filterable by car. Newest first. */
export default function ResultsTable({ races }: { races: RaceEvent[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const shown = filter === "all" ? races : races.filter((r) => r.team === filter);
  const stats = careerStats(shown);
  const years = [...new Set(shown.map((r) => r.date.slice(0, 4)))];

  return (
    <div>
      <div
        role="group"
        aria-label="Filter results by car"
        className="mt-6 flex flex-wrap gap-2"
      >
        {FILTERS.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => setFilter(option.id)}
            aria-pressed={filter === option.id}
            className="filter-chip"
          >
            {option.label}
          </button>
        ))}
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-x-8 sm:grid-cols-4">
        <div className="spec">
          <dt>Starts</dt>
          <dd className="meta text-lg text-sky-200">{stats.starts}</dd>
        </div>
        <div className="spec">
          <dt>Class wins</dt>
          <dd className="meta text-lg text-sky-200">{stats.classWins}</dd>
        </div>
        <div className="spec">
          <dt>Class podiums</dt>
          <dd className="meta text-lg text-sky-200">{stats.classPodiums}</dd>
        </div>
        <div className="spec">
          <dt>Overall wins</dt>
          <dd className="meta text-lg text-amber-200">{stats.overallWins}</dd>
        </div>
      </dl>

      {years.map((year) => (
        <section key={year} className="mt-8" aria-label={`${year} results`}>
          <h3 className="meta text-sm text-amber-200/90">{year}</h3>
          <table className="results-table mt-2 w-full border-collapse text-left">
            <thead>
              <tr>
                <th className="eyebrow">Date</th>
                <th className="eyebrow">Race</th>
                <th className="eyebrow text-right">Overall</th>
                <th className="eyebrow text-right">Class</th>
              </tr>
            </thead>
            <tbody>
              {shown
                .filter((race) => race.date.startsWith(year))
                .map((race) => (
                  <ResultRow key={`${race.team}-${race.date}`} race={race} />
                ))}
            </tbody>
          </table>
        </section>
      ))}
    </div>
  );
}

export function ResultRow({ race }: { race: RaceEvent }) {
  const team = teams[race.team];
  const classWin = race.classPos === 1;

  return (
    <tr>
      <td className="meta whitespace-nowrap align-baseline">
        {shortDate.format(new Date(`${race.date}T00:00:00Z`))}
      </td>
      <td className="align-baseline">
        <span className="text-zinc-100">
          {race.title}
          {race.leg ? (
            <span className="text-zinc-400"> · {race.leg}</span>
          ) : null}
        </span>
        <span className="mt-0.5 block text-sm text-zinc-500">
          {team.name} #{race.number} · {race.track}
        </span>
      </td>
      <td
        className={`meta whitespace-nowrap text-right align-baseline text-base font-semibold ${
          race.overall === 1 ? "text-amber-200" : "text-sky-200"
        }`}
      >
        {race.overall !== undefined ? `P${race.overall}` : "—"}
      </td>
      <td
        className={`meta whitespace-nowrap text-right align-baseline ${
          classWin ? "font-semibold text-amber-200" : "text-zinc-300"
        }`}
      >
        {classLabel(race)}
      </td>
    </tr>
  );
}
