"use client";

import React, { useState, useEffect } from "react";

type Props = {
  src: string;
  alt?: string;
  className?: string;
  placeholder?: string; // small blurred image or solid placeholder path
  style?: React.CSSProperties;
  onLoad?: () => void;
  onError?: () => void;
};

export default function ClientImage({
  src,
  alt = "",
  className = "",
  placeholder = "/gallery/placeholder.png",
  style,
  onLoad,
  onError,
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  // When src changes we reset state
  useEffect(() => {
    setLoaded(false);
    setFailed(false);
  }, [src]);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        // ensure consistent sizing behavior in case parent expects a fixed height
        ...style,
      }}
    >
      {/* placeholder visual (below) */}
      <img
        src={placeholder}
        alt={alt}
        aria-hidden
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
        // keep pointer events none so clicks go through to parent if necessary
        style={{ pointerEvents: "none" }}
      />

      {/* real image on top */}
      <img
        src={src}
        alt={alt}
        className={`relative w-full h-full object-cover transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => {
          setLoaded(true);
          onLoad?.();
        }}
        onError={(e) => {
          setFailed(true);
          // fallback to placeholder visually (we already have placeholder underneath)
          onError?.();
          // optionally set src to placeholder to ensure the broken icon doesn't show
          (e.target as HTMLImageElement).src = placeholder;
        }}
        loading="lazy"
      />

      {/* optional small overlay if the image failed */}
      {failed && (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-600 bg-white/20">
          Image unavailable
        </div>
      )}
    </div>
  );
}
