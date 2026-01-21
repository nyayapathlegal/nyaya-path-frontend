export const Badge = ({ text, className }) => {
    return (
        <div className={`flex items-center gap-2 mb-6 ${className}`}>
            <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
            <span className="text-[12px] tracking-[2px] font-medium uppercase">
                {text}
            </span>
        </div>
    );
};
