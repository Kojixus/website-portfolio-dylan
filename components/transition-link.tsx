"use client";

import Link from "next/link";
import { type AnchorHTMLAttributes, type MouseEvent } from "react";
import { usePageTransition } from "./page-transition-provider";

type TransitionLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  prefetch?: boolean;
};

export default function TransitionLink({
  href,
  onClick,
  prefetch,
  target,
  ...rest
}: TransitionLinkProps) {
  const { navigate } = usePageTransition();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    if (event.button !== 0) {
      return;
    }

    if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) {
      return;
    }

    if (target && target !== "_self") {
      return;
    }

    if (!href.startsWith("/")) {
      return;
    }

    event.preventDefault();
    navigate(href);
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      prefetch={prefetch}
      target={target}
      {...rest}
    />
  );
}
