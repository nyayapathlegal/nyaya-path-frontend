"use client";

import { CircularButton } from "@/components/Layouts";
import { Description } from "./Description";
import { VOICE_FALLBACK } from "@/config/fallbacks/homepageFallbacks";
import { useEffect, useState } from "react";
import { getVoice } from "@/api/home/home.api";
import { THEMES } from "@/styles/themes";

export const LeftSection = () => {

    const [data, setData] = useState(null);

    useEffect( () => {
        async function fetchVoiceData() {
            try {
                const data = await getVoice();
                setData(data);
            } 
            catch {
                console.log("Error fetching Voice Data");
                setData(VOICE_FALLBACK);
            }
        }
        fetchVoiceData();
    }, []);

    return (
        <div className="min-w-[35%] w-full flex flex-col flex-1 backdrop-blur-2xl">
            <div className="p-4">
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <h1 className={`text-[32px] font-[450] self-start tracking-tight ${THEMES.current.textPrimary}`}>
                            {data?.voiceSection?.title}
                        </h1>
                    </div>
                    <Description description={ data?.voiceSection?.description} />
                    <CircularButton text={data?.voiceSection?.ctaText} />
                </div>
            </div>
        </div>
    );
};
