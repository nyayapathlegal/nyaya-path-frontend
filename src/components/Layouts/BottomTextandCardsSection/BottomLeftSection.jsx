import React from "react";
import { Badge } from "..";
import { THEMES } from "@/styles/themes";

const BottomLeftSection = ({ leftTitle = "", leftSubtitle = "", para = "" }) => {
    return (
        <div className="w-full 
                flex flex-col 
                gap-6    
                md:flex-row 
                md:items-start 
                md:justify-between 
                lg:gap-80
            "
        >
            
            {/* LEFT SIDE */}
            <div className="w-full md:w-1/2">
                <Badge text={leftTitle} />
                <div className="w-full md:min-w-70">
                    <span
                        className="
                            text-[35px]
                            sm:text-[40px]
                            leading-[1.05]
                            font-light
                        "
                    >
                        {leftSubtitle}
                    </span>
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="w-full md:w-1/2">
                <p
                    className={`
                        text-base
                        md:text-lg
                        leading-relaxed
                        ${THEMES.current.textPrimary}
                        font-normal
                    `}
                    style={{ fontFamily: "var(--font-secondary)" }}
                >
                    {para}
                </p>
            </div>
        </div>
    );
};

export default BottomLeftSection;
