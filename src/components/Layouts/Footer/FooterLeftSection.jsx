"use client"

import { getMediaSection } from "@/api/home/home.api";
import { MEDIA_FALLBACK } from "@/config/fallbacks/mediaFallback";
import { useEffect, useState } from "react";
import Logo from "../Header/Logo";

const FooterLeftSection = ({ footerText }) => {


    const [logoUrl, setImageUrl] = useState(MEDIA_FALLBACK.images.logo);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getMediaSection();
                setImageUrl(res?.images?.logo);
            }
            catch (err) {
                console.error(err);
                setImageUrl(MEDIA_FALLBACK.images.logo);
            }
        };
        fetchData();
    }, []);
    return (
        <div
            className="
                w-full 
                flex 
                flex-col
                space-y-4
                justify-start
                items-center
                 
                md:flex-row
                md:justify-between
            "
        >
            
            <Logo />

            <p className="md:w-100 text-gray-600 text-sm sm:text-base leading-relaxed">
                {footerText}
            </p>

        </div>
    );
};

export default FooterLeftSection;