"use client";
import { useEffect, useState } from "react";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import { PRACTICE_AREAS_FALLBACK } from "@/config/fallbacks/homepageFallbacks";
import { getPracticeAreas } from "@/api/home/home.api";

export function AgentSection() {

    const [activeStep, setActiveStep] = useState(0);
    const [stepsData, setStepsData] = useState(PRACTICE_AREAS_FALLBACK);

    useEffect(() => {   
        async function fetchStepsData() {
            try {
                const data = await getPracticeAreas();
                // console.log(data)
                setStepsData(data);    
            }
            catch (error) {
                console.error("Error fetching lawyer steps data:", error);
                setStepsData(PRACTICE_AREAS_FALLBACK);
            }
        }
        fetchStepsData();
    }, []);

    return (
        <div
            className="
           
            border border-white/10 
            rounded-2xl
            opacity-100
    
            flex   
            flex-col 

            px-1 
            py-1 
            
            sm:px-2
            sm:py-2
            
            md:px-2
            md:py-2
            md:flex-row
            
            "
        >
            <LeftPanel
                stepsData={stepsData}
                activeStep={activeStep}
                onStepChange={setActiveStep}
            />

            <RightPanel   
                steps={stepsData?.steps}
                activeStep={activeStep} 
            />
        </div>
    );
}
