"use client";

import { useEffect, useRef, useState } from "react";
import { PlayPauseButton } from "./PlayPauseButton";
import { MEDIA_FALLBACK } from "@/config/fallbacks/mediaFallback";
import { getMediaSection } from "@/api/home/home.api";

export const RightSection = () => {

    const ref = useRef(null);
    const [videoUrl, setVideoUrl] = useState(MEDIA_FALLBACK.videos.homeMiddleVideo);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getMediaSection();
                setVideoUrl(res.videos.homeMiddleVideo);
            }
            catch (err) {
                console.error(err);
                setVideoUrl(MEDIA_FALLBACK.images.homeRightImage);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="relative mt-1 rounded-lg flex-5 w-full h-[clamp(15rem,65vw,34rem)] min-h-40 overflow-hidden shadow-2xl border border-white/10">
            {" "}

            <PlayPauseButton ref={ref} />

            <video
                ref={ref}
                src={videoUrl}
                loop
                autoPlay
                preload="true"
                className="w-full h-full object-cover"
            />
        </div>
    );
};
