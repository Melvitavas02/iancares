"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

/* ---------- Data ---------- */
const ways = [
  {
    image: "/service1.png",
    title: "Volunteer Opportunities",
    description:
      "Join our volunteer network — assist at the centre, support events, or help with community outreach.",
  },
  {
    image: "/service2.png",
    title: "Program Sponsorships",
    description:
      "Sponsor recovery and wellness programs that deliver structured, long-term support.",
  },
  {
    image: "/service3.png",
    title: "Advocacy & Awareness",
    description:
      "Partner in awareness drives and school programs that reduce stigma and raise knowledge.",
  },
  {
    image: "/meditation1.png",
    title: "CSR Partnerships",
    description:
      "Build longer-term CSR projects with Ian Cares Foundation to create measurable social impact.",
  },
];

/* ---------- Parallax hook ---------- */
/* ---------- Parallax hook ---------- */
function useParallax(
  headerRef: React.RefObject<HTMLElement | null>,
  overlayRef: React.RefObject<HTMLDivElement | null>
) {
  useEffect(() => {
    const header = headerRef.current;
    const overlay = overlayRef.current;
    if (!header || !overlay) return;

    // Apply parallax scroll
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          header.style.backgroundPosition = `center ${scrollY * 0.4}px`;
          overlay.style.transform = `translateY(${scrollY * 0.15}px)`;
          ticking = false;
        });
        ticking = true;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [headerRef, overlayRef]);
}


/* ---------- Animation ---------- */
const fade = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75 },
  },
};

/* ---------- Component ---------- */
export default function GetInvolvedPage() {
  const router = useRouter();
  const headerRef = useRef<HTMLElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  useParallax(headerRef, overlayRef);

  return (
    <section className="font-['Inter',_sans-serif'] bg-white text-gray-900 overflow-hidden">
      {/* ---------- HERO SECTION ---------- */}
      <header
        ref={headerRef}
        className="relative text-white overflow-hidden"
        style={{
          backgroundImage: "url('/nature7.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          minHeight: "70vh",
        }}
      >
        {/* Blue overlay with blur */}
        <div
          ref={overlayRef}
          className="absolute inset-0 backdrop-blur-sm"
          style={{
            background:
              "linear-gradient(rgba(15,134,191,0.65), rgba(4,78,146,0.70))",
            willChange: "transform, opacity",
          }}
        />

        {/* Hero Content */}
        <motion.div
          className="relative z-10 container mx-auto px-6 lg:px-8 py-74.5 text-center"
          initial="hidden"
          animate="visible"
          variants={fade}
        >
          <h1 className="text-6xl md:text-7xl font-extrabold text-white drop-shadow-lg">
            Get Involved
          </h1>
          <p className="mt-5 text-lg md:text-xl max-w-3xl mx-auto text-white/95">
            Be part of a movement that heals, restores and transforms lives.
          </p>
        </motion.div>

        {/* Decorative wave divider */}
        <svg
          viewBox="0 0 1440 200"
          className="w-full h-40 absolute bottom-[-1px] left-0 block"
          preserveAspectRatio="none"
        >
          {/* slightly adjusted to remove the gap */}
          <path
            d="M0,64 C240,120 480,120 720,80 C960,40 1200,0 1440,48 L1440,200 L0,200 Z"
            fill="#fff8ec"
          />
        </svg>
      </header>

      {/* ---------- MAIN SECTION ---------- */}
      {/* removed top margin gap by adjusting section start */}
      <div className="bg-gradient-to-b from-[#fff8ec] to-[#eaf6ff] -mt-[1px]">
       
 <main className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-24 -mt-12">

          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#002c5a]">
              Ways to Contribute
            </h2>
            <p className="mt-3 text-gray-700 max-w-2xl mx-auto">
              Volunteer, sponsor, advocate or partner — choose how you’d like to
              help.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
            {ways.map((w, i) => (
              <motion.article
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.18 }}
                variants={fade}
                transition={{ delay: i * 0.06 }}
                className="relative bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex gap-6 items-start">
                  <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 border-2 border-[#ffcf70]">
                    <img
                      src={w.image}
                      alt={w.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#0f86bf]">
                      {w.title}
                    </h3>
                    <p className="mt-2 text-gray-700">{w.description}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </main>
      </div>

      {/* ---------- CTA SECTION ---------- */}
      <footer className="py-24 bg-gradient-to-r from-[#0f86bf] to-[#0072A6] text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-3xl md:text-4xl font-semibold mb-6 leading-snug">
            “Be part of the change — your support can light someone’s path to
            recovery.”
          </p>
          <button
            onClick={() => router.push("/contact")}
            className="group bg-white text-[#0f86bf] px-8 py-3 rounded-full font-bold shadow-md hover:shadow-xl transition transform duration-200 inline-flex items-center gap-2"
          >
            BECOME A VOLUNTEER <ArrowRight size={18} />
          </button>
        </div>
      </footer>
    </section>
  );
}
