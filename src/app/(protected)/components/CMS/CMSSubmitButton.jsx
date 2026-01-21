const CMSSubmitButton = ({
    onClick,
    loading = false,
    disabled = false,
    label = "Save",
    loadingLabel = "Saving...",
    className = ""
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled || loading}
            className={`
                ml-auto w-80 rounded-md
                bg-[#2a2a2a]
                border-2 border-[#3a3a3a]
                px-6 py-2
                text-sm font-medium text-gray-200
                transition-all duration-200

                hover:bg-[#333]
                hover:border-[#555]
                hover:text-white

                active:scale-[0.98]

                disabled:opacity-50
                disabled:cursor-not-allowed

                ${className}
            `}
        >
            {
                loading ? (
                    <span className="flex items-center justify-center gap-2">
                        <span
                            className="h-4 w-4 animate-spin rounded-full
                            border-2 border-gray-400 border-t-transparent"
                        />
                        {loadingLabel}
                    </span>
                ) : (
                    label
                )
            }
        </button>
    );
};

export default CMSSubmitButton;