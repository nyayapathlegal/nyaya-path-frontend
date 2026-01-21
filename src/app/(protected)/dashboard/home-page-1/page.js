"use client";

import { useState } from "react";
import Hero from "../../components/HomePage/Hero";
import Counters from "../../components/HomePage/Counters";
import ExpertiesOverview from "../../components/HomePage/ExpertiseOverview";
import PracticeAreas from "../../components/HomePage/PracticeAreas";
import OurServices from "../../components/HomePage/Features";
import Experience from "../../components/HomePage/Experience";
import CMSTopButton from "../../components/CMS/CMSTopButtons";

const homePageTabs = [
    { key: "hero", label: "Hero" },
    { key: "counters", label: "Counters" },
    { key: "experties", label: "Experties" },
    { key: "ourservices", label: "Services" },
    { key: "practiceareas", label : "Practice Areas"},
    { key: "experience", label: "Experience Section" },
];

const TAB_COMPONENTS = {
    hero: Hero,
    counters: Counters,
    experties: ExpertiesOverview,
    ourservices: OurServices,
    practiceareas: PracticeAreas,
    experience: Experience
};

const HomeCMS = () => {
    const [activeTab, setActiveTab] = useState(homePageTabs[0].key);

    const ActiveComponent = TAB_COMPONENTS[activeTab];

    return (
        <>
            {/* -------- Tabs -------- */}
            <div className="flex gap-4 border-b border-white/10">
                {
                    homePageTabs.map((tab) => (
                        <CMSTopButton
                            key={tab.key}
                            label={tab.label}
                            active={activeTab === tab.key}
                            onClick={() => setActiveTab(tab.key)}
                        />
                    ))
                }
            </div>

            {/* -------- Content with Tailwind animation -------- */}
            <div className="mt-4 transition-opacity duration-300 ease-in-out opacity-100">
                <ActiveComponent />
            </div>
        </>
    );
};

export default HomeCMS;
