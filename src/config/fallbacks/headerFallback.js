export const HEADER_FALLBACK = {
    navItems: [{
        id: "startup-solutions",
        title: "Startup Solutions",
        path: "/startup-solutions",
        children: [
            {
                id: "incorporation",
                title: "Business Incorporation",
                children: [
                    {
                        id: "corp",
                        slug: "corporation",
                        title: "Corporation Setup",
                        desc: "Set up your corporation with all legal essentials.",
                        path: "/startup-solutions/incorporation/corporation",
                        page: {
                            hero: {
                                heading: "Incorporate Your Corporation",
                                subheading: "Launch professionally",
                                description: "Full support for registering and starting your corporation.",
                                image: "https://via.placeholder.com/600x400?text=Corporation"
                            },
                            section: {
                                title: "Incorporation Details",
                                content: "All corporate filings, registrations, and compliance handled."
                            }
                        }
                    },
                    {
                        id: "sole-proprietor",
                        slug: "sole-proprietorship",
                        title: "Sole Proprietorship",
                        desc: "Quick registration for sole proprietors.",
                        path: "/startup-solutions/incorporation/sole-proprietorship",
                        page: {
                            hero: {
                                heading: "Sole Proprietorship Setup",
                                subheading: "Simple and fast",
                                description: "Legal registration for solo entrepreneurs with ease.",
                                image: "https://via.placeholder.com/600x400?text=Sole+Proprietor"
                            },
                            section: {
                                title: "Services Provided",
                                content: "Documentation, licenses, and guidance for proprietorship."
                            }
                        }
                    }
                ]
            },
            {
                id: "compliance-services",
                title: "Compliance Services",
                children: [
                    {
                        id: "tax-registration",
                        slug: "tax-registration",
                        title: "Tax Registration",
                        desc: "Register for GST, VAT, and other taxes quickly.",
                        path: "/startup-solutions/compliance-services/tax-registration",
                        page: {
                            hero: {
                                heading: "Tax Registration",
                                subheading: "Stay compliant",
                                description: "Fast and accurate registration for business taxes.",
                                image: "https://via.placeholder.com/600x400?text=Tax"
                            },
                            section: {
                                title: "Tax Services",
                                content: "GST, VAT, and other government compliance handled."
                            }
                        }
                    },
                    {
                        id: "trademark",
                        slug: "trademark-filing",
                        title: "Trademark Filing",
                        desc: "Protect your brand with trademark registration.",
                        path: "/startup-solutions/compliance-services/trademark-filing",
                        page: {
                            hero: {
                                heading: "Trademark Registration",
                                subheading: "Secure your brand",
                                description: "File trademarks and intellectual property easily.",
                                image: "https://via.placeholder.com/600x400?text=Trademark"
                            },
                            section: {
                                title: "IP Services",
                                content: "Trademark, copyright, and IP registration services."
                            }
                        }
                    }
                ]
            }
        ]
    },
    {
        id: "business-growth",
        title: "Business Growth",
        path: "/business-growth",
        children: [
            {
                id: "funding",
                title: "Funding & Investment",
                children: [
                    {
                        id: "seed-funding",
                        slug: "seed-funding",
                        title: "Seed Funding",
                        desc: "Get initial investment for your startup.",
                        path: "/business-growth/funding/seed-funding",
                        page: {
                            hero: {
                                heading: "Seed Funding",
                                subheading: "Kickstart your startup",
                                description: "Find investors and secure early-stage capital.",
                                image: "https://via.placeholder.com/600x400?text=Seed+Funding"
                            },
                            section: {
                                title: "Funding Details",
                                content: "Connect with angel investors and seed funds quickly."
                            }
                        }
                    }
                ]
            },
            {
                id: "marketing",
                title: "Marketing Services",
                children: [
                    {
                        id: "digital-marketing",
                        slug: "digital-marketing",
                        title: "Digital Marketing",
                        desc: "Promote your business online effectively.",
                        path: "/business-growth/marketing/digital-marketing",
                        page: {
                            hero: {
                                heading: "Digital Marketing Services",
                                subheading: "Grow online",
                                description: "SEO, social media, and ads to boost your brand.",
                                image: "https://via.placeholder.com/600x400?text=Digital+Marketing"
                            },
                            section: {
                                title: "Marketing Services",
                                content: "Comprehensive digital strategies for startups."
                            }
                        }
                    }
                ]
            }
        ]
    }
    ]
};