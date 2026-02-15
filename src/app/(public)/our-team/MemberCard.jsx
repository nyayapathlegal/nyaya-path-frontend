import React from 'react'
import Image from "next/image";
import { useState } from "react";

// ─── Avatar fallback ──────────────────────────────────────────────────────────
function Avatar({ name, accentLight, accentText }) {
    const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
    return (
        <div className={`w-full h-full rounded-full flex items-center justify-center ${accentLight}`}>
            <span className={`font-serif font-black text-3xl ${accentText}`}>{initials}</span>
        </div>
    );
}



const MemberCard = ({ member, theme }) => {
    const [imgError, setImgError] = useState(false);

    return (
        <div className="
      group relative flex-shrink-0 w-64 sm:w-72
      bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm
      hover:shadow-2xl hover:-translate-y-2
      transition-all duration-300 ease-out
      select-none cursor-pointer
    ">
            {/* Photo zone */}
            <div className={`relative w-full h-52 flex items-center justify-center ${theme.accentLight} overflow-hidden`}>
                <div className={`absolute w-36 h-36 rounded-full ${theme.accentBg} opacity-10
                        group-hover:scale-125 transition-transform duration-500`} />

                <div className="relative w-28 h-28 rounded-full overflow-hidden z-10 ring-2 ring-white ring-offset-2">
                    {
                        member.photo && !imgError ? (
                            <Image
                                src={member.photo}
                                alt={member.name}
                                fill
                                className="object-cover"
                                onError={() => setImgError(true)}
                            />
                        ) : (
                            <Avatar 
                                name={member.name} 
                                accentLight={theme.accentLight} 
                                accentText={theme.accentText} 
                            />
                        )
                    }
                </div>

                {/* Render badge only if API sends it */}
                {member.badge && (
                    <span className={`absolute top-3 right-3 ${theme.badgeBg} text-white
                           text-[10px] font-semibold tracking-widest uppercase
                           px-2.5 py-1 rounded-full`}>
                        {member.badge}
                    </span>
                )}

                {/* Render experience only if API sends it */}
                {member.experience && (
                    <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm
                           text-gray-600 text-[10px] font-semibold tracking-wide
                           px-2.5 py-1 rounded-full">
                        {member.experience}
                    </span>
                )}
            </div>

            {/* Text info */}
            <div className="px-5 pt-4 pb-6">
                <h3 className="font-serif font-bold text-gray-900 text-[19px] leading-tight tracking-tight mb-1">
                    {member.name}
                </h3>
                <p className={`text-[10px] font-semibold uppercase tracking-widest ${theme.accentText} mb-3`}>
                    {member.role}
                </p>

                {/* Render specialization only if API sends it */}
                {member.specialization && (
                    <>
                        <div className="h-px bg-gray-100 mb-3" />
                        <p className="text-[11.5px] text-gray-400 leading-relaxed font-light">
                            {member.specialization}
                        </p>
                    </>
                )}
            </div>

            {/* Hover accent line */}
            <div className={`absolute bottom-0 left-0 right-0 h-[3px] ${theme.bottomLine}
                      scale-x-0 group-hover:scale-x-100
                      transition-transform duration-300 origin-left rounded-b-2xl`} />
        </div>
    );
}

export default MemberCard