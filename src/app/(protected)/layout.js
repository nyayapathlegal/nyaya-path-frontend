"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import Header from "./components/Layouts/Header";
import Sidebar from "./components/Layouts/Sidebar";

export default function ProtectedLayout({ children }) {

    const router = useRouter();
    const isAuthenticated = useSelector( (state) => state.auth.isAuthenticated);

    useEffect( () => {
        if (!isAuthenticated) {
            router.replace("/login");
        }
    }, [isAuthenticated, router]);


    // Prevent UI flash before redirect
    if (isAuthenticated === false || isAuthenticated === undefined) {
        return null;
    }

    return (
        <div className="flex flex-row h-screen overflow-hidden bg-black p-4 text-gray-100">
            <Sidebar />
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
