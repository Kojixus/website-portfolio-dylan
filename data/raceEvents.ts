/**
 * Every ChampCar start for the two cars Dylan drives.
 *
 * Sources:
 * - Overall finishes: ChampCar team history pages
 *   https://champcar.org/web/register/team-history.php?teamid=4995 (Kovi Racing)
 *   https://champcar.org/web/register/team-history.php?teamid=5322 (Level One Racing)
 * - Class finishes and class sizes: MyLaps Speedhive official classifications
 *   (ChampCar doesn't publish class positions on the team pages).
 *
 * Double-header weekends are scored as two separate races, the way ChampCar
 * lists them.
 */

export type TeamId = "kovi" | "levelOne";

export type Team = {
  id: TeamId;
  name: string;
  number: string;
  carClass: string;
  car: string;
  historyUrl: string;
};

export const teams: Record<TeamId, Team> = {
  kovi: {
    id: "kovi",
    name: "Kovi Racing",
    number: "214",
    carClass: "F",
    car: "1992 Acura Integra",
    historyUrl: "https://champcar.org/web/register/team-history.php?teamid=4995",
  },
  levelOne: {
    id: "levelOne",
    name: "Level One Racing",
    number: "412",
    carClass: "A",
    car: "1994 Mazda Miata",
    historyUrl: "https://champcar.org/web/register/team-history.php?teamid=5322",
  },
};

export type RaceStatus = "Complete" | "Upcoming";

export type RaceEvent = {
  /** ISO date, yyyy-mm-dd. For double-headers, the day of that race. */
  date: string;
  title: string;
  track: string;
  team: TeamId;
  /** Car number for this entry (usually the team's, but not always). */
  number: string;
  carClass: string;
  status: RaceStatus;
  /** "Saturday" / "Sunday" on double-header weekends. */
  leg?: string;
  overall?: number;
  classPos?: number;
  classSize?: number;
};

const SEBRING = "Sebring International Raceway";
const DAYTONA = "Daytona International Speedway";
const PBIR = "Palm Beach International Raceway";

type Row = Omit<RaceEvent, "team" | "number" | "carClass" | "status"> &
  Partial<Pick<RaceEvent, "number" | "carClass" | "status">>;

function entries(team: TeamId, rows: Row[]): RaceEvent[] {
  return rows.map((row) => ({
    team,
    number: teams[team].number,
    carClass: teams[team].carClass,
    status: "Complete",
    ...row,
  }));
}

