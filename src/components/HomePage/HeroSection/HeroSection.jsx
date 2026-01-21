"use client";

import { HERO_FALLBACK } from "@/config/fallbacks/homepageFallbacks";
import { TalkToUsButton } from "../../Layouts";
import CounterSection from "./CounterSection";
import MainHeading from "./MainHeading";
import SmallBadge from "./SmallBadge";
import SubText from "./SubText";
import { useEffect, useState } from "react";
import { getHeroSection, getMediaSection } from "@/api/home/home.api";
import SkeletonHero from "../../Skeletons/HeroSkeleton";
import { MEDIA_FALLBACK } from "@/config/fallbacks/mediaFallback";

export function HeroSection() {

    const [loading, setLoading] = useState(true);

    const [heroData, setHeroData] = useState(HERO_FALLBACK);
    const [mediaData, setMediaData] = useState(MEDIA_FALLBACK.videos.heroBgVideo);


    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const [heroResponse, mediaResponse] = await Promise.all([
                    getHeroSection(),
                    getMediaSection()
                ]);

                setHeroData(heroResponse || HERO_FALLBACK);
                setMediaData(mediaResponse || MEDIA_FALLBACK);
            } 
            catch (error) {
                console.log("Error fetching home page data", error);
                setHeroData(HERO_FALLBACK);
                setMediaData(MEDIA_FALLBACK.videos.heroBgVideo);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);


    if(loading) {
        return <SkeletonHero />
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
            "
        >
            <video
                autoPlay
                loop
                muted
                preload={"true"}
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
            >
                <source src={mediaData.videos.heroBgVideo} type="video/mp4" />
            </video>


            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-b from-black/20 to-black/40"></div>
            <div className="absolute bottom-0 left-0 w-full h-1/4 mix-blend-multiply overflow-clip bg-linear-to-b from-transparent to-black"></div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-4">
                <SmallBadge title={heroData.title}/>
                <MainHeading heading={heroData.heading} />
                <SubText description={heroData.description}/>
                <TalkToUsButton text="Talk to us" className="mt-8" />
            </div>

            <CounterSection />
        </section>
    );
}