"use client";

import React, { useEffect, useState, useRef } from "react";
import { ArrowRight, Mail, Phone, User, CheckCircle, Clock, Home, VenetianMask, HeartHandshake, Sparkles } from "lucide-react";

// 🐛 TypeScript Fix: Declare the global variable __app_id to resolve 'Cannot find name' error (ts(2304)).
declare global {
  var __app_id: string | undefined;
}

// --- CONSTANTS AND TYPES FOR JOIN THE MOVEMENT SECTION ---
interface Way {
  image: string;
  title: string;
  description: string;
}

// small hook for hero/content scroll animation (same approach as the blog)
const useScrollAnimation = (threshold = 0.12) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

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

  const base = "transition-all duration-700 ease-out transform";
  const animationClasses = isVisible ? `${base} opacity-100 translate-y-0` : `${base} opacity-0 translate-y-6`;
  return { ref, animationClasses };
};

const ways: Way[] = [
  {
    image: "service1.png",
    title: "Volunteer",
    description: "Volunteer at our centre or events and make a direct impact in someone's recovery journey.",
  },
  {
    image: "service2.png",
    title: "Sponsor a Program",
    description: "Sponsor a recovery program and help transform lives through comprehensive care.",
  },
  {
    image: "service3.png",
    title: "Awareness Campaigns",
    description: "Collaborate with us on awareness campaigns to fight stigma and promote mental health.",
  },
  {
    image: "meditation1.png",
    title: "CSR Partnerships",
    description: "Offer CSR partnerships for social impact and community development initiatives.",
  },
];

// --- Global Variables (Used for Mock Submission Context) ---
const mockAppId = typeof __app_id !== "undefined" ? __app_id : "default-app-id";

// --- TypeScript Interfaces for Type Safety ---
interface VolunteerFormData {
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  address: string;
  timeCommitment: string[];
}

