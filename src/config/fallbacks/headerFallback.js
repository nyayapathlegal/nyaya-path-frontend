export const HEADER_FALLBACK = {
    navItems: [
        {
            id: "business-setup",
            title: "Business Setup",
            path: "/business-setup",
            children: [
                {
                    id: "company-registration",
                    title: "Company Registration",
                    children: [
                        {
                            id: "private-limited",
                            slug: "private-limited-company",
                            title: "Private Limited Company",
                            desc: "Register your private limited company in India.",
                            path: "/business-setup/company-registration/private-limited-company",
                            page: {
                                hero: {
                                    heading: "Private Limited Company Registration",
                                    subheading: "Start your company legally",
                                    description: "Complete incorporation, MCA filings, PAN, TAN & compliance support.",
                                    image: "https://via.placeholder.com/600x400?text=Private+Limited"
                                },
                                section: {
                                    title: "What We Handle",
                                    content: "Name approval, incorporation, DIN, DSC, PAN, TAN and ROC compliance."
                                }
                            }
                        },
                        {
                            id: "opc",
                            slug: "one-person-company",
                            title: "One Person Company",
                            desc: "Single-owner company registration.",
                            path: "/business-setup/company-registration/one-person-company",
                            page: {
                                hero: {
                                    heading: "One Person Company Registration",
                                    subheading: "Solo founder solution",
                                    description: "Ideal structure for single entrepreneurs with limited liability.",
                                    image: "https://via.placeholder.com/600x400?text=OPC"
                                },
                                section: {
                                    title: "OPC Benefits",
                                    content: "Limited liability, easy compliance, separate legal entity."
                                }
                            }
                        },
                        {
                            id: "llp",
                            slug: "llp-registration",
                            title: "LLP Registration",
                            desc: "Flexible structure with limited liability.",
                            path: "/business-setup/company-registration/llp-registration",
                            page: {
                                hero: {
                                    heading: "LLP Registration",
                                    subheading: "Flexible & compliant",
                                    description: "Perfect for professionals and partnerships.",
                                    image: "https://via.placeholder.com/600x400?text=LLP"
                                },
                                section: {
                                    title: "LLP Services",
                                    content: "Incorporation, agreement drafting, PAN, TAN and filings."
                                }
                            }
                        }
                    ]
                },
                {
                    id: "government-registrations",
                    title: "Government Registrations",
                    children: [
                        {
                            id: "gst",
                            slug: "gst-registration",
                            title: "GST Registration",
                            desc: "GST registration and compliance support.",
                            path: "/business-setup/government-registrations/gst-registration",
                            page: {
                                hero: {
                                    heading: "GST Registration",
                                    subheading: "Tax compliance made easy",
                                    description: "Fast GST registration with expert guidance.",
                                    image: "https://via.placeholder.com/600x400?text=GST"
                                },
                                section: {
                                    title: "GST Services",
                                    content: "New registration, modification, cancellation & advisory."
                                }
                            }
                        },
                        {
                            id: "msme",
                            slug: "msme-registration",
                            title: "MSME / Udyam",
                            desc: "Udyam registration for businesses.",
                            path: "/business-setup/government-registrations/msme-registration",
                            page: {
                                hero: {
                                    heading: "MSME Registration",
                                    subheading: "Unlock government benefits",
                                    description: "Official Udyam registration with certificate.",
                                    image: "https://via.placeholder.com/600x400?text=MSME"
                                },
                                section: {
                                    title: "MSME Benefits",
                                    content: "Subsidies, priority lending, government schemes."
                                }
                            }
                        }
                    ]
                }
            ]
        },

        {
            id: "tax-compliance",
            title: "Tax & Compliance",
            path: "/tax-compliance",
            children: [
                {
                    id: "tax-filing",
                    title: "Tax Filing",
                    children: [
                        {
                            id: "itr",
                            slug: "income-tax-return",
                            title: "Income Tax Return",
                            desc: "ITR filing for individuals & businesses.",
                            path: "/tax-compliance/tax-filing/income-tax-return",
                            page: {
                                hero: {
                                    heading: "Income Tax Return Filing",
                                    subheading: "File accurately & on time",
                                    description: "Expert-assisted ITR filing with tax optimization.",
                                    image: "https://via.placeholder.com/600x400?text=ITR"
                                },
                                section: {
                                    title: "Who We Serve",
                                    content: "Individuals, proprietors, LLPs, companies."
                                }
                            }
                        },
                        {
                            id: "gst-return",
                            slug: "gst-return-filing",
                            title: "GST Return Filing",
                            desc: "Monthly & annual GST returns.",
                            path: "/tax-compliance/tax-filing/gst-return-filing",
                            page: {
                                hero: {
                                    heading: "GST Return Filing",
                                    subheading: "Stay compliant",
                                    description: "Accurate GSTR-1, GSTR-3B & annual returns.",
                                    image: "https://via.placeholder.com/600x400?text=GST+Return"
                                },
                                section: {
                                    title: "GST Coverage",
                                    content: "Regular, composition & nil return filing."
                                }
                            }
                        }
                    ]
                }
            ]
        },

        {
            id: "ip-services",
            title: "Trademark & IP",
            path: "/trademark-ip",
            children: [
                {
                    id: "trademark-services",
                    title: "Trademark Services",
                    children: [
                        {
                            id: "trademark-registration",
                            slug: "trademark-registration",
                            title: "Trademark Registration",
                            desc: "Protect your brand identity.",
                            path: "/trademark-ip/trademark-services/trademark-registration",
                            page: {
                                hero: {
                                    heading: "Trademark Registration",
                                    subheading: "Secure your brand",
                                    description: "End-to-end trademark filing & follow-up.",
                                    image: "https://via.placeholder.com/600x400?text=Trademark"
                                },
                                section: {
                                    title: "Trademark Scope",
                                    content: "Search, filing, objection handling & renewal."
                                }
                            }
                        }
                    ]
                }
            ]
        },

        {
            id: "ngo-services",
            title: "NGO Services",
            path: "/ngo-services",
            children: [
                {
                    id: "ngo-registration",
                    title: "NGO Registration",
                    children: [
                        {
                            id: "section-8",
                            slug: "section-8-company",
                            title: "Section 8 Company",
                            desc: "NGO registration under Companies Act.",
                            path: "/ngo-services/ngo-registration/section-8-company",
                            page: {
                                hero: {
                                    heading: "Section 8 Company Registration",
                                    subheading: "For non-profit organizations",
                                    description: "Complete NGO incorporation & compliance support.",
                                    image: "https://via.placeholder.com/600x400?text=Section+8"
                                },
                                section: {
                                    title: "Included Services",
                                    content: "Incorporation, 12A, 80G, CSR-1 assistance."
                                }
                            }
                        }
                    ]
                }
            ]
        },

        {
            id: "legal-docs",
            title: "Legal Documentation",
            path: "/legal-documentation",
            children: [
                {
                    id: "agreements",
                    title: "Agreements",
                    children: [
                        {
                            id: "nda",
                            slug: "nda-agreement",
                            title: "NDA Agreement",
                            desc: "Protect confidential information.",
                            path: "/legal-documentation/agreements/nda-agreement",
                            page: {
                                hero: {
                                    heading: "Non-Disclosure Agreement",
                                    subheading: "Protect your business",
                                    description: "Legally drafted NDA for individuals & companies.",
                                    image: "https://via.placeholder.com/600x400?text=NDA"
                                },
                                section: {
                                    title: "Use Cases",
                                    content: "Clients, employees, vendors & partners."
                                }
                            }
                        }
                    ]
                }
            ]
        },

        {
            id: "website-development",
            title: "Website Development",
            path: "/website-development",
            children: [
                {
                    id: "web-services",
                    title: "Web Services",
                    children: [
                        {
                            id: "business-website",
                            slug: "business-website",
                            title: "Business Website",
                            desc: "Professional websites for businesses.",
                            path: "/website-development/web-services/business-website",
                            page: {
                                hero: {
                                    heading: "Business Website Development",
                                    subheading: "Build your online presence",
                                    description: "Fast, responsive & SEO-friendly websites.",
                                    image: "https://via.placeholder.com/600x400?text=Website"
                                },
                                section: {
                                    title: "What You Get",
                                    content: "Design, hosting guidance, SEO setup & maintenance."
                                }
                            }
                        }
                    ]
                }
            ]
        }
    ]
};