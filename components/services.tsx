"use client";

import React, { useState, useEffect, useRef } from 'react';

// --- UPDATED COLOR PALETTE (Bright, Modern, Blue, Yellow, White) ---
const PRIMARY_BG_WHITE = '#FFFFFF';           // Page background (set to white)
const CARD_INNER_WHITE = '#FFFFFF';           
const ACCENT_PRIMARY_BLUE = '#007AC3';        
const ACCENT_PRIMARY_BLUE_DARK = '#005CA0';   
const ACCENT_SECONDARY_YELLOW = '#FFC72C';    
const ACCENT_YELLOW_DARK = '#E0A800';         
const TEXT_DARK = '#2E2B27';                  
const TEXT_MEDIUM_GREY = '#6B6B6B';           
const BORDER_LIGHT_GREY = '#F0F0F0';          
const VIBRANT_BLUE_BACKGROUND = '#007AC3';    
const GOLDEN_YELLOW_MID_LAYER = '#F3BA2C';    
const CARD_LIGHT_YELLOW_BG = '#FFFBEB';
const CARD_BELOW_YELLOW = '#FFFFFF'; // ← changed to white background

// --- SERVICE DATA: WHAT WE HEAL ---
const whatWeHealServices = [
    {
        title: "Addiction Recovery",
        description:
            "Personalized de-addiction programs combining medical supervision, counselling, and faith-based motivation.",
        illustration: `/support.jpg` 
    },
    {
        title: "Depression & Anxiety Support",
        description:
            "Professional therapy sessions and emotional wellness programs to overcome mental distress and regain balance.",
        illustration: `/anxiety.png`
    },
    {
        title: "Family & Relationship Therapy",
        description:
            "Guided conversations to rebuild trust and communication within families affected by addiction or stress.",
        illustration: `/family4.png`
    },
    {
        title: "Holistic Healing",
        description:
            "Yoga, meditation, and lifestyle sessions designed to relax the mind, strengthen the body, and uplift the spirit.",
        illustration: `/meditation4.png`
    },
    {
        title: "Youth Empowerment",
        description:
            "Workshops in schools and colleges to raise awareness about substance abuse, mental health, and self-care.",
        illustration: `/youth.png`
    },
    {
        title: "Post-Recovery Care",
        description:
            "Continuous mentorship and community engagement to prevent relapse and encourage purposeful living.",
        illustration: `post_recovery1.jpg`
    },
];

// --- Wellness Services ---
const wellnessServices = [
    "Individual & Group Counselling",
    "Residential Recovery Program",
    "Faith-Integrated Healing (Sarva Dharma Sangama)",
    "Nutritional & Lifestyle Guidance",
    "Meditation & Mindfulness Practice",
    "Emotional Wellness Coaching",
];

// --- Custom Animations ---
const CustomAnimations = () => (
    <style>
        {`
            @keyframes slideInUp {
                from { opacity: 0; transform: translateY(40px) scale(0.98); }
                to { opacity: 1; transform: translateY(0) scale(1); }
            }
            .scroll-fade-in.is-visible {
                animation: slideInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
            }

            /* --- PAGE BACKGROUND STYLES --- */
            .page-bg-container {
                position: relative;
                overflow: hidden;
                min-height: 100vh;
                background-color: ${PRIMARY_BG_WHITE}; /* ← white background */
            }

            .media-clipper {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 120vh;
                border-bottom-left-radius: 40% 15%; 
                border-bottom-right-radius: 40% 15%;
                transform: translateY(-5%); 
                z-index: 1; 
                overflow: hidden;
                min-height: 800px; 
            }

            .page-content-wrapper {
                position: relative;
                z-index: 10;
                padding-top: min(110vh, 850px); 
                padding-bottom: 8rem; 
            }

            .scroll-fade-in {
                opacity: 0;
                transform: translateY(40px) scale(0.98);
                transition: transform 0.7s, opacity 0.7s;
            }

            .card-base {
                background-color: ${CARD_INNER_WHITE}; 
                border-radius: 2rem; 
                overflow: hidden; 
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05); 
                border: 1px solid ${BORDER_LIGHT_GREY}; 
                transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            .card-base:hover {
                transform: translateY(-4px) scale(1.005);
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08); 
            }

            .btn-primary-custom {
                background-color: ${ACCENT_PRIMARY_BLUE}; 
                color: white; 
                padding: 0.85rem 2.2rem;
                border-radius: 9999px; 
                font-weight: 700; 
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(0, 122, 195, 0.3); 
                letter-spacing: 0.05em; 
            }
            .btn-primary-custom:hover {
                background-color: ${ACCENT_PRIMARY_BLUE_DARK}; 
                box-shadow: 0 6px 20px rgba(0, 122, 195, 0.4);
            }
        `}
    </style>
);

// --- Card Component ---
interface ServiceData {
    title: string;
    description: string;
    illustration: string;
}

interface AnimatedServiceCardProps {
    service: ServiceData;
    index: number;
}

