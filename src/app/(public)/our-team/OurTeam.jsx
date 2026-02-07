"use client";

import Image from "next/image";
import React from "react";

// --- Sub-Component: Individual Member Card ---
const MemberCard = ({ member }) => {
    return (
        <div className="group bg-white rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl border border-gray-100 flex flex-col items-center text-center">
            <div className="relative mb-6 w-32 h-32">
                {/* Animated background accent */}
                <div className="absolute inset-0 bg-indigo-100 rounded-full scale-110 group-hover:scale-125 transition-transform duration-500 ease-out" />

                {/* Profile Image */}
                <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className="relative rounded-full object-cover border-4 border-white shadow-md"
                />
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">
                {member.name}
            </h3>

            <p className="text-sm font-semibold text-indigo-500 uppercase tracking-widest mb-4">
                {member.role}
            </p>

            <p className="text-gray-500 text-sm mb-6 line-clamp-2">
                Expertise in {member.role.toLowerCase()} with over 5 years of industry experience.
            </p>
        </div>
    );
};

// --- Sub-Component: Section Wrapper ---
const TeamSection = ({ title, members }) => {
    return (
        <section className="mb-20">
            <div className="flex items-center mb-10">
                <div className="h-1.5 w-12 bg-indigo-600 rounded-full mr-4" />
                <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">
                    {title}
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {
                    members.map((member, index) => (
                        <MemberCard key={index} member={member} />
                    ))
                }
            </div>
        </section>
    );
};

// --- Page Component (Next.js App Router) ---
export default function OurTeamPage() {
    const teams = {
        cs: [
            {
                name: "Amit Sharma",
                role: "Company Secretary",
                photo: "/team/cs1.jpg",
            },
            {
                name: "Neha Verma",
                role: "CS Associate",
                photo: "/team/cs2.jpg",
            },
        ],
        ca: [
            {
                name: "Rahul Mehta",
                role: "Chartered Accountant",
                photo: "/team/ca1.jpg",
            },
            {
                name: "Pooja Jain",
                role: "Tax Consultant",
                photo: "/team/ca2.jpg",
            },
            {
                name: "Vikas Gupta",
                role: "Audit Head",
                photo: "/team/ca3.jpg",
            },
        ],
        legal: [
            {
                name: "Ankit Singh",
                role: "Corporate Lawyer",
                photo: "/team/legal1.jpg",
            },
            {
                name: "Sneha Kapoor",
                role: "Legal Advisor",
                photo: "/team/legal2.jpg",
            },
        ],
    };

    return (
        <div className="bg-gray-50 min-h-screen font-sans antialiased">
            {/* Hero Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-20 text-center">
                    <span className="text-indigo-600 font-bold tracking-widest uppercase text-sm">
                        Professionals Behind Your Success
                    </span>
                    <h1 className="mt-4 text-5xl md:text-6xl font-black text-gray-900 tracking-tighter">
                        Our <span className="text-indigo-600">Team</span>
                    </h1>
                    <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        A specialized group of Chartered Accountants, Company Secretaries, and Legal Experts working together to protect your business interests.
                    </p>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-16">
                <TeamSection title="CS Team" members={teams.cs} />
                <TeamSection title="CA Team" members={teams.ca} />
                <TeamSection title="Legal Department" members={teams.legal} />
            </main>
        </div>
    );
}
