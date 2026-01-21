"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import SubServicePage from "./SubServicePage";
import { getServices } from "@/api/home/home.api";
import SubServicePageSkeleton from "@/components/Skeletons/SubServicePageSkeleton";

export default function Page() {

    const { index, slug } = useParams();

    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getServices();
                const services = data.services || [];
                const idx = Number(index);

                if (Number.isNaN(idx) || idx < 0 || idx >= services.length) {
                    setPageData(null);
                    return;
                }

              
                const mainService = services[idx];
                const subServices = mainService ? mainService.subServices : [];
                const subService = subServices.find( (sub) => sub.slug === slug);


                if (!subService) {
                    setPageData(null);
                    return;
                }

                setPageData({
                    service: mainService,
                    sub: subService,
                });
            }
            catch (error) {
                setPageData(null);
            }
            finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [index, slug]);

    if (loading) return <SubServicePageSkeleton />;

    if (!pageData) {
        return notFound();
    }
    
    console.log("Page Data:", pageData);
    return <SubServicePage data={pageData} />;
}