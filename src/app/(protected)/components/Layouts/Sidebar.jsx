"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

import {
    LayoutDashboard,
    Home,
    Grid,
    Menu,
    Layers,
    Folder,
    Image,
    Users,
    Briefcase,
    Clipboard,
    FileText,
    Bell,
    Settings,
    Info,
    Palette
} from "lucide-react";

// Map string names to icon components
const ICONS = {
    LayoutDashboard,
    Home,
    Grid,
    Menu,
    Layers,
    Folder,
    Image,
    Users,
    Briefcase,
    Clipboard,
    FileText,
    Bell,
    Settings,
    Info,
    Palette
};

// Sidebar items
const DEFAULT_SIDEBAR_ITEMS = [
    { name: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
    { name: "Home - Section A", href: "/dashboard/home-page-1", icon: "Home" },
    { name: "Home - Section B", href: "/dashboard/home-page-2", icon: "Grid" },
    { name: "Header", href: "/dashboard/header", icon: "Menu" },
    { name: "Footer", href: "/dashboard/footer", icon: "Layers" },
    { name: "Media", href: "/dashboard/media", icon: "Image" },
    // { name: "Clients", href: "/dashboard/clients", icon: "Users" },
    // { name: "Themes", href: "/dashboard/theme", icon: "Palette" },
    { name: "Services", href: "/dashboard/services", icon: "Briefcase" },
    // { name: "Cases & Matters", href: "/dashboard/cases", icon: "Clipboard" },
    // { name: "Compliance & Filings", href: "/dashboard/compliance", icon: "FileText" },
    // { name: "Documents & Notices", href: "/dashboard/documents", icon: "FileText" },
    // { name: "Legal Alerts", href: "/dashboard/alerts", icon: "Bell" },
    // { name: "Settings", href: "/dashboard/settings", icon: "Settings" },
    // { name: "About Firm", href: "/dashboard/about", icon: "Info" }
];

const Sidebar = () => {
    const [sidebarItems] = useState(DEFAULT_SIDEBAR_ITEMS);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const pathname = usePathname();

    const user = useSelector((state) => state.auth);
    const username = user?.username || "default user";

    return (
        <div
            className={`relative z-10 mt-2 transition-all duration-300 ease-in-out shrink-0 ${
                isSidebarOpen ? "w-64" : "w-20"
            }`}
        >
            <div className="h-full bg-[#1e1e1e] backdrop-blur-md p-4 flex flex-col border-r border-[#2f2f2f] rounded-lg">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 rounded-full hover:bg-[#2f2f2f] transition-colors max-w-fit cursor-pointer"
                    >
                        <Menu size={24} />
                    </button>

                    <span
                        className={`text-md font-medium whitespace-nowrap transition-all duration-300 ${
                            isSidebarOpen ? "opacity-100 translate-x-0 delay-200" : "opacity-0 -translate-x-3 delay-0"
                        }`}
                    >
                        @{username}
                    </span>
                </div>

                {/* Sidebar navigation */}
                <nav className="mt-8 grow overflow-auto pr-3 scrollbar-hide">
                    {sidebarItems.map((item, index) => {
                        // Use fallback icon if missing
                        const IconComponent = ICONS[item.icon] || Info;
                        return (
                            <Link key={`${item.name}-${index}`} href={item.href}>
                                <div
                                    className={`flex items-center p-4 text-sm font-medium rounded-lg hover:bg-[#2f2f2f] transition-colors mb-2 ${
                                        pathname === item.href ? "bg-[#2f2f2f]" : ""
                                    }`}
                                >
                                    <IconComponent size={20} style={{ minWidth: "20px" }} />
                                    <span
                                        className={`ml-4 whitespace-nowrap transition-all duration-300 ${
                                            isSidebarOpen ? "opacity-100 translate-x-0 delay-200" : "opacity-0 -translate-x-3 delay-0"
                                        }`}
                                    >
                                        {item.name}
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
