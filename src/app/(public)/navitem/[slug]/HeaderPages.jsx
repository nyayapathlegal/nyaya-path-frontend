"use client";

import { motion } from "framer-motion";
import { Calendar, CheckCircle2, FileText, ShieldCheck, UserCheck, MessageSquare, ArrowRight, Phone, Mail, Briefcase} from "lucide-react";
import { MEDIA_FALLBACK } from "@/config/fallbacks/mediaFallback";

const Section = ({
    title,
    children,
    bg = "bg-white",
    align = "left",
}) => (
    <section className={`${bg} py-8 md:py-22`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

            {/* Section Header */}
            <motion.div
                className={`mb-10 md:mb-14 ${align === "center" ? "text-center" : "text-left"
                    }`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <span className="inline-block h-1 w-10 bg-amber-500 rounded-full mb-4" />

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
                    {title}
                </h2>
            </motion.div>

            {/* Content */}
            <div className="relative">
                {children}
            </div>
        </div>
    </section>
);


const FeatureCard = ({ icon: Icon, children, className = "" }) => (
    <div
        className={`group bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${className}`}
    >
        {
            Icon && (
                <div className="w-14 h-14 rounded-xl bg-amber-100 flex items-center justify-center mb-6 text-amber-700 group-hover:text-amber-600 transition-colors">
                    <Icon size={28} strokeWidth={2} />
                </div>
            )
        }
        {children}
    </div>
);

const NumberedCard = ({ number, children }) => (
    <div className="group bg-white rounded-2xl p-7 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-start gap-6">
        <div className="shrink-0 w-14 h-14 rounded-full bg-amber-600 text-white font-bold text-2xl flex items-center justify-center shadow-md">
            {number}
        </div>
        <p className="text-lg text-gray-700 leading-relaxed pt-2">{children}</p>
    </div>
);

const StickyForm = () => (
    <div className="sticky top-6 md:top-28 z-10">
        <div className="bg-white rounded-2xl shadow-xl p-5 md:p-6 border border-gray-100">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
                <Calendar className="text-amber-600" size={22} strokeWidth={2} />
                <h3 className="text-xl font-bold text-gray-900">
                    Free Consultation
                </h3>
            </div>

            <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                Our expert will contact you within 24 hours.
            </p>

            {/* Form */}
            <form className="space-y-6">
                {
                [
                    { label: "Full Name", icon: UserCheck, type: "text" },
                    { label: "Email Address", icon: Mail, type: "email" },
                    { label: "Phone Number", icon: Phone, type: "tel" },
                ].map(({ label, icon: Icon, type }) => (
                    <div key={label}>
                        <label className="flex items-center gap-2 text-xs font-medium text-gray-700 mb-1.5">
                            <Icon size={14} className="text-amber-600" />
                            {label}
                        </label>
                        <input
                            type={type}
                            placeholder={label}
                            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm
                         focus:border-amber-500 focus:ring-2 focus:ring-amber-200/40
                         focus:outline-none transition"
                            required
                        />
                    </div>
                ))}

                {/* Select */}
                <div>
                    <label className="flex items-center gap-2 text-xs font-medium text-gray-700 mb-1.5">
                        <Briefcase size={14} className="text-amber-600" />
                        Service
                    </label>
                    <select
                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm
                       focus:border-amber-500 focus:ring-2 focus:ring-amber-200/40
                       focus:outline-none transition"
                    >
                        <option value="">Select service</option>
                        <option>Registration</option>
                        <option>Consulting</option>
                        <option>Compliance</option>
                    </select>
                </div>

                {/* Button */}
                <button
                    type="submit"
                    className="w-full mt-2 bg-linear-to-r from-amber-600 to-amber-500
                     hover:from-amber-700 hover:to-amber-600
                     text-white font-semibold py-3 rounded-lg text-sm
                     flex items-center justify-center gap-2
                     shadow-md hover:shadow-lg transition"
                >
                    Book Now <ArrowRight size={16} />
                </button>
            </form>
        </div>
    </div>
);


const HeaderPages = ({page}) => {

   const imageUrl = page?.hero?.image ?? MEDIA_FALLBACK.images.headerPageImage;

    return (
        <div className="bg-white text-gray-900 min-h-screen">
            {/* HERO */}
            <section
                className="relative min-h-[80vh] sm:min-h-[85vh] md:min-h-[90vh] flex items-center bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${imageUrl})` }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-br from-black/85 via-black/75 to-black/55" />

                <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-10 lg:px-12 text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {/* Heading */}
                        <h1
                            className="
                                max-w-7xl
                                text-2xl
                                sm:text-3xl
                                md:text-4xl
                                lg:text-5xl
                                xl:text-6xl
                                font-bold
                                tracking-tight
                                leading-[1.15]
                                sm:leading-[1.1]
                                md:leading-[1.05]
                                mb-5
                                drop-shadow-2xl
                            "
                        >
                            {page?.hero?.heading}
                        </h1>

                        {/* Subheading */}
                        <p
                            className="
                                max-w-5xl
                                text-lg
                                sm:text-xl
                                md:text-2xl
                                lg:text-3xl
                                font-semibold
                                text-amber-300
                                mb-5
                            "
                        >
                            {page?.hero?.subheading}
                        </p>

                        {/* Description */}
                        <p
                            className="
                                max-w-2xl
                                text-base
                                sm:text-lg
                                md:text-xl
                                text-gray-200
                                leading-relaxed
                                mb-8
                            "
                        >
                            {page?.hero?.description}
                        </p>

                        {/* Fixed Button for all services*/}
                        <button
                            className="
                                inline-flex
                                items-center
                                px-6
                                sm:px-8
                                py-3
                                sm:py-4
                                text-base
                                sm:text-lg
                                font-bold
                                text-white
                                rounded-full
                                bg-white/10
                                hover:bg-white/20
                                border
                                border-white/30
                                backdrop-blur-md
                                transition-all
                                duration-300
                            "
                        >
                            Book Consultation
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* MAIN CONTENT */}
            <div className="max-w-8xl mx-auto grid grid-cols-1
                    px-2
                    py-4

                    gap-1

                    lg:px-4
                    lg:py-8
                    lg:grid-cols-12
                    
                    lg:gap-2
                "
            >
                <div className="lg:col-span-8 space-y-16 lg:space-y-24">
                    <Section title={"Overview"}>
                        <p className="text-lg md:text-xl text-gray-700 leading-relaxed whitespace-pre-line max-w-4xl">
                            {page?.overview?.content}
                        </p>
                    </Section>

                    <Section title={"Key Benefits"}>
                        <div className="grid md:grid-cols-2 gap-8">
                            {
                                page?.benefits?.items.map((b, i) => (
                                    <FeatureCard key={i} icon={CheckCircle2}>
                                        <p className="text-lg leading-relaxed text-gray-700">{b}</p>
                                    </FeatureCard>
                                ))
                            }
                        </div>
                    </Section>

                    <Section title={"Eligibility"}>
                        <div className="space-y-8">
                            {
                                page?.eligibility?.items.map((e, i) => (
                                    <NumberedCard key={i} number={i + 1}>
                                        {e}
                                    </NumberedCard>
                                ))
                            }
                        </div>
                    </Section>

                    <Section title={"Process"}>
                        <div className="space-y-8">
                            {
                                page?.process?.steps.map((s, i) => (
                                    <NumberedCard key={i} number={i + 1}>
                                        {s}
                                    </NumberedCard>
                                ))
                            }
                        </div>
                    </Section>

                    <Section title={"Documents Required"}>
                        <div className="grid md:grid-cols-2 gap-8">
                            {
                                page?.documents?.items.map((d, i) => (
                                    <FeatureCard key={i} icon={FileText}>
                                        <p className="text-gray-700 text-lg">{d}</p>
                                    </FeatureCard>
                                ))
                            }
                        </div>
                    </Section>

                    <Section title={"Why Choose Us"}>
                        <div className="grid md:grid-cols-2 gap-8">
                            {
                                page?.whyChooseUs?.items?.map((w, i) => (
                                    <FeatureCard key={i} icon={ShieldCheck}>
                                        <p className="text-lg leading-relaxed text-gray-700">{w}</p>
                                    </FeatureCard>
                                ))
                            }
                        </div>
                    </Section>

                    <Section title={"Frequently Asked Questions"}>
                        <div className="space-y-8">
                            {
                                page?.faqs?.items.map((f, i) => (
                                    <FeatureCard key={i} icon={MessageSquare}>
                                        <h4 className="font-bold text-xl mb-4 text-gray-900 group-hover:text-amber-700 transition-colors">
                                            {f.q}
                                        </h4>
                                        <p className="text-gray-600 leading-relaxed">{f.a}</p>
                                    </FeatureCard>
                                ))
                            }
                        </div>
                    </Section>
                </div>

                {/* SIDEBAR FORM */}
                <div className="lg:col-span-4 sm:p-2 md:p-0">
                    <StickyForm />
                </div>
            </div>

            {/* CTA */}
            <section className="py-32 bg-linear-to-br from-gray-900 via-gray-900 to-black text-white text-center">
                <div className="max-w-5xl mx-auto px-6">
                    <motion.h2
                        className="text-5xl md:text-6xl font-bold mb-8 leading-tight"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        {page?.cta?.title}
                    </motion.h2>
                    <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                        {page?.cta?.description}
                    </p>
                    <button className="px-14 py-7 bg-amber-600 hover:bg-amber-500 text-white font-bold text-2xl rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 flex items-center justify-center gap-4 mx-auto">
                        {page?.cta?.buttonText} <ArrowRight size={28} />
                    </button>
                </div>
            </section>
        </div>
    );
};

export default HeaderPages;