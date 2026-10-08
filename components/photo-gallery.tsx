"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Photo } from "../data/photos";

/**
 * Masonry grid that opens each photo full-size in a native <dialog>.
 * Arrow keys step through, Escape (handled by the dialog) closes.
 */
export default function PhotoGallery({ photos }: { photos: Photo[] }) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [index, setIndex] = useState<number | null>(null);

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };

  const close = () => dialogRef.current?.close();

  const step = useCallback(
    (delta: number) =>
      setIndex((i) =>
        i === null ? i : (i + delta + photos.length) % photos.length,
      ),
    [photos.length],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    const onClose = () => setIndex(null);

    dialog.addEventListener("keydown", onKey);
    dialog.addEventListener("close", onClose);
    return () => {
      dialog.removeEventListener("keydown", onKey);
      dialog.removeEventListener("close", onClose);
    };
  }, [step]);

  const current = index === null ? null : photos[index];

  return (
    <>
      <ul className="gallery-grid mt-6">
        {photos.map((photo, i) => (
          <li key={photo.src} className="gallery-item">
            <button
              type="button"
              onClick={() => open(i)}
              className="gallery-button group"
              aria-label={`View larger: ${photo.caption}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="gallery-thumb"
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label="Photo viewer"
        onClick={(event) => {
          // Clicking the backdrop (the dialog itself, not its content) closes it.
          if (event.target === event.currentTarget) close();
        }}
      >
        {current ? (
          <figure className="lightbox-figure">
            <Image
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              sizes="90vw"
              loading="eager"
              className="lightbox-image"
            />
            <figcaption className="lightbox-caption">
              <span>{current.caption}</span>
              <span className="meta">
                {(index ?? 0) + 1} / {photos.length}
              </span>
            </figcaption>
          </figure>
        ) : null}

        <button
          type="button"
          className="lightbox-btn lightbox-close"
          onClick={close}
          aria-label="Close"
        >
          ✕
        </button>
        <button
          type="button"
          className="lightbox-btn lightbox-prev"
          onClick={() => step(-1)}
          aria-label="Previous photo"
        >
          ‹
        </button>
        <button
          type="button"
          className="lightbox-btn lightbox-next"
          onClick={() => step(1)}
          aria-label="Next photo"
        >
          ›
        </button>
      </dialog>
    </>
  );
}
