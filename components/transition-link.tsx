"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";
import { usePageTransition } from "./page-transition-provider";

type TransitionLinkProps = ComponentProps<typeof Link>;

export default function TransitionLink({
  href,
  onClick,
  ...rest
}: TransitionLinkProps) {
  const { startTransition } = usePageTransition();
  const pathname = usePathname();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    // Let the browser handle modified clicks and anything already cancelled.
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    // No loader when the link points at the page we are already on.
    if (typeof href === "string" && href.split("#")[0] === pathname) {
      return;
    }

    startTransition();
  };

  return <Link href={href} onClick={handleClick} {...rest} />;
}
