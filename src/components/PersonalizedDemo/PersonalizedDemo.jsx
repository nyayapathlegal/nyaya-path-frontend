"use client"

import React, { useEffect, useState } from "react";
import { HomePageWrapper } from "../WrapperComponents/HomePageWrapper";
import { Badge, TalkToUsButton } from "@/components/Layouts";
import { Description } from "./Description";
import { Heading } from "./Heading";
import { PERSONALIZED_CONSULTATION_FALLBACK } from "@/config/fallbacks/homepageFallbacks";
import { getPersonalizedConsultation } from "@/api/home/home.api";

export const PersonalizedDemo = () => {

    const [data, setData] = useState(null);

    useEffect ( () => {
        async function fetchData () {
            try {
                const data = await getPersonalizedConsultation();
                setData(data);
            }
            catch(error) {
                console.log("Error fetching PERSONALIZED CONSULTATION data", error);
                setData(PERSONALIZED_CONSULTATION_FALLBACK)
            }
        }
        fetchData();
    }, []);


    return (
        <HomePageWrapper className="bg-[linear-gradient(#fff_100%,#fff_100%)]">
            <div 
                className="
                    flex flex-col w-full 
                    gap-2 sm:gap-4 md:gap-6 
                    max-w-6xl mx-auto 
                    px-4
                    py-12 sm:py-16 md:py-20 
                    mb-12 sm:mb-16 md:mb-20 
                    text-black
                "
            >
                <Badge text={data?.tagline} />

                <div 
                    className="
                        flex flex-col 
                        sm:flex-col
                        md:flex-row 
                        justify-between 
                        gap-6 sm:gap-8 md:gap-10 
                        flex-wrap
                    "
                >
                    <Heading heading={data?.heading} />

                    <div 
                        className="
                            flex flex-col 
                            w-full 
                            max-w-full 
                            md:max-w-105 
                            pr-0 
                            md:pr-12 
                            flex-2
                        "
                    >
                        <Description description={data?.description} />

                        <div>
                            <TalkToUsButton
                                text={"Talk to us"}
                                className="
                                    bg-black! 
                                    rounded-full 
                                    text-white 
                                    text-sm 
                                    sm:text-base 
                                    md:text-lg 
                                    hover:bg-neutral-800! 
                                    transition
                                "
                            />
                        </div>
                    </div>
                </div>
            </div>
        </HomePageWrapper>
    );
};

export default PersonalizedDemo;
