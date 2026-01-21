import { motion } from "framer-motion";

const listVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.4,
            ease: "easeOut",
        },
    },
};

export default function SubServicePage({ data }) {
    const { service, sub } = data;
    console.log(service.image);
    return (
        <section className="relative">
            {/* HERO */}
            <div
                className="relative h-[45vh] flex items-center justify-center"
                style={{
                    backgroundImage: `url(${service.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-black/60" />

                <div className="relative z-10 max-w-4xl px-4 text-center text-white">
                    <p className="text-sm uppercase tracking-wide opacity-80 mb-2">
                        {service.title}
                    </p>
                    <h1 className="text-3xl sm:text-5xl font-extrabold">
                        {sub.title}
                    </h1>
                </div>
            </div>

            {/* CONTENT */}
            <div className="relative z-20 -mt-20">
                <div className="max-w-4xl mx-auto px-6 py-10 bg-white rounded-2xl shadow-xl">
                    <h2 className="text-xl font-semibold mb-6">
                        What this service includes ?
                    </h2>
                    <ul className="space-y-4 text-slate-700">
                        <motion.div
                            variants={listVariants}
                            initial="hidden"
                            animate="show"
                        >
                            {sub.points.map((point, i) => (
                                <motion.li
                                    key={i}
                                    variants={itemVariants}
                                    className="group flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition"
                                >
                                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-blue-600 group-hover:scale-125 transition-transform" />
                                    <span className="leading-relaxed">
                                        {point}
                                    </span>
                                </motion.li>
                            ))}
                        </motion.div>
                    </ul>
                </div>
            </div>
        </section>
    );
}
