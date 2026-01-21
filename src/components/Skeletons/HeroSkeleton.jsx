"use client";

const SkeletonHero = () => {
    return (
        <section className="fixed inset-0 bg-slate-950 z-9999 flex flex-col overflow-hidden">

            {/* Background Decorative Glows */}
            <div className="absolute top-0 right-0 md:w-125 md:h-125 bg-amber-500/5 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-0 left-0 w-125 h-125 bg-slate-800/20 blur-[120px] rounded-full animate-pulse" />

            {/* ================= NAVBAR SKELETON ================= */}
            <div className="relative z-10 flex items-center justify-between px-6 md:px-16 py-6 border-b border-white/5 bg-slate-950/50 backdrop-blur-md">
                {/* Logo */}
                <div className="h-8 w-18 md:w-36 bg-slate-800 rounded-lg animate-pulse" />

                {/* Menu */}
                <div className="hidden md:flex gap-8">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-3 w-16 bg-slate-800/60 rounded-full animate-pulse" />
                    ))}
                </div>

                {/* Button */}
                <div className="h-8 w-18 md:w-32 bg-amber-500/20 border border-amber-500/20 rounded-xl animate-pulse" />
            </div>

            {/* ================= HERO CENTER CONTENT ================= */}
            <div className="relative z-10 flex-1 flex items-center justify-center">
                <div className="w-full md:w-8/12 lg:w-7/12 text-center px-6">

                    {/* Badge */}
                    <div className="h-6 w-32 bg-slate-800 rounded-full mx-auto mb-8 animate-pulse" />

                    {/* Main Heading (Thick & Bold) */}
                    <div className="space-y-4 mb-8">
                        <div className="h-14 md:h-20 bg-slate-800 rounded-2xl w-full animate-pulse" />
                        <div className="h-14 md:h-20 bg-slate-800 rounded-2xl w-4/5 mx-auto animate-pulse" />
                    </div>

                    {/* Description Paragraph */}
                    <div className="space-y-3 mb-10">
                        <div className="h-4 bg-slate-800/50 rounded-full w-2/3 mx-auto animate-pulse" />
                        <div className="h-4 bg-slate-800/50 rounded-full w-1/2 mx-auto animate-pulse" />
                    </div>

                    {/* CTA Button */}
                    <div className="h-14 w-48 bg-slate-800 border border-white/5 rounded-2xl mx-auto animate-pulse shadow-xl" />
                </div>
            </div>

            {/* ================= COUNTERS (Bento Style) ================= */}
            <div className="mt-6 lg:mt-0 hidden md:block relative z-10 px-4 pb-6">
                {/* Changed grid-cols to 5 and reduced max-width */}
                <div className="grid grid-cols-5 gap-3 max-w-4xl mx-auto">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div
                            key={i}
                            className="bg-white/5 border border-white/10 rounded-xl p-4 text-center space-y-3 backdrop-blur-sm"
                        >
                            {/* Smaller Big Number Skeleton */}
                            <div className="h-7 w-14 bg-amber-500/20 rounded-md mx-auto animate-pulse" />

                            {/* Smaller Label Skeleton */}
                            <div className="h-2 w-16 bg-slate-800 rounded-full mx-auto animate-pulse" />
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
};

export default SkeletonHero;