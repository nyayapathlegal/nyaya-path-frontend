"use client";

const HeaderPagesSkeleton = () => {
    return (
        <div className="bg-white min-h-screen">

            {/* ================= HERO IMAGE SKELETON ================= */}
            {/* ================= HERO IMAGE SKELETON ================= */}
            <section className="w-full py-28">

                <div className="max-w-7xl mx-auto px-6">
                    <div className="max-w-3xl space-y-6 animate-pulse">

                        {/* Title */}
                        <div className="space-y-3">
                            <div className="h-12 w-3/4 bg-gray-300 rounded-xl" />
                            <div className="h-12 w-2/3 bg-gray-300 rounded-xl" />
                        </div>

                        {/* Highlight line */}
                        <div className="h-5 w-1/2 bg-gray-200 rounded-lg" />

                        {/* Description */}
                        <div className="space-y-3">
                            <div className="h-4 w-full bg-gray-200 rounded-full" />
                            <div className="h-4 w-11/12 bg-gray-200 rounded-full" />
                            <div className="h-4 w-10/12 bg-gray-200 rounded-full" />
                        </div>

                    </div>
                </div>
            </section>




            <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-14 animate-pulse">

                {/* ================= LEFT CONTENT ================= */}
                <div className="lg:col-span-2 space-y-20">

                    {/* ---------- HERO TEXT ---------- */}
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <div className="h-12 w-3/4 bg-gray-200 rounded-xl" />
                            <div className="h-12 w-2/3 bg-gray-200 rounded-xl" />
                        </div>

                        <div className="h-6 w-1/2 bg-amber-100 rounded-lg" />

                        <div className="space-y-3">
                            <div className="h-4 w-full bg-gray-200 rounded-full" />
                            <div className="h-4 w-full bg-gray-200 rounded-full" />
                            <div className="h-4 w-5/6 bg-gray-200 rounded-full" />
                            <div className="h-4 w-4/6 bg-gray-200 rounded-full" />
                        </div>
                    </div>

                    {/* ---------- OVERVIEW SECTION ---------- */}
                    <div className="space-y-6">
                        <div className="h-10 w-64 bg-gray-300 rounded-xl" />

                        <div className="space-y-3">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="h-4 w-full bg-gray-200 rounded-full" />
                            ))}
                        </div>
                    </div>

                    {/* ---------- KEY BENEFITS ---------- */}
                    <div className="space-y-8">
                        <div className="h-10 w-56 bg-gray-300 rounded-xl" />

                        <div className="grid md:grid-cols-2 gap-6">
                            {[1, 2, 3, 4].map(i => (
                                <div
                                    key={i}
                                    className="border border-gray-200 rounded-2xl p-6 space-y-4 bg-white"
                                >
                                    <div className="h-10 w-10 bg-amber-100 rounded-lg" />
                                    <div className="h-4 w-3/4 bg-gray-200 rounded-full" />
                                    <div className="h-4 w-full bg-gray-200 rounded-full" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ---------- PROCESS STEPS ---------- */}
                    <div className="space-y-8">
                        <div className="h-10 w-48 bg-gray-300 rounded-xl" />

                        <div className="space-y-6">
                            {[1, 2, 3].map(i => (
                                <div
                                    key={i}
                                    className="flex gap-4 items-start"
                                >
                                    <div className="h-10 w-10 bg-amber-100 rounded-full" />
                                    <div className="space-y-2 flex-1">
                                        <div className="h-4 w-1/3 bg-gray-200 rounded-full" />
                                        <div className="h-4 w-full bg-gray-200 rounded-full" />
                                        <div className="h-4 w-5/6 bg-gray-200 rounded-full" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ---------- DOCUMENTS REQUIRED ---------- */}
                    <div className="space-y-8">
                        <div className="h-10 w-64 bg-gray-300 rounded-xl" />

                        <div className="grid md:grid-cols-2 gap-4">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div
                                    key={i}
                                    className="h-12 bg-gray-100 border border-gray-200 rounded-lg"
                                />
                            ))}
                        </div>
                    </div>

                    {/* ---------- FAQ PREVIEW ---------- */}
                    <div className="space-y-8">
                        <div className="h-10 w-40 bg-gray-300 rounded-xl" />

                        <div className="space-y-4">
                            {[1, 2, 3, 4].map(i => (
                                <div
                                    key={i}
                                    className="h-14 bg-gray-100 border border-gray-200 rounded-xl"
                                />
                            ))}
                        </div>
                    </div>

                </div>

                {/* ================= RIGHT STICKY FORM ================= */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-5 shadow-sm h-fit sticky top-28">
                    <div className="h-6 w-40 bg-gray-300 rounded-full" />
                    <div className="h-4 w-3/4 bg-gray-200 rounded-full" />

                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-12 bg-gray-100 rounded-lg border border-gray-200" />
                    ))}

                    <div className="h-12 bg-amber-500 rounded-xl" />
                </div>

            </section>
        </div>
    );
};

export default HeaderPagesSkeleton;