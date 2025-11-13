"use client";

import React, { useEffect, useRef, useState } from "react";

/* ---------- Intersection animation hook (unchanged) ---------- */
const useScrollAnimation = (threshold = 0.18, animationClass = "fade-up") => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const getAnimationClasses = (visible: boolean) => {
    const base = "transition-all duration-700 ease-out transform";
    return visible ? `${base} opacity-100 translate-y-0` : `${base} opacity-0 translate-y-6`;
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, animationClasses: getAnimationClasses(isVisible) };
};

/* ---------- Hero ---------- */
function HeroAnimatedContent() {
  const { ref, animationClasses } = useScrollAnimation(0.12, "zoom-in");
  return (
    <div ref={ref} className={`relative z-10 container mx-auto px-6 lg:px-8 py-76.5 text-center ${animationClasses}`}>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg tracking-tight">
          Insights & Inspiration
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-white/90">
          Stay informed with articles on addiction recovery, emotional wellness, lifestyle improvement, and real-life healing experiences.
        </p>
      </div>
    </div>
  );
}

/* ---------- data (unchanged) ---------- */
const blogPosts = [
  {
    title: "Understanding Addiction Recovery: A Holistic Approach",
    excerpt:
      "Learn about the comprehensive methods we use to support individuals through their addiction recovery journey with compassion and professional care.",
    date: "Oct 15, 2024",
    category: "Recovery",
    image: "/meditation4.png",
    categoryText: "text-amber-900",
    categoryBg: "bg-amber-300",
    readMoreText: "text-amber-700 hover:text-amber-900",
  },
  {
    title: "Mental Wellness: Overcoming Depression and Anxiety",
    excerpt:
      "Explore evidence-based strategies and therapeutic approaches to manage depression and anxiety, and discover how emotional wellness is key to lasting recovery.",
    date: "Oct 10, 2024",
    category: "Wellness",
    image: "/family2.png",
    categoryText: "text-yellow-900",
    categoryBg: "bg-yellow-300",
    readMoreText: "text-yellow-700 hover:text-yellow-900",
  },
  {
    title: "Lifestyle Improvement: Building a Purposeful Life After Recovery",
    excerpt:
      "Discover how lifestyle changes, mindfulness practices, and community support can help you build a meaningful and fulfilling life after recovery.",
    date: "Oct 5, 2024",
    category: "Lifestyle",
    image: "/service1.png",
    categoryText: "text-amber-900",
    categoryBg: "bg-amber-300",
    readMoreText: "text-amber-700 hover:text-amber-900",
  },
];

/* ---------- Premium card layout (two-column responsive) ---------- */
export default function Blog() {
  return (
    <div className="font-['Inter',sans-serif] bg-white">
      {/* HERO */}
      <header
        className="relative text-white overflow-hidden"
        style={{
          backgroundImage: "url('/nature5.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-[#0f86bf]/60 to-[#08a0d6]/70 backdrop-blur-[2px]" />
        <HeroAnimatedContent />

        <svg viewBox="0 0 1440 200" className="w-full h-40 absolute bottom-0 left-0" preserveAspectRatio="none">
          <path d="M0,64 C240,120 480,120 720,80 C960,40 1200,0 1440,48 L1440,200 L0,200 Z" fill="#ffffff" />
        </svg>
      </header>

      {/* POSTS: use a grid so the layout feels editorial */}
      <main className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
          {/* Featured (first post bigger) */}
          {blogPosts.map((post, index) => {
            // featured style for first item
            if (index === 0) {
              return <FeaturedCard key={index} post={post} />;
            }
            return <StandardCard key={index} post={post} reverse={index % 2 === 0} />;
          })}
        </div>
      </main>
    </div>
  );
}

/* ---------- FeaturedCard: large elegant hero card ---------- */
function FeaturedCard({ post }: { post: any }) {
  const { ref, animationClasses } = useScrollAnimation(0.18);
  return (
    <article
      ref={ref}
      className={`relative bg-white rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(2,6,23,0.08)] ring-1 ring-gray-50 transition-transform hover:-translate-y-2 ${animationClasses}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Image */}
        <div className="relative">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-96 md:h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "/gallery/placeholder.jpg";
            }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/6 to-transparent pointer-events-none" />
        </div>

        {/* Content */}
        <div className="p-10 md:p-14 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-6">
              <span className={`inline-block ${post.categoryBg} ${post.categoryText} px-4 py-2 rounded-full text-sm font-semibold uppercase`}>
                {post.category}
              </span>
              <span className="text-sm text-gray-400">{post.date}</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4">{post.title}</h2>
            <p className="text-gray-700 max-w-2xl leading-relaxed mb-6">{post.excerpt}</p>
          </div>

          <div className="flex items-center gap-4">
            <a
              className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-5 py-3 rounded-lg font-semibold shadow-sm"
              href="#"
            >
              Read Full Article
            </a>
            <div className="text-sm text-gray-400">Estimated reading time: 4 min</div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ---------- StandardCard: cleaner, two-column but smaller ---------- */
function StandardCard({ post, reverse = false }: { post: any; reverse?: boolean }) {
  const { ref, animationClasses } = useScrollAnimation(0.16);
  return (
    <article
      ref={ref}
      className={`relative bg-white rounded-2xl overflow-hidden shadow-[0_12px_30px_rgba(2,6,23,0.06)] ring-1 ring-gray-50 transition-transform hover:-translate-y-1 ${animationClasses}`}
    >
      <div className={`flex flex-col md:flex-row ${reverse ? "md:flex-row-reverse" : ""}`}>
        {/* Image column */}
        <div className="md:w-1/3 w-full bg-amber-50">
          <div className="h-56 md:h-full overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/gallery/placeholder.jpg";
              }}
            />
          </div>
        </div>

        {/* Content column */}
        <div className="md:w-2/3 w-full p-8 md:p-10 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <span className={`inline-block ${post.categoryBg} ${post.categoryText} px-3 py-1 rounded-full text-sm font-semibold uppercase`}>
                {post.category}
              </span>
              <span className="text-sm text-gray-400">{post.date}</span>
            </div>

            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 leading-snug">{post.title}</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">{post.excerpt}</p>
          </div>

          <div className="flex items-center justify-between md:justify-start gap-4">
            <a className="text-amber-700 hover:text-amber-900 font-semibold" href="#">
              Read More →
            </a>
            <div className="text-sm text-gray-400 hidden md:inline">3 min read</div>
          </div>
        </div>
      </div>
    </article>
  );
}
