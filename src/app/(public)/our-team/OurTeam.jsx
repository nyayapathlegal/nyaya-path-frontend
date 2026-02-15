"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import MemberCard from "./MemberCard";
import CtaSection from "./CtaSection";
import HeroSection from "./HeroSection";
import Link from "next/link";
import { getOurTeam } from "@/api/home/home.api";

// ─── Department accent themes (keyed by department id) ───────────────────────
const DEPT_THEMES = [
    {
        accentText: "text-blue-900",
        accentBg: "bg-blue-900",
        accentBorder: "border-blue-900",
        accentLight: "bg-blue-50",
        badgeBg: "bg-blue-900",
        barColor: "bg-blue-900",
        dotActive: "bg-blue-900",
        bottomLine: "bg-blue-900",
        pillHover: "hover:bg-blue-50 hover:border-blue-900 hover:text-blue-900",
    },
    {
        accentText: "text-emerald-900",
        accentBg: "bg-emerald-900",
        accentBorder: "border-emerald-900",
        accentLight: "bg-emerald-50",
        badgeBg: "bg-emerald-900",
        barColor: "bg-emerald-900",
        dotActive: "bg-emerald-900",
        bottomLine: "bg-emerald-900",
        pillHover: "hover:bg-emerald-50 hover:border-emerald-900 hover:text-emerald-900",
    },
    {
        accentText: "text-rose-900",
        accentBg: "bg-rose-900",
        accentBorder: "border-rose-900",
        accentLight: "bg-rose-50",
        badgeBg: "bg-rose-900",
        barColor: "bg-rose-900",
        dotActive: "bg-rose-900",
        bottomLine: "bg-rose-900",
        pillHover: "hover:bg-rose-50 hover:border-rose-900 hover:text-rose-900",
    },
    {
        accentText: "text-violet-900",
        accentBg: "bg-violet-900",
        accentBorder: "border-violet-900",
        accentLight: "bg-violet-50",
        badgeBg: "bg-violet-900",
        barColor: "bg-violet-900",
        dotActive: "bg-violet-900",
        bottomLine: "bg-violet-900",
        pillHover: "hover:bg-violet-50 hover:border-violet-900 hover:text-violet-900",
    }
];


function getThemeByIndex(index) {
    return DEPT_THEMES[index % DEPT_THEMES.length];
}


