"use client";
import React, { useState, useRef, useEffect } from "react";
import { X, Menu, ChevronDown, Sparkles } from "lucide-react";
import Link from "next/link";
import { getNavItems } from "@/api/home/home.api";
import Logo from "./Logo";

const Ribbon = () => (
    <div className="relative bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-black py-3 px-4">
        <div className="max-w-7xl mx-auto text-center text-sm flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span className="font-semibold">Special Offer:</span>
            <span className="font-medium">Get 20% off on all services this month!</span>
            <Sparkles className="w-4 h-4" />
        </div>
    </div>
);

export function Header() {

    const [navItems, setNavItems] = useState([]);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);

    const navbarRef = useRef(null);
    const timeoutRef = useRef(null);

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setActiveDropdown(null);
            setHoveredCategory(null);
        }, 1000);
    };

    const handleDropdownClick = (id) => {
        setActiveDropdown(activeDropdown === id ? null : id);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getNavItems();
                setNavItems(data.navItems);
            }
            catch (error) {
                console.log("Error fetching Navbar Data", error);
                setNavItems([]);
            }
        }
        fetchData();
    }, []);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navbarRef.current && !navbarRef.current.contains(event.target)) {
                setIsMobileMenuVisible(false);
                setActiveDropdown(null);
                setHoveredCategory(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (isMobileMenuVisible) document.body.classList.add("overflow-hidden");
        else document.body.classList.remove("overflow-hidden");
        return () => document.body.classList.remove("overflow-hidden");
    }, [isMobileMenuVisible]);

    return (
        <>
            <Ribbon />

            <nav
                className="sticky top-0 z-50 w-full bg-white transition-all duration-300"
                ref={navbarRef}
            >
                {/* Top border */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black to-transparent"></div>

                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Logo />

                        {/* Desktop Navigation */}
                        <div
                            className="hidden lg:flex items-center space-x-2"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            {navItems.map((nav, index) => {

                                const isFirst = index === 0;
                                const isLast = index === navItems.length - 1;

                                return (
                                    <div key={nav.id} className="relative">
                                        <button
                                            className={`relative flex items-center space-x-1 px-5 py-2.5 rounded-xl text-sm font-semibold text-black transition-all duration-300 ${activeDropdown === nav.id ? "bg-white/20 shadow-lg" : "hover:bg-white/10"
                                                }`}
                                            onClick={() => handleDropdownClick(nav.id)}
                                        >
                                            <span>{nav.title}</span>
                                            {nav.children && <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${activeDropdown === nav.id ? "rotate-180" : ""}`} />}
                                        </button>


                                        {/* Dropdown Menu */}
                                        {nav.children && activeDropdown === nav.id && (
                                            <div
                                                className={`absolute top-full mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden
    animate-in fade-in slide-in-from-top-2 duration-200
    ${isFirst ? "left-0" : isLast ? "right-0" : "left-1/2 -translate-x-1/2"}`}
                                            >
                                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600" />

                                                <div className="p-5 space-y-2">
                                                    {nav.children.map((cat) => (
                                                        <div key={cat.id} className="space-y-1">
                                                            <button
                                                                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-semibold transition-all duration-200
              ${hoveredCategory === cat.id
                                                                        ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-sm"
                                                                        : "text-gray-900 hover:bg-gray-50"
                                                                    }`}
                                                                onClick={() =>
                                                                    setHoveredCategory(hoveredCategory === cat.id ? null : cat.id)
                                                                }
                                                            >
                                                                <span>{cat.title}</span>
                                                                {cat.children && (
                                                                    <ChevronDown
                                                                        className={`h-4 w-4 transition-transform duration-200 ${hoveredCategory === cat.id ? "rotate-180" : ""
                                                                            }`}
                                                                    />
                                                                )}
                                                            </button>

                                                            {hoveredCategory === cat.id && cat.children && (
                                                                <div className="ml-5 space-y-1 border-l-2 border-blue-200 pl-3">
                                                                    {cat.children.map((last) => (
                                                                        <Link
                                                                            key={last.id}
                                                                            href={`/navitem/${last.slug}`}
                                                                            className="block px-4 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all font-medium"
                                                                            onClick={() => {
                                                                                setActiveDropdown(null);
                                                                                setHoveredCategory(null);
                                                                            }}
                                                                        >
                                                                            {last.title}
                                                                        </Link>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                    </div>
                                )
                            })}
                        </div>

                        {/* Desktop Login */}
                        <div className="hidden lg:flex items-center space-x-4">
                            <Link
                                // href="/login"
                                href={"/"}
                                className="relative px-7 py-3 text-sm font-bold bg-white rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden group"
                            >
                                <span className="relative z-10">Login</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuVisible(!isMobileMenuVisible)}
                            className="lg:hidden p-2.5 rounded-xl text-black active:scale-95"
                            aria-label="Toggle mobile menu"
                        >
                            {isMobileMenuVisible ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuVisible && (
                    <div className="lg:hidden backdrop-blur-xl border-t border-white/10 animate-in slide-in-from-top duration-200">
                        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto px-4 py-6 space-y-3">
                            {navItems.map((nav) => (
                                <div key={nav.id} className="space-y-2">
                                    <button
                                        className={`w-full flex items-center justify-between px-5 py-3.5 rounded-xl font-semibold transition-all duration-200 ${activeDropdown === nav.id ? "bg-white/15 text-black shadow-lg" : "text-black hover:bg-white/10"
                                            }`}
                                        onClick={() => handleDropdownClick(nav.id)}
                                    >
                                        <span>{nav.title}</span>
                                        {nav.children && <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${activeDropdown === nav.id ? "rotate-180" : ""}`} />}
                                    </button>

                                    {nav.children && activeDropdown === nav.id && (
                                        <div className="ml-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                            {nav.children.map((cat) => (
                                                <div key={cat.id} className="space-y-1">
                                                    <button
                                                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${hoveredCategory === cat.id ? "bg-white/15 text-black shadow-md" : "text-black hover:bg-white/10"
                                                            }`}
                                                        onClick={() => setHoveredCategory(hoveredCategory === cat.id ? null : cat.id)}
                                                    >
                                                        <span>{cat.title}</span>
                                                        {cat.children && <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${hoveredCategory === cat.id ? "rotate-180" : ""}`} />}
                                                    </button>

                                                    {hoveredCategory === cat.id && cat.children && (
                                                        <div className="ml-5 space-y-1 animate-in fade-in duration-150 border-l-2 border-blue-400/30 pl-3">
                                                            {
                                                                cat.children.map((last) => (
                                                                    <Link
                                                                        key={last.id}
                                                                        href={`/navitem/${last.slug}`}
                                                                        onClick={() => setIsMobileMenuVisible(false)}
                                                                        className="block px-4 py-2.5 text-sm text-black rounded-lg hover:bg-white/10 hover:text-white transition-all duration-150 font-medium"
                                                                    >
                                                                        {last.title}
                                                                    </Link>
                                                                ))
                                                            }
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}

                            <Link
                                // href="/login"
                                href="/"
                                onClick={() => setIsMobileMenuVisible(false)}
                                className="block w-full text-center px-7 py-4 mt-6 text-sm font-bold bg-white text-black rounded-xl hover:bg-blue-50 transition-all duration-200 shadow-lg active:scale-95"
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
}