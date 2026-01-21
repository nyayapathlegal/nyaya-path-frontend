import { THEMES } from "@/styles/themes";
import React from "react";

const BottomRightSection = ({ cards = [] }) => {

    return (
        <div className="
        
            grid
            grid-cols-1

            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            
            gap-y-8
            
            sm:gap-y-6
            sm:gap-x-4
        ">
            {
                cards.map( (item) => {
                // const Icon = item.icon;

                    return (
                        <div key={item.title} className="pl-4 border-l border-white/15 w-46">
                            {/* <div className="mb-4">
                                {Icon && <Icon className="w-5 h-5 text-white/80" />}
                            </div> */}

                            <p className="text-base font-normal mb-1">{item.title}</p>
                            <p className={`text-md ${THEMES.current.textSecondary} leading-relaxed`}>{item.description}</p>
                        </div>
                    );
                })
            }
        </div>
    );
};

export default BottomRightSection;
