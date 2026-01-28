"use client";

import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import StudyHelper from "./AgentComponents/StudyHelper";
import EmotionalAgent from "./AgentComponents/EmotionalAgent";
import TaskAgentCard from "./AgentComponents/TaskAgentCard";
import SkillCoach from "./AgentComponents/SkillCoach";
import BusinessBot from "./AgentComponents/BusinessBot";
import CustomAgent from "./AgentComponents/CustomAgent";
import { MEDIA_FALLBACK } from "@/config/fallbacks/mediaFallback";
import { getMediaSection } from "@/api/home/home.api";

const componentsMap = [
    StudyHelper,
    EmotionalAgent,
    TaskAgentCard,
    SkillCoach,
    BusinessBot,
    CustomAgent,
];

const RightPanel = ({ steps = [], activeStep = 0 }) => {
    const [imageUrl, setImageUrl] = useState(
        MEDIA_FALLBACK.images.homeRightImage
    );

    const safeIndex = Math.min(activeStep, componentsMap.length - 1);
    const Component = componentsMap[safeIndex] ?? null;
    const stepData = steps?.[safeIndex] ?? {};

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getMediaSection();

                const image =
                    res?.images?.homeRightImage ||
                    MEDIA_FALLBACK.images.homeRightImage;

                setImageUrl(image);
            } catch (err) {
                console.error("Media section API failed:", err);
                setImageUrl(MEDIA_FALLBACK.images.homeRightImage);
            }
        };

        fetchData();
    }, []);

    if (!imageUrl) return null;

    return (
        <div className="hidden md:block mt-6 relative flex-1 overflow-hidden">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 w-full h-[clamp(15rem,90vw,44rem)] md:h-full">
                <Image
                    src={imageUrl}
                    alt="Step visual"
                    fill
                    className="object-cover"
                    priority
                />

                <div className="absolute inset-0 flex items-center justify-center z-10">
                    {Component && (
                        <Component
                            title={stepData?.title}
                            description={stepData?.description}
                        />
                    )}
                </div>

                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
            </div>
        </div>
    );
};

export default RightPanel;
