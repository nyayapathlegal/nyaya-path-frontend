"use client";

const HeaderPagesSkeleton = () => {
    return (
        <div className="w-full min-h-screen bg-slate-950">
            {/* ================= HERO SKELETON ================= */}
            <section className="relative h-screen flex items-center overflow-hidden">
                
                {/* Subtle Gradient Background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-slate-800/40 via-slate-950 to-slate-950" />

                {/* Main Content Container */}
                <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    
                    {/* Left Content: Text Stack */}
                    <div className="space-y-8">
                        {/* Top Badge Skeleton */}
                        {/* <div className="h-6 w-32 bg-slate-800 rounded-full animate-pulse" /> */}

                        <div className="space-y-4">
                            {/* Heading Lines */}
                            <div className="h-16 w-full bg-slate-800/80 rounded-2xl animate-pulse" />
                            <div className="h-16 w-4/5 bg-slate-800/80 rounded-2xl animate-pulse" />
                        </div>

                        {/* Subheading */}
                        <div className="h-8 w-2/3 bg-amber-500/10 rounded-lg animate-pulse" />

                        {/* Description Paragraph */}
                        <div className="space-y-3">
                            <div className="h-4 w-full bg-slate-800/50 rounded-full animate-pulse" />
                            <div className="h-4 w-full bg-slate-800/50 rounded-full animate-pulse" />
                            <div className="h-4 w-3/4 bg-slate-800/50 rounded-full animate-pulse" />
                        </div>

                        {/* CTA Button */}
                        <div className="h-14 w-52 bg-slate-800 rounded-xl animate-pulse border border-white/5" />
                    </div>

                    {/* Right Content: Visual Placeholder */}
                    {/* <div className="hidden md:block relative">
                        <div className="absolute -inset-4 bg-amber-500/5 blur-3xl rounded-full" />
                        <div className="relative h-[450px] w-full bg-slate-900/50 border border-white/5 rounded-3xl animate-pulse overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-linear-to-r from-transparent via-white/5 to-transparent" />
                        </div>
                    </div> */}
                </div>
            </section>

            {/* ================= CONTENT SECTION SKELETON ================= */}
            <section className="bg-white py-24">
                <div className="max-w-4xl mx-auto px-6 flex flex-col items-center">
                    {/* Section Title */}
                    <div className="h-10 w-64 bg-slate-200 rounded-lg mb-8 animate-pulse" />
                    
                    {/* Body Text lines centered */}
                    <div className="w-full space-y-4">
                        <div className="h-4 w-full bg-slate-100 rounded-full animate-pulse" />
                        <div className="h-4 w-11/12 bg-slate-100 rounded-full animate-pulse mx-auto" />
                        <div className="h-4 w-10/12 bg-slate-100 rounded-full animate-pulse mx-auto" />
                    </div>
                </div>
            </section>

            {/* Add this custom animation to your global CSS or Tailwind config if not using standard pulse */}
            <style jsx>{`
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </div>
    );
};

export default HeaderPagesSkeleton;
