import { CircularButton } from "@/components/Layouts";
import React from "react";
import { AppWindowIcon } from "./AppWindowIcon";
import { THEMES } from "@/styles/themes";

const NameDescBtn = ({ heading, description, btnText }) => {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <AppWindowIcon />
                <h1 className={`text-[32px] ${THEMES.current.textPrimary} font-[450] self-start tracking-tight`}>
                    {heading}
                </h1>
            </div>

            {/* <h1 className="text-[32px] font-semibold tracking-tight">Agent Canvas</h1> */}

            <p className={`${THEMES.current.textSecondary} text-[18px] leading-7`}>
                {description}
            </p>

            <CircularButton text={btnText} />
        </div>
    );
};

export default NameDescBtn;