"use client";

import React, { useMemo, useState, useEffect, useCallback } from "react";
import ClientImage from "@/components/ClientImage";

type Img = { src: string; alt: string; category: string };

export default function GalleryClient({ images }: { images: Img[] }) {
  const [filter, setFilter] = useState<"all" | "inauguration" | "independence" | "other">("all");
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  // used to trigger fade-in animation whenever the filter changes
  const [gridVisible, setGridVisible] = useState(false);

  const filtered = useMemo(
    () => images.filter((i) => filter === "all" || i.category === filter),
    [images, filter]
  );

  const categories = useMemo(
    () => [
      { id: "all", label: "All", icon: "grid" },
      { id: "inauguration", label: "Inauguration", icon: "ribbon" },
      { id: "independence", label: "Independence Day", icon: "flag" },
      { id: "other", label: "Other Events", icon: "dots" },
    ],
    []
  );

  useEffect(() => {
    // fade out then in when filter changes
    setGridVisible(false);
    const t = setTimeout(() => setGridVisible(true), 20); // short delay for transition
    return () => clearTimeout(t);
  }, [filter]);

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
    setModalIndex((prev) => (prev === null ? null : (prev + 1) % filtered.length));
  }, [modalIndex, filtered.length]);

  const showPrev = useCallback(() => {
    if (modalIndex === null) return;
    setModalIndex((prev) => (prev === null ? null : (prev - 1 + filtered.length) % filtered.length));
  }, [modalIndex, filtered.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (modalIndex === null) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalIndex, showNext, showPrev]);

  // small SVG icon renderer
  function Icon({ name }: { name: string }) {
    // all icons use currentColor so color inherits from text color
    switch (name) {
      case "grid":
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <rect x="3" y="3" width="8" height="8" stroke="currentColor" strokeWidth="1.5" rx="1" />
            <rect x="13" y="3" width="8" height="8" stroke="currentColor" strokeWidth="1.5" rx="1" />
            <rect x="3" y="13" width="8" height="8" stroke="currentColor" strokeWidth="1.5" rx="1" />
            <rect x="13" y="13" width="8" height="8" stroke="currentColor" strokeWidth="1.5" rx="1" />
          </svg>
        );
      case "ribbon":
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M12 3v10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M7 8l-3 12 8-5 8 5-3-12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="7" r="3" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        );
      case "flag":
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M6 3v18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M6 5c3-1 5-1 8 0s5 1 8 0v8c-3 1-5 1-8 0s-5-1-8 0V5z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case "dots":
      default:
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="5" cy="12" r="1.6" fill="currentColor" />
            <circle cx="12" cy="12" r="1.6" fill="currentColor" />
            <circle cx="19" cy="12" r="1.6" fill="currentColor" />
          </svg>
        );
    }
  }

  return (
    <>
      {/* FILTER TABS */}
      <div className="mb-8 flex flex-col sm:flex-row items-center sm:justify-between gap-4">
        <div role="tablist" aria-label="Gallery categories" className="flex gap-3 flex-wrap justify-center">
          {categories.map((cat) => {
            const active = filter === cat.id;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setFilter(cat.id as any);
                  setModalIndex(null);
                }}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-transform duration-300
                  ${active ? "bg-[#FFD659] text-[#0e6060] shadow-lg scale-105" : "bg-white text-[#0e6060] border border-gray-200 hover:shadow-sm hover:-translate-y-0.5"}`}
              >
                <span className="w-4 h-4 inline-flex items-center justify-center text-current">
                  <Icon name={cat.icon} />
                </span>
                <span>{cat.label}</span>

                <span
                  aria-hidden
                  className={`absolute left-0 right-0 -bottom-2 h-1 rounded-full transition-all duration-300 ${active ? "opacity-100 bg-linear-to-r from-[#FFD659] to-[#0e6060]" : "opacity-0"}`}
                />
              </button>
            );
          })}
        </div>

        <div className="text-sm text-gray-500">
          Showing <span className="font-semibold">{filtered.length}</span> photo{filtered.length !== 1 && "s"}
        </div>
      </div>

      {/* IMAGE GRID with fade + lift animation on filter change */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 transform transition-all duration-500 ${
          gridVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
        }`}
      >
        {filtered.map((img, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            onClick={() => openModal(idx)}
          >
            <ClientImage
              src={img.src}
              alt={img.alt}
              className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
              placeholder="/gallery/placeholder.png"
            />
          </div>
        ))}
      </div>

      {/* LIGHTBOX MODAL */}
      {modalIndex !== null && filtered[modalIndex] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={closeModal} />

          <div className="relative max-w-5xl w-full max-h-[90vh] overflow-hidden rounded-lg flex flex-col items-center">
            <button onClick={closeModal} className="absolute top-3 right-3 z-20 bg-white/90 rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-white">
              ✕
            </button>

            <button onClick={(e) => { e.stopPropagation(); showPrev(); }} className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-white">
              ‹
            </button>

            <button onClick={(e) => { e.stopPropagation(); showNext(); }} className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-white">
              ›
            </button>

            <img src={filtered[modalIndex].src} alt={filtered[modalIndex].alt} className="max-w-full max-h-[80vh] object-contain rounded-lg" />
          </div>
        </div>
      )}
    </>
  );
}
