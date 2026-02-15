import React from 'react'
import Link from "next/link";

const CtaSection = () => {
    return (
        <section className="bg-gray-900 px-8 md:px-20 py-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
            <div>
                <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-gray-500 mb-3">
                    Work With Us
                </p>
                <h2
                    className="font-serif font-bold text-white leading-none tracking-tight"
                    style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
                >
                    Ready to Speak With
                    <br />an <em className="italic text-blue-400">Expert?</em>
                </h2>
            </div>
            <Link href="#"
                className="bg-white text-gray-900 font-semibold text-sm px-10 py-4 rounded-full hover:-translate-y-1 hover:shadow-2xl transition-all duration-200 whitespace-nowrap no-underline inline-block">
                Book a Free Consultation →
            </Link>
        </section>
    )
}

export default CtaSection