"use client";

const CMSFallback = ({ message = "No data found" }) => {
    return (
        <div className="p-6 text-sm text-gray-400 italic">
            {message}
        </div>
    );
};

export default CMSFallback;
