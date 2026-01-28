"use client";

import { getMediaSection } from "@/api/home/home.api";
import { MEDIA_FALLBACK } from "@/config/fallbacks/mediaFallback";
import { THEMES } from "@/styles/themes";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";

const RightPanel = ({ stepsSection = [], activeStep = 0 }) => {
    const safeIndex = Math.min(activeStep, Math.max(stepsSection.length - 1, 0));

    const item = stepsSection?.[safeIndex] ?? {};

    const [guidanceSectionArr, setGuidanceSectionArr] = useState(
        MEDIA_FALLBACK.images.guidanceSection
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getMediaSection();

                if (Array.isArray(res?.images?.guidanceSection)) {
                    setGuidanceSectionArr(res.images.guidanceSection);
                } else {
                    setGuidanceSectionArr(MEDIA_FALLBACK.images.guidanceSection);
                }
            } catch (err) {
                console.error("Guidance media fetch failed:", err);
                setGuidanceSectionArr(MEDIA_FALLBACK.images.guidanceSection);
            }
        };

        fetchData();
    }, []);

    const imageSrc =
        guidanceSectionArr?.[safeIndex] ||
        MEDIA_FALLBACK.images.guidanceSection?.[0];

    if (!imageSrc) return null;

    return (
        <div
            className="
                glass-card rounded-3xl
                p-2 sm:p-6 md:p-8
                sticky top-20 h-fit
                backdrop-blur-xl border border-white/10
                shadow-[0_0_40px_rgba(0,0,0,0.25)]
                transition-all duration-500
            "
        >
            <div className="relative w-full h-87.5 overflow-hidden rounded-2xl">
                <Image
                    src={imageSrc}
                    alt={item?.title || "Guidance image"}
                    fill
                    className="
                        rounded-2xl
                        transition-transform duration-700
                        hover:scale-[1.02]
                        object-cover
                    "
                    priority
                />
            </div>

            <p
                className={`
                    mt-6 text-center text-xl md:text-2xl
                    font-semibold tracking-wide
                    ${THEMES.current.textPrimary}
                `}
            >
                {item?.title || ""}
            </p>
        </div>
    );
};

export default RightPanel;
