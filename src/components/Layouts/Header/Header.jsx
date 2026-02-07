"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, Menu, ChevronDown } from "lucide-react";
import Link from "next/link";
import { getNavItems } from "@/api/home/home.api";
import Logo from "./Logo";
import { Sparkles } from 'lucide-react'


export function Header() {
    const [navItems, setNavItems] = useState([]);

    // desktop
    const [activeDesktopNav, setActiveDesktopNav] = useState(null);
    const [hoveredCategory, setHoveredCategory] = useState(null);

    // mobile
    const [activeMobileNav, setActiveMobileNav] = useState(null);
    const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
    const [activeCategory, setActiveCategory] = useState(null);


    const navbarRef = useRef(null);
    const mobileMenuRef = useRef(null);

    const megaMenuRef = useRef(null);

    const openTimeoutRef = useRef(null);
    const closeTimeoutRef = useRef(null);

    /* ================= FETCH NAV ================= */
    useEffect(() => {
        async function fetchNavData() {
            try {
                const data = await getNavItems();
                setNavItems(data?.navItems);
            } catch {
                setNavItems([]);
            }
        };
        fetchNavData();
    }, []);

    /* ================= CLEAR TIMEOUTS ================= */
    const clearAllTimeouts = () => {
        if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
        if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
        openTimeoutRef.current = null;
        closeTimeoutRef.current = null;
    };

    /* ================= CLICK OUTSIDE ================= */
    useEffect(() => {
        const handler = (e) => {
            if (
                !navbarRef.current?.contains(e.target) &&
                !megaMenuRef.current?.contains(e.target) &&
                !mobileMenuRef.current?.contains(e.target)
            ) {
                clearAllTimeouts();
                setActiveDesktopNav(null);
                setHoveredCategory(null);
                setIsMobileMenuVisible(false);
            }
        };

        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    /* ================= BODY SCROLL LOCK ================= */
    useEffect(() => {
        document.body.classList.toggle("overflow-hidden", isMobileMenuVisible);
        return () => document.body.classList.remove("overflow-hidden");
    }, [isMobileMenuVisible]);

    /* ================= DESKTOP HOVER HANDLERS ================= */
    const delayedOpen = (nav) => {
        clearAllTimeouts();
        openTimeoutRef.current = setTimeout(() => {
            setActiveDesktopNav(nav.id);
            setHoveredCategory(nav.children?.[0]?.title || null);
        }, 120);
    };

    const delayedClose = () => {
        clearAllTimeouts();
        closeTimeoutRef.current = setTimeout(() => {
            setActiveDesktopNav(null);
            setHoveredCategory(null);
        }, 200);
    };

    const activeNav = navItems.find((n) => n.id === activeDesktopNav);

    /* ================= MOBILE NAV TOGGLE ================= */
    const toggleMobileNav = (navId) => {
        if (activeMobileNav === navId) {
            setActiveMobileNav(null);
            setActiveCategory(null); // Reset category when collapsing
        } else {
            setActiveMobileNav(navId);
            setActiveCategory(null); // Reset category when switching nav items
        }
    };

    const toggleCategory = (categoryTitle) => {
        setActiveCategory(activeCategory === categoryTitle ? null : categoryTitle);
    };

    return (
        <>
            {/* Ribbon */}
            <div className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-black py-3 px-4">
                <div className="max-w-7xl mx-auto text-center text-sm flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span className="font-semibold">Special Offer:</span>
                    <span className="font-medium">Get 20% off on all services this month!</span>
                    <Sparkles className="w-4 h-4" />
                </div>
            </div>

            {/* ================= NAV ================= */}
            <nav
                ref={navbarRef}
                className="sticky top-0 z-50 bg-white shadow-sm relative"
            >
                <div className="max-w-screen-2xl mx-auto px-1">
                    <div className="flex h-20 items-center justify-between">

                        <Logo />

                        {/* DESKTOP NAV */}
                        <div className="hidden xl:flex items-center justify-between gap-1">
                            {
                                navItems.map((nav) => (
                                    <button
                                        key={nav.id}
                                        onMouseEnter={() => delayedOpen(nav)}
                                        className="flex items-center gap-1 px-3 py-2 font-semibold hover:text-orange-600"
                                    >
                                        {nav.title}
                                    </button>
                                ))
                            }
                        </div>

                        {/* DESKTOP LOGIN */}
                        <div className="hidden xl:block p-3">
                            <Link
                                href="/login"
                                className="px-6 py-2 rounded-lg font-bold text-sm bg-black text-white"
                            >
                                Login
                            </Link>
                        </div>

                        {/* MOBILE TOGGLE */}
                        <button
                            className="xl:hidden p-2"
                            onClick={() => setIsMobileMenuVisible((v) => !v)}
                        >
                            {isMobileMenuVisible ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>

                {/* ================= MOBILE MENU ================= */}
                {isMobileMenuVisible && (
                    <div ref={mobileMenuRef} className="xl:hidden absolute top-full left-0 right-0 bg-white border-t shadow-lg z-40" style={{ maxHeight: 'calc(100vh - 5rem)' }}>
                        <div className="overflow-y-auto p-4" style={{ maxHeight: 'calc(100vh - 5rem)' }}>
                            {
                                navItems.map((nav) => (
                                    <div key={nav.id} className="border-b border-gray-100">
                                        <button
                                            className="w-full flex justify-between items-center px-4 py-3 font-semibold text-gray-900"
                                            onClick={() => toggleMobileNav(nav.id)}
                                        >
                                            {nav.title}
                                            {nav.children && (
                                                <ChevronDown
                                                    className={`h-4 w-4 transition-transform duration-200 flex-shrink-0 ml-2 ${activeMobileNav === nav.id ? "rotate-180" : ""
                                                        }`}
                                                />
                                            )}
                                        </button>

                                        {
                                            nav.children && activeMobileNav === nav.id && (
                                                <div className="pl-4 pb-2 border-l-2 border-gray-200 ml-4">

                                                    {nav.children.map((cat) => (
                                                        <div key={cat.title}>
                                                            <button
                                                                onClick={() => toggleCategory(cat.title)}
                                                                className="
                                                                    w-full flex justify-between items-center
                                                                    pl-4 py-2
                                                                    text-sm font-semibold text-gray-800
                                                                    hover:text-orange-600
                                                                "

                                                            >
                                                                {cat.title}
                                                                {cat.children && (
                                                                    <ChevronDown
                                                                        className={`h-4 w-4 transition-transform duration-200 flex-shrink-0 ml-2 ${activeCategory === cat.title ? "rotate-180" : ""
                                                                            }`}
                                                                    />
                                                                )}
                                                            </button>


                                                            {
                                                                activeCategory === cat.title && cat.children && (
                                                                    <div className="pl-4">
                                                                        {cat.children.map((item) => (
                                                                            <Link
                                                                                key={item.slug}
                                                                                href={`/navitem/${item.slug}`}
                                                                                onClick={() => {
                                                                                    setIsMobileMenuVisible(false);
                                                                                    setActiveMobileNav(null);
                                                                                    setActiveCategory(null);
                                                                                }}
                                                                                className="
                                                                                    block pl-8 py-1.5
                                                                                    text-sm text-gray-600
                                                                                    hover:text-orange-600
                                                                                    before:content-['–'] before:mr-2
                                                                                "
                                                                            >
                                                                                {item.title}
                                                                            </Link>
                                                                        ))}
                                                                    </div>
                                                                )
                                                            }
                                                        </div>
                                                    ))}
                                                </div>
                                            )
                                        }
                                    </div>
                                ))
                            }

                            {/* MOBILE: Login Button */}
                            <div className="px-4 py-4">
                                <Link
                                    href="/login"
                                    onClick={() => setIsMobileMenuVisible(false)}
                                    className="block w-full px-6 py-2 rounded-lg font-bold text-sm text-center bg-black text-white"
                                >
                                    Login
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* ================= FIXED MEGA MENU ================= */}
            {activeNav && (
                <div
                    ref={megaMenuRef}
                    onMouseEnter={clearAllTimeouts}
                    onMouseLeave={delayedClose}
                    className="
                        fixed top-32 left-1/2 z-40
                        w-312.5 h-120
                        -translate-x-1/2
                        rounded-2xl bg-white
                        border shadow-2xl overflow-hidden
                    "
                >
                    <div className="flex h-full">
                        {/* LEFT */}
                        <div className="w-70 bg-gray-50 border-r overflow-y-auto">
                            {
                                activeNav.children?.map((cat) => (
                                    <button
                                        key={cat.title}
                                        onMouseEnter={() => setHoveredCategory(cat.title)}
                                        className={`w-full px-5 py-4 text-left text-[17px] font-semibold
                                            ${hoveredCategory === cat.title
                                                ? "bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-white"
                                                : "hover:bg-gray-100"
                                            }`}
                                    >
                                        {cat.title}
                                    </button>
                                ))
                            }
                        </div>

                        {/* RIGHT */}
                        <div className="flex-1 px-8 py-6 overflow-y-auto">
                            <div className="grid grid-cols-3 gap-x-12 gap-y-3">
                                {
                                    activeNav.children
                                        ?.find((c) => c.title === hoveredCategory)
                                        ?.children?.map((item) => (
                                            <Link
                                                key={item.slug}
                                                href={`/navitem/${item.slug}`}
                                                onClick={() => {
                                                    setActiveDesktopNav(null);
                                                    setHoveredCategory(null);
                                                }}
                                                className="
                                                    block
                                                    text-[16px] font-medium text-gray-700
                                                    leading-relaxed
                                                    transition-colors duration-200
                                                    hover:text-orange-600
                                                "
                                            >
                                                {item.title}
                                            </Link>
                                        ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}