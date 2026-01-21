"use client"

import { getMediaSection } from "@/api/home/home.api";
import { MEDIA_FALLBACK } from "@/config/fallbacks/mediaFallback";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const FooterLeftSection = ({ footerText }) => {


    const [logoUrl, setImageUrl] = useState(MEDIA_FALLBACK.images.logo);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getMediaSection();
                setImageUrl(res.images.logo);
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
            <Link 
                href="/"
                className="w-20 flex items-center justify-start"
            >
                <Image
                    src={logoUrl}
                    alt="logo"
                    width={160}
                    height={160}
                />

            </Link>


            <p className="md:w-100 text-gray-600 text-sm sm:text-base leading-relaxed">
                {footerText}
            </p>

        </div>
    );
};

export default FooterLeftSection;