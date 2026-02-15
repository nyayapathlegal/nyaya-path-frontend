import clientApi from "../../utils/client.api";

// Media Section
export async function setMediaSection(data) {
    const response = await clientApi.post("/media-items", data);
    return response.data;
}

// Navigation
export async function setNavItems(data) {
    const response = await clientApi.post("/nav-items", data);
    return response.data;
}

// Hero Section
export async function setHeroSection(data) {
    const response = await clientApi.post("/hero-section", data);
    return response.data;
}

// Counter Section
export async function setCounterSection(data) {
    const response = await clientApi.post("/counter-section", data);
    return response.data;
}

// Experties
export async function setExpertiesOverview(data) {
    const response = await clientApi.post("/experties-overview", data);
    return response.data;
}

// Features
export async function setFeatures(data) {
    const response = await clientApi.post("/features", data);
    return response.data;
}

// Life Overview
export async function setClientExperience(data) {
    const response = await clientApi.post("/life-overview", data);
    return response.data;
}

// Opportunities
export async function setOpportunities(data) {
    const response = await clientApi.post("/opportunities", data);
    return response.data;
}

// Vision
export async function setVision(data) {
    const response = await clientApi.post("/vision", data);
    return response.data;
}

// Practice Areas
export async function setPracticeAreas(data) {
    const response = await clientApi.post("/practice-areas",data);
    return response.data;
}

// Insights
export async function setInsights(data) {
    const response = await clientApi.post("/insights", data);
    return response.data;
}

// Voice Section
export async function setVoice(data) {
    const response = await clientApi.post("/voice", data);
    return response.data;
}

// Powered By Features
export async function setPoweredByFeatures(data) {
    const response = await clientApi.post("/powered-by-features", data);
    return response.data;
}

// Personalized Consultation
export async function setPersonalizedConsultation(data) {
    const response = await clientApi.post("/personalized-consultation", data);
    return response.data;
}

// Services Section
export async function setServices(data) {
    const response = await clientApi.post("/services", data);
    return response.data;
}

// Footer
export async function setFooter(data) {
    const response = await clientApi.post("/footer", data);
    return response.data;
}

// Footer
export async function setOurTeam(data) {
    const response = await clientApi.post("/our-team", data);
    return response.data;
}
