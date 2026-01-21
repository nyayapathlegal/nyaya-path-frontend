"use client";

const SubServicePageSkeleton = () => {
    return (
        <section className="relative w-full min-h-screen bg-slate-50">
            {/* HERO SKELETON */}
            <div className="relative h-[45vh] flex items-center justify-center bg-slate-900 overflow-hidden">
                {/* Simulated Background Shimmer */}
                <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 animate-[shimmer_2s_infinite]" />
                
                <div className="relative z-10 max-w-4xl px-4 w-full flex flex-col items-center space-y-4">
                    {/* service.title placeholder (Small Top Badge) */}
                    <div className="h-4 w-32 bg-slate-700 rounded-full animate-pulse" />
                    
                    {/* sub.title placeholder (Main Heading) */}
                    <div className="h-10 sm:h-12 w-3/4 sm:w-1/2 bg-slate-700 rounded-xl animate-pulse" />
                </div>
            </div>

            {/* CONTENT CARD SKELETON */}
            <div className="relative z-20 -mt-20">
                <div className="max-w-4xl mx-auto px-6 py-10 bg-white rounded-2xl shadow-xl border border-slate-100">
                    
                    {/* Section Title "What this service includes" */}
                    <div className="h-7 w-56 bg-slate-200 rounded-lg mb-8 animate-pulse" />

                    {/* Service Points List */}
                    <div className="space-y-6">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-start gap-3">
                                {/* Bullet Dot */}
                                <div className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-slate-200 animate-pulse" />
                                
                                {/* Text Lines */}
                                <div className="space-y-2 w-full">
                                    <div className="h-4 w-full bg-slate-100 rounded-full animate-pulse" />
                                    {i % 2 === 0 && (
                                        <div className="h-4 w-2/3 bg-slate-100 rounded-full animate-pulse" />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </section>
    );
};

export default SubServicePageSkeleton;
