    "use client";

    import { useEffect, useState } from "react";
    import { motion } from "framer-motion";
    import {
        Calendar,
        CheckCircle2,
        FileText,
        ShieldCheck,
        UserCheck,
        MessageSquare,
        ArrowRight,
        Phone,
        Mail,
        Briefcase
    } from "lucide-react";
    import { MEDIA_FALLBACK } from "@/config/fallbacks/mediaFallback";

    /* ===================== TABS ===================== */
    const TABS = [
        { id: "overview", label: "Overview" },
        { id: "key-benefits", label: "Key Benefits" },
        { id: "eligibility", label: "Eligibility" },
        { id: "process", label: "Process" },
        { id: "documents", label: "Documents" },
        { id: "why-choose-us", label: "Why Choose Us" },
        { id: "faqs", label: "FAQs" }
    ];

    const SectionTabs = () => {
        const [active, setActive] = useState("overview");

        useEffect(() => {
           
            const observer = new IntersectionObserver(
  entries => {
    const visible = entries
      .filter(e => e.isIntersecting && e.intersectionRatio > 0.15)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

    if (visible.length) {
      setActive(visible[0].target.id);
    }
  },
  {
    rootMargin: "-20% 0px -55% 0px",
    threshold: [0.15, 0.3, 0.5]
  }
);



            TABS.forEach(tab => {
                const el = document.getElementById(tab.id);
                if (el) observer.observe(el);
            });

            return () => observer.disconnect();
        }, []);

        const handleClick = id => {
            setActive(id);
            document.getElementById(id)?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        };

        return (
            <div className="hidden lg:block sticky top-20 z-30 bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
                    <div className="flex gap-2 py-3 min-w-max">
                        {TABS.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => handleClick(tab.id)}
                                className={`px-5 py-2 rounded-full text-sm font-semibold transition
                                ${
                                    active === tab.id
                                        ? "bg-amber-600 text-white shadow"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    };


    /* ===================== COMPONENTS ===================== */
    const Section = ({
        id,
        title,
        children,
        bg = "bg-white",
        align = "left"
    }) => (
      <section
  id={id}
  className={`${bg} py-16 md:py-24 scroll-mt-36 min-h-[70vh]`}
>

            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <motion.div
                    className={`mb-12 ${align === "center" ? "text-center" : "text-left"
                        }`}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block h-1 w-10 bg-amber-500 rounded-full mb-4" />
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                        {title}
                    </h2>
                </motion.div>
                {children}
            </div>
        </section>
    );

    const FeatureCard = ({ icon: Icon, children, className = "" }) => (
        <div
            className={`
            group bg-white rounded-2xl
            p-4 sm:p-6 md:p-8
            shadow-md hover:shadow-xl
            transition-all duration-300 hover:-translate-y-1
            ${className}
            `}
        >
            {Icon && (
                <div
                    className="
                    w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14
                    rounded-lg sm:rounded-xl
                    bg-amber-100
                    flex items-center justify-center
                    mb-4 sm:mb-5 md:mb-6
                    text-amber-700 group-hover:text-amber-600
                    transition-colors
                    "
                >
                    <Icon
                        size={18}
                        className="sm:hidden"
                    />
                    <Icon
                        size={22}
                        className="hidden sm:block md:hidden"
                    />
                    <Icon
                        size={28}
                        className="hidden md:block"
                        strokeWidth={2}
                    />
                </div>
            )}

            <div
                className="
                text-sm sm:text-base md:text-lg
                text-gray-700 leading-relaxed
                "
            >
                {children}
            </div>
        </div>
    );


    const NumberedCard = ({ number, children }) => (
        <div
            className="
            group bg-white rounded-2xl
            p-4 sm:p-6 md:p-7
            shadow-md hover:shadow-xl
            transition-all duration-300 hover:-translate-y-1
            flex items-start gap-4 sm:gap-5 md:gap-6
            "
        >
            {/* Number Circle */}
            <div
                className="
                shrink-0
                w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14
                rounded-full bg-amber-600 text-white
                font-bold text-lg sm:text-xl md:text-2xl
                flex items-center justify-center
                shadow-md
                "
            >
                {number}
            </div>

            {/* Content */}
            <p
                className="
                text-sm sm:text-base md:text-lg
                text-gray-700 leading-relaxed
                pt-0.5 sm:pt-1 md:pt-2
                "
            >
                {children}
            </p>
        </div>
    );


    const StickyForm = () => (
        <div className="sticky top-6 md:top-40 z-10">
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
    /* ===================== PAGE ===================== */
    const HeaderPages = ({ page }) => {
        const imageUrl =
            page?.hero?.image ?? MEDIA_FALLBACK.images.headerPageImage;

        return (
            <div className="bg-white text-gray-900 min-h-screen">

                {/* HERO */}
                <section
                    className="relative min-h-[90vh] flex items-center bg-cover bg-center"
                    style={{ backgroundImage: `url(${imageUrl})` }}
                >
                    <div className="absolute inset-0 bg-black/70" />
                    <div className="relative z-10 max-w-7xl mx-auto px-6 text-white">
                        <h1 className="text-5xl font-bold mb-4">{page?.hero?.heading}</h1>
                        <p className="text-2xl text-amber-300 mb-4">{page?.hero?.subheading}</p>
                        <p className="max-w-2xl text-lg">{page?.hero?.description}</p>
                    </div>
                </section>

                {/* 🔥 TABS */}
                <SectionTabs />

                {/* CONTENT */}
                <div className="max-w-8xl mx-auto grid lg:grid-cols-12 gap-6 px-2 py-6">
                    <div className="lg:col-span-8 flex flex-col gap-32">

                        <Section id="overview" title="Overview">
                            <p className="text-lg">{page?.overview?.content}</p>
                        </Section>

                        <Section id="key-benefits" title="Key Benefits">
                            <div className="grid md:grid-cols-2 gap-8">
                                {page?.benefits?.items.map((b, i) => (
                                    <FeatureCard key={i} icon={CheckCircle2}>
                                        <p className="text-lg">{b}</p>
                                    </FeatureCard>
                                ))}
                            </div>
                        </Section>

                        <Section id="eligibility" title="Eligibility">
                            <div className="space-y-8">
                                {page?.eligibility?.items.map((e, i) => (
                                    <NumberedCard key={i} number={i + 1}>{e}</NumberedCard>
                                ))}
                            </div>
                        </Section>

                        <Section id="process" title="Process">
                            <div className="space-y-8">
                                {page?.process?.steps.map((s, i) => (
                                    <NumberedCard key={i} number={i + 1}>{s}</NumberedCard>
                                ))}
                            </div>
                        </Section>

                        <Section id="documents" title="Documents Required">
                            <div className="grid md:grid-cols-2 gap-8">
                                {page?.documents?.items.map((d, i) => (
                                    <FeatureCard key={i} icon={FileText}>
                                        <p className="text-lg">{d}</p>
                                    </FeatureCard>
                                ))}
                            </div>
                        </Section>

                        <Section id="why-choose-us" title="Why Choose Us">
                            <p className="text-lg">{page?.whyChooseUs?.text}</p>
                        </Section>

                        <Section id="faqs" title="Frequently Asked Questions">
                            <div className="space-y-8">
                                {page?.faqs?.items.map((f, i) => (
                                    <FeatureCard key={i} icon={MessageSquare}>
                                        <h4 className="font-bold text-xl mb-2">{f.q}</h4>
                                        <p>{f.a}</p>
                                    </FeatureCard>
                                ))}
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
