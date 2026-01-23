import api from "../../utils/api";

async function safeGet(url) {
    try {
        const response = await api.get(url);
        return response.data;
    } 
    catch (err) {
        console.error(`API error [${url}]:`, err);
        return err;
    }
}

// Media Section
export const getMediaSection = () =>
    safeGet("/media-items");

// Navigation
export const getNavItems = () =>
    safeGet("/nav-items");

// Hero Section
export const getHeroSection = () =>
    safeGet("/hero-section");

// Counter Section
export const getCounterSection = () =>
    safeGet("/counter-section");

// Experience Overview
export const getExpertiesOverview = () =>
    safeGet("/experties-overview");

// Features
export const getFeatures = () =>
    safeGet("/features");

// Client Experience
export const getClientExperience = () =>
    safeGet("/life-overview");

// Opportunities
export const getOpportunities = () =>
    safeGet("/opportunities");

// Vision
export const getVision = () =>
    safeGet("/vision");

// Practice Areas
export const getPracticeAreas = () =>
    safeGet("/practice-areas");

// Insights
export const getInsights = () =>
    safeGet("/insights");

// Voice
export const getVoice = () =>
    safeGet("/voice");

// Powered By Features
export const getPoweredByFeatures = () =>
    safeGet("/powered-by-features");

// Personalized Consultation
export const getPersonalizedConsultation = () =>
    safeGet("/personalized-consultation");

// Services
export const getServices = () =>
    safeGet("/services");

// Footer
export const getFooter = () =>
    safeGet("/footer");
