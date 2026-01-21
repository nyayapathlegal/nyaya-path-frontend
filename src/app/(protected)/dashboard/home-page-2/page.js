"use client";

import { useState } from "react";
import Opportunities from "../../components/HomePage/Opportunities";
import Visions from "../../components/HomePage/Visions";
import CMSTopButton from "../../components/CMS/CMSTopButtons";
import PersonalizedConsultation from "../../components/HomePage/PersonalizedConsultation";
import PoweredBy from "../../components/HomePage/PowerdBy";
import Voice from "../../components/HomePage/Voice";
import Insights from "../../components/HomePage/Insights";

const homePageTabs = [
    { key: "opportunities", label: "Opportunities Section" },
    { key: "visions", label: "Visions Section" },
    { key: "voice", label: "Voice Section"},
    { key: "poweredby", label: "Powered By Section"},
    { key: "consultation", label: "Consultation Section"},
    { key: "insights", label: "Insights Section"},
];

const TAB_COMPONENTS = {
    opportunities: Opportunities,
    visions: Visions,
    voice: Voice,
    poweredby: PoweredBy,
    consultation: PersonalizedConsultation,
    insights: Insights
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
