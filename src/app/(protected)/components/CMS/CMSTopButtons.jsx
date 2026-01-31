"use client";

const CMSTopButton = ({
    label,
    onClick,
    active = false,
    disabled = false,
    loading = false,
    className = "",
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled || loading}
            className={`
                px-3 py-2 font-medium rounded-t-md
                transition-colors
                ${active ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"}
                disabled:opacity-50 disabled:cursor-not-allowed
                ${className}
            `}
        >
            {label}
        </button>
    );
};

export default CMSTopButton;
