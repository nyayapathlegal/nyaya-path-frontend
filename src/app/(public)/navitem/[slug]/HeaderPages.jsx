"use client";

import { motion } from "framer-motion";
import { MEDIA_FALLBACK } from "@/config/fallbacks/mediaFallback";
import { useEffect, useState } from "react";
import { getMediaSection } from "@/api/home/home.api";
const HeaderPages = ({ page }) => {
    const { hero, section } = page;

    const heroTextVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i = 1) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.2,
                duration: 0.6,
                ease: "easeOut",
            },
        }),
    };


    const [imageUrl, setImageUrl] = useState(MEDIA_FALLBACK.images.headerPageImage);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getMediaSection();
                setImageUrl(res?.images?.homeRightImage);
            }
            catch (err) {
                console.error(err);
                setImageUrl(MEDIA_FALLBACK.images.homeRightImage);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="w-full">
            {/* ================= HERO SECTION ================= */}
            <section
                className="relative h-screen flex items-center bg-cover bg-center pt-10"
                style={{
                    backgroundImage: `url(${imageUrl})`,
                }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/40" />

                {/* Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center text-white">
                    <div className="flex flex-col items-start text-left">
                        <motion.h1
                            className="text-3xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6"
                            custom={1}
                            variants={heroTextVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {hero.heading}
                        </motion.h1>

                        <motion.h2
                            className="text-xl md:text-2xl font-semibold text-amber-400 mb-4"
                            custom={2}
                            variants={heroTextVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {hero.subheading}
                        </motion.h2>

                        <motion.p
                            className="text-lg text-slate-400 mb-10 max-w-lg leading-relaxed"
                            custom={3}
                            variants={heroTextVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {hero.description}
                        </motion.p>

                        <motion.button
                            className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-8 py-4 rounded-xl shadow-lg shadow-amber-500/20 transition-all"
                            custom={4}
                            variants={heroTextVariants}
                            initial="hidden"
                            animate="visible"
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Book Consultation
                        </motion.button>
                    </div>
                </div>
            </section>

            {/* ================= CONTENT SECTION ================= */}
            <section className="bg-slate-50 py-20 relative overflow-hidden">
                <div className="absolute -top-20 -left-20 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl animate-pulse-slow" />

                <div className="max-w-3xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: [0.21, 1.02, 0.47, 0.98] }}
                        className="mb-12"
                    >
                        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
                            {section.title}
                        </h2>

                        <div className="flex justify-center mt-4">
                            <motion.div
                                className="h-1.5 w-12 bg-amber-500 rounded-full"
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
                                style={{ transformOrigin: "center" }}
                            />
                        </div>
                    </motion.div>

                    <div className="max-w-2xl mx-auto space-y-8">
                        {section.content.split("\n").map((para, index) => (
                            <motion.p
                                key={index}
                                className="text-lg md:text-xl text-slate-700 leading-relaxed tracking-wide"
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    delay: 0.2 + index * 0.1,
                                    duration: 0.7,
                                    ease: "easeOut",
                                }}
                            >
                                {para}
                            </motion.p>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HeaderPages;