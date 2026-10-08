import { teams, type RaceEvent, type RaceStatus } from "../data/raceEvents";

export type { RaceEvent, RaceStatus };

type RaceCalendarProps = {
  events: RaceEvent[];
  year: number;
  /** yyyy-mm-dd; that day gets a ring so the calendar reads at a glance. */
  today?: string;
  statusClasses: Record<RaceStatus, string>;
};

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Weeks start on Monday, the way a race calendar is normally read.
const WEEKDAYS = ["M", "T", "W", "T", "F", "S", "S"];

const longDate = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

function toKey(year: number, month: number, day: number) {
  const mm = String(month + 1).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return `${year}-${mm}-${dd}`;
}

function daysInMonth(year: number, month: number) {
  return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
}

/** Monday-based index of the first cell in a month grid. */
function leadingBlanks(year: number, month: number) {
  return (new Date(Date.UTC(year, month, 1)).getUTCDay() + 6) % 7;
}

export default function RaceCalendar({
  events,
  year,
  today,
  statusClasses,
}: RaceCalendarProps) {
  // Both cars can race the same weekend, so a day can hold several entries.
  const byDate = new Map<string, RaceEvent[]>();
  for (const event of events) {
    if (event.date.startsWith(String(year))) {
      byDate.set(event.date, [...(byDate.get(event.date) ?? []), event]);
    }
  }

  const describe = (event: RaceEvent) =>
    `${event.title}${event.leg ? ` (${event.leg})` : ""}, ${teams[event.team].name} #${event.number}`;

  return (
    <div className="mt-8 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
      {MONTHS.map((monthName, month) => {
        const total = daysInMonth(year, month);
        const blanks = leadingBlanks(year, month);
        const cells = [
          ...Array.from({ length: blanks }, () => null),
          ...Array.from({ length: total }, (_, i) => i + 1),
        ];

        return (
          <section key={monthName} aria-label={`${monthName} ${year}`}>
            <h3 className="text-sm font-semibold text-zinc-200">{monthName}</h3>

            <div
              className="mt-2 grid grid-cols-7 gap-y-1 text-center"
              role="presentation"
            >
              {WEEKDAYS.map((day, index) => (
                <span
                  key={`${monthName}-head-${index}`}
                  className="meta text-[0.62rem] leading-6"
                >
                  {day}
                </span>
              ))}

              {cells.map((day, index) => {
                if (day === null) {
                  return <span key={`${monthName}-blank-${index}`} />;
                }

                const key = toKey(year, month, day);
                const dayEvents = byDate.get(key) ?? [];
                const event = dayEvents[0];
                const isToday = key === today;

                if (!event) {
                  return (
                    <span
                      key={`${monthName}-${day}`}
                      aria-current={isToday ? "date" : undefined}
                      className={`meta mx-auto inline-flex h-6 w-6 items-center justify-center text-[0.68rem] ${
                        isToday ? "cal-today text-zinc-100" : "text-zinc-500"
                      }`}
                    >
                      {day}
                    </span>
                  );
                }

                return (
                  <span
                    key={`${monthName}-${day}`}
                    title={dayEvents.map(describe).join(" / ")}
                    aria-label={`${longDate.format(new Date(`${key}T00:00:00Z`))}: ${dayEvents.map(describe).join("; ")}`}
                    aria-current={isToday ? "date" : undefined}
                    className={`meta mx-auto inline-flex h-6 w-6 items-center justify-center rounded border text-[0.68rem] font-semibold ${statusClasses[event.status]}${isToday ? " cal-today" : ""}`}
                  >
                    {day}
                  </span>
                );
              })}
            </div>

            {/* Only months with something in them get a caption. */}
            <ul className="mt-2 space-y-1">
              {events
                .filter((event) => {
                  const [eventYear, eventMonth] = event.date.split("-");
                  return (
                    Number(eventYear) === year && Number(eventMonth) === month + 1
                  );
                })
                .sort((a, b) => a.date.localeCompare(b.date))
                .map((event) => (
                  <li
                    key={`${event.team}-${event.date}`}
                    className="text-[0.78rem] leading-snug text-zinc-400"
                  >
                    <span className="meta text-zinc-500">
                      {longDate.format(new Date(`${event.date}T00:00:00Z`))}
                    </span>
                    <span className="mx-1.5 text-zinc-600">·</span>
                    <span className="text-zinc-300">
                      {event.title}
                      {event.leg ? ` (${event.leg.slice(0, 3)})` : ""}
                    </span>
                    <span className="meta ml-1.5 text-zinc-500">
                      #{event.number}
                    </span>
                    {event.overall !== undefined ? (
                      <span className="meta ml-1.5 text-sky-200/90">
                        P{event.overall} · P{event.classPos} {event.carClass}
                      </span>
                    ) : null}
                  </li>
                ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
