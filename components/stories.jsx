"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/* ---------- small helper components ---------- */
function CategoryTag({ children }) {
  return (
    <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-blue-50 text-blue-700">
      {children}
    </span>
  );
}

function QuoteIcon() {
  return (
    <svg
      className="w-8 h-8 text-blue-200"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path d="M7 7h3v6H6v-1a4 4 0 014-4V7H7z" fill="currentColor" />
      <path d="M13 7h3v6h-4v-1a4 4 0 014-4V7h-3z" fill="currentColor" />
    </svg>
  );
}

function StoryCard({
  category = "General",
  quote = "",
  name = "Anonymous",
  title = "",
  id,
}) {
  return (
    <Card className="rounded-2xl shadow-sm hover:shadow-lg transition p-6">
      <div className="mb-4">
        <CategoryTag>{category}</CategoryTag>
      </div>

      <div className="mb-4 text-blue-200">
        <QuoteIcon />
      </div>

      <blockquote className="italic text-lg leading-relaxed text-slate-700 mb-4">
        "{quote}"
      </blockquote>

      <div className="mt-auto">
        <p className="font-semibold text-slate-900">{name}</p>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
    </Card>
  );
}

/* ---------- main component ---------- */
export default function StoriesCTA() {
  const [visibleCount, setVisibleCount] = useState(4);
  const shouldReduceMotion = useReducedMotion();

  const stories = [
    {
      id: 1,
      category: "De-Addiction",
      quote:
        "After years of struggling with alcohol addiction, I found hope at IAN Cares. The team didn't just treat my addiction — they helped me rebuild my relationships and rediscover my purpose.",
      name: "Priya S.",
      title: "Journey to Sobriety",
    },
    {
      id: 2,
      category: "Mental Health",
      quote:
        "I was sceptical about therapy, but the counselors here created such a safe space. Through CBT and group sessions, I learned to manage my depression and develop coping strategies.",
      name: "Arjun M.",
      title: "Overcoming Depression",
    },
    {
      id: 3,
      category: "Family Support",
      quote:
        "When our son was diagnosed with bipolar disorder, we felt lost. IAN Cares' family therapy program taught us how to support him while taking care of ourselves.",
      name: "R. Fernandes",
      title: "Supporting Our Son",
    },
    {
      id: 4,
      category: "Trauma Recovery",
      quote:
        "As a trauma survivor, I struggled with anxiety and PTSD for years. The trauma-focused therapy here helped me process my experiences in a safe environment.",
      name: "Nidhi K.",
      title: "Finding Strength",
    },
    {
      id: 5,
      category: "Youth Outreach",
      quote:
        "The youth outreach sessions gave me tools to handle stress and peer pressure. I feel more confident and hopeful about my future.",
      name: "Vikram",
      title: "A Fresh Start",
    },
    {
      id: 6,
      category: "Rehabilitation",
      quote:
        "The rehabilitation program combined medical support and counselling — it saved my life and helped me reconnect with my family.",
      name: "Sana P.",
      title: "Rebuilding Life",
    },
    {
      id: 7,
      category: "Counselling",
      quote:
        "I learned to set boundaries and rebuild trust. Therapy made space for slow, steady change.",
      name: "Kabir",
      title: "Learning Trust",
    },
    {
      id: 8,
      category: "Community",
      quote:
        "The community programs gave me a sense of belonging I hadn't felt in years.",
      name: "Meera",
      title: "Belonging Again",
    },
  ];

  const visibleStories = stories.slice(0, visibleCount);

  // -------- Framer Motion Animation Variants --------
  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12 },
    },
  };

  const headingVariant = {
    hidden: { y: 40, opacity: 0, scale: 0.98 },
    show: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const subVariant = {
    hidden: { y: 24, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <div className="text-slate-900" style={{ backgroundColor: "#F8F6DF" }}>
      {/* HERO: Blue curved banner with animation */}
      <header
        className="relative text-white overflow-hidden"
        style={{
          backgroundImage: "url('/nature2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f86bf]/60 to-[#08a0d6]/70 backdrop-blur-[2px]" />

        {/* Animated Heading */}
        <motion.div
          className="relative z-10 container mx-auto px-6 lg:px-8 py-75 text-center"
          variants={container}
          initial={shouldReduceMotion ? "show" : "hidden"}
          animate="show"
        >
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg"
            variants={headingVariant}
          >
            Stories of Hope
          </motion.h1>

          <motion.p
            className="mt-6 text-xl md:text-2xl max-w-3xl mx-auto text-white/90"
            variants={subVariant}
          >
            Real journeys of transformation and recovery
          </motion.p>
        </motion.div>

        {/* Curved Divider */}
        <svg
          viewBox="0 0 1440 200"
          className="w-full h-40 absolute bottom-0 left-0"
          preserveAspectRatio="none"
        >
          <path
            d="M0,64 C240,120 480,120 720,80 C960,40 1200,0 1440,48 L1440,200 L0,200 Z"
            fill="#ffffff"
          />
        </svg>
      </header>

      {/* Intro Section */}
      <section className="bg-white">
        <div className="container mx-auto px-6 lg:px-8 pt-16 pb-12">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center mb-4">
              <svg
                className="w-10 h-10 text-[#0f86bf]"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M12 21s-7.5-4.5-9.5-7.5C-0.5 8 5 3 8 6.5 10 9 12 12 12 12s2-3 4-5.5C19 3 24.5 8 21.5 13.5 19.5 16.5 12 21 12 21z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <p className="text-slate-600">
              These stories represent the courage, resilience, and hope of the
              individuals and families we've been privileged to support. While
              names and details have been changed to protect privacy, each story
              reflects a real journey of healing.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-slate-50 py-12">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visibleStories.map((s) => (
              <StoryCard
                key={s.id}
                category={s.category}
                quote={s.quote}
                name={s.name}
                title={s.title}
                id={s.id}
              />
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            {visibleCount < stories.length ? (
              <Button
                onClick={() => setVisibleCount((v) => v + 4)}
                className="px-6"
              >
                Show More Stories
              </Button>
            ) : (
              <a href="/stories" className="w-full sm:w-auto">
                <Button className="px-6">View All Stories</Button>
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
