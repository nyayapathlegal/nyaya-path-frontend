"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getNavItems } from "@/api/home/home.api";
import HeaderPages from "./HeaderPages";
import HeaderPagesSkeleton from "@/components/Skeletons/HeaderPagesSkeleton";

const NavItemPage = () => {
    const { slug } = useParams();
    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPage() {
            try {
                const data = await getNavItems();
                const navItems = data.navItems || [];

                const findPageBySlug = (items, targetSlug) => {
                    for (const nav of items) {
                        if (!nav.children) continue;
                        for (const sub of nav.children) {
                            if (!sub.children) continue;
                            for (const page of sub.children) {
                                if (page.slug === targetSlug) return page;
                            }
                        }
                    }
                    return null;
                };

                setPageData(findPageBySlug(navItems, slug));
            } catch (err) {
                console.error("Error fetching page:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchPage();
    }, [slug]);

    if (loading) return <HeaderPagesSkeleton />
    if (!pageData) return <div className="p-10 text-center">Page not found.</div>;

    const {page } = pageData;
    return <HeaderPages page={page} />

};

export default NavItemPage;