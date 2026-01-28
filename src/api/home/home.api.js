import api from "../../utils/api";

// Media Section
export async function getMediaSection() {
    try {
        const response = await api.get("/media-items");
        return response.data;
    } catch (err) {
        console.error("getMediaSection error:", err);
        throw err;
    }
}

// Navigation
export async function getNavItems() {
    try {
        const response = await api.get("/nav-items");
        return response.data;
    } catch (err) {
        console.error("getNavItems error:", err);
        throw err;
    }
}

// Hero Section
export async function getHeroSection() {
    try {
        const response = await api.get("/hero-section");
        return response.data;
    } catch (err) {
        console.error("getHeroSection error:", err);
        throw err;
    }
}

// Counter Section
export async function getCounterSection() {
    try {
        const response = await api.get("/counter-section");
        return response.data;
    } catch (err) {
        console.error("getCounterSection error:", err);
        throw err;
    }
}

// Experience Overview
export async function getExpertiesOverview() {
    try {
        const response = await api.get("/experties-overview");
        return response.data;
    } catch (err) {
        console.error("getExpertiesOverview error:", err);
        throw err;
    }
}

// Features
export async function getFeatures() {
    try {
        const response = await api.get("/features");
        return response.data;
    } catch (err) {
        console.error("getFeatures error:", err);
        throw err;
    }
}

// Client Experience
export async function getClientExperience() {
    try {
        const response = await api.get("/life-overview");
        return response.data;
    } catch (err) {
        console.error("getClientExperience error:", err);
        throw err;
    }
}

// Opportunities
export async function getOpportunities() {
    try {
        const response = await api.get("/opportunities");
        return response.data;
    } catch (err) {
        console.error("getOpportunities error:", err);
        throw err;
    }
}

// Vision
export async function getVision() {
    try {
        const response = await api.get("/vision");
        return response.data;
    } catch (err) {
        console.error("getVision error:", err);
        throw err;
    }
}

// Practice Areas
export async function getPracticeAreas() {
    try {
        const response = await api.get("/practice-areas");
        return response.data;
    } catch (err) {
        console.error("getPracticeAreas error:", err);
        throw err;
    }
}

// Insights
export async function getInsights() {
    try {
        const response = await api.get("/insights");
        return response.data;
    } catch (err) {
        console.error("getInsights error:", err);
        throw err;
    }
}

// Voice
export async function getVoice() {
    try {
        const response = await api.get("/voice");
        return response.data;
    } catch (err) {
        console.error("getVoice error:", err);
        throw err;
    }
}

// Powered By Features
export async function getPoweredByFeatures() {
    try {
        const response = await api.get("/powered-by-features");
        return response.data;
    } catch (err) {
        console.error("getPoweredByFeatures error:", err);
        throw err;
    }
}

// Personalized Consultation
export async function getPersonalizedConsultation() {
    try {
        const response = await api.get("/personalized-consultation");
        return response.data;
    } catch (err) {
        console.error("getPersonalizedConsultation error:", err);
        throw err;
    }
}

// Services
export async function getServices() {
    try {
        const response = await api.get("/services");
        return response.data;
    } catch (err) {
        console.error("getServices error:", err);
        throw err;
    }
}

// Footer
export async function getFooter() {
    try {
        const response = await api.get("/footer");
        return response.data;
    } catch (err) {
        console.error("getFooter error:", err);
        throw err;
    }
}