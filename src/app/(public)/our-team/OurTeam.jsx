"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────
const STATS = [
  { v: "200+", l: "Clients Served" },
  { v: "15+",  l: "Years Active" },
  { v: "98%",  l: "Retention Rate" },
  { v: "50+",  l: "Compliance Cases" },
  { v: "₹500Cr+", l: "Assets Managed" },
  { v: "3",    l: "Departments" },
  { v: "13",   l: "Professionals" },
];

const TEAMS = [
  {
    id: "cs",
    label: "Company Secretariat",
    tagline: "Governance & Compliance",
    numLabel: "01",
    accentText:    "text-blue-900",
    accentBg:      "bg-blue-900",
    accentBorder:  "border-blue-900",
    accentLight:   "bg-blue-50",
    badgeBg:       "bg-blue-900",
    barColor:      "bg-blue-900",
    dotActive:     "bg-blue-900",
    bottomLine:    "bg-blue-900",
    pillHover:     "hover:bg-blue-50 hover:border-blue-900 hover:text-blue-900",
    members: [
      { name: "Amit Sharma",  role: "Company Secretary",  badge: "FCS", exp: "12 yrs", spec: "Corporate Governance, SEBI Compliance",   photo: "/team/cs1.jpg" },
      { name: "Neha Verma",   role: "CS Associate",        badge: "ACS", exp: "5 yrs",  spec: "ROC Filings, Annual Compliance",          photo: "/team/cs2.jpg" },
      { name: "Ravi Pillai",  role: "Compliance Head",     badge: "FCS", exp: "9 yrs",  spec: "Listed Entity Compliance, Due Diligence", photo: "/team/cs3.jpg" },
      { name: "Priya Nair",   role: "CS Executive",        badge: "ACS", exp: "3 yrs",  spec: "Secretarial Audit, Board Minutes",        photo: "/team/cs4.jpg" },
    ],
  },
  {
    id: "ca",
    label: "Chartered Accountants",
    tagline: "Finance & Taxation",
    numLabel: "02",
    accentText:    "text-emerald-900",
    accentBg:      "bg-emerald-900",
    accentBorder:  "border-emerald-900",
    accentLight:   "bg-emerald-50",
    badgeBg:       "bg-emerald-900",
    barColor:      "bg-emerald-900",
    dotActive:     "bg-emerald-900",
    bottomLine:    "bg-emerald-900",
    pillHover:     "hover:bg-emerald-50 hover:border-emerald-900 hover:text-emerald-900",
    members: [
      { name: "Rahul Mehta",    role: "Senior CA & Partner", badge: "FCA", exp: "18 yrs", spec: "M&A Advisory, Restructuring",        photo: "/team/ca1.jpg" },
      { name: "Pooja Jain",     role: "Tax Consultant",      badge: "ACA", exp: "8 yrs",  spec: "Direct & Indirect Taxation, GST",    photo: "/team/ca2.jpg" },
      { name: "Vikas Gupta",    role: "Audit Head",          badge: "FCA", exp: "11 yrs", spec: "Statutory Audit, Internal Controls", photo: "/team/ca3.jpg" },
      { name: "Sunita Rao",     role: "Financial Analyst",   badge: "ACA", exp: "6 yrs",  spec: "FEMA, Transfer Pricing, IND-AS",     photo: "/team/ca4.jpg" },
      { name: "Karan Malhotra", role: "Tax Associate",       badge: "ACA", exp: "4 yrs",  spec: "Income Tax, Tax Planning",           photo: "/team/ca5.jpg" },
    ],
  },
  {
    id: "legal",
    label: "Legal Department",
    tagline: "Advisory & Litigation",
    numLabel: "03",
    accentText:    "text-rose-900",
    accentBg:      "bg-rose-900",
    accentBorder:  "border-rose-900",
    accentLight:   "bg-rose-50",
    badgeBg:       "bg-rose-900",
    barColor:      "bg-rose-900",
    dotActive:     "bg-rose-900",
    bottomLine:    "bg-rose-900",
    pillHover:     "hover:bg-rose-50 hover:border-rose-900 hover:text-rose-900",
    members: [
      { name: "Ankit Singh",   role: "Corporate Lawyer", badge: "LLM", exp: "14 yrs", spec: "M&A, Joint Ventures, Contracts",     photo: "/team/legal1.jpg" },
      { name: "Sneha Kapoor",  role: "Legal Advisor",    badge: "LLB", exp: "7 yrs",  spec: "Employment Law, Dispute Resolution", photo: "/team/legal2.jpg" },
      { name: "Deepak Tiwari", role: "Senior Counsel",   badge: "LLM", exp: "16 yrs", spec: "NCLT, Insolvency, IBC Proceedings",  photo: "/team/legal3.jpg" },
      { name: "Aisha Khan",    role: "IP Attorney",      badge: "LLB", exp: "5 yrs",  spec: "IP Rights, Trademarks, Licensing",   photo: "/team/legal4.jpg" },
    ],
  },
];

