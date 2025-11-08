"use client";

import React from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import Header from "@/components/header";
import Footer from "@/components/footer";
import GalleryClientEnhanced from "@/components/GalleryClientEnhanced";

const images = [
  // Inauguration
  { src: "/gallery/inaug1.jpg", alt: "Inauguration 1", category: "inauguration" },
  { src: "/gallery/inaug2.jpg", alt: "Inauguration 2", category: "inauguration" },
  { src: "/gallery/inaug3.jpg", alt: "Inauguration 3", category: "inauguration" },
  { src: "/gallery/inaug4.jpg", alt: "Inauguration 4", category: "inauguration" },
  { src: "/gallery/inaug5.jpg", alt: "Inauguration 5", category: "inauguration" },
  { src: "/gallery/inaug6.jpg", alt: "Inauguration 6", category: "inauguration" },
  { src: "/gallery/inaug7.jpg", alt: "Inauguration 7", category: "inauguration" },
  { src: "/gallery/inaug8.jpg", alt: "Inauguration 8", category: "inauguration" },
  { src: "/gallery/inaug9.jpg", alt: "Inauguration 9", category: "inauguration" },
  { src: "/gallery/inaug11.jpg", alt: "Inauguration 10", category: "inauguration" },
  { src: "/gallery/inaug12.jpg", alt: "Inauguration 11", category: "inauguration" },
  { src: "/gallery/inaug13.jpg", alt: "Inauguration 12", category: "inauguration" },
  { src: "/gallery/inaug14.jpg", alt: "Inauguration 13", category: "inauguration" },
  { src: "/gallery/inaug15.jpg", alt: "Inauguration 14", category: "inauguration" },

  // Independence Day
  { src: "/gallery/inde1.jpg", alt: "Independence Day 1", category: "independence" },
  { src: "/gallery/inde2.jpg", alt: "Independence Day 2", category: "independence" },
  { src: "/gallery/inde3.jpg", alt: "Independence Day 3", category: "independence" },
  { src: "/gallery/inde4.jpg", alt: "Independence Day 4", category: "independence" },

  // Other Events
  { src: "/gallery/oth1.jpg", alt: "Other Event 1", category: "other" },
  { src: "/gallery/oth2.jpg", alt: "Other Event 2", category: "other" },
  { src: "/gallery/oth3.jpg", alt: "Other Event 3", category: "other" },
  { src: "/gallery/oth4.jpg", alt: "Other Event 4", category: "other" },
];

export default function GalleryPage() {
  const shouldReduceMotion = useReducedMotion();

  // typed animation variants
  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const headingVariant: Variants = {
    hidden: { y: 40, opacity: 0, scale: 0.98 },
    show: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        // use a named easing to satisfy the TS type
        ease: "easeOut",
      },
    },
  };

  const subVariant: Variants = {
    hidden: { y: 24, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <main className="bg-white min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section
        className="relative text-white overflow-hidden"
        style={{
          backgroundImage: "url('/nature3.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-[#0f86bf]/60 to-[#08a0d6]/70 backdrop-blur-[2px]" />

        {/* Text content (animated) */}
        <motion.div
          className="relative z-10 container mx-auto px-6 lg:px-8 py-70 text-center"
          variants={container}
          initial={shouldReduceMotion ? "show" : "hidden"}
          animate="show"
        >
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg"
            variants={headingVariant}
            aria-label="Our Gallery"
          >
            Our Gallery
          </motion.h1>

          <motion.p
            className="mt-6 text-xl md:text-2xl max-w-3xl mx-auto text-white/90"
            variants={subVariant}
          >
            Capturing the moments of joy, compassion, and transformation at IAN Cares Foundation
          </motion.p>
        </motion.div>

        {/* Curved bottom divider */}
        <svg viewBox="0 0 1440 200" className="w-full h-40 absolute bottom-0 left-0" preserveAspectRatio="none">
          <path d="M0,64 C240,120 480,120 720,80 C960,40 1200,0 1440,48 L1440,200 L0,200 Z" fill="#ffffff" />
        </svg>
      </section>

      {/* Gallery Section */}
      <section className="bg-white pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <GalleryClientEnhanced images={images} />
        </div>
      </section>

      <Footer />
    </main>
  );
}