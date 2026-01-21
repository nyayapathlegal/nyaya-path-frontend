import React from "react";

export function TalkToUsButton({ text, className = "" }) {
    return (
        <button
            className={`
                px-5 py-2 rounded-full font-medium
                bg-white text-black
                transition-all duration-300
                hover:bg-black/50 
                hover:text-white ${className}
            `}
        >
            {text}
        </button>
    );
}
