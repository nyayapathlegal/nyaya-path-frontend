import { THEMES } from "@/styles/themes";
import { Lightbulb } from "lucide-react";
import React from "react";

const TopSection = ({title, description, ctaText}) => {
    return (
        <div className="relative z-10 
            flex flex-col items-center justify-center 
            py-12 px-6 text-center 
            sm:py-16 sm:px-8 
            md:py-20 md:px-12"
        >

            <div className="flex items-center gap-3 mb-5 sm:gap-4 md:gap-6">
                <div className="flex items-start sm:gap-2">

                    {/* Icon responsive size */}
                    <Lightbulb
                        size={80}                 // default mobile
                        className="sm:w-14 sm:h-14 md:w-16 md:h-16"
                    />

                    <div className="flex justify-start -ml-10 sm:ml-0">
                        <span
                            className={`
                                text-4xl sm:text-5xl md:text-6xl lg:text-7xl
                                font-semibold tracking-tight
                               ${THEMES.current.textPrimary}
                            `}
                        >
                           {title}
                        </span>
                    </div>
                </div>
            </div>

            <p className="text-justify
                max-w-3xl 
                text-base sm:text-lg md:text-xl lg:text-2xl
                text-gray-300 
                leading-relaxed"
            >
               {description}

            </p>

            <button className="
                mt-8 sm:mt-10 md:mt-12
                px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5
                bg-white/10 backdrop-blur-md border border-white/20 
                rounded-full 
                text-base sm:text-lg md:text-xl
                font-medium
                hover:bg-white/20 transition"
            >
               {ctaText}

            </button>
        </div>

    );
};

export default TopSection;