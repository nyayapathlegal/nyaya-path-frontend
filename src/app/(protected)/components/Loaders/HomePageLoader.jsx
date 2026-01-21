const HomePageLoader = ({ count = 3 }) => {
    return (
        <div className="space-y-6 animate-pulse">
            {
                Array.from({ length: count }).map((_, i) => (
                    <div
                        key={i}
                        className="rounded-lg border border-white/10 bg-white/5 p-4 space-y-3"
                    >
                        <div className="h-3 w-32 bg-white/10 rounded" />
                        <div className="flex gap-2">
                            <div className="h-10 flex-1 bg-white/10 rounded" />
                            <div className="h-10 flex-1 bg-white/10 rounded" />
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default HomePageLoader;
