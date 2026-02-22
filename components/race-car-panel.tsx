export default function RaceCarPanel() {
  return (
    <div className="w-full rounded-[1.35rem] border border-sky-200/20 bg-linear-to-b from-[#07111f] to-[#070d18] p-2 shadow-2xl">
      <div className="racecar-stage relative h-85 overflow-hidden rounded-[1.05rem] sm:h-130">
        <div className="racecar-grid pointer-events-none absolute inset-0 opacity-35" />
        <div className="racecar-road pointer-events-none absolute inset-x-0 bottom-0 h-[44%]" />
        <div className="racecar-glow pointer-events-none absolute inset-x-16 bottom-[28%] h-14 rounded-full bg-sky-400/25 blur-2xl" />

        <svg
          viewBox="0 0 920 360"
          role="img"
          aria-label="Stylized race car graphic"
          className="racecar-svg absolute inset-x-0 bottom-[10%] mx-auto w-[95%] max-w-225"
        >
          <defs>
            <linearGradient id="carBody" x1="0" x2="1">
              <stop offset="0%" stopColor="#2f8ddd" />
              <stop offset="55%" stopColor="#55b3ff" />
              <stop offset="100%" stopColor="#8bd0ff" />
            </linearGradient>
            <linearGradient id="carCanopy" x1="0" x2="1">
              <stop offset="0%" stopColor="#0f223a" />
              <stop offset="100%" stopColor="#1d446f" />
            </linearGradient>
          </defs>

          <g className="racecar-bounce">
            <path
              fill="url(#carBody)"
              d="M88 246L132 198L252 186L370 146L628 146L724 177L812 191L848 223L865 242L865 264L779 264L744 234L622 234L595 264L412 264L390 234L270 234L238 264L132 264L102 257Z"
            />
            <path
              fill="url(#carCanopy)"
              d="M332 186L406 146L566 146L638 177L540 177L502 160L430 160L388 186Z"
            />
            <path
              d="M402 154H560"
              stroke="#e6c98f"
              strokeWidth="4"
              strokeLinecap="round"
              strokeOpacity="0.9"
            />
            <rect
              x="152"
              y="216"
              width="84"
              height="14"
              rx="4"
              fill="#113b60"
            />
            <rect
              x="660"
              y="216"
              width="90"
              height="14"
              rx="4"
              fill="#113b60"
            />
            <path
              d="M258 232H744"
              stroke="#c7e8ff"
              strokeOpacity="0.72"
              strokeWidth="4"
              strokeLinecap="round"
            />

            <g className="wheel-spin">
              <circle cx="252" cy="264" r="44" fill="#0a0f17" />
              <circle cx="252" cy="264" r="24" fill="#7ec8ff" />
              <rect x="248" y="224" width="8" height="80" fill="#d8f2ff" />
              <rect x="212" y="260" width="80" height="8" fill="#d8f2ff" />
            </g>

            <g className="wheel-spin">
              <circle cx="742" cy="264" r="44" fill="#0a0f17" />
              <circle cx="742" cy="264" r="24" fill="#7ec8ff" />
              <rect x="738" y="224" width="8" height="80" fill="#d8f2ff" />
              <rect x="702" y="260" width="80" height="8" fill="#d8f2ff" />
            </g>
          </g>
        </svg>

        <div className="pointer-events-none absolute inset-x-6 top-6 flex items-center justify-between text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-sky-100/80">
          <p>Race Car Visual</p>
          <p className="text-amber-100/85">Driver Spec // DD-07</p>
        </div>
      </div>
    </div>
  );
}
