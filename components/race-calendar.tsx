"use client";

import { useEffect, useMemo, useState } from "react";

export type RaceStatus = "Complete" | "Upcoming" | "Testing";

export type RaceEvent = {
  date: string; // YYYY-MM-DD
  title: string;
  track: string;
  result: string;
  status: RaceStatus;
};

type RaceCalendarProps = {
  events: RaceEvent[];
  year?: number;
  statusClasses: Record<RaceStatus, string>;
};

type Holiday = {
  date: string; // YYYY-MM-DD
  name: string;
  observed?: boolean;
};

const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
});
const monthShortFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
});
const fullDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getNthWeekdayOfMonth(
  year: number,
  monthIndex: number,
  weekday: number,
  nth: number,
) {
  const firstDay = new Date(year, monthIndex, 1);
  const offset = (weekday - firstDay.getDay() + 7) % 7;
  const day = 1 + offset + (nth - 1) * 7;
  return new Date(year, monthIndex, day);
}

function getLastWeekdayOfMonth(
  year: number,
  monthIndex: number,
  weekday: number,
) {
  const lastDay = new Date(year, monthIndex + 1, 0);
  const offset = (lastDay.getDay() - weekday + 7) % 7;
  return new Date(year, monthIndex, lastDay.getDate() - offset);
}

function applyObservedDate(date: Date) {
  const day = date.getDay();
  if (day === 6) {
    return {
      date: new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1),
      observed: true,
    };
  }
  if (day === 0) {
    return {
      date: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1),
      observed: true,
    };
  }
  return { date, observed: false };
}

function getFederalHolidays(year: number): Holiday[] {
  const holidays: Holiday[] = [];

  const addFixed = (name: string, monthIndex: number, day: number) => {
    const { date, observed } = applyObservedDate(
      new Date(year, monthIndex, day),
    );
    if (date.getFullYear() === year) {
      holidays.push({ name, date: toDateKey(date), observed });
    }
  };

  const addFloating = (name: string, date: Date) => {
    holidays.push({ name, date: toDateKey(date) });
  };

  addFixed("New Year's Day", 0, 1);
  addFloating(
    "Birthday of Martin Luther King, Jr.",
    getNthWeekdayOfMonth(year, 0, 1, 3),
  );
  addFloating("Washington's Birthday", getNthWeekdayOfMonth(year, 1, 1, 3));
  addFloating("Memorial Day", getLastWeekdayOfMonth(year, 4, 1));
  addFixed("Juneteenth National Independence Day", 5, 19);
  addFixed("Independence Day", 6, 4);
  addFloating("Labor Day", getNthWeekdayOfMonth(year, 8, 1, 1));
  addFloating("Columbus Day", getNthWeekdayOfMonth(year, 9, 1, 2));
  addFixed("Veterans Day", 10, 11);
  addFloating("Thanksgiving Day", getNthWeekdayOfMonth(year, 10, 4, 4));
  addFixed("Christmas Day", 11, 25);

  return holidays;
}

function buildYearMonths(year: number, events: RaceEvent[]) {
  const eventsByDate = new Map(events.map((event) => [event.date, event]));
  const holidaysByDate = new Map(
    getFederalHolidays(year).map((holiday) => [holiday.date, holiday]),
  );

  return Array.from({ length: 12 }, (_, monthIndex) => {
    const firstDay = new Date(year, monthIndex, 1);
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const cells: Array<{
      day: number | null;
      event?: RaceEvent;
      holiday?: Holiday;
    }> = [];

    for (let index = 0; index < firstDay.getDay(); index += 1) {
      cells.push({ day: null });
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      const dateKey = `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(
        day,
      ).padStart(2, "0")}`;
      cells.push({
        day,
        event: eventsByDate.get(dateKey),
        holiday: holidaysByDate.get(dateKey),
      });
    }

    while (cells.length % 7 !== 0) {
      cells.push({ day: null });
    }

    return {
      key: `${year}-${String(monthIndex + 1).padStart(2, "0")}`,
      label: monthFormatter.format(new Date(year, monthIndex, 1)),
      cells,
    };
  });
}

