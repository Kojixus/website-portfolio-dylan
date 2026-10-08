"""Pull overall + class finishes for Kovi Racing #214 and Level One Racing #412 from Speedhive."""
import json
import urllib.request
from collections import Counter

B = "https://eventresults-api.speedhive.com/api/v0.2.3/eventresults"
ORGS = [711361, 110092]  # current (Mar 2025+), archive

# Team history start dates (from champcar.org team-history pages).
TARGETS = {
    "214": ["2026-06-27", "2026-04-11", "2025-12-28", "2025-06-28", "2025-03-29",
            "2024-12-28", "2024-06-29", "2024-04-06", "2023-12-30", "2023-07-01",
            "2022-12-30", "2022-07-01", "2022-04-19", "2022-04-01", "2021-12-18",
            "2021-09-18"],
    "412": ["2026-09-19", "2026-06-27", "2026-04-11", "2025-12-28", "2025-06-28",
            "2025-03-29", "2024-12-28", "2024-06-29", "2024-04-06"],
}
TEAM = {"214": "kovi", "412": "level one"}


def get(url):
    with urllib.request.urlopen(url, timeout=60) as r:
        return json.load(r)


def events(org):
    out, off = [], 0
    while True:
        page = get(f"{B}/organizations/{org}/events?count=100&offset={off}")
        if not page:
            return out
        out += page
        off += 100
        if page[-1]["startDate"][:4] < "2021":
            return out


def sessions(group):
    for s in group.get("sessions") or []:
        yield s
    for g in group.get("groups") or []:
        yield from sessions(g)


def days_apart(a, b):
    from datetime import date
    return abs((date.fromisoformat(a) - date.fromisoformat(b)).days)


all_events = []
for org in ORGS:
    all_events += events(org)

results = []
for car, dates in TARGETS.items():
    for d in dates:
        cands = [e for e in all_events
                 if days_apart(e["startDate"][:10], d) <= 2 and " EC" not in e["name"]
                 and not e["name"].rstrip().endswith("EC")]
        found = False
        for ev in cands:
            detail = get(f"{B}/events/{ev['id']}?sessions=true")
            for s in sessions(detail["sessions"]):
                if s.get("type") != "race" or "EC" in s["name"].split():
                    continue
                if "EC-" in s["name"] or s["name"].startswith("EC"):
                    continue
                cl = get(f"{B}/sessions/{s['id']}/classification")
                rows = cl.get("rows") or []
                hit = [r for r in rows if str(r.get("startNumber")) == car
                       and TEAM[car] in (r.get("name") or "").lower()]
                if not hit:
                    continue
                r = hit[0]
                class_size = Counter(x.get("resultClass") for x in rows)[r.get("resultClass")]
                results.append({
                    "car": car, "teamDate": d, "event": ev["name"], "eventDate": ev["startDate"][:10],
                    "session": s["name"], "overall": r.get("position"), "field": len(rows),
                    "class": r.get("resultClass"), "classPos": r.get("positionInClass"),
                    "classSize": class_size, "laps": r.get("numberOfLaps"),
                    "best": r.get("bestTime"), "status": r.get("status"),
                })
                found = True
        if not found:
            results.append({"car": car, "teamDate": d, "missing": True,
                            "candidates": [c["name"] for c in cands]})

json.dump(results, open(__file__.replace("speedhive.py", "speedhive.json"), "w"), indent=1)
for r in results:
    if r.get("missing"):
        print("MISSING", r)
    else:
        print(f"{r['car']} {r['teamDate']} | {r['event']} | {r['session']} | P{r['overall']}/{r['field']} | "
              f"{r['class']} P{r['classPos']}/{r['classSize']} | {r['laps']} laps | {r['best']} | {r['status']}")
