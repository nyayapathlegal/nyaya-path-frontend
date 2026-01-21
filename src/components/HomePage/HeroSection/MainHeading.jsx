import { motion } from "framer-motion";

function MainHeading({ heading }) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                scale: 0.8,
                rotateX: 45,
                y: 50, // Starts lower
            }}
            animate={{
                opacity: 1,
                scale: 1,
                rotateX: 0,
                y: 0, // Slides up into place
            }}
            transition={{
                duration: 1,
                ease: [0.16, 1, 0.3, 1], // Custom "Expo Out" for a smooth, high-end feel
            }}
            style={{ perspective: "1500px", transformStyle: "preserve-3d" }}
            className="relative inline-block"
        >
            {/* FRONT TEXT */}
            <motion.span
                className="
                    relative z-20
                    text-3xl sm:text-5xl lg:text-7xl
                    font-extrabold
                    text-white
                    inline-block
                    drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]
                "
            >
                {heading}
            </motion.span>

            {/* DEPTH SHADOW LAYERS */}
            {[...Array(7)].map((_, i) => (
                <motion.span
                    key={i}
                    aria-hidden
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 + i * 0.05 }} // Slight staggered reveal
                    className="
                        absolute left-0 top-0
                        text-3xl sm:text-5xl lg:text-7xl
                        font-extrabold
                        text-white/10
                        -z-10
                        select-none
                    "
                    style={{
                        // This transform creates the "stepped" 3D extrusion look
                        transform: `translate3d(${i + 1}px, ${i + 1}px, -${i + 1}px)`,
                    }}
                >
                    {heading}
                </motion.span>
            ))}
        </motion.div>
    );
}

export default MainHeading;
