"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import Header from "./components/Layouts/Header";
import Sidebar from "./components/Layouts/Sidebar";

export default function ProtectedLayout({ children }) {
    const router = useRouter();
    const isAuthenticated = useSelector(
        (state) => state.auth.isAuthenticated
    );

    const [isAllowedScreen, setIsAllowedScreen] = useState(true);

    // auth guard
    useEffect(() => {
        if (isAuthenticated === false) {
            router.replace("/login");
        }
    }, [isAuthenticated, router]);

    // screen width check (>= 1280px)
    useEffect(() => {
        const checkWidth = () => {
            setIsAllowedScreen(window.innerWidth >= 1280);
        };

        checkWidth();
        window.addEventListener("resize", checkWidth);
        return () => window.removeEventListener("resize", checkWidth);
    }, []);

    // block small screens
    if (!isAllowedScreen) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-center px-4">
                <p className="text-zinc-400 text-sm">
                    This section is accessible only on a laptop or desktop.
                </p>
            </div>
        );
    }

    // prevent UI flash
    if (isAuthenticated === false || isAuthenticated === undefined) {
        return null;
    }

    return (
        // Left - Right
        <div className="flex flex-row h-screen overflow-hidden bg-black p-4 text-gray-100">
            
            <Sidebar />

            {/* Top - Bottom */}
            <div className="flex flex-col gap-y-4 md:gap-y-6 flex-1">
                
                <div className="mx-auto w-full">
                    <Header />
                </div>

                <main className="custom-scrollbar bg-[#1e1e1e] shadow-lg border-b border-[#1f1f1f] mx-4 sm:mx-6 lg:mx-8 rounded-lg overflow-auto">
                    {children}
                </main>

            </div>
        </div>
    );
}