// ─── Team Carousel ────────────────────────────────────────────────────────────
function TeamCarousel({ dept, index }) {
    
    const theme = getThemeByIndex(index);
    const members = dept.members ?? [];
    const total = members.length;

    const [active, setActive] = useState(0);
    const [progressKey, setProgressKey] = useState(0);
    const timerRef = useRef(null);
    const sectionRef = useRef(null);
    const dragStartX = useRef(null);

    const CARD_W = 300;
    const maxIndex = Math.max(0, total - 1);

    const goTo = useCallback((idx) => {
        const clamped = Math.max(0, Math.min(idx, maxIndex));
        setActive(clamped);
        setProgressKey((k) => k + 1);
    }, [maxIndex]);

    const next = useCallback(() => goTo(active >= maxIndex ? 0 : active + 1), [active, maxIndex, goTo]);
    const prev = useCallback(() => goTo(active <= 0 ? maxIndex : active - 1), [active, maxIndex, goTo]);

    useEffect(() => {
        if (total <= 1) return;
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(next, 4500);
        return () => clearTimeout(timerRef.current);
    }, [active, next, total]);

    // Scroll reveal
    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) el.classList.add("opacity-100", "translate-y-0"); },
            { threshold: 0.07 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    const onMouseDown = (e) => { dragStartX.current = e.clientX; };
    const onMouseUp = (e) => {
        if (dragStartX.current == null) return;
        const dx = e.clientX - dragStartX.current;
        if (dx < -50) next(); else if (dx > 50) prev();
        dragStartX.current = null;
    };
    const onTouchStart = (e) => { dragStartX.current = e.touches[0].clientX; };
    const onTouchEnd = (e) => {
        if (dragStartX.current == null) return;
        const dx = e.changedTouches[0].clientX - dragStartX.current;
        if (dx < -50) next(); else if (dx > 50) prev();
        dragStartX.current = null;
    };

    return (
        <section
            ref={sectionRef}
            id={dept.id}
            className="mb-24 opacity-0 translate-y-10 transition-all duration-700 ease-out"
        >
            {/* Header */}
            <div className="flex items-end justify-between mb-10 pb-6 border-b border-gray-200 flex-wrap gap-4">
                <div className="flex items-start gap-4">
                    <div className={`w-[3px] h-14 rounded-full ${theme.accentBg} flex-shrink-0 mt-1`} />
                    <div>
                        <p className={`text-[10px] font-semibold tracking-[0.22em] uppercase ${theme.accentText} mb-1 opacity-80`}>
                            {dept.tagline}
                        </p>
                        <h2 className="font-serif font-bold text-gray-900 text-4xl md:text-5xl tracking-tight leading-none">
                            {dept.label}
                        </h2>
                    </div>
                </div>

                {total > 1 && (
                    <div className="flex items-center gap-3">
                        <span className="text-[11px] text-gray-400 tabular-nums tracking-wide">
                            {String(active + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(total).padStart(2, "0")}
                        </span>
                        <button onClick={prev} aria-label="Previous"
                            className={`w-10 h-10 rounded-full border ${theme.accentBorder} ${theme.accentText}
                          flex items-center justify-center text-base
                          transition-all duration-200 hover:opacity-70`}>
                            ←
                        </button>
                        <button onClick={next} aria-label="Next"
                            className={`w-10 h-10 rounded-full ${theme.accentBg} text-white
                          flex items-center justify-center text-base
                          transition-opacity duration-200 hover:opacity-80`}>
                            →
                        </button>
                    </div>
                )}
            </div>

            {/* Carousel track */}
            <div
                className="overflow-hidden cursor-grab active:cursor-grabbing"
                onMouseDown={onMouseDown} onMouseUp={onMouseUp}
                onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}
            >
                <div
                    className="flex gap-5 transition-transform duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)]"
                    style={{ transform: `translateX(-${active * CARD_W}px)` }}
                >
                    {
                        members.map((member, idx) => (
                            <MemberCard key={`${dept.id}-${member.id}-${idx}`} member={member} theme={theme} />
                        ))
                    }
                </div>
            </div>

            {/* Progress bar */}
            {total > 1 && (
                <div className="mt-6 h-[1.5px] bg-gray-200 rounded-full overflow-hidden relative">
                    <div
                        key={progressKey}
                        className={`absolute inset-0 ${theme.barColor} rounded-full origin-left`}
                        style={{ animation: "progressBar 4.5s linear forwards" }}
                    />
                </div>
            )}

            {/* Dot indicators */}
            {total > 1 && (
                <div className="flex items-center justify-center gap-2 mt-4">
                    {members.map((_, i) => (
                        <button key={i} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`}
                            className={`h-2 rounded-full border-0 transition-all duration-300 cursor-pointer p-0
                ${active === i ? `w-5 ${theme.dotActive}` : "w-2 bg-gray-300"}`}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

// ─── Loading Skeleton ─────────────────────────────────────────────────────────
function Skeleton() {
    return (
        <div className="mb-24 animate-pulse">
            <div className="h-12 w-72 bg-gray-200 rounded-lg mb-10" />
            <div className="flex gap-5">
                {
                    [1, 2, 3].map((i) => (
                        <div key={i} className="shrink-0 w-72 h-80 bg-gray-200 rounded-2xl" />
                    ))
                }
            </div>
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function OurTeamPage() {

    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTeams() {
            try {            
                const data = await getOurTeam();
                setDepartments(data.departments);
            } 
            catch (err) {
                setDepartments([]);
            } finally {
                setLoading(false);
            }
        }
        fetchTeams();
    }, []);

   


    return (
        <>
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
                    body { font-family: 'DM Sans', sans-serif; }
                    .font-serif { font-family: 'Cormorant Garamond', serif; }

                    @keyframes ticker {
                        from { 
                            transform: translateX(0); 
                        }
                        to { 
                            transform: translateX(-50%); 
                        }
                    }
                    .animate-ticker { 
                        animation: ticker 36s linear infinite; 
                    }
                    .animate-ticker:hover { 
                        animation-play-state: paused; 
                    }

                    @keyframes progressBar {
                        from { 
                            transform: scaleX(0); 
                        }
                        to { 
                            transform: scaleX(1); 
                        }
                    }
                `}
            </style>

            <div className="bg-stone-50 min-h-screen antialiased">

                {/* HERO */}
                <HeroSection departments={departments} />

                {/* DEPT PILLS */}
                <nav className="max-w-7xl mx-auto px-6 md:px-14 pb-12 flex flex-wrap gap-2">
                    {
                        departments.map((dept, i) => {
                        const theme = getThemeByIndex(i);
                        return (
                            <Link key={dept.id} href={`#${dept.id}`}
                                className={`text-[11px] font-medium tracking-wide text-gray-500
                            border border-gray-200 bg-white rounded-full px-5 py-2
                            transition-all duration-200 no-underline ${theme.pillHover}`}>
                                {String(i + 1).padStart(2, "0")} — {dept.label}
                            </Link>
                        );
                    })}
                </nav>
                


                {/* CAROUSELS */}
                <main className="max-w-7xl mx-auto px-6 md:px-14 pb-10">
                    {
                        departments.map( (dept, index) => (
                            <TeamCarousel key={dept.id} dept={dept} index={index} />
                        ))
                    }
                </main>

                <CtaSection/>

            </div>
        </>
    );
}