import api from "../../utils/api";

// Media Section
export async function getMediaSection() {
    const response = await api.get("/media-items");
    return response.data;
}

// Navigation
export async function getNavItems() {
    const response = await api.get("/nav-items");
    return response.data;
}

// Hero Section
export async function getHeroSection() {
    const response = await api.get("/hero-section");
    return response.data;
}

// Counter Section
export async function getCounterSection() {
    const response = await api.get("/counter-section");
    return response.data;
}

// Experience Overview
export async function getExpertiesOverview() {
    const response = await api.get("/experties-overview");
    return response.data;
}

// Features
export async function getFeatures() {
    const response = await api.get("/features");
    return response.data;
}

// Life Overview
export async function getClientExperience() {
    const response = await api.get("/life-overview");
    return response.data;
}

// Opportunities
export async function getOpportunities() {
    const response = await api.get("/opportunities");
    return response.data;
}

// Vision
export async function getVision() {
    const response = await api.get("/vision");
    return response.data;
}

// Practice Areas
export async function getPracticeAreas() {
    const response = await api.get("/practice-areas");
    return response.data;
}

// Insights
export async function getInsights() {
    const response = await api.get("/insights");
    return response.data;
}

// Voice Section
export async function getVoice() {
    const response = await api.get("/voice");
    return response.data;
}

// Powered By Features
export async function getPoweredByFeatures() {
    const response = await api.get("/powered-by-features");
    return response.data;
}

// Personalized Consultation
export async function getPersonalizedConsultation() {
    const response = await api.get("/personalized-consultation");
    return response.data;
}

// Services Section
export async function getServices() {   
    const response = await api.get("/services");
    return response.data;
}

// Footer
export async function getFooter() {
    const response = await api.get("/footer");
    return response.data;
}
