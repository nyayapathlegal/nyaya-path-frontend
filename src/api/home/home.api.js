import { MEDIA_FALLBACK } from "@/config/fallbacks/mediaFallback";
import api from "../../utils/api";
import { CLIENT_EXRERIENCE_FALLBACK, COUNTER_FALLBACK, EXPERTIES_OVERVIEW_FALLBACK, FEATURES_FALLBACK, FEATURES_POWEREDBY_FALLBACK, FOOTER_FALLBACK, HERO_FALLBACK, INSIGHTS_FALLBACK, OPPORTUNITIES_FALLBACK, PERSONALIZED_CONSULTATION_FALLBACK, PRACTICE_AREAS_FALLBACK, VISION_FALLBACK, VOICE_FALLBACK } from "@/config/fallbacks/homepageFallbacks";
import { SERVICES_FALLBACK } from "@/config/fallbacks/servicesFallback";
import { HEADER_FALLBACK } from "@/config/fallbacks/headerFallback";

// Media Section
export async function getMediaSection() {
    const response = await api.get("/media-items");
    return response.data;

    // return MEDIA_FALLBACK;
}

// Navigation
export async function getNavItems() {
    const response = await api.get("/nav-items");
    return response.data;

    // return HEADER_FALLBACK;
}

// Hero Section
export async function getHeroSection() {
    const response = await api.get("/hero-section");
    return response.data;
    // return HERO_FALLBACK;
}

// Counter Section
export async function getCounterSection() {
    const response = await api.get("/counter-section");
    return response.data;
    // return COUNTER_FALLBACK;
}

// Experience Overview
export async function getExpertiesOverview() {
    const response = await api.get("/experties-overview");
    return response.data;
    // return EXPERTIES_OVERVIEW_FALLBACK;
}

// Features
export async function getFeatures() {
    const response = await api.get("/features");
    return response.data;
    // return FEATURES_FALLBACK;
}

// Life Overview
export async function getClientExperience() {
    const response = await api.get("/life-overview");
    return response.data;
    // return  CLIENT_EXRERIENCE_FALLBACK;
}

// Opportunities
export async function getOpportunities() {
    const response = await api.get("/opportunities");
    return response.data;
    // return OPPORTUNITIES_FALLBACK;
}

// Vision
export async function getVision() {
    const response = await api.get("/vision");
    return response.data;
    // return VISION_FALLBACK;
}

// Practice Areas
export async function getPracticeAreas() {
    const response = await api.get("/practice-areas");
    return response.data;
    // return PRACTICE_AREAS_FALLBACK;
}

// Insights
export async function getInsights() {
    const response = await api.get("/insights");
    return response.data;
    // return INSIGHTS_FALLBACK;
}

// Voice Section
export async function getVoice() {
    const response = await api.get("/voice");
    return response.data;
    // return VOICE_FALLBACK;
}

// Powered By Features
export async function getPoweredByFeatures() {
    const response = await api.get("/powered-by-features");
    return response.data;
    // return FEATURES_POWEREDBY_FALLBACK;
}

// Personalized Consultation
export async function getPersonalizedConsultation() {
    const response = await api.get("/personalized-consultation");
    return response.data;
    // return PERSONALIZED_CONSULTATION_FALLBACK;
}

// Services Section
export async function getServices() {   
    const response = await api.get("/services");
    return response.data;
    // return SERVICES_FALLBACK;
}

// Footer
export async function getFooter() {
    const response = await api.get("/footer");
    return response.data;
    // return FOOTER_FALLBACK;
}
