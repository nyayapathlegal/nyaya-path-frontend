"use client";

import { useEffect, useState } from "react";
import RightPanel from "./RightPanel";
import LeftPanel from "./LeftPanel";
import TopSection from "./TopSection";
import { INSIGHTS_FALLBACK } from "@/config/fallbacks/homepageFallbacks";
import { getInsights } from "@/api/home/home.api";


export function SmartInsightsSection() {

    const [stepsData, setStepsData] = useState(INSIGHTS_FALLBACK);
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getInsights();
                setStepsData(data);
                // console.log("Fetched insights data:", data);
            } 
            catch (error) {
                console.error("Error fetching insights data:", error);
                setStepsData(INSIGHTS_FALLBACK);
            }   
        }
        fetchData();
    }, []);

    const changeStep = (index) => {
        setActiveStep(index);
    };

    return (
        <section
            className="
                text-white 
                
                border border-white/10 
                rounded-2xl
                opacity-100
        
                p-1 
                sm:px-2
            "
        >
            <TopSection 
                title={stepsData?.heroSection?.title}
                description={stepsData?.heroSection?.description}
                ctaText={stepsData?.heroSection?.ctaText}
            />

            <div className="relative">
                <div className="
                    grid 
                    grid-cols-1
                    gap-12 
                    max-w-7xl mx-auto items-start
                    p-2
                    sm:p-8 
                    lg:grid-cols-2"
                >
                    <LeftPanel
                        stepsSection={stepsData?.stepsSection}
                        activeStep={activeStep}
                        onStepChange={changeStep}
                    />

                    <RightPanel   
                        stepsSection={stepsData?.stepsSection} 
                        activeStep={activeStep} 
                    />

                </div>
            </div>
        </section>
    );
}
