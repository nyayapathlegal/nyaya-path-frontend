"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import BottomLeftSection from "@/components/Layouts/BottomTextandCardsSection/BottomLeftSection";
import { SERVICES_FALLBACK } from "@/config/fallbacks/servicesFallback";
import { THEMES } from "@/styles/themes";

export default function ServicesUI() {

    const [services, setServices] = useState([]);
    const [activeService, setActiveService] = useState(SERVICES_FALLBACK.services[0]);
    const [activeIndex, setActiveIndex] = useState(0);

      useEffect ( () => {
           async function fetchData () {
               try {
                //    const data = await getPersonalizedConsultation();
                //    setData(data);
                setServices(SERVICES_FALLBACK.services)
                setActiveService(SERVICES_FALLBACK.services[0])
                setActiveIndex(0)
               }
               catch(error) {
                   console.log("Error fetching PERSONALIZED CONSULTATION data", error);
                //    setData(PERSONALIZED_CONSULTATION_FALLBACK)
               }
           }
           fetchData();
       }, []);

       
   
    return (

        <div
            className={`

                    mt-15
                    px-6 
                    py-7 
            
                    flex 
                    flex-col
                    gap-13
            
                    
                    sm:mt-20
                    md:mt-30                
                    lg:mt-40
                    `
            }
        >
            <BottomLeftSection
                leftTitle={SERVICES_FALLBACK.leftTitle}
                leftSubtitle={SERVICES_FALLBACK.leftSubtitle}
                para={SERVICES_FALLBACK.para}
            />


            <div className="relative max-w-7xl mx-auto px-4">
                {/* Tabs */}
                <div className="flex flex-wrap justify-between gap-6 m-12 font-medium">
                    {
                        services.map((service, index) => (
                            <button
                                key={index}
                                onClick={
                                    () => {
                                        setActiveService(service)
                                        setActiveIndex(index)
                                    }
                                }
                                
                                className={`relative transition ${activeIndex === index
                                    ? `${THEMES.current.textPrimary} after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-blue-500`
                                    : "text-white"
                                    }`}
                            >
                                {service.title}
                            </button>
                        ))
                    }
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        activeService.subServices.map((sub) => (
                            <Link
                                href={`/services/${activeIndex}/${sub.slug}`}
                                key={`${sub.slug}`}
                                className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-white/10 to-transparent p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10"
                            >
                                {/* Decorative background element */}
                                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-blue-500/5 blur-2xl transition-all" />

                                <div>
                                    <h3 className={`text-lg font-bold ${THEMES.current.textPrimary}  transition-colors`}>
                                        {sub.title}
                                    </h3>
                                    <p className={`mt-3 line-clamp-3 text-sm leading-relaxed ${THEMES.current.textSecondary} `}>
                                        {sub.description}
                                    </p>
                                </div>

                                <div className={`mt-6 flex items-center text-xs font-semibold uppercase tracking-wider ${THEMES.current.textSecondary} opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1`}>
                                    Explore Service
                                    <span className="ml-2">→</span>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}