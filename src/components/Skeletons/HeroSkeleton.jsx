"use client";

const SkeletonHero = () => {
    return (
        <section className="fixed inset-0 z-9999 bg-white flex flex-col">

            {/* HARD BLOCK LAYER (kills video bleed) */}
            <div className="absolute inset-0 bg-white" />

            {/* NAVBAR */}
            <div className="relative flex items-center justify-between px-6 md:px-16 py-6 border-b border-gray-200">
                <div className="h-8 w-32 bg-gray-300 rounded-lg animate-pulse" />
                <div className="hidden md:flex gap-8">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-3 w-16 bg-gray-300 rounded-full animate-pulse" />
                    ))}
                </div>
                <div className="h-8 w-24 bg-gray-300 rounded-xl animate-pulse" />
            </div>

            {/* HERO */}
            <div className="flex-1 flex items-center justify-center">
                <div className="text-center w-full max-w-3xl px-6">
                    <div className="h-6 w-40 bg-gray-300 rounded-full mx-auto mb-8 animate-pulse" />
                    <div className="space-y-4 mb-8">
                        <div className="h-16 bg-gray-300 rounded-2xl animate-pulse" />
                        <div className="h-16 w-4/5 mx-auto bg-gray-300 rounded-2xl animate-pulse" />
                    </div>
                    <div className="space-y-3 mb-10">
                        <div className="h-4 w-2/3 mx-auto bg-gray-300 rounded-full animate-pulse" />
                        <div className="h-4 w-1/2 mx-auto bg-gray-300 rounded-full animate-pulse" />
                    </div>
                    <div className="h-12 w-44 mx-auto bg-gray-300 rounded-xl animate-pulse" />
                </div>
            </div>

        </section>
    );
};

export default SkeletonHero;
