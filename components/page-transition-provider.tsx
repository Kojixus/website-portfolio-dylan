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
import { usePathname, useRouter } from "next/navigation";

type TransitionContextValue = {
  navigate: (href: string) => void;
  isTransitioning: boolean;
};

const TransitionContext = createContext<TransitionContextValue | null>(null);

export function usePageTransition() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("usePageTransition must be used within PageTransitionProvider");
  }
  return context;
}

type PageTransitionProviderProps = {
  children: ReactNode;
};

const NAVIGATE_DELAY_MS = 420;
const SETTLE_DELAY_MS = 680;

export default function PageTransitionProvider({
  children,
}: PageTransitionProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pushTimeoutRef = useRef<number | null>(null);
  const settleTimeoutRef = useRef<number | null>(null);

  const clearTimeouts = useCallback(() => {
    if (pushTimeoutRef.current !== null) {
      window.clearTimeout(pushTimeoutRef.current);
      pushTimeoutRef.current = null;
    }
    if (settleTimeoutRef.current !== null) {
      window.clearTimeout(settleTimeoutRef.current);
      settleTimeoutRef.current = null;
    }
  }, []);

  const navigate = useCallback(
    (href: string) => {
      if (!href.startsWith("/")) {
        return;
      }

      if (href === pathname) {
        return;
      }

      clearTimeouts();
      setIsTransitioning(true);

      pushTimeoutRef.current = window.setTimeout(() => {
        router.push(href);
      }, NAVIGATE_DELAY_MS);
    },
    [clearTimeouts, pathname, router]
  );

  useEffect(() => {
    if (!isTransitioning) {
      return;
    }

    if (settleTimeoutRef.current !== null) {
      window.clearTimeout(settleTimeoutRef.current);
    }

    settleTimeoutRef.current = window.setTimeout(() => {
      setIsTransitioning(false);
      settleTimeoutRef.current = null;
    }, SETTLE_DELAY_MS);

    return () => {
      if (settleTimeoutRef.current !== null) {
        window.clearTimeout(settleTimeoutRef.current);
        settleTimeoutRef.current = null;
      }
    };
  }, [isTransitioning, pathname]);

  useEffect(() => {
    return () => {
      clearTimeouts();
    };
  }, [clearTimeouts]);

  const value = useMemo(
    () => ({
      navigate,
      isTransitioning,
    }),
    [navigate, isTransitioning]
  );

  return (
    <TransitionContext.Provider value={value}>
      {children}

      <div
        aria-hidden="true"
        className={`route-loader${isTransitioning ? " is-active" : ""}`}
      >
        <div className="route-loader-panel">
          <p className="route-loader-kicker">Dylan Dana</p>
          <p className="route-loader-title">Loading Next Section</p>
          <div className="route-loader-bars">
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </TransitionContext.Provider>
  );
}