function getInitialMonthIndex(year: number, events: RaceEvent[]) {
  const today = new Date();
  const todayMidnight = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  const sameYearEvents = events
    .filter((event) => Number(event.date.slice(0, 4)) === year)
    .map((event) => ({
      event,
      date: new Date(`${event.date}T00:00:00`),
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const nextEvent = sameYearEvents.find(({ date }) => date >= todayMidnight);
  if (nextEvent) {
    return nextEvent.date.getMonth();
  }

  if (today.getFullYear() === year) {
    return today.getMonth();
  }

  return 0;
}

export default function RaceCalendar({
  events,
  year,
  statusClasses,
}: RaceCalendarProps) {
  const calendarYear =
    year ?? (Number(events[0]?.date.slice(0, 4)) || new Date().getFullYear());
  const months = useMemo(
    () => buildYearMonths(calendarYear, events),
    [calendarYear, events],
  );
  const initialMonthIndex = useMemo(
    () => getInitialMonthIndex(calendarYear, events),
    [calendarYear, events],
  );
  const [monthIndex, setMonthIndex] = useState(initialMonthIndex);

  const goPrev = () => {
    setMonthIndex((current) =>
      current === 0 ? months.length - 1 : current - 1,
    );
  };
  const goNext = () => {
    setMonthIndex((current) =>
      current === months.length - 1 ? 0 : current + 1,
    );
  };

  const month = months[monthIndex];
  const monthShortLabels = useMemo(
    () =>
      Array.from({ length: 12 }, (_, index) =>
        monthShortFormatter.format(new Date(calendarYear, index, 1)),
      ),
    [calendarYear],
  );
  const monthEvents = useMemo(
    () =>
      events
        .filter((event) => {
          const [yearText, monthText] = event.date.split("-");
          return (
            Number(yearText) === calendarYear &&
            Number(monthText) - 1 === monthIndex
          );
        })
        .sort((a, b) => a.date.localeCompare(b.date)),
    [calendarYear, events, monthIndex],
  );
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    setSelectedDate(monthEvents[0]?.date ?? null);
  }, [monthEvents]);

  const selectedEvent = selectedDate
    ? (monthEvents.find((event) => event.date === selectedDate) ?? null)
    : null;

  return (
    <div className="mt-6">
      <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-3 sm:p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-display text-2xl uppercase tracking-[0.06em] text-sky-200">
              {month.label}
            </p>
            <span className="rounded-full border border-emerald-200/50 bg-emerald-400/15 px-2 py-0.5 text-[0.5rem] font-semibold uppercase tracking-[0.2em] text-emerald-100">
              Updated
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goPrev}
              className="rounded-full border border-white/15 bg-zinc-900/70 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-zinc-200 transition hover:border-sky-200/60 hover:text-sky-100"
              aria-label="Previous month"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={goNext}
              className="rounded-full border border-white/15 bg-zinc-900/70 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-zinc-200 transition hover:border-sky-200/60 hover:text-sky-100"
              aria-label="Next month"
            >
              Next
            </button>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {monthShortLabels.map((label, index) => (
            <button
              key={`${month.key}-${label}`}
              type="button"
              onClick={() => setMonthIndex(index)}
              className={`rounded-full border px-2 py-1 text-[0.52rem] font-semibold uppercase tracking-[0.16em] transition ${
                index === monthIndex
                  ? "border-sky-200/60 bg-sky-400/15 text-sky-100"
                  : "border-white/10 bg-zinc-900/40 text-zinc-400 hover:border-sky-200/40 hover:text-sky-200"
              }`}
              aria-label={`Show ${label}`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-7 gap-1.5 text-center text-[0.52rem] font-semibold uppercase tracking-[0.16em] text-zinc-500 sm:gap-2">
          {weekdayLabels.map((label) => (
            <p key={`${month.key}-${label}`}>{label}</p>
          ))}
        </div>

        <div className="mt-1.5 grid grid-cols-7 gap-1.5 sm:gap-2">
          {month.cells.map((cell, cellIndex) =>
            cell.day ? (
              <div
                key={`${month.key}-${cellIndex}`}
                className={`flex min-h-21 flex-col rounded-lg border p-2 sm:min-h-26 sm:p-2.5 lg:min-h-29 ${
                  cell.event
                    ? "border-sky-200/30 bg-linear-to-b from-sky-400/14 via-zinc-900/85 to-zinc-900/90"
                    : cell.holiday
                      ? "border-amber-200/35 bg-amber-300/10"
                      : "border-white/10 bg-zinc-900/50"
                } ${cell.event && cell.holiday ? "ring-1 ring-amber-200/30" : ""} ${
                  cell.event && cell.event.date === selectedDate
                    ? "ring-2 ring-sky-200/70"
                    : ""
                }`}
              >
                {cell.event ? (
                  <button
                    type="button"
                    onClick={() => setSelectedDate(cell.event?.date ?? null)}
                    className="flex h-full flex-1 flex-col text-left"
                    aria-pressed={cell.event.date === selectedDate}
                  >
                    <p
                      className={`text-[0.56rem] font-semibold uppercase tracking-[0.14em] ${cell.holiday ? "text-amber-100/90" : "text-zinc-300"}`}
                    >
                      {cell.day}
                    </p>
                    <div className="mt-1.5 flex flex-1 flex-col gap-1">
                      <p className="wrap-break-word text-[0.54rem] font-semibold uppercase leading-snug tracking-[0.12em] text-zinc-100">
                        {cell.event.title}
                      </p>
                      <p className="wrap-break-word text-[0.5rem] uppercase leading-snug tracking-[0.08em] text-zinc-400">
                        {cell.event.track}
                      </p>
                      <div className="mt-auto flex flex-wrap items-center gap-1">
                        <span
                          className={`inline-flex w-fit rounded-full border px-1.5 py-0.5 text-[0.45rem] font-semibold uppercase tracking-widest ${statusClasses[cell.event.status]}`}
                        >
                          {cell.event.status === "Testing"
                            ? "Testing"
                            : "Race Weekend"}
                        </span>
                        {cell.holiday ? (
                          <span
                            className="inline-flex w-fit rounded-full border border-amber-200/40 bg-amber-300/15 px-1.5 py-0.5 text-[0.43rem] font-semibold uppercase tracking-widest text-amber-100"
                            title={cell.holiday.name}
                          >
                            Holiday
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </button>
                ) : (
                  <>
                    <p
                      className={`text-[0.56rem] font-semibold uppercase tracking-[0.14em] ${
                        cell.holiday ? "text-amber-100/90" : "text-zinc-300"
                      }`}
                    >
                      {cell.day}
                    </p>
                    {!cell.event && cell.holiday ? (
                      <div className="mt-1.5 flex flex-col gap-1">
                        <span
                          className="inline-flex w-fit rounded-full border border-amber-200/40 bg-amber-300/15 px-1.5 py-0.5 text-[0.43rem] font-semibold uppercase tracking-widest text-amber-100"
                          title={cell.holiday.name}
                        >
                          Holiday
                        </span>
                      </div>
                    ) : null}
                  </>
                )}
              </div>
            ) : (
              <div
                key={`${month.key}-${cellIndex}`}
                className="min-h-21 rounded-lg border border-white/5 bg-zinc-900/30 sm:min-h-26 lg:min-h-29"
              />
            ),
          )}
        </div>
        <div className="mt-4 rounded-xl border border-white/10 bg-zinc-950/40 p-4">
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-zinc-400">
            Event Details
          </p>
          {selectedEvent ? (
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-sky-200/85">
                  {selectedEvent.title}
                </p>
                <p className="mt-1 text-sm uppercase tracking-[0.14em] text-zinc-300">
                  {selectedEvent.track}
                </p>
                <p className="mt-2 text-[0.62rem] uppercase tracking-[0.2em] text-zinc-400">
                  {fullDateFormatter.format(
                    new Date(`${selectedEvent.date}T00:00:00`),
                  )}
                </p>
              </div>
              <div className="flex flex-wrap items-start gap-2 sm:justify-end">
                <span
                  className={`inline-flex rounded-full border px-3 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.2em] ${statusClasses[selectedEvent.status]}`}
                >
                  {selectedEvent.status === "Testing"
                    ? "Testing"
                    : "Race Weekend"}
                </span>
                <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-zinc-300">
                  {selectedEvent.result}
                </span>
              </div>
            </div>
          ) : (
            <p className="mt-3 text-xs uppercase tracking-[0.18em] text-zinc-500">
              Click an event date to view details.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
