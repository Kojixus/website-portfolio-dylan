"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";

type PageTransitionValue = {
  isNavigating: boolean;
  startTransition: () => void;
};

const PageTransitionContext = createContext<PageTransitionValue>({
  isNavigating: false,
  startTransition: () => {},
});

export function usePageTransition() {
  return useContext(PageTransitionContext);
}

/** Safety valve: if a navigation is cancelled the loader must not stick. */
const MAX_LOADER_MS = 6000;

export default function PageTransitionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  // The path we were on when the navigation started. Once the route changes
  // it no longer matches, so the loader hides itself without an effect.
  const [startedFrom, setStartedFrom] = useState<string | null>(null);
  const isNavigating = startedFrom !== null && startedFrom === pathname;
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // The new route has rendered, so the safety timer is no longer needed.
  useEffect(() => clearTimer, [pathname, clearTimer]);

  const startTransition = useCallback(() => {
    setStartedFrom(pathname);
    clearTimer();
    timeoutRef.current = setTimeout(() => setStartedFrom(null), MAX_LOADER_MS);
  }, [clearTimer, pathname]);

  const value = useMemo(
    () => ({ isNavigating, startTransition }),
    [isNavigating, startTransition],
  );

  return (
    <PageTransitionContext.Provider value={value}>
      {children}
      <div
        className={`route-loader${isNavigating ? " is-active" : ""}`}
        role="status"
        aria-live="polite"
        aria-hidden={!isNavigating}
      >
        <div className="route-loader-panel">
          <p className="route-loader-kicker">Dylan Dana</p>
          <p className="route-loader-title">Loading</p>
          <div className="route-loader-bars">
            <span />
          </div>
        </div>
      </div>
    </PageTransitionContext.Provider>
  );
}
