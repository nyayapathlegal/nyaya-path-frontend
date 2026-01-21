"use client";

import { useState } from "react";

const CMSDetailsWrapper = ({ summary="New", children, defaultOpen = false}) => {
    
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <details
            open={isOpen}
            onToggle={e => setIsOpen(e.target.open)}
        >
            <summary  className={`border border-white/10 rounded-lg p-3 inline-block cursor-pointer font-medium text-white`}>
                {summary} 
            </summary>

            <div className="mt-5">
                {children}  
            </div>
        </details>
    );
};

export default CMSDetailsWrapper;
