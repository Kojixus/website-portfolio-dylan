"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { usePageTransition } from "./PageTransitionProvider";

type TransitionLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

export default function TransitionLink({
  href,
  onClick,
  target,
  ...rest
}: TransitionLinkProps) {
  const { navigate } = usePageTransition();
  const isInternalPageRoute = href.startsWith("/");

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    if (!isInternalPageRoute) {
      return;
    }

    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      target === "_blank"
    ) {
      return;
    }

    event.preventDefault();
    navigate(href);
  };

  return <a href={href} onClick={handleClick} target={target} {...rest} />;
}
