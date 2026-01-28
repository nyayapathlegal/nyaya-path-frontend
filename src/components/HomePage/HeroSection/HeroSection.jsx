"use client";

import { useEffect, useState } from "react";

import { HERO_FALLBACK } from "@/config/fallbacks/homepageFallbacks";
import { MEDIA_FALLBACK } from "@/config/fallbacks/mediaFallback";
import { getHeroSection, getMediaSection } from "@/api/home/home.api";

import { TalkToUsButton } from "../../Layouts";
import CounterSection from "./CounterSection";
import MainHeading from "./MainHeading";
import SmallBadge from "./SmallBadge";
import SubText from "./SubText";
import SkeletonHero from "../../Skeletons/HeroSkeleton";

export function HeroSection() {
    const [loading, setLoading] = useState(true);
    const [heroData, setHeroData] = useState(null);
    const [mediaData, setMediaData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const [heroResponse, mediaResponse] = await Promise.all([
                    getHeroSection(),
                    getMediaSection(),
                ]);

                setHeroData(heroResponse);
                setMediaData(mediaResponse?.videos?.heroBgVideo);
            } 
            catch (error) {
                console.log("Error fetching home page data", error);
                setHeroData(HERO_FALLBACK);
                setMediaData(MEDIA_FALLBACK.videos.heroBgVideo);
            } 
            finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return <SkeletonHero />;
    }

    return (
        <section
            className="
        relative 
        w-full
        flex items-center justify-center 
        text-center text-white  
        px-4
        min-h-[90vh]
        sm:px-5 sm:min-h-[95vh]
        md:px-8 md:min-h-[95vh]
        lg:px-10 lg:min-h-screen
        overflow-hidden
      "
        >
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                webkit-playsinline="true"
                preload="auto"
                controls={false}
                disablePictureInPicture
                controlsList="nodownload nofullscreen noremoteplayback"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            >
                <source src={mediaData} type="video/mp4" />
            </video>

            {/* Overlays */}
            <div className="absolute inset-0 bg-linear-to-b from-black/20 to-black/40" />
            <div className="absolute bottom-0 left-0 w-full h-1/4 bg-linear-to-b from-transparent to-black" />

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-4">
                <SmallBadge title={heroData?.title} />
                <MainHeading heading={heroData?.heading} />
                <SubText description={heroData?.description} />
                <TalkToUsButton text="Talk to us" className="mt-8" />
            </div>

            <CounterSection />
        </section>
    );
}