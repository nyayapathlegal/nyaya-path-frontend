"use client"
import { getMediaSection } from '@/api/home/home.api';
import { MEDIA_FALLBACK } from '@/config/fallbacks/mediaFallback';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const Logo = () => {

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
        <Link
            href="/"
            className="flex items-center justify-start overflow-hidden"
        >
            <Image
                src={logoUrl}
                alt="logo"
                width={55}
                height={55}
            />

        </Link>
    )
}

export default Logo