const bars = [88, 74, 58, 92, 66, 84, 61, 78];

export default function TelemetryPanel() {
  return (
    <div className="w-full rounded-[1.35rem] border border-sky-200/20 bg-gradient-to-b from-[#07111f] to-[#070d18] p-2 shadow-2xl">
      <div className="telemetry-stage relative h-[340px] overflow-hidden rounded-[1.05rem] sm:h-[520px]">
        <div className="telemetry-grid absolute inset-0 opacity-40" />
        <div className="telemetry-scan absolute inset-x-0 top-0 h-14" />

        <svg
          viewBox="0 0 920 520"
          role="img"
          aria-label="Animated racing telemetry visual"
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            <linearGradient id="telemetryTrack" x1="0" x2="1">
              <stop offset="0%" stopColor="#58b7ff" />
              <stop offset="50%" stopColor="#93d4ff" />
              <stop offset="100%" stopColor="#e6c98f" />
            </linearGradient>
            <linearGradient id="telemetryGlow" x1="0" x2="1">
              <stop offset="0%" stopColor="#183d61" />
              <stop offset="100%" stopColor="#385f89" />
            </linearGradient>
          </defs>

          <path
            id="telemetry-path"
            d="M112 342 C122 248, 204 176, 308 174 C404 171, 476 228, 560 228 C638 228, 701 190, 759 206 C819 222, 841 286, 822 338 C801 397, 724 421, 644 394 C572 370, 528 312, 448 322 C372 331, 334 396, 252 404 C177 411, 106 390, 112 342Z"
            fill="none"
          />

          <path
            d="M112 342 C122 248, 204 176, 308 174 C404 171, 476 228, 560 228 C638 228, 701 190, 759 206 C819 222, 841 286, 822 338 C801 397, 724 421, 644 394 C572 370, 528 312, 448 322 C372 331, 334 396, 252 404 C177 411, 106 390, 112 342Z"
            className="telemetry-track-shadow"
          />
          <path
            d="M112 342 C122 248, 204 176, 308 174 C404 171, 476 228, 560 228 C638 228, 701 190, 759 206 C819 222, 841 286, 822 338 C801 397, 724 421, 644 394 C572 370, 528 312, 448 322 C372 331, 334 396, 252 404 C177 411, 106 390, 112 342Z"
            className="telemetry-track-main"
          />
          <path
            d="M112 342 C122 248, 204 176, 308 174 C404 171, 476 228, 560 228 C638 228, 701 190, 759 206 C819 222, 841 286, 822 338 C801 397, 724 421, 644 394 C572 370, 528 312, 448 322 C372 331, 334 396, 252 404 C177 411, 106 390, 112 342Z"
            className="telemetry-track-dash"
          />

          <g className="telemetry-dot">
            <circle r="8" fill="#f0d9a5" />
            <circle r="18" fill="none" stroke="#f0d9a5" strokeOpacity="0.55" />
            <animateMotion dur="7.2s" repeatCount="indefinite" rotate="auto">
              <mpath href="#telemetry-path" />
            </animateMotion>
          </g>
        </svg>

        <div className="telemetry-bars absolute bottom-5 left-5 right-5">
          {bars.map((bar, index) => (
            <span
              key={`bar-${bar}-${index}`}
              style={{ height: `${bar}%`, animationDelay: `${index * 80}ms` }}
            />
          ))}
        </div>

        <div className="pointer-events-none absolute left-5 right-5 top-4 flex items-center justify-between text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-zinc-200/85">
          <p>Sebring Telemetry Feed</p>
          <p className="gold-accent">Data Pulse // Live</p>
        </div>
      </div>
    </div>
  );
}
