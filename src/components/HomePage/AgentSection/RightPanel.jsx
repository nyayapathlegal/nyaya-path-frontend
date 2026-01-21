"use client";

import Image from "next/image";
import StudyHelper from "./AgentComponents/StudyHelper";
import EmotionalAgent from "./AgentComponents/EmotionalAgent";
import TaskAgentCard from "./AgentComponents/TaskAgentCard";
import SkillCoach from "./AgentComponents/SkillCoach";
import BusinessBot from "./AgentComponents/BusinessBot";
import CustomAgent from "./AgentComponents/CustomAgent";
import { MEDIA_FALLBACK } from "@/config/fallbacks/mediaFallback";
import { useState, useEffect } from "react";
import { getMediaSection } from "@/api/home/home.api";

const componentsMap = [
    StudyHelper,
    EmotionalAgent,
    TaskAgentCard,
    SkillCoach,
    BusinessBot,
    CustomAgent,
];

const RightPanel = ({ steps, activeStep }) => {

    const [imageUrl, setImageUrl] = useState(MEDIA_FALLBACK.images.homeRightImage);
    const Component = componentsMap[activeStep] || null;


        useEffect(() => {
            const fetchData = async () => {
                try {
                    const res = await getMediaSection();
                    setImageUrl(res.images.homeRightImage);
                } 
                catch (err) {
                    console.error(err);
                    setImageUrl(MEDIA_FALLBACK.images.homeRightImage);
                }   
            };
            fetchData();
        }, []);

    return (
        <div className="hidden md:block mt-6 relative flex-1 overflow-hidden">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 w-full h-[clamp(15rem,90vw,44rem)] md:h-full">
                <Image
                    src={imageUrl}
                    alt="Step visual"
                    fill
                    className="object-cover"
                    priority={"true"}
                />

                <div className="absolute w-full h-full flex items-center justify-center">
                    {Component && <Component title={steps[activeStep]?.title} description={steps[activeStep]?.description} />}
                </div>

                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
            </div>
        </div>
    );
};

export default RightPanel;