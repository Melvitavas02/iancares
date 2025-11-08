// components/GalleryClientEnhanced.tsx
"use client";

import React, { useMemo, useState, useEffect, useCallback } from "react";
import ClientImage from "./ClientImage";

type Img = { src: string; alt: string; category: string };

export default function GalleryClientEnhanced({ images }: { images: Img[] }) {
  const [filter, setFilter] = useState<"all" | "inauguration" | "independence" | "other">("all");
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [gridVisible, setGridVisible] = useState(true);

  const categories = [
    { id: "all", label: "All", icon: "grid" },
    { id: "inauguration", label: "Inauguration", icon: "ribbon" },
    { id: "independence", label: "Independence Day", icon: "flag" },
    { id: "other", label: "Other Events", icon: "dots" },
  ] as const;

  const filtered = useMemo(() => images.filter((i) => filter === "all" || i.category === filter), [images, filter]);

  // Animate grid when filter changes
  useEffect(() => {
    setGridVisible(false);
    const t = setTimeout(() => setGridVisible(true), 40);
    return () => clearTimeout(t);
  }, [filter]);

  // Lightbox logic
  const openModal = (index: number) => {
    setModalIndex(index);
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setModalIndex(null);
    document.body.style.overflow = "";
  };

  const showNext = useCallback(() => {
    if (modalIndex === null) return;
    setModalIndex((p) => (p === null ? null : (p + 1) % filtered.length));
  }, [modalIndex, filtered.length]);

  const showPrev = useCallback(() => {
    if (modalIndex === null) return;
    setModalIndex((p) => (p === null ? null : (p - 1 + filtered.length) % filtered.length));
  }, [modalIndex, filtered.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (modalIndex === null) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [modalIndex, showNext, showPrev]);

  // Simple icon
  const Icon = ({ name }: { name: string }) => {
    switch (name) {
      case "grid":
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="8" height="8" stroke="currentColor" strokeWidth="1.4" rx="1" />
            <rect x="13" y="3" width="8" height="8" stroke="currentColor" strokeWidth="1.4" rx="1" />
            <rect x="3" y="13" width="8" height="8" stroke="currentColor" strokeWidth="1.4" rx="1" />
            <rect x="13" y="13" width="8" height="8" stroke="currentColor" strokeWidth="1.4" rx="1" />
          </svg>
        );
      case "ribbon":
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 3v7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M7 10l-2 9 7-4 7 4-2-9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="7" r="2.2" stroke="currentColor" strokeWidth="1.1" />
          </svg>
        );
      case "flag":
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M6 3v18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M6 5c3-1 5-1 8 0s5 1 8 0v8c-3 1-5 1-8 0s-5-1-8 0V5z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      default:
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="5" cy="12" r="1.6" fill="currentColor" />
            <circle cx="12" cy="12" r="1.6" fill="currentColor" />
            <circle cx="19" cy="12" r="1.6" fill="currentColor" />
          </svg>
        );
    }
  };

  return (
    <>
      {/* FILTER BAR */}
      <div className="mb-8">
        <div className="sticky top-28 z-20 mx-auto max-w-5xl px-6">
          <div className="bg-white/70 backdrop-blur-md shadow-sm rounded-full px-4 py-3 flex items-center justify-between gap-4">
            <div className="flex gap-3 flex-wrap items-center justify-center">
              {categories.map((c) => {
                const active = filter === (c.id as any);
                return (
                  <button
                    key={c.id}
                    onClick={() => setFilter(c.id as any)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-transform duration-200 ${
                      active
                        ? "bg-[#FFD659] text-[#0e6060] shadow-md transform scale-105"
                        : "bg-white text-[#0e6060] border border-gray-200 hover:shadow-sm"
                    }`}
                  >
                    <Icon name={c.icon} />
                    <span>{c.label}</span>
                  </button>
                );
              })}
            </div>
            <div className="text-sm text-gray-600">
              Showing <span className="font-semibold text-[#0e6060]">{filtered.length}</span> photo
              {filtered.length !== 1 && "s"}
            </div>
          </div>
        </div>
      </div>

      {/* IMAGE GRID (MASONRY) */}
      <div
        className={`max-w-6xl mx-auto px-6 transition-all duration-500 ${
          gridVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
        }`}
      >
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filtered.map((img, idx) => (
            <div
              key={idx}
              className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl cursor-pointer break-inside-avoid group transition-transform duration-300 hover:-translate-y-1"
              onClick={() => openModal(idx)}
            >
              <ClientImage
                src={img.src}
                alt={img.alt}
                className="w-full h-auto block"
                placeholder="/gallery/placeholder.png"
              />
            </div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX */}
      {modalIndex !== null && filtered[modalIndex] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative z-10 max-w-4xl w-full mx-auto">
            <button
              onClick={closeModal}
              className="absolute right-0 top-0 -translate-y-6 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md"
            >
              ✕
            </button>

            <div className="bg-white rounded-lg overflow-hidden p-4 shadow-2xl">
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    showPrev();
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow"
                >
                  ‹
                </button>
                <img
                  src={filtered[modalIndex].src}
                  alt={filtered[modalIndex].alt}
                  className="w-full max-h-[70vh] object-contain mx-auto rounded transition-transform duration-500 transform scale-95 hover:scale-100"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    showNext();
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow"
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
