import { THEMES } from "@/styles/themes";
import { motion } from "framer-motion";

export const FeatureCard = ({ feature, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            animate={{ y: [0, -6, 0] }}
            transition={{
                y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                opacity: { duration: 0.7, delay: index * 0.15 },
            }}
            whileHover={{
                scale: 1.05,
                rotateX: 4,
                rotateY: -4,
                boxShadow: "0px 15px 40px rgba(0,0,0,0.4)",
            }}
            className="p-6 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md shadow-xl transition-all cursor-pointer">
            <h3 className={`font-semibold ${THEMES.current.textPrimary} mb-2`}>{feature.title}</h3>
            <p className={`text-gray-300 text-sm leading-relaxed ${THEMES.current.textSecondary}`}>{feature.desc}</p>
        </motion.div>
    );
};
