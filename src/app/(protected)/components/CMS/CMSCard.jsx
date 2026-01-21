const CMSCard = ({ children, className="" }) => {
    return (
        <div className={`space-y-3 rounded-lg border border-white/10 bg-[#1b1b1b] p-4 ${className}`}>
            {children}
        </div>
    );
};

export default CMSCard;