import React, { useEffect, useMemo, useState } from "react";

const LegalExpertiseCard = ({ card }) => {
    const metrics = useMemo(
        () => (Array.isArray(card?.metrics) ? card.metrics : []),
        [card]
    );

    const [loaded, setLoaded] = useState(false);
    const [counts, setCounts] = useState([]);

    useEffect(() => {
        if (!metrics.length) return;

        setLoaded(true);
        setCounts(new Array(metrics.length).fill(0));

        const intervals = metrics.map((item, i) => {
            const value = Number(item?.value) || 0;
            if (value <= 0) return null;

            const step = Math.max(1, Math.ceil(value / 100));

            return setInterval(() => {
                setCounts(prev => {
                    const next = [...prev];
                    if (next[i] >= value) return prev;
                    next[i] = Math.min(next[i] + step, value);
                    return next;
                });
            }, 30);
        });

        return () => intervals.forEach(id => id && clearInterval(id));
    }, [metrics]);



    return (
        <div className="flex items-center justify-center p-1 sm:p-8">
            <div className="w-full max-w-xl relative">
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">

                    {/* Blobs */}
                    <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl" />
                    <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-yellow-500/20 rounded-full blur-3xl" />

                    {/* Header */}
                    <div
                        className={`px-10 pt-12 pb-8 text-center transition-all duration-700 ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
                            }`}
                    >
                        <h2 className="text-3xl font-bold">
                            {card?.title || ""}
                        </h2>
                        <p className="mt-2 text-amber-400/80 text-sm uppercase">
                            Areas of Expertise
                        </p>
                    </div>

                    {/* Metrics */}
                    <div className="px-10 pb-12 space-y-6">
                        {metrics.map((item, i) => (
                            <div key={`${item.label}-${i}`}>
                                <div className="flex justify-between mb-2">
                                    <span className="text-white">
                                        {item.label}
                                    </span>
                                    <span className="text-amber-400 font-bold">
                                        {counts[i]}%
                                    </span>
                                </div>

                                <div className="h-3 bg-white/10 rounded-full">
                                    <div
                                        className="h-full bg-linear-to-r from-amber-400 to-yellow-500 rounded-full transition-all"
                                        style={{
                                            width: `${item.value}%`,
                                            transitionDuration: "2.5s"
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="pb-8 text-center text-white/50 text-sm italic">
                        Excellence in Legal Practice
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LegalExpertiseCard;