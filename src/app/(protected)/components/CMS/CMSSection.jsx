import React from "react";

const CMSSection = ({ title, children }) => {
    return (
        <section className="space-y-4 rounded-xl border border-white/10 bg-[#161616] p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-300">
                {title}
            </h2>
            {children}
        </section>
    );
};

export default CMSSection;
