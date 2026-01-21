function SmallBadge({title}) {
    return (
        <div
            className="
            group
            inline-flex items-center
            font-medium text-white 
            whitespace-nowrap
            bg-white/10 border border-white/15 
            backdrop-blur-[6px]
            transition-all duration-300 
            hover:bg-white/15 hover:border-white/25
            max-w-full

            /* Base */
            gap-2
            px-3
            py-1
            rounded-full
            text-[10px]

            /* SM */
            sm:gap-2.5
            sm:px-4
            sm:text-[12px]

            /* MD */
            md:px-5

            /* LG */
            lg:px-6
            "
        >
            {/* Glowing indicator dot */}
            <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-blue-400 blur-[3px] opacity-90" />
                <span className="relative h-2 w-2 rounded-full bg-blue-300" />
            </span>

                {
                    title
                }


            {/* Arrow */}
            <span
                className="
                    flex items-center
                    transition-all duration-300
                    group-hover:translate-x-[3px]
                    opacity-90
                "
            >
                <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    className="stroke-white"
                >
                    <path
                        d="M2 1 L7 5 L2 9"
                        fill="none"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                    />
                </svg>
            </span>
        </div>
    );
}

export default SmallBadge;
