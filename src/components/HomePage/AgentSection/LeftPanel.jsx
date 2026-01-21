import React from "react";
import NameDescBtn from "./NameDescBtn";
import { THEMES } from "@/styles/themes";

function StepItem({ title, desc, active, icon: Icon, onClick }) {
    return (
        <div
            onClick={onClick}
            className={`
                w-full md:w-[95%] 
                group 
                cursor-pointer 
                rounded-xl 
                transition-all 
                duration-300 
                ${active ? "bg-white/5" : ""}
                
                flex
                flex-col
                
                p-4
                gap-1.5        
    
                md:p-3
                md:gap-3

                lg:p-4
                lg:gap-3.5
            `}
        >

            {/* Icon + Title */}
            <div className="flex items-center gap-3 relative py-2">
                {
                    Icon && (
                        <div
                            className={`
                                p-2 rounded-lg transition-all duration-300
                                ${active ? "bg-white/10" : "bg-white/5 group-hover:bg-white/10"}
                            `}
                        >
                            <Icon
                                size={15}
                                className={active ? "text-white" : "text-white/60 group-hover:text-white"}
                            />
                        </div>
                    )
                }

                <p
                    className={`
                        text-lg font-medium transition-all duration-300 
                        ${active ? `${THEMES.current.textPrimary}` : "text-white/60 group-hover:text-white"}
                    `}
                >
                    {title}
                </p>

                {/* Underline */}
                <span
                    className={`absolute left-0 -bottom-2 md:-bottom-3 h-0.5 rounded-full transition-all duration-500 
                        ${active
                            ? "w-full bg-linear-to-r from-cyan-400 to-purple-500"
                            : "w-0 bg-white/30 group-hover:w-full group-hover:bg-white/60"
                        }
                    `}
                />
            </div>


            {/* Description */}
            <div
                className={`
                    grid transition-all duration-500 ease-in-out 
                    ${active ? "grid-rows-[1fr] mt-4" : "grid-rows-[0fr]"}
                `}
            >
                <div className="overflow-hidden">
                    <p className={`text-sm ${THEMES.current.textSecondary} leading-relaxed`}>{desc}</p>
                </div>
            </div>

        </div>
    );
}


export default function LeftPanel({
    stepsData,
    activeStep = 0,
    onStepChange,
}) {
    return (
        <div className="w-full flex flex-col flex-1 backdrop-blur-2xl">
           
            <div className="p-4">
                <NameDescBtn 
                    heading={stepsData.heading}
                    description={stepsData.description} 
                    btnText={stepsData.btnText}
                />
            </div>

            <nav className="flex-1 p-6 overflow-y-auto">
                <div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 space-y-3 md:space-y-1 ">
                    {
                        stepsData?.steps?.map((item, i) => (
                            <StepItem
                                key={item.title}
                                title={item.title}
                                icon={item.icon}
                                desc={item.description}
                                active={activeStep === i}
                                onClick={() => onStepChange(i)}
                            />
                        ))
                    }
                </div>
            </nav>
        </div>
    );
}