import React from "react";

const HeroSection = ({ hero }) => {
  return (
    <header className="max-w-7xl mx-auto px-6 md:px-14 pt-32 pb-16 grid md:grid-cols-2 gap-12 md:gap-20 items-end">

      {/* LEFT SIDE */}
      <div>
        <div className="inline-flex items-center gap-2.5 text-[10px] font-semibold tracking-[0.25em] uppercase text-gray-400 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-900 inline-block" />
          {hero?.eyebrow}
        </div>

        <h1
          className="font-serif font-bold text-gray-900 leading-[0.95] tracking-tight mb-7"
          style={{ fontSize: "clamp(52px, 6.5vw, 88px)" }}
        >
          {hero?.title?.line1}{" "}
          <em className="italic text-blue-900">
            {hero?.title?.highlight}
          </em>
          <br />
          {hero?.title?.line2}
          <br />
          {hero?.title?.line3}
        </h1>

        <p className="text-gray-500 text-[15px] font-light leading-relaxed max-w-sm">
          {hero?.description}
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-col gap-8">
        <blockquote className="font-serif text-xl italic font-semibold text-gray-900 leading-relaxed border-l-[3px] border-blue-900 pl-6">
          "{hero?.quote}"
        </blockquote>

        <div className="flex gap-10 pl-6">
          {hero?.stats?.map((stat) => (
            <div key={stat.label}>
              <div className="font-serif font-bold text-gray-900 text-5xl leading-none">
                {stat.value}
              </div>
              <div className="text-[11px] text-gray-400 mt-1 tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

    </header>
  );
};

export default HeroSection;
