import React from "react";

const LeftSection = ({description}) => {
    return (
        <h2 className="text-lg md:text-xl lg:text-2xl font-light leading-relaxed max-w-xl">
            {
                description
            }
        </h2>
    );
};

export default LeftSection;
