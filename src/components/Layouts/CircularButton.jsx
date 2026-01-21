import React from "react";

export const CircularButton = ({ className = "", text = "", onClick }) => {
  return (
    <button
      className={`
                inline-flex items-center
                max-w-[250px]
                px-5 py-2.5
                -ml-1
                rounded-full
                bg-white/5
                border border-white/10
                hover:bg-white/10
                transition
                shadow-lg shadow-black/20
                ${className}
            `}
      onClick={() => onClick && onClick()}
    >
      <span className="text-white text-[14px] leading-6">{text}</span>
    </button>
  );
};
