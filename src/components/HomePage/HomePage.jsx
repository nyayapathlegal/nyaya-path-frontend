"use client";

import React, { useState, useEffect } from "react";
import { ComplexSupportSection } from "./ComplexSupportSection/ComplexSupportSection";
import { AgentSection } from "./AgentSection/AgentSection";
import { EngageWithEmpathy } from "./EngageWithEmpathy/EngageWithEmpathy";
import { HomePageWrapper } from "..";
import { BottomTextandCardsSection } from "../Layouts";
import { SmartInsightsSection } from "./SmartInsightsSection/SmartInsightsSection";
import { ASIHighlights } from "./ASIHighlights/ASIHighlights";

import {
    FEATURES_FALLBACK,
    CLIENT_EXRERIENCE_FALLBACK,
    OPPORTUNITIES_FALLBACK,
    VISION_FALLBACK
} from "@/config/fallbacks/homepageFallbacks";

import {
    getFeatures,
    getClientExperience,
    getOpportunities,
    getVision
} from "@/api/home/home.api";
import ServicesSection from "@/components/HomePage/ServicesSection/Services";

export function HomeMainSection() {

    const [featuresSection, setFeaturesSection] = useState(null);
    const [clientExperience, setClientExperience] = useState(null);
    const [opportunitiesSection, setOpportunitiesSection] = useState(null);
    const [visionSection, setVisionSection] = useState(null);

    useEffect(() => {

        async function fetchFeatures() {
            try {
                const data = await getFeatures();
                setFeaturesSection({
                    leftTitle: data?.leftTitle || FEATURES_FALLBACK.leftTitle,
                    leftSubtitle: data?.leftSubtitle || FEATURES_FALLBACK.leftSubtitle,
                    para: data?.para || FEATURES_FALLBACK.para,
                    items: data?.items || FEATURES_FALLBACK.items,
                });
            } catch {
                setFeaturesSection(FEATURES_FALLBACK);
            }
        }

        async function fetchLifeOS() {
            try {
                const data = await getClientExperience();
                setClientExperience({
                    leftTitle: data?.leftTitle || CLIENT_EXRERIENCE_FALLBACK.leftTitle,
                    leftSubtitle: data?.leftSubtitle || CLIENT_EXRERIENCE_FALLBACK.leftSubtitle,
                    para: data?.para || CLIENT_EXRERIENCE_FALLBACK.para,
                    items: data?.items || CLIENT_EXRERIENCE_FALLBACK.items,
                });
            } catch {
                setClientExperience(CLIENT_EXRERIENCE_FALLBACK);
            }
        }

        async function fetchOpportunities() {
            try {
                const data = await getOpportunities();
                setOpportunitiesSection({
                    leftTitle: data?.leftTitle || OPPORTUNITIES_FALLBACK.leftTitle,
                    leftSubtitle: data?.leftSubtitle || OPPORTUNITIES_FALLBACK.leftSubtitle,
                    para: data?.para || OPPORTUNITIES_FALLBACK.para,
                    items: data?.items || OPPORTUNITIES_FALLBACK.items,
                });
            } catch {
                setOpportunitiesSection(OPPORTUNITIES_FALLBACK);
            }
        }

        async function fetchVision() {
            try {
                const data = await getVision();
                setVisionSection({
                    leftTitle: data?.leftTitle || VISION_FALLBACK.leftTitle,
                    leftSubtitle: data?.leftSubtitle || VISION_FALLBACK.leftSubtitle,
                    para: data?.para || VISION_FALLBACK.para,
                    items: data?.items || VISION_FALLBACK.items,
                });
            } catch {
                setVisionSection(VISION_FALLBACK);
            }
        }

        fetchFeatures();
        fetchLifeOS();
        fetchOpportunities();
        fetchVision();

    }, []);


    return (
        <HomePageWrapper>
            <div className="flex flex-col gap-5">
                <ComplexSupportSection />
                <BottomTextandCardsSection {...featuresSection} cards={featuresSection.items} />
                <AgentSection />
                <BottomTextandCardsSection {...clientExperience} cards={clientExperience.items} />
                <SmartInsightsSection />
                <BottomTextandCardsSection {...opportunitiesSection} cards={opportunitiesSection.items} />
                <ServicesSection />
                <BottomTextandCardsSection {...visionSection} cards={visionSection.items} />
                <EngageWithEmpathy />
                <ASIHighlights />
            </div>
        </HomePageWrapper>
    );
}