import React from 'react'


const HeroSection = ({ departments }) => {

    const totalProfessionals = departments.reduce(
        (sum, dept) => sum + (dept.members?.length ?? 0), 0
    );

    const arr =  [
        [String(totalProfessionals), "Professionals"],
        [String(departments.length), "Departments"],
        [String("15+"), "Years Active"],
    ]

    return (
        <header className="max-w-7xl mx-auto px-6 md:px-14 pt-32 pb-16 grid md:grid-cols-2 gap-12 md:gap-20 items-end">
            <div>
                <div className="inline-flex items-center gap-2.5 text-[10px] font-semibold tracking-[0.25em] uppercase text-gray-400 mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-900 inline-block" />
                    CS · CA · Legal Experts
                </div>
                <h1
                    className="font-serif font-bold text-gray-900 leading-[0.95] tracking-tight mb-7"
                    style={{ fontSize: "clamp(52px, 6.5vw, 88px)" }}
                >
                    The <em className="italic text-blue-900">People</em>
                    <br />Behind Your
                    <br />Success
                </h1>
                <p className="text-gray-500 text-[15px] font-light leading-relaxed max-w-sm">
                    A multidisciplinary team of India&apos;s finest compliance and finance professionals — working as one to safeguard your business.
                </p>
            </div>

            <div className="flex flex-col gap-8">
                <blockquote className="font-serif text-xl italic font-semibold text-gray-900 leading-relaxed border-l-[3px] border-blue-900 pl-6">
                    &quot;Trust is built one filing, one contract, one audit at a time.&quot;
                </blockquote>
                <div className="flex gap-10 pl-6">
                    {
                       arr.map(([n, l]) => (
                        <div key={l}>
                            <div className="font-serif font-bold text-gray-900 text-5xl leading-none">{n}</div>
                            <div className="text-[11px] text-gray-400 mt-1 tracking-wide">{l}</div>
                        </div>
                    ))
                    }
                </div>
            </div>
        </header>
    )
}

export default HeroSection