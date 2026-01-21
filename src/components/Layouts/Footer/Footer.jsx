"use client";

import BottomSection from "./BottomSection";
import FooterLeftSection from "./FooterLeftSection";
import FooterRightSection from "./FooterRightSection";
import VideoSection from "./VideoSection";
import TextSection from "./TextSection";
import { getFooter } from "@/api/home/home.api";
import { FOOTER_FALLBACK } from "@/config/fallbacks/homepageFallbacks";
import { useEffect } from "react";
import { useState } from "react";

export function Footer() {

    const [data, setData] = useState(FOOTER_FALLBACK);

    useEffect( () => {  
        async function fetchFooterData() {
            try {
                const data = await getFooter();
                setData(data);
            }
            catch (error) {
                console.log("Error fetching Footer Data", error);
                setData(FOOTER_FALLBACK);
            }
        }
        fetchFooterData();
    }, []);


    return (
        <footer 
            className="
                relative w-full 
                bg-white/50 
                overflow-hidden
                p-2
            "
        >
            <VideoSection />
            <TextSection text={data.companyName}/>

            <div 
                className="
                    relative z-10 
                    bg-white/90 backdrop-blur-md 
                    p-4 sm:p-6 md:p-8
                    mt-2
                    rounded-[30px] sm:rounded-[35px] md:rounded-[40px] 
                    shadow-2xl
                "
            >
                {/* <div 
                    className="
                        flex 
                        flex-col 
                        lg:flex-row 
                        justify-between 
                        w-full 
                        gap-15
                    "
                > */}
                    <FooterLeftSection footerText={data.footerText} />
                    {/* <FooterRightSection menuData={data.menuData} /> */}
                {/* </div> */}

                <div 
                    className="
                        w-full 
                        h-px 
                        bg-gray-500/10 
                        my-6 sm:my-8 md:my-10
                    "
                />
                    
                

                <BottomSection 
                    companyName={data.companyName} 
                    socialMediaLinks={data.socialMediaLinks}
                />

            </div>
        </footer>
    );
}
