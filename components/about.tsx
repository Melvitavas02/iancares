// app/about/page.js
"use client";

import React, { useRef } from "react";
import { motion, Variants } from "framer-motion";


import { useRouter } from "next/navigation";

// --- Icon Components (image-based placeholders) ---
const HeartIcon = ({ className = "w-6 h-6", style = {} }) => (
  <img src="/vision-icon.png" alt="Heart Icon" className={className} style={style} />
);
const TargetIcon = ({ className = "w-6 h-6", style = {} }) => (
  <img src="/mission-icon.png" alt="Target Icon" className={className} style={style} />
);
const IconCompassion = ({ className = "w-6 h-6", style = {} }) => (
  <img src="/compassion.png" alt="Compassion Icon" className={className} style={style} />
);
const IconIntegrity = ({ className = "w-6 h-6", style = {} }) => (
  <img src="/integrity.png" alt="Integrity Icon" className={className} style={style} />
);
const IconInclusivity = ({ className = "w-6 h-6", style = {} }) => (
  <img src="/inclusivity.png" alt="Inclusivity Icon" className={className} style={style} />
);
const IconTransformation = ({ className = "w-6 h-6", style = {} }) => (
  <img src="/transformation.png" alt="Transformation Icon" className={className} style={style} />
);

export default function About() {
    const headerRef = useRef(null);

 const heroFade: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: "easeOut" // use a named easing instead of a number[] to satisfy TS
    }
  }
};


  const router = useRouter();

  const VALUE_COLORS = {
    blue: {
      color: "text-sky-700",
      bg: "bg-sky-50",
      border: "border-sky-200",
      shadow: "shadow-[0_20px_50px_rgba(14,165,233,0.08)]",
    },
    yellow: {
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-200",
      shadow: "shadow-[0_20px_50px_rgba(249,115,22,0.06)]",
    },
  };

  const coreValues = [
    { title: "Compassion", desc: "Healing with love and respect for every soul.", icon: IconCompassion, ...VALUE_COLORS.yellow },
    { title: "Integrity", desc: "Serving the community with honesty and full transparency.", icon: IconIntegrity, ...VALUE_COLORS.blue },
    { title: "Inclusivity", desc: "Caring beyond religion, background, or social status.", icon: IconInclusivity, ...VALUE_COLORS.yellow },
    { title: "Transformation", desc: "Changing lives through awareness and positive, mindful action.", icon: IconTransformation, ...VALUE_COLORS.blue },
  ];

  const imageStory = "/happy-people2.png";
  const imageCentre = "/sarva-dharma-sangama-centre.jpg";
  const imageVision = "/people1.jpeg";
  const imageMission = "/people7.png";

  return (
    <section id="about" className="font-['Inter',_sans-serif'] text-gray-900">
      {/* ------------------ HERO (unchanged) ------------------ */}
      <header
  ref={headerRef}
  className="relative text-white overflow-hidden"
  style={{
    backgroundImage: "url('/nature4.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    minHeight: "70vh",
  }}
>
  {/* animated overlay: fades in (keeps image visible + blur + tint) */}
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    className="absolute inset-0"
    style={{
      background: "linear-gradient(rgba(15,134,191,0.65), rgba(4,78,146,0.70))",
      backdropFilter: "blur(3px)",
      willChange: "opacity, transform",
      zIndex: 0,
    }}
  />

  {/* animated heading (slides up + fades in) */}
 <motion.div
  className="relative z-10 container mx-auto px-6 lg:px-8 py-75 text-center"
  initial="hidden"
  animate="visible"
  variants={heroFade}
>
  <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">About IAN Cares Foundation</h1>
  <p className="mt-6 text-xl md:text-2xl max-w-3xl mx-auto text-white/90">
    Spreading hope, compassion, and healing through unity and faith.
  </p>
</motion.div>


  {/* wave divider (unchanged) */}
  <svg viewBox="0 0 1440 200" className="w-full h-40 absolute bottom-0 left-0" preserveAspectRatio="none">
    <path d="M0,64 C240,120 480,120 720,80 C960,40 1200,0 1440,48 L1440,200 L0,200 Z" fill="#ffffff" />
  </svg>
</header>


      {/* ------------------ VISION & MISSION (HORIZONTAL CARDS) ------------------ */}
      <section className="relative bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          {/* Vision (left text, right image) */}
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <article className="relative p-8 rounded-2xl bg-white border border-gray-100 shadow-md">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 mb-4">
                <HeartIcon className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-extrabold text-sky-800 mb-3">Vision: Healing</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                We envision a world where every individual lives free from addiction, emotional suffering, and social stigma — a world where faith and compassion become the pillars of healing.
                Our dream is to build communities grounded in understanding, acceptance, and resilience. Emotional and spiritual well-being are fundamental human needs; true recovery begins when the heart and soul are healed together.
                Through targeted awareness, quality education, and dedicated care, we restore hope and help people rediscover inner strength, rebuild relationships, and reintegrate into society with dignity.
              </p>
            </article>

            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img src={imageVision} alt="Vision of Unity" className="w-full h-80 object-cover" />
            </div>
          </div>

          {/* Mission (left image, right text) */}
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img src={imageMission} alt="Mission" className="w-full h-80 object-cover" />
            </div>

            <article className="relative p-8 rounded-2xl bg-amber-50 border border-amber-200 shadow-md">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-amber-100 border border-amber-200 mb-4">
                <TargetIcon className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-extrabold text-sky-800 mb-3">Mission: Recovery</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our mission is to provide holistic, compassionate, faith-inspired recovery programs that nurture mind, body, and soul. We combine professional counselling, evidence-based therapies, spiritual guidance, and family systems support to ensure sustainable transformation.
                Our programs focus on restoring dignity, rebuilding relationships and empowering individuals to lead purposeful, addiction-free lives. Working hand-in-hand with families, communities and healthcare professionals, we create a safe, non-judgmental environment where healing is possible for everyone.
              </p>

              
            </article>
          </div>
        </div>
      </section>

      {/* ------------------ OUR STORY (WIDE SPLIT) ------------------ */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl grid md:grid-cols-2 gap-10 items-center">
            <div>
              <img src={imageStory} alt="Ian Cares Foundation" className="w-full rounded-xl shadow-lg object-cover h-80" />
            </div>

            <div>
              <h2 className="text-4xl font-extrabold text-gray-900 mb-4">How we Started</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Born out of love, loss, and a steadfast desire to help others, Ian Cares Foundation was established in memory of Ian Austin Mascarenhas — a young person whose kindness inspired everyone who knew him.
                Following Ian's tragic passing in 2017, family and friends transformed grief into purpose: to fight the “3 Ds” — Drinks, Drugs, and Depression — and to create accessible pathways to recovery and hope.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                What began as a personal mission grew into a community movement focused on mental wellbeing, compassionate care, and faith-led restoration. Today, the Foundation stands as a beacon of support — providing counselling, family programs, community outreach, and education to those who need it most.
              </p>
              <p className="text-lg font-semibold italic text-sky-700 border-l-4 border-sky-300 pl-4">
                We carry this legacy forward, committed to providing holistic care built on faith and community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------ CORE VALUES (HORIZONTAL CARDS) ------------------ */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h3 className="text-4xl font-extrabold text-center mb-10">
            <span className="text-amber-600">Core</span> Values
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((v, i) => (
              <div
                key={i}
                className={`relative rounded-2xl p-8 bg-white border ${v.border} ${v.shadow} hover:translate-y-[-6px] transition-transform`}
              >
                <div className={`w-16 h-16 flex items-center justify-center rounded-lg mb-4 ${v.bg} border ${v.border}`}>
                  <v.icon className={`w-8 h-8 ${v.color}`} />
                </div>
                <h4 className="text-2xl font-bold mb-2">{v.title}</h4>
                <p className="text-gray-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------ QUOTE (CENTERED PREMIUM) ------------------ */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative rounded-xl p-8 border-2 border-sky-100 bg-white shadow-lg">
            <p className="text-2xl text-sky-900 font-serif italic leading-tight text-center">
              "The greatest journey is the one where we find compassion within ourselves, and extend it to all."
            </p>
            <p className="mt-4 text-center text-sky-700 font-semibold">— Ian Cares Philosophy</p>
          </div>
        </div>
      </section>

      {/* ------------------ CENTRE (HERO-LIKE CTA) ------------------ */}
      <section className="py-16 bg-gradient-to-b from-[#fff8ec] to-[#eaf6ff]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl border-t-8 border-sky-500 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-3xl font-extrabold text-sky-900 mb-4 text-center lg:text-left">The Sarva Dharma Sangama Centre</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Located in the serene surroundings of Quila, Kinnigoli, the Sarva Dharma Sangama Centre is a unique rehabilitation and wellness sanctuary. Built on the philosophy of “unity in diversity,” it welcomes people from all faiths and backgrounds to a shared path of healing.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                The centre blends spiritual support, professional counselling, and holistic wellness practices — including group therapy, meditation, and family reintegration programs — to restore dignity, hope, and long-term wellbeing.
              </p>
              <p className="text-xl text-sky-700 font-semibold italic border-l-4 border-amber-500 pl-4">
                "When faiths unite, healing begins."
              </p>

              <div className="mt-6 flex gap-4">
                <button
                  onClick={() => router.push("/contact")}
                  className="px-6 py-3 bg-sky-600 text-white rounded-full font-semibold shadow hover:bg-sky-700 transition"
                >
                  Visit Us
                </button>

               
              </div>
            </div>

            <div className="rounded-xl overflow-hidden shadow-lg">
              <img src={imageCentre} alt="Sarva Dharma Sangama Centre" className="w-full h-80 object-cover" />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
