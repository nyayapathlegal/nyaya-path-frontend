"use client";

import { getNavItems } from "@/api/home/home.api";
import HeaderPages from "@/app/(public)/[key]/[slug]/HeaderPages";
import HeaderPagesSkeleton from "@/components/Skeletons/HeaderPagesSkeleton";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";


const Page = () => {

    const { key, slug } = useParams();

    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchMenuData() {
            try {
                const data = await getNavItems();

                // find key
                const navItem = data.navItems.find(n => n.key === key);
                if (!navItem) return;

                // find slug
                const item = navItem.items.find(i => i.slug === slug);
                if (!item) return;

                setPageData(item.page);
            } 
            catch (error) {
                console.log("Failed to fetch menu data:", error);
                setPageData(null);
            } 
            finally {
                setLoading(false);
            }
        }

        if (key && slug) {
            fetchMenuData();
        }

    }, [key, slug]);

    if (loading) return <HeaderPagesSkeleton/>
    if (!pageData) return <div>Page not found</div>;

    return <HeaderPages page={pageData} />

};

export default Page;