const AnimatedServiceCard = ({ service, index }: AnimatedServiceCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null); 
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

    return (
        <div
            ref={cardRef}
            className={`
                group w-full h-auto flex flex-col items-start
                card-base scroll-fade-in
                ${isVisible ? 'is-visible' : ''}
            `}
            style={{ animationDelay: isVisible ? `${index * 150}ms` : '0s' }}
        >
            <div 
                className="relative w-full h-48 sm:h-56 mb-0"
                style={{ overflow: 'hidden', borderTopLeftRadius: '2rem', borderTopRightRadius: '2rem' }}
            >
                <img 
                    src={service.illustration}
                    alt={`${service.title} Illustration`} 
                    className="w-full h-full object-cover" 
                    onError={(e) => {
                        e.currentTarget.onerror = null; 
                        e.currentTarget.src = `https://placehold.co/400x250/${ACCENT_PRIMARY_BLUE.substring(1)}/${CARD_INNER_WHITE.substring(1)}?text=Image+Missing`;
                    }}
                />
            </div>
            
            <div className="p-6 pt-5 flex flex-col flex-grow w-full z-10" style={{ backgroundColor: CARD_LIGHT_YELLOW_BG }}> 
                <h3 className="text-2xl font-bold mb-3" style={{ color: TEXT_DARK }}>
                    {service.title}
                </h3>
                <p className="leading-relaxed text-base" style={{ color: TEXT_MEDIUM_GREY }}>
                    {service.description}
                </p>
            </div>
        </div>
    );
};

// --- Main Services Component ---
export default function Services() {
    const wellnessRef = useRef<HTMLDivElement>(null);
    const [isWellnessVisible, setIsWellnessVisible] = useState(false); 

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsWellnessVisible(true); 
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (wellnessRef.current) observer.observe(wellnessRef.current);
        return () => observer.disconnect();
    }, []); 

    return (
        <div className="page-bg-container">
            <CustomAnimations />
            
            <div className="media-clipper">
                <video autoPlay loop muted playsInline src="meditation_video.mp4" className="w-full h-full object-cover">
                    Your browser does not support the video tag.
                </video>
            </div>

            <div className="page-content-wrapper max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
                
                <div className="text-center mb-16 pt-8 md:pt-16"> 
                    <p className="text-lg font-semibold uppercase tracking-wide mb-2 scroll-fade-in is-visible" 
                        style={{ animationDelay: '0ms', color: ACCENT_SECONDARY_YELLOW }}>
                        Our Focus Areas
                    </p>
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-4 scroll-fade-in is-visible" 
                        style={{ animationDelay: '100ms', color: TEXT_DARK }}>
                        What We Heal
                    </h2>
                    <p className="text-lg max-w-3xl mx-auto scroll-fade-in is-visible" 
                        style={{ animationDelay: '200ms', color: TEXT_MEDIUM_GREY }}>
                        Ian Cares Foundation addresses diverse needs across the healing journey, from core addiction and mental health support to community engagement and long-term wellness.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
                    {whatWeHealServices.map((service, index) => (
                        <AnimatedServiceCard key={index} service={service} index={index} />
                    ))}
                </div>

               <div
  ref={wellnessRef}
  className={`
    relative p-8 md:p-14 rounded-[2.5rem] 
    scroll-fade-in mx-auto max-w-4xl
    overflow-hidden
    ${isWellnessVisible ? 'is-visible' : ''}
  `}
  style={{ 
    animationDelay: isWellnessVisible ? "100ms" : "0s",
    backgroundColor: "#FFF7DB", // 🟡 Light Yellow background
    boxShadow: `0 10px 40px rgba(0, 0, 0, 0.05)`, 
    border: `1px solid ${BORDER_LIGHT_GREY}`
  }}
>
  <div className="relative z-10">
    <h3 className="text-3xl font-bold mb-8 text-center" style={{ color: TEXT_DARK }}>
      Wellness Services
    </h3>
    <div className="grid md:grid-cols-2 gap-6">
      {wellnessServices.map((service, index) => (
        <div
          key={index}
          className={`
            flex items-start gap-3 p-3 rounded-xl
            bg-white bg-opacity-90 hover:bg-gray-50 transition duration-300
            scroll-fade-in border border-${BORDER_LIGHT_GREY}
            ${isWellnessVisible ? 'is-visible' : ''}
          `}
          style={{
            animationDelay: isWellnessVisible ? `${150 + index * 100}ms` : '0s',
          }}
        >
          <span className="font-extrabold text-xl flex-shrink-0" style={{ color: ACCENT_SECONDARY_YELLOW }}>
            <svg className="w-5 h-5 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
            </svg>
          </span>
          <span className="text-lg" style={{ color: TEXT_MEDIUM_GREY }}>{service}</span>
        </div>
      ))}
    </div>
    <div className="text-center mt-12">
      <button className="btn-primary-custom flex items-center justify-center gap-2 mx-auto">
        EXPLORE SERVICES →
      </button>
    </div>
  </div>
</div>


            </div>
        </div>
    );
}