export const raceEvents: RaceEvent[] = [
  ...entries("kovi", [
    {
      date: "2026-12-29",
      title: "The Lone Star Double Down at COTA",
      track: "Circuit of the Americas",
      number: "215",
      status: "Upcoming",
    },
    { date: "2026-06-27", title: "Sebring Under the Stars", track: SEBRING, overall: 21, classPos: 1, classSize: 4 },
    { date: "2026-04-11", title: "SILICONSKY 14-Hours of Daytona", track: DAYTONA, overall: 53, classPos: 2, classSize: 3 },
    { date: "2025-12-28", title: "Sebring NYE 14-Hour Enduro", track: SEBRING, overall: 39, classPos: 2, classSize: 6 },
    { date: "2025-06-28", title: "Sebring Under the Stars 14-Hour", track: SEBRING, overall: 8, classPos: 1, classSize: 3 },
    { date: "2025-03-29", title: "Hawk Performance 14-Hours of Daytona", track: DAYTONA, overall: 30, classPos: 1, classSize: 3 },
    { date: "2024-12-28", title: "Sebring New Year's Double", leg: "Saturday", track: SEBRING, overall: 80, classPos: 4, classSize: 4 },
    { date: "2024-12-29", title: "Sebring New Year's Double", leg: "Sunday", track: SEBRING, overall: 29, classPos: 2, classSize: 4 },
    { date: "2024-06-29", title: "Sebring Under the Stars", track: SEBRING, overall: 16, classPos: 1, classSize: 2 },
    { date: "2024-04-06", title: "TireRack.com Daytona 14-Hour", track: DAYTONA, overall: 89, classPos: 3, classSize: 3 },
    { date: "2023-12-30", title: "Sebring New Year's Double", leg: "Saturday", track: SEBRING, overall: 39, classPos: 2, classSize: 3 },
    { date: "2023-12-31", title: "Sebring New Year's Double", leg: "Sunday", track: SEBRING, overall: 91, classPos: 3, classSize: 3 },
    { date: "2023-07-01", title: "The Senator 14-Hour at Sebring", track: SEBRING, overall: 20, classPos: 2, classSize: 3 },
    { date: "2022-12-30", title: "The Sebring 10.5", track: SEBRING, carClass: "A", overall: 75, classPos: 21, classSize: 24 },
    { date: "2022-07-02", title: "Sebring Sevens", leg: "Saturday", track: SEBRING, carClass: "A", overall: 15, classPos: 6, classSize: 15 },
    { date: "2022-07-03", title: "Sebring Sevens", leg: "Sunday", track: SEBRING, carClass: "A", overall: 20, classPos: 11, classSize: 16 },
    { date: "2022-04-19", title: "Sunset at PBIR 8-Hour", track: PBIR, carClass: "A", overall: 18, classPos: 9, classSize: 18 },
    { date: "2022-04-02", title: "Daytona 14-Hour Enduro", track: DAYTONA, carClass: "A", overall: 61, classPos: 16, classSize: 25 },
    { date: "2021-12-18", title: "Bell Racing Sebring Sevens", leg: "Saturday", track: SEBRING, carClass: "A", overall: 81, classPos: 20, classSize: 25 },
    { date: "2021-12-19", title: "Bell Racing Sebring Sevens", leg: "Sunday", track: SEBRING, carClass: "A", overall: 67, classPos: 19, classSize: 26 },
    { date: "2021-09-18", title: "Palm Beach Enduros", leg: "Saturday", track: PBIR, carClass: "A", overall: 34, classPos: 10, classSize: 11 },
    { date: "2021-09-19", title: "Palm Beach Enduros", leg: "Sunday", track: PBIR, carClass: "A", overall: 27, classPos: 10, classSize: 11 },
  ]),
  ...entries("levelOne", [
    { date: "2026-09-19", title: "Eye of the Storm Sebring Enduro", leg: "Saturday", track: SEBRING, overall: 3, classPos: 1, classSize: 18 },
    { date: "2026-09-20", title: "Eye of the Storm Sebring Enduro", leg: "Sunday", track: SEBRING, overall: 29, classPos: 13, classSize: 18 },
    { date: "2026-06-27", title: "Sebring Under the Stars", track: SEBRING, overall: 13, classPos: 3, classSize: 17 },
    { date: "2026-04-11", title: "SILICONSKY 14-Hours of Daytona", track: DAYTONA, overall: 20, classPos: 4, classSize: 14 },
    { date: "2025-12-28", title: "Sebring NYE 14-Hour Enduro", track: SEBRING, overall: 6, classPos: 1, classSize: 22 },
    { date: "2025-06-28", title: "Sebring Under the Stars 14-Hour", track: SEBRING, overall: 1, classPos: 1, classSize: 8 },
    { date: "2025-03-29", title: "Hawk Performance 14-Hours of Daytona", track: DAYTONA, overall: 27, classPos: 5, classSize: 15 },
    { date: "2024-12-28", title: "Sebring New Year's Double", leg: "Saturday", track: SEBRING, overall: 8, classPos: 3, classSize: 19 },
    { date: "2024-12-29", title: "Sebring New Year's Double", leg: "Sunday", track: SEBRING, overall: 89, classPos: 17, classSize: 18 },
    { date: "2024-06-29", title: "Sebring Under the Stars", track: SEBRING, overall: 46, classPos: 10, classSize: 10 },
    { date: "2024-04-06", title: "TireRack.com Daytona 14-Hour", track: DAYTONA, overall: 13, classPos: 2, classSize: 22 },
  ]),
];

/** Completed races, newest first. */
export const completedRaces = raceEvents
  .filter((event) => event.status === "Complete")
  .sort((a, b) => b.date.localeCompare(a.date) || a.team.localeCompare(b.team));

export function careerStats(events: RaceEvent[]) {
  const done = events.filter((e) => e.status === "Complete");
  const finishes = done.filter((e) => e.overall !== undefined);
  return {
    starts: done.length,
    overallWins: finishes.filter((e) => e.overall === 1).length,
    classWins: done.filter((e) => e.classPos === 1).length,
    classPodiums: done.filter((e) => (e.classPos ?? 99) <= 3).length,
    bestOverall: finishes.length
      ? Math.min(...finishes.map((e) => e.overall as number))
      : null,
  };
}

/** "P1 in F of 4" — or the bare class position if the class size is unknown. */
export function classLabel(event: RaceEvent) {
  if (event.classPos === undefined) return "—";
  const size = event.classSize ? ` of ${event.classSize}` : "";
  return `P${event.classPos} in ${event.carClass}${size}`;
}

/** Today's date as yyyy-mm-dd (UTC), comparable with `RaceEvent.date`. */
export function todayISO(now: Date = new Date()) {
  return now.toISOString().slice(0, 10);
}

/** Whole days from `fromISO` until `iso`; negative once it has passed. */
export function daysUntil(iso: string, fromISO: string) {
  const ms =
    Date.parse(`${iso}T00:00:00Z`) - Date.parse(`${fromISO}T00:00:00Z`);
  return Math.round(ms / 86_400_000);
}

/** "today", "tomorrow", "in 5 days", "in 3 weeks". */
export function countdownLabel(days: number) {
  if (days <= 0) return "today";
  if (days === 1) return "tomorrow";
  if (days < 21) return `in ${days} days`;
  return `in ${Math.round(days / 7)} weeks`;
}