interface InputFieldProps {
  label: string;
  name: keyof VolunteerFormData;
  type?: string;
  icon?: React.ElementType;
  required?: boolean;
  placeholder?: string;
  formData: VolunteerFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

interface VolunteerFormProps {
  appId: string; // The specific application context name
}

// InputField + SelectField utilities (kept in file in case used elsewhere)
const InputField: React.FC<InputFieldProps> = ({ label, name, type = "text", icon: Icon, required = false, placeholder = "", formData, handleChange }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative rounded-md shadow-sm">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-ian-gold" />
        </div>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={formData[name] as string}
        onChange={handleChange}
        required={required}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:ring-4 focus:ring-ian-blue-light focus:border-ian-blue ${Icon ? "pl-10" : ""}`}
      />
    </div>
  </div>
);

const SelectField: React.FC<InputFieldProps & { options: { value: string; label: string }[] }> = ({ label, name, icon: Icon, required = false, formData, handleChange, options }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative rounded-md shadow-sm">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
          <Icon className="h-5 w-5 text-ian-gold" />
        </div>
      )}
      <select
        id={name}
        name={name}
        value={formData[name] as string}
        onChange={handleChange}
        required={required}
        className={`w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm appearance-none bg-white transition duration-300 ease-in-out focus:ring-4 focus:ring-ian-blue-light focus:border-ian-blue ${Icon ? "pl-10" : ""}`}
      >
        <option value="" disabled>
          Select...
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  </div>
);

// Checkbox options for preferred time commitment (kept)
const timeCommitmentOptions = [
  { value: "Mornings", label: "Morning Shifts (8 AM - 12 PM)" },
  { value: "Afternoons", label: "Afternoon Shifts (12 PM - 5 PM)" },
  { value: "Evenings", label: "Evening Shift (5 PM - 9 PM)" },
  { value: "Weekdays", label: "Weekdays (Monday - Friday)" },
  { value: "Weekends", label: "Weekends Only" },
  { value: "OneTime", label: "One-Time Events Only" },
];

const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Non-Binary", label: "Non-Binary" },
  { value: "Prefer Not To Say", label: "Prefer Not To Say" },
];

// --- ANIMATED CARD COMPONENT ---
// Explore button removed — topic-specific content added below each card description.
const AnimatedCard = ({ way, index }: { way: Way; index: number }) => {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  // Short, helpful content for each topic (displayed instead of the "Explore" button)
  const topicDetails: Record<string, string> = {
    Volunteer:
      "Join our volunteer team to support daily activities, run group sessions, and mentor individuals in recovery. Typical roles include event support, peer mentoring, and administrative help — time commitments are flexible to suit students and working professionals.",
    "Sponsor a Program":
      "Sponsoring a program funds therapy, vocational training, and aftercare services. Options include one-time grants or recurring sponsorships. Sponsors receive impact reports and opportunities to engage with beneficiaries through events.",
    "Awareness Campaigns":
      "Help us reduce stigma by hosting workshops, sharing educational resources, or collaborating on social media campaigns. We provide campaign toolkits and speaker support for community events and schools.",
    "CSR Partnerships":
      "Corporate partnerships can include employee volunteering, pro-bono professional services, matching donations, and joint community initiatives. We tailor CSR plans to align with your company's social goals and measure impact together.",
  };

  const extra = topicDetails[way.title] || "Learn more about this initiative by visiting our Contact page or reaching out to our team.";

  return (
    <div
      ref={cardRef}
      className={`bg-white rounded-xl border border-gray-200 shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-gray-400 cursor-pointer text-gray-800 overflow-hidden flex flex-col justify-between h-full transform hover:-translate-y-1 hover:scale-105 scroll-fade-in ${isVisible ? "is-visible" : ""}`}
      style={{ animationDelay: isVisible ? `${index * 150}ms` : "0s" }}
    >
      <img src={way.image} alt={way.title} className="w-full h-64 object-cover rounded-t-xl" />

      <div className="p-4 flex flex-col h-full">
        <h3 className="text-lg font-semibold text-center text-gray-800 mb-2">{way.title}</h3>
        <p className="text-gray-600 text-sm text-center mb-3 flex-grow">{way.description}</p>

        {/* Topic-specific content (replaces previous Explore button) */}
        <div className="text-sm text-gray-700 mt-2 leading-relaxed">{extra}</div>

        {/* optional small CTA link to contact or details */}
        <div className="text-center pt-4">
          <a href="/contact" className="inline-block text-ian-blue font-medium text-sm hover:underline">
            Get involved / Contact us
          </a>
        </div>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
const JoinTheMovement = () => {
  const ctaRef = useRef(null);
  // Parallax hero ref
  const heroRef = useRef<HTMLDivElement | null>(null);

  // Hook for animating hero content
  const { ref: heroContentRef, animationClasses: heroAnimationClasses } = useScrollAnimation(0.12);

  // Parallax effect: adjust background position on scroll for large screens
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const handleScroll = () => {
      // only apply on wider screens to avoid jank on mobile
      if (window.innerWidth < 768) {
        el.style.backgroundPosition = "center top";
        return;
      }
      const offset = window.scrollY - (el.offsetTop || 0);
      // Move background at half the scroll speed for a subtle parallax
      el.style.backgroundPosition = `center ${Math.round(offset * 0.5)}px`;
    };

    // initial position
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCtaVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ctaRef.current) observer.observe(ctaRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen py-8 font-['Inter',_sans-serif']" style={{ backgroundColor: "#F7F2E4" }}>
      {/* ==========================
                Blue Hero Overlay (like the blog header)
         ========================== */}
      <header
        ref={heroRef}
        className="relative text-white overflow-hidden mb-8"
        style={{
          backgroundImage: "url('/nature7.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        {/* Blue overlay + subtle blur */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f86bf]/70 to-[#08a0d6]/65 backdrop-blur-[2px]" />

        {/* Decorative moving layer for parallax */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="w-full h-full transform will-change-transform" />
        </div>

        {/* Animated hero content (fade + slide in). Heading is explicitly white. */}
        <div ref={heroContentRef} className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-66.5 text-center ${heroAnimationClasses}`}>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">Join the Movement</h1>
          <p className="mt-3 text-lg md:text-xl max-w-2xl mx-auto text-white/90">Ways to contribute and take action — volunteer, sponsor, or run awareness campaigns with us.</p>
        </div>

