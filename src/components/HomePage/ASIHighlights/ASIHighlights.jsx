"use client";

import { motion } from "framer-motion";;
import { Heading } from "./Heading";
import { Subtext } from "./Subtext";
import { CircularButton } from "@/components/Layouts";
import { getPoweredByFeatures } from "@/api/home/home.api";;
import { useEffect, useState } from "react";
import { FeatureCard } from "./FeatureCard";
import { FEATURES_POWEREDBY_FALLBACK } from "@/config/fallbacks/homepageFallbacks";

export function ASIHighlights() {
    
    const [data, setData] = useState(FEATURES_POWEREDBY_FALLBACK);
    
    useEffect(() => {
        async function fetchSecondFeatures() {
            try {   
                const data = await getPoweredByFeatures();
                setData(data);
            } 
            catch {
                console.log("Error fetching Features Data");
                setData(FEATURES_POWEREDBY_FALLBACK);
            }
        }
        fetchSecondFeatures();
    }, []);

    return (
        <section className="relative py-28 sm:px-5 px-1 flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.15 }}
                transition={{ duration: 1.2 }}
                className="absolute top-10 w-150 h-150 bg-gray-700 rounded-full blur-[150px] opacity-30 z-0"
            />

            <CircularButton text={data?.poweredBySection?.heading} className="z-1" />

            <div className="px-4">
                <Heading subheading={data.poweredBySection.subheading}  />
                <Subtext description={data.poweredBySection.description}/>
            </div>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16 w-full max-w-6xl relative z-10">
                {data.features.map((feature, index) => (
                    <FeatureCard key={index} index={index} feature={feature} />
                ))}
            </div>
        </section>
    );
}
