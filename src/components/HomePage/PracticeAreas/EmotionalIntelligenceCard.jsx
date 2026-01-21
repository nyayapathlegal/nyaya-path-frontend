import React, { useEffect, useState } from "react";

const LegalExpertiseCard = ({ card }) => {
	const [loaded, setLoaded] = useState(false);
	const [counts, setCounts] = useState(card.metrics.map(() => 0));

	useEffect(() => {
		setLoaded(true);

		const intervals = card.metrics.map((item, i) => {
			const step = Math.ceil(item.value / 100);
			return setInterval(() => {
				setCounts(prev => {
					const newCounts = [...prev];
					if (newCounts[i] < item.value) {
						newCounts[i] = Math.min(newCounts[i] + step, item.value);
					}
					return newCounts;
				});
			}, 30);
		});

		return () => intervals.forEach(clearInterval);
	}, [card.metrics]);

	return (
		<div className="flex items-center justify-center p-1 sm:p-8">
			<div className="w-full max-w-xl relative">
				{/* Glassmorphic Card */}
				<div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">

					{/* Animated blobs */}
					<div className="absolute -top-24 -left-24 w-48 h-48 sm:w-60 sm:h-60 bg-amber-500/20 rounded-full blur-3xl animate-blob mix-blend-multiply" />
					<div className="absolute -bottom-24 -right-24 w-64 h-64 sm:w-80 sm:h-80 bg-yellow-500/20 rounded-full blur-3xl animate-blob animation-delay-2000 mix-blend-multiply" />
					<div className="absolute top-10 right-10 sm:right-20 w-20 h-20 sm:w-28 sm:h-28 bg-amber-400/10 rounded-full blur-2xl animate-blob animation-delay-4000 mix-blend-multiply" />

					{/* Shimmer overlay */}
					<div className="absolute inset-0 bg-linear-to-r from-amber-400/5 via-yellow-400/10 to-amber-500/5 opacity-30 animate-shimmer pointer-events-none" />

					{/* Header */}
					<div className={`px-6 sm:px-10 pt-10 sm:pt-12 pb-6 sm:pb-8 text-center relative z-10 transition-all duration-1000 ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
						<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight animate-popIn">
							{card.title}
						</h2>
						<p className="mt-2 sm:mt-3 text-amber-400/80 text-xs sm:text-sm uppercase tracking-wider font-medium animate-popIn delay-150">
							Areas of Expertise
						</p>
					</div>

					{/* Skill Bars */}
					<div className="px-6 sm:px-10 pb-8 sm:pb-12 space-y-5 sm:space-y-7 relative z-10">
						{card.metrics.map((item, i) => (
							<div
								key={i}
								className={`group opacity-0 ${loaded ? "animate-fadeInUp" : ""}`}
								style={{ animationDelay: `${i * 200 + 300}ms`, animationFillMode: "forwards" }}
							>
								<div className="flex justify-between items-baseline mb-2 sm:mb-3">
									<span className="text-white/90 font-medium text-sm sm:text-lg">{item.label}</span>
									<span className="text-amber-400 font-bold text-lg sm:text-xl">{counts[i]}%</span>
								</div>

								{/* Progress bar */}
								<div className="h-2 sm:h-3 bg-white/10 rounded-full overflow-hidden relative">
									<div
										className="h-full bg-linear-to-r from-amber-400 via-amber-500 to-yellow-500 rounded-full origin-left transition-all ease-out"
										style={{
											width: loaded ? `${item.value}%` : "0%",
											transitionDuration: "3s",
										}}
									>
										<div className="h-full w-full bg-white/30 blur-md scale-x-150 animate-pulse" />
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Footer */}
					<div className="px-6 sm:px-10 pb-6 sm:pb-10 text-center relative z-10">
						<p className="text-white/50 text-xs sm:text-sm italic animate-popIn delay-500">
							Excellence in Legal Practice
						</p>
					</div>
				</div>
			</div>

			<style jsx global>{`
        @keyframes fadeInUp { from {opacity:0; transform: translateY(20px);} to {opacity:1; transform: translateY(0);} }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }

        @keyframes popIn { from {opacity:0; transform: scale(0.9);} to {opacity:1; transform: scale(1);} }
        .animate-popIn { animation: popIn 0.6s ease-out forwards; }

        @keyframes blob {
          0%,100% { transform: translate(0px,0px) scale(1); }
          33% { transform: translate(30px,-50px) scale(1.1); }
          66% { transform: translate(-20px,20px) scale(0.9); }
        }
        .animate-blob { animation: blob 8s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }

        @keyframes shimmer { 0%{background-position:-500px 0;} 100%{background-position:500px 0;} }
        .animate-shimmer { background-size:1000px 100%; animation: shimmer 6s linear infinite; }
      `}</style>
		</div>
	);
};

export default LegalExpertiseCard;