"use client";

import React, { useRef, useState, useEffect } from "react";

interface StickySectionProps {
  id?: string;
  zIndex: number;
  className?: string;
  children: React.ReactNode;
}

export function StickySection({ id, zIndex, className = "", children }: StickySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [topOffset, setTopOffset] = useState<number>(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const updateOffset = () => {
      const height = el.offsetHeight;
      const windowHeight = window.innerHeight;
      if (height > windowHeight) {
        // Stick when the bottom of this section hits the bottom of the viewport
        // This allows 100% of the content to be scrolled through first!
        setTopOffset(-(height - windowHeight));
      } else {
        // Fits within viewport: stick at top: 0
        setTopOffset(0);
      }
    };

    updateOffset();

    const resizeObserver = new ResizeObserver(() => {
      updateOffset();
    });
    resizeObserver.observe(el);

    window.addEventListener("resize", updateOffset);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateOffset);
    };
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      style={{
        position: "sticky",
        top: `${topOffset}px`,
        zIndex,
      }}
      className={className}
    >
      {children}
    </section>
  );
}
