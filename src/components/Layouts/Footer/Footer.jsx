"use client";

import BottomSection from "./BottomSection";
import FooterLeftSection from "./FooterLeftSection";
// import FooterRightSection from "./FooterRightSection";
import VideoSection from "./VideoSection";
import TextSection from "./TextSection";
import { getFooter } from "@/api/home/home.api";
import { FOOTER_FALLBACK } from "@/config/fallbacks/homepageFallbacks";
import { useEffect, useState } from "react";

// Import icons from lucide-react
import { Phone, Mail, MapPin, Building2 } from "lucide-react";

export function Footer() {

    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchFooterData() {
            try {
                const footerData = await getFooter();
                setData(footerData);
            }
            catch (error) {
                console.log("Error fetching Footer Data", error);
                setData(FOOTER_FALLBACK);
            }
        }
        fetchFooterData();
    }, []);

    return (
        <footer className="relative w-full bg-white/50 overflow-hidden p-2">
            <VideoSection />
            <TextSection text={data?.videoText} />

            <div className="relative z-10 bg-white/90 backdrop-blur-md p-4 sm:p-6 md:p-8 mt-2 rounded-[30px] sm:rounded-[35px] md:rounded-[40px] shadow-2xl">

                <div className="flex flex-col lg:flex-row justify-between w-full gap-15">
                    <FooterLeftSection footerText={data?.footerText} />
                    {/* <FooterRightSection menuData={data?.menuData} /> */}
                </div>
                <div className="w-full h-px bg-gray-500/10 my-6 sm:my-8 md:my-10" />
                {/* Contact Info with Icons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-gray-700">
                    {data?.phoneNumber && (
                        <div className="flex items-center gap-2">
                            <Phone size={18} className="text-blue-500" />
                            <span>{data?.phoneNumber}</span>
                        </div>
                    )}
                    {data?.gmail && (
                        <div className="flex items-center gap-2">
                            <Mail size={18} className="text-red-500" />
                            <span>{data?.gmail}</span>
                        </div>
                    )}
                    {data?.address && (
                        <div className="flex items-center gap-2">
                            <MapPin size={18} className="text-green-500" />
                            <span>{data?.address}</span>
                        </div>
                    )}
                    {data?.branch && (
                        <div className="flex items-center gap-2">
                            <Building2 size={18} className="text-purple-500" />
                            <span>{data?.branch}</span>
                        </div>
                    )}
                </div>

                <div className="w-full h-px bg-gray-500/10 my-6 sm:my-8 md:my-10" />

                <BottomSection
                    socialMediaLinks={data?.socialMediaLinks}
                />

            </div>
        </footer>
    );
}
