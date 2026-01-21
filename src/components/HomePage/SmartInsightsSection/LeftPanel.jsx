import { THEMES } from "@/styles/themes";
import React from "react";

function LeftPanel({ stepsSection = [], activeStep = 0, onStepChange }) {
    return (
        <div className="space-y-4 sm:space-y-5 md:space-y-6">
            {stepsSection.map((step, i) => {
                const isActive = activeStep === i;

                return (
                    <div
                        key={step.title}
                        onClick={() => onStepChange(i)}
                        className={`
                            glass-card cursor-pointer rounded-2xl 
                            p-5 sm:p-6 md:p-8
                            transition-all duration-300
                            
                            ring-1 border
                            ${isActive
                                ? "ring-white-400 border-transparent bg-white/10 shadow-inner"
                                : "ring-transparent border-white/10 hover:bg-white/5"
                            }
                        `}
                    >
                        <div className="flex items-start gap-4 sm:gap-5 md:gap-6">

                            {/* Number Badge */}
                            <div
                                className={`
                                    shrink-0 
                                    w-9 h-9 
                                    sm:w-10 sm:h-10
                                    md:w-11 md:h-11
                                    lg:w-12 lg:h-12
                                    rounded-full flex items-center justify-center

                                    text-base 
                                    sm:text-lg 
                                    md:text-xl 
                                    lg:text-2xl

                                    font-semibold transition-all duration-300
                                    ${isActive
                                        ? `bg-black ${THEMES.current.textPrimary}`
                                        : "bg-white/10 text-black"
                                    }
                                `}
                            >
                                {i + 1}
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <h3
                                    className={`
                                        text-xl sm:text-2xl md:text-[28px]
                                        font-semibold
                                        transition-colors duration-300
                                        ${isActive ?  `${THEMES.current.textPrimary}` : "text-white"}
                                    `}
                                >
                                    {step.title}
                                </h3>

                                <p
                                    className={`
                                        mt-2 sm:mt-3
                                    ${THEMES.current.textSecondary} leading-relaxed
                                        text-sm sm:text-base md:text-[17px]
                                    `}
                                >
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default LeftPanel;