// ─── Avatar (initials fallback) ──────────────────────────────────────────────
function Avatar({ name, accentLight, accentText }) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2);
  return (
    <div className={`w-full h-full rounded-full flex items-center justify-center ${accentLight}`}>
      <span className={`font-serif font-black text-3xl ${accentText}`}>{initials}</span>
    </div>
  );
}

// ─── Single Member Card ───────────────────────────────────────────────────────
function MemberCard({ member, team }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`
        group relative flex-shrink-0 w-64 sm:w-72
        bg-white rounded-2xl border border-gray-100
        overflow-hidden shadow-sm
        hover:shadow-2xl hover:-translate-y-2 hover:border-opacity-100
        transition-all duration-300 ease-out
        select-none cursor-pointer
      `}
    >
      {/* ── Photo / Avatar zone ── */}
      <div className={`relative w-full h-52 flex items-center justify-center ${team.accentLight} overflow-hidden`}>
        {/* Decorative soft circle */}
        <div
          className={`absolute w-36 h-36 rounded-full ${team.accentBg} opacity-10
                      group-hover:scale-125 transition-transform duration-500`}
        />

        {/* Image or avatar */}
        <div className="relative w-28 h-28 rounded-full overflow-hidden z-10 ring-2 ring-white ring-offset-2">
          {!imgError ? (
            <Image
              src={member.photo}
              alt={member.name}
              fill
              className="object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <Avatar name={member.name} accentLight={team.accentLight} accentText={team.accentText} />
          )}
        </div>

        {/* Badge — top right */}
        <span
          className={`absolute top-3 right-3 ${team.badgeBg} text-white
                      text-[10px] font-semibold tracking-widest uppercase
                      px-2.5 py-1 rounded-full`}
        >
          {member.badge}
        </span>

        {/* Experience — bottom left */}
        <span
          className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm
                     text-gray-600 text-[10px] font-semibold tracking-wide
                     px-2.5 py-1 rounded-full"
        >
          {member.exp}
        </span>
      </div>

      {/* ── Text info ── */}
      <div className="px-5 pt-4 pb-6">
        <h3 className="font-serif font-bold text-gray-900 text-[19px] leading-tight tracking-tight mb-1">
          {member.name}
        </h3>
        <p className={`text-[10px] font-semibold uppercase tracking-widest ${team.accentText} mb-3`}>
          {member.role}
        </p>
        <div className="h-px bg-gray-100 mb-3" />
        <p className="text-[11.5px] text-gray-400 leading-relaxed font-light">
          {member.spec}
        </p>
      </div>

      {/* ── Bottom accent line: slides in on hover ── */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-[3px] ${team.bottomLine}
                    scale-x-0 group-hover:scale-x-100
                    transition-transform duration-300 origin-left rounded-b-2xl`}
      />
    </div>
  );
}

// ─── Team Section with Carousel ──────────────────────────────────────────────
function TeamCarousel({ team }) {
  const { members } = team;
  const total = members.length;

  const [active, setActive]       = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const timerRef   = useRef(null);
  const sectionRef = useRef(null);
  const dragStartX = useRef(null);

  const CARD_W = 300; // approximate card width + gap combined
  const maxIndex = total - 1;

  const goTo = useCallback((idx) => {
    const clamped = Math.max(0, Math.min(idx, maxIndex));
    setActive(clamped);
    setProgressKey((k) => k + 1);
  }, [maxIndex]);

  const next = useCallback(() => goTo(active >= maxIndex ? 0 : active + 1), [active, maxIndex, goTo]);
  const prev = useCallback(() => goTo(active <= 0 ? maxIndex : active - 1), [active, maxIndex, goTo]);

  // Auto-advance
  useEffect(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(next, 4500);
    return () => clearTimeout(timerRef.current);
  }, [active, next]);

  // Scroll-reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add("opacity-100", "translate-y-0"); },
      { threshold: 0.07 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Mouse drag
  const onMouseDown = (e) => { dragStartX.current = e.clientX; };
  const onMouseUp   = (e) => {
    if (dragStartX.current == null) return;
    const dx = e.clientX - dragStartX.current;
    if (dx < -50) next();
    else if (dx > 50) prev();
    dragStartX.current = null;
  };

  // Touch swipe
  const onTouchStart = (e) => { dragStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e) => {
    if (dragStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - dragStartX.current;
    if (dx < -50) next();
    else if (dx > 50) prev();
    dragStartX.current = null;
  };

  return (
    <section
      ref={sectionRef}
      id={team.id}
      className="mb-24 opacity-0 translate-y-10 transition-all duration-700 ease-out"
    >
      {/* ── Section Header ── */}
      <div className="flex items-end justify-between mb-10 pb-6 border-b border-gray-200 flex-wrap gap-4">
        {/* Left: accent bar + title */}
        <div className="flex items-start gap-4">
          <div className={`w-[3px] h-14 rounded-full ${team.accentBg} flex-shrink-0 mt-1`} />
          <div>
            <p className={`text-[10px] font-semibold tracking-[0.22em] uppercase ${team.accentText} mb-1 opacity-80`}>
              {team.tagline}
            </p>
            <h2 className="font-serif font-bold text-gray-900 text-4xl md:text-5xl tracking-tight leading-none">
              {team.label}
            </h2>
          </div>
        </div>

        {/* Right: counter + arrows */}
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-gray-400 tabular-nums tracking-wide">
            {String(active + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(total).padStart(2, "0")}
          </span>

          {/* Prev */}
          <button
            onClick={prev}
            aria-label="Previous"
            className={`w-10 h-10 rounded-full border ${team.accentBorder} ${team.accentText}
                        flex items-center justify-center text-base
                        transition-all duration-200
                        hover:${team.accentBg} hover:text-white`}
          >
            ←
          </button>

          {/* Next */}
          <button
            onClick={next}
            aria-label="Next"
            className={`w-10 h-10 rounded-full ${team.accentBg} text-white
                        flex items-center justify-center text-base
                        transition-opacity duration-200 hover:opacity-80`}
          >
            →
          </button>
        </div>
      </div>

      {/* ── Carousel Viewport ── */}
      <div
        className="overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex gap-5 transition-transform duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)]"
          style={{ transform: `translateX(-${active * CARD_W}px)` }}
        >
          {members.map((m, i) => (
            <MemberCard key={i} member={m} team={team} />
          ))}
        </div>
      </div>

      {/* ── Auto-play progress bar ── */}
      <div className="mt-6 h-[1.5px] bg-gray-200 rounded-full overflow-hidden relative">
        <div
          key={progressKey}
          className={`absolute inset-0 ${team.barColor} rounded-full origin-left`}
          style={{ animation: "progressBar 4.5s linear forwards" }}
        />
      </div>

      {/* ── Dot indicators ── */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {members.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            className={`
              h-2 rounded-full border-0 transition-all duration-300 cursor-pointer p-0
              ${active === i ? `w-5 ${team.dotActive}` : "w-2 bg-gray-300"}
            `}
          />
        ))}
      </div>
    </section>
  );
}

// ─── Page Component ───────────────────────────────────────────────────────────
export default function OurTeamPage() {
  return (
    <>
      {/* Global: fonts + progress-bar keyframe (not expressible in Tailwind alone) */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
        body { font-family: 'DM Sans', sans-serif; }
        .font-serif { font-family: 'Cormorant Garamond', serif !important; }

        /* Ticker scroll */
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .animate-ticker { animation: ticker 36s linear infinite; }
        .animate-ticker:hover { animation-play-state: paused; }

        /* Progress bar for carousel */
        @keyframes progressBar {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>

      <div className="bg-stone-50 min-h-screen antialiased">

        {/* ═══════════════════════════════════ HERO ══ */}
        <header className="max-w-7xl mx-auto px-6 md:px-14 pt-32 pb-16 grid md:grid-cols-2 gap-12 md:gap-20 items-end">
          {/* Left copy */}
          <div>
            <div className="inline-flex items-center gap-2.5 text-[10px] font-semibold tracking-[0.25em] uppercase text-gray-400 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-900 inline-block" />
              CS · CA · Legal Experts
            </div>

            <h1
              className="font-serif font-bold text-gray-900 leading-[0.95] tracking-tight mb-7"
              style={{ fontSize: "clamp(52px, 6.5vw, 88px)" }}
            >
              The <em className="italic text-blue-900">People</em>
              <br />Behind Your
              <br />Success
            </h1>

            <p className="text-gray-500 text-[15px] font-light leading-relaxed max-w-sm">
              A multidisciplinary team of India&apos;s finest compliance and finance professionals — working as one to safeguard your business.
            </p>
          </div>

          {/* Right: quote + stats */}
          <div className="flex flex-col gap-8">
            <blockquote className="font-serif text-xl italic font-semibold text-gray-900 leading-relaxed border-l-[3px] border-blue-900 pl-6">
              &quot;Trust is built one filing, one contract, one audit at a time.&quot;
            </blockquote>

            <div className="flex gap-10 pl-6">
              {[["13", "Professionals"], ["3", "Departments"], ["15+", "Years Active"]].map(([n, l]) => (
                <div key={l}>
                  <div className="font-serif font-bold text-gray-900 text-5xl leading-none">{n}</div>
                  <div className="text-[11px] text-gray-400 mt-1 tracking-wide">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* ═══════════════════════════════ DEPT PILLS ══ */}
        <nav className="max-w-7xl mx-auto px-6 md:px-14 pb-12 flex flex-wrap gap-2">
          {TEAMS.map((t) => (
            <a
              key={t.id}
              href={`#${t.id}`}
              className={`
                text-[11px] font-medium tracking-wide text-gray-500
                border border-gray-200 bg-white rounded-full px-5 py-2
                transition-all duration-200 no-underline
                ${t.pillHover}
              `}
            >
              {t.numLabel} — {t.label}
            </a>
          ))}
        </nav>

        {/* ═══════════════════════════════════ TICKER ══ */}
        <div className="bg-gray-900 border-t border-b border-gray-800 overflow-hidden mb-20">
          <div className="animate-ticker flex w-max">
            {[...STATS, ...STATS].map((s, i) => (
              <div
                key={i}
                className="inline-flex items-center gap-3 px-10 py-5 border-r border-gray-800 whitespace-nowrap"
              >
                <span className="font-serif font-bold text-white text-xl">{s.v}</span>
                <span className="text-[10px] text-gray-500 tracking-[0.2em] uppercase">{s.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════ TEAM CAROUSELS ══ */}
        <main className="max-w-7xl mx-auto px-6 md:px-14 pb-10">
          {TEAMS.map((team) => (
            <TeamCarousel key={team.id} team={team} />
          ))}
        </main>

        {/* ════════════════════════════════════ CTA ══ */}
        <section className="bg-gray-900 px-8 md:px-20 py-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-gray-500 mb-3">
              Work With Us
            </p>
            <h2
              className="font-serif font-bold text-white leading-none tracking-tight"
              style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
            >
              Ready to Speak With
              <br />
              an <em className="italic text-blue-400">Expert?</em>
            </h2>
          </div>

          <Link
            href="#"
            className="bg-white text-gray-900 font-semibold text-sm px-10 py-4 rounded-full hover:-translate-y-1 hover:shadow-2xl transition-all duration-200 whitespace-nowrap no-underline inline-block"
          >
            Book a Free Consultation →
          </Link>
        </section>

      </div>
    </>
  );
}