        <svg viewBox="0 0 1440 120" className="w-full h-24 absolute bottom-0 left-0" preserveAspectRatio="none">
          <path d="M0,64 C240,120 480,120 720,80 C960,40 1200,0 1440,48 L1440,120 L0,120 Z" fill="#F7F2E4" />
        </svg>
      </header>

      <style>{`
        :root {
          --ian-gold: #FBC02D;
          --ian-gold-dark: #F9A825;
          --ian-gold-light: #FFF8E1;
          --ian-blue: #0076B6;
          --ian-blue-dark: #005F99;
          --ian-blue-light: #BBE2FF;
        }
        .text-ian-gold { color: var(--ian-gold); }
        .text-ian-gold-dark { color: var(--ian-gold-dark); }
        .bg-ian-gold-light { background-color: var(--ian-gold-light); }
        .border-ian-gold-dark { border-color: var(--ian-gold-dark); }
        .border-ian-gold { border-color: var(--ian-gold); }
        .text-ian-blue { color: var(--ian-blue); }
        .bg-ian-blue { background-color: var(--ian-blue); }
        .hover\\:bg-ian-blue-dark:hover { background-color: var(--ian-blue-dark); }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .cta-fade { opacity: 0; transition: opacity 0.8s ease; }
        .cta-fade.visible { animation: fadeUp 0.9s ease forwards; }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.03); }
          100% { transform: scale(1); }
        }
        .volunteer-btn { animation: pulse 1.8s infinite; }

        .gold-gradient-pattern {
          background:
            radial-gradient(circle at top left, rgba(255, 255, 255, 0.1) 0%, transparent 40%),
            radial-gradient(circle at bottom right, rgba(255, 255, 255, 0.1) 0%, transparent 40%),
            linear-gradient(135deg, var(--ian-gold-light) 0%, var(--ian-gold) 100%);
        }

        @keyframes modalScaleIn {
          from { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
          to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        .modal-content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: modalScaleIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.27) forwards;
        }
        @keyframes formPulseShadow {
          0% { box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05), 0 4px 6px -2px rgba(0,0,0,0.02); }
          50% { box-shadow: 0 15px 20px -5px rgba(0,0,0,0.1), 0 6px 10px -3px rgba(0,0,0,0.05); }
          100% { box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05), 0 4px 6px -2px rgba(0,0,0,0.02); }
        }
        .form-pulse-shadow { animation: formPulseShadow 4s ease-in-out infinite; }
      `}</style>

      <section id="get-involved" className="pt-6 md:pt-10 pb-12">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-16">
          <div className="text-center mb-10 md:mb-12">
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Ways to Contribute</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto items-stretch">
            {ways.map((way, index) => (
              <AnimatedCard key={index} way={way} index={index} />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className={`w-full cta-fade ${ctaVisible ? "visible" : ""}`} ref={ctaRef}>
          <div className="p-4 sm:p-6 md:p-12 text-white text-center shadow-xl max-w-4xl mx-auto min-h-[250px] flex justify-center items-center rounded-xl" style={{ backgroundColor: "#0076B6" }}>
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-lg sm:text-xl mb-6 font-semibold animate-text-pop">
                "The smallest act of kindness is worth more than the grandest intention."
              </p>

              {/* CTA now navigates to /contact */}
              <a href="/contact" className="group bg-white text-[#1E88E5] hover:bg-gray-100 font-semibold px-6 sm:px-8 py-3 rounded-full transition-all duration-300 flex items-center gap-2 mx-auto shadow-md hover:shadow-2xl hover:scale-105 volunteer-btn">
                BECOME A VOLUNTEER
                <ArrowRight size={20} className="transform transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JoinTheMovement;
