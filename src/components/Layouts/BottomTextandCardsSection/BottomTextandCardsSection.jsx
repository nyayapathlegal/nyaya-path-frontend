import React from "react";
import BottomLeftSection from "./BottomLeftSection";
import BottomRightSection from "./BottomRightSection";

export const BottomTextandCardsSection = ({
    className,
    leftTitle,
    leftSubtitle,
    para,
    cards = [],
}) => {
    return (
        <div
            className={`

                mt-15
                px-6 
                py-7 
        
                flex 
                flex-col
                gap-13
        
                
                sm:mt-20
                md:mt-30                
                lg:mt-40
                
                ${className}`
            }
        >
            <BottomLeftSection leftTitle={leftTitle} leftSubtitle={leftSubtitle} para={para}/>
            <BottomRightSection cards={cards} />
        </div>
    );
};
