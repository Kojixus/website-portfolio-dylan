export default function Loading() {
  return (
    <div className="route-loader is-active" role="status" aria-live="polite">
      <div className="route-loader-panel">
        <p className="route-loader-kicker">Dylan Dana</p>
        <p className="route-loader-title">Loading</p>
        <div className="route-loader-bars">
          <span />
        </div>
      </div>
    </div>
  );
}
