"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";

// Funció útil per combinar classes de Tailwind si utilitzes clsx/tailwind-merge.
// Si no els tens instal·lats, pots ignorar el cn() i fer servir les classes directament, 
// però per defecte Shadcn ho demana.
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function MagicCard({
  children,
  className,
  gradientSize = 200,
  gradientColor = "#262626",
  gradientOpacity = 0.8,
  gradientFrom = "#9E7AFF",
  gradientTo = "#FE8BBB",
}) {
  const cardRef = useRef(null);
  const [mouseX, setMouseX] = useState(-gradientSize);
  const [mouseY, setMouseY] = useState(-gradientSize);

  const handleMouseMove = useCallback(
    (e) => {
      if (cardRef.current) {
        const { left, top } = cardRef.current.getBoundingClientRect();
        const clientX = e.clientX;
        const clientY = e.clientY;
        setMouseX(clientX - left);
        setMouseY(clientY - top);
      }
    },
    []
  );

  const handleMouseOut = useCallback((e) => {
    if (!e.relatedTarget) {
      document.removeEventListener("mousemove", handleMouseMove);
      setMouseX(-gradientSize);
      setMouseY(-gradientSize);
    }
  }, [handleMouseMove, gradientSize]);

  const handleMouseEnter = useCallback(() => {
    document.addEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [handleMouseEnter, handleMouseMove, handleMouseOut]);

  useEffect(() => {
    if (cardRef.current) {
      // Passem les variables CSS a la targeta perquè el ::before les llegeixi
      cardRef.current.style.setProperty("--mouse-x", `${mouseX}px`);
      cardRef.current.style.setProperty("--mouse-y", `${mouseY}px`);
      cardRef.current.style.setProperty("--gradient-size", `${gradientSize}px`);
      cardRef.current.style.setProperty("--gradient-color", gradientColor);
      cardRef.current.style.setProperty("--gradient-opacity", gradientOpacity);
      cardRef.current.style.setProperty("--gradient-from", gradientFrom);
      cardRef.current.style.setProperty("--gradient-to", gradientTo);
    }
  }, [mouseX, mouseY, gradientSize, gradientColor, gradientOpacity, gradientFrom, gradientTo]);

  return (
    <div
      ref={cardRef}
      className={cn("group relative flex rounded-2xl border border-border bg-background", className)}
    >
      <div className="absolute inset-px z-10 rounded-2xl bg-background" />
      <div className="relative z-30 w-full">{children}</div>
      <div
        className="pointer-events-none absolute inset-px z-20 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(var(--gradient-size) circle at var(--mouse-x) var(--mouse-y), var(--gradient-color), transparent 100%)`,
          opacity: `var(--gradient-opacity)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(var(--gradient-size) circle at var(--mouse-x) var(--mouse-y), var(--gradient-from), var(--gradient-to), transparent 100%)`,
        }}
      />
    </div>
  );
}