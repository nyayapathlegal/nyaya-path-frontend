    "use client";

    import { useEffect, useState } from "react";
    import toast from "react-hot-toast";

    import CMSInput from "../CMS/CMSInput";
    import CMSCard from "../CMS/CMSCard";
    import CMSSubmitButton from "../CMS/CMSSubmitButton";
    import CMSLabel from "../CMS/CMSLabel";
    import CMSFallback from "../CMS/CMSFallback";
    import CMSTopButton from "../CMS/CMSTopButtons";
    import CMSSection from "../CMS/CMSSection";
    import CMSTextarea from "../CMS/CMSTextarea";
    import CMSDetailsWrapper from "../CMS/CMSDetailsWrapper";
    import HomePageLoader from "../Loaders/HomePageLoader";

    import { getNavItems } from "../../../../api/home/home.api";
    import { setNavItems } from "../../../../api/client/client.api";

    /* ---------- helpers ---------- */

    const ordinal = n => {
        if (n % 100 >= 11 && n % 100 <= 13) return `${n}th`;
        return `${n}${["th","st","nd","rd"][n % 10] || "th"}`;
    };



    const generateSlug = text =>
        text
            ?.toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");

    const createEmptyPage = () => ({
        slug: "",
        title: "",
        page: {
            hero: {
                heading: "",
                subheading: "",
                description: "",
                image: "",
            },

            overview: {
                content: "",
            },

            benefits: {
                items: [""],
            },

            eligibility: {
                items: [""],
            },

            process: {
                steps: [""],
            },

            documents: {
                items: [""],
            },

            whyChooseUs: {
                items: [""],
            },

            faqs: {
                items: [{ q: "", a: "" }],
            },

            cta: {
                title: "Ready to Get Compliant ?",
                description: "",
                buttonText: "",
            },
        },
    });




    const createEmptySubcategory = () => ({
        title: "",
        children: [createEmptyPage()], // Automatically add one child page
    });


    const hasDuplicateSlugs = navItems => {
        const allSlugs = navItems
            .flatMap(nav => nav.children || [])
            .flatMap(sub => sub.children || [])
            .map(page => page.slug?.trim())
            .filter(Boolean);
        return new Set(allSlugs).size !== allSlugs.length;
    };

    /* ---------- NavbarCMS ---------- */
    const NavbarCMS = () => {
        const [navbarItems, setNavbarItems] = useState([]);
        const [activeTab, setActiveTab] = useState(null);
        const [loading, setLoading] = useState(true);
        const [saving, setSaving] = useState(false);

        /* ---------- fetch ---------- */
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const res = await getNavItems();
                    const items = res.navItems;

                    // console.log("Fetched navbar items:", items);
                    setNavbarItems(items);
                    setActiveTab(items[0]?.id ?? null);
                }
                catch (err) {
                    console.error("Error fetching nav items:", err);
                    setNavbarItems([]);
                }
                finally {
                    setLoading(false);
                }
            };
            fetchData();
        }, []);

        /* ---------- update helpers ---------- */
        const updateSubcategory = (navIndex, subIndex, key, value) => {
            setNavbarItems(prev => {
                const copy = structuredClone(prev);
                copy[navIndex].children[subIndex][key] = value;
                return copy;
            });
        };

        const updatePage = (navIndex, subIndex, pageIndex, updater) => {
            setNavbarItems(prev => {
                const copy = structuredClone(prev);
                updater(copy[navIndex].children[subIndex].children[pageIndex]);
                return copy;
            });
        };


        const updatePageTitle = (navIndex, subIndex, pageIndex, title) => {
            setNavbarItems(prev => {
                const copy = structuredClone(prev);
                copy[navIndex].children[subIndex].children[pageIndex].title = title;
                copy[navIndex].children[subIndex].children[pageIndex].slug = generateSlug(title);
                return copy;
            });
        };

        /* ---------- add / remove ---------- */
        const addSubcategory = navIndex => {
            setNavbarItems(prev => {
                const copy = structuredClone(prev);
                copy[navIndex].children.push(createEmptySubcategory());
                return copy;
            });
        };

        const removeSubcategory = (navIndex, subIndex) => {
            setNavbarItems(prev => {
                const copy = structuredClone(prev);
                copy[navIndex].children.splice(subIndex, 1);
                return copy;
            });
        };

        const addPage = (navIndex, subIndex) => {
            setNavbarItems(prev => {
                const copy = structuredClone(prev);
                copy[navIndex].children[subIndex].children.push(createEmptyPage());
                return copy;
            });
        };

        const removePage = (navIndex, subIndex, pageIndex) => {
            setNavbarItems(prev => {
                const copy = structuredClone(prev);

                // Prevent removing the last child
                if (copy[navIndex].children[subIndex].children.length <= 1) {
                    toast.error("A subcategory must have at least one child page.");
                    return prev;
                }

                copy[navIndex].children[subIndex].children.splice(pageIndex, 1);
                return copy;
            });
        };

        const MAX_POINTS = 5;
        const MIN_POINTS = 1;

        const addPoint = (arr) =>
            arr.length < MAX_POINTS ? [...arr, ""] : arr;

        const removePoint = (arr, index) => {
            if (arr.length <= MIN_POINTS) return arr;
            return arr.filter((_, i) => i !== index);
        };

        const updatePoint = (arr, index, value) =>
            arr.map((v, i) => (i === index ? value : v));



        /* ---------- validation ---------- */
        const hasAtLeastOneValue = arr =>
            Array.isArray(arr) && arr.some(v => typeof v === "string" && v.trim());

        const checkEmptyPoints = (items, label, path) => {
            for (let i = 0; i < items.length; i++) {
                if (!items[i]?.trim()) {
                    toast.error(`${ordinal(i + 1)} ${label} is empty → ${path}`);
                    return false;
                }
            }
            return true;
        };


        const validateNavbar = () => {
            for (let navIndex = 0; navIndex < navbarItems.length; navIndex++) {
                const nav = navbarItems[navIndex];

                for (let subIndex = 0; subIndex < nav.children.length; subIndex++) {
                    const sub = nav.children[subIndex];

                    if (!sub.title?.trim()) {
                        toast.error(`Subcategory title missing (${nav.title})`);
                        return false;
                    }

                    for (let pageIndex = 0; pageIndex < sub.children.length; pageIndex++) {
                        const page = sub.children[pageIndex];
                        const p = page.page;

                        const pageName = page.title || `Page ${pageIndex + 1}`;

                        /* -------- BASIC -------- */
                        if (!page.title?.trim()) {
                            toast.error(`Page title missing (${sub.title})`);
                            return false;
                        }

                        if (!page.slug?.trim()) {
                            toast.error(`Page slug missing (${pageName})`);
                            return false;
                        }

                        /* -------- HERO -------- */
                        if (!p.hero.heading?.trim()) return toast.error("Hero heading missing"), false;
                        if (!p.hero.subheading?.trim()) return toast.error("Hero subheading missing"), false;
                        if (!p.hero.description?.trim()) return toast.error("Hero description missing"), false;
                        if (!p.hero.image?.trim()) return toast.error("Hero image missing"), false;

                        /* -------- OVERVIEW -------- */
                        if (!p.overview.content?.trim()) return toast.error("Overview content missing"), false;

                        const path = `${nav.title} > ${sub.title} > ${pageName}`;

                        if (!checkEmptyPoints(p.benefits.items, "Benefit point", path)) return false;
                        if (!checkEmptyPoints(p.eligibility.items, "Eligibility point", path)) return false;
                        if (!checkEmptyPoints(p.process.steps, "Process step", path)) return false;
                        if (!checkEmptyPoints(p.documents.items, "Document point", path)) return false;
                        if (!checkEmptyPoints(p.whyChooseUs.items, "Why Choose Us point", path)) return false;


                        /* -------- FAQ -------- */
                        for (let i = 0; i < p.faqs.items.length; i++) {
                            const faq = p.faqs.items[i];

                            if (!faq.q?.trim()) {
                                toast.error(
                                    `${ordinal(i + 1)} FAQ question is empty → ${path}`
                                );
                                return false;
                            }

                            if (!faq.a?.trim()) {
                                toast.error(
                                    `${ordinal(i + 1)} FAQ answer is empty → ${path}`
                                );
                                return false;
                            }
                        }


                        /* -------- CTA -------- */
                        if (!p.cta.title?.trim()) return toast.error("CTA title missing"), false;
                        if (!p.cta.description?.trim()) return toast.error("CTA description missing"), false;
                        if (!p.cta.buttonText?.trim()) return toast.error("CTA button text missing"), false;
                    }
                }
            }

            return true;
        };




        /* ---------- save ---------- */
        const saveNavItems = async () => {

            if (!validateNavbar()) return;
            if (hasDuplicateSlugs(navbarItems)) return toast.error("Duplicate page URLs found");

            try {
                setSaving(true);
                await setNavItems({ navItems: navbarItems });
                toast.success("Navbar saved successfully");
            }
            catch (err) {
                console.error(err);
                toast.error("Failed to save navbar");
            }
            finally {
                setSaving(false);
            }
        };

        /* ---------- UI ---------- */
        if (loading) return <HomePageLoader count={5} />;
        if (!navbarItems.length) return <CMSFallback message="No navbar items found." />;

        return (
            <>
                {/* Tabs */}
                <div className="flex gap-4 border-b border-white/10 overflow-x-auto pb-2">
                    {
                        navbarItems.map((tab) => (
                            <CMSTopButton
                                key={tab.id}
                                label={tab.title}
                                active={activeTab === tab.id}
                                onClick={() => setActiveTab(tab.id)}
                            />
                        ))
                    }
                </div>

                {/* Content */}
                <div className="flex flex-col gap-y-4">
                    {
                        navbarItems.map((nav, navIndex) =>
                            (nav.id === activeTab) ? (
                                <CMSSection key={nav.id} title={`Subcategories under ${nav.title}`}>
                                    {/* Subcategories */}
                                    {nav.children?.map((sub, subIndex) => (
                                        <CMSCard key={`${nav.id}-${subIndex}`} className="relative border border-white/20">
                                            <CMSDetailsWrapper summary={sub.title || "New Subcategory"} defaultOpen={false}>
                                                {nav.children.length > 1 && (
                                                    <button
                                                        onClick={() => removeSubcategory(navIndex, subIndex)}
                                                        className="text-red-500 text-sm absolute top-6 right-6 hover:text-red-400"
                                                    >
                                                        ✕ Remove
                                                    </button>
                                                )}

                                                <div className="space-y-4">
                                                    {/* Subcategory Info */}
                                                    <div className="pb-4 border-b border-white/10">
                                                        <h4 className="text-sm font-semibold text-white/70 mb-3">Subcategory Details</h4>
                                                        <div className="space-y-3">
                                                            <div>
                                                                <CMSLabel labelText="Subcategory Title" />
                                                                <CMSInput
                                                                    value={sub.title}
                                                                    onChange={e => updateSubcategory(navIndex, subIndex, "title", e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Pages under Subcategory */}
                                                    <div>
                                                        <h4 className="text-sm font-semibold text-white/70 mb-3">Pages</h4>

                                                        {sub.children?.map((page, pageIndex) => (
                                                            <CMSCard
                                                                key={`${nav.id}-${subIndex}-${pageIndex}`}
                                                                className="relative mb-3 bg-white/5 border border-white/10"
                                                            >
                                                                <CMSDetailsWrapper
                                                                    summary={page.title || "New Page"}
                                                                    defaultOpen={false}
                                                                >
                                                                    {sub.children.length > 1 && (
                                                                        <button
                                                                            onClick={() => removePage(navIndex, subIndex, pageIndex)}
                                                                            className="text-red-500 text-sm absolute top-6 right-6 hover:text-red-400"
                                                                        >
                                                                            ✕ Remove
                                                                        </button>
                                                                    )}

                                                                    <div className="space-y-3">
                                                                        <div>
                                                                            <CMSLabel labelText="Page URL" />
                                                                            <CMSInput value={page.slug} readOnly />
                                                                        </div>

                                                                        <div>
                                                                            <CMSLabel labelText="Title" />
                                                                            <CMSInput
                                                                                value={page.title}
                                                                                onChange={e => updatePageTitle(navIndex, subIndex, pageIndex, e.target.value)}
                                                                            />
                                                                        </div>




                                                                        <CMSLabel labelText="Hero Heading" />
                                                                        <CMSInput
                                                                            value={page.page.hero.heading}
                                                                            onChange={e =>
                                                                                updatePage(navIndex, subIndex, pageIndex, page => {
                                                                                    page.page.hero.heading = e.target.value;
                                                                                })
                                                                            }
                                                                        />


                                                                        <CMSLabel labelText="Hero Subheading" />
                                                                        <CMSInput
                                                                            value={page.page.hero.subheading}
                                                                            onChange={e =>
                                                                                updatePage(navIndex, subIndex, pageIndex, page => {
                                                                                    page.page.hero.subheading = e.target.value;
                                                                                })
                                                                            }
                                                                        />


                                                                        <CMSLabel labelText="Hero Description" />
                                                                        <CMSTextarea
                                                                            value={page.page.hero.description}
                                                                            onChange={e =>
                                                                                updatePage(navIndex, subIndex, pageIndex, page => {
                                                                                    page.page.hero.description = e.target.value;
                                                                                })
                                                                            }
                                                                        />


                                                                        <CMSLabel labelText="Hero Image URL" />
                                                                        <CMSInput
                                                                            value={page.page.hero.image}
                                                                            onChange={e =>
                                                                                updatePage(navIndex, subIndex, pageIndex, page => {
                                                                                    page.page.hero.image = e.target.value;
                                                                                })
                                                                            }
                                                                        />




                                                                        <CMSLabel labelText="Overview Content" />
                                                                        <CMSTextarea
                                                                            value={page.page.overview.content}
                                                                            onChange={e =>
                                                                                updatePage(navIndex, subIndex, pageIndex, page => {
                                                                                    page.page.overview.content = e.target.value;
                                                                                })
                                                                            }
                                                                        />


                                                                        <CMSLabel labelText="Benefits Items" />

                                                                        {page.page.benefits.items.map((item, i) => (
                                                                            <div key={i} className="flex gap-2 items-center">
                                                                                <CMSInput
                                                                                    value={item}
                                                                                    onChange={e =>
                                                                                        updatePage(navIndex, subIndex, pageIndex, page => {
                                                                                            page.page.benefits.items = updatePoint(
                                                                                                page.page.benefits.items,
                                                                                                i,
                                                                                                e.target.value
                                                                                            );
                                                                                        })
                                                                                    }
                                                                                />

                                                                                {page.page.benefits.items.length > MIN_POINTS && (
                                                                                    <button
                                                                                        className="text-red-400 text-sm"
                                                                                        onClick={() =>
                                                                                            updatePage(navIndex, subIndex, pageIndex, page => {
                                                                                                page.page.benefits.items = removePoint(
                                                                                                    page.page.benefits.items,
                                                                                                    i
                                                                                                );
                                                                                            })
                                                                                        }
                                                                                    >
                                                                                        ✕
                                                                                    </button>
                                                                                )}
                                                                            </div>
                                                                        ))}

                                                                        {page.page.benefits.items.length < MAX_POINTS && (
                                                                            <button
                                                                                className="text-blue-400 text-sm mt-1"
                                                                                onClick={() =>
                                                                                    updatePage(navIndex, subIndex, pageIndex, page => {
                                                                                        page.page.benefits.items = addPoint(
                                                                                            page.page.benefits.items
                                                                                        );
                                                                                    })
                                                                                }
                                                                            >
                                                                                + Add Point
                                                                            </button>
                                                                        )}


                                                                        <CMSLabel labelText="Eligibility Items" />

                                                                        {page.page.eligibility.items.map((item, i) => (
                                                                            <div key={i} className="flex gap-2 items-center">
                                                                                <CMSInput
                                                                                    value={item}
                                                                                    onChange={e =>
                                                                                        updatePage(navIndex, subIndex, pageIndex, page => {
                                                                                            page.page.eligibility.items = updatePoint(
                                                                                                page.page.eligibility.items,
                                                                                                i,
                                                                                                e.target.value
                                                                                            );
                                                                                        })
                                                                                    }
                                                                                />
                                                                                {page.page.eligibility.items.length > MIN_POINTS && (
                                                                                    <button
                                                                                        className="text-red-400 text-sm"
                                                                                        onClick={() =>
                                                                                            updatePage(navIndex, subIndex, pageIndex, page => {
                                                                                                page.page.eligibility.items = removePoint(
                                                                                                    page.page.eligibility.items,
                                                                                                    i
                                                                                                );
                                                                                            })
                                                                                        }
                                                                                    >
                                                                                        ✕
                                                                                    </button>
                                                                                )}
                                                                            </div>
                                                                        ))}

                                                                        {page.page.eligibility.items.length < MAX_POINTS && (
                                                                            <button
                                                                                className="text-blue-400 text-sm mt-1"
                                                                                onClick={() =>
                                                                                    updatePage(navIndex, subIndex, pageIndex, page => {
                                                                                        page.page.eligibility.items = addPoint(page.page.eligibility.items);
                                                                                    })
                                                                                }
                                                                            >
                                                                                + Add Point
                                                                            </button>
                                                                        )}


                                                                        <CMSLabel labelText="Process Steps" />

                                                                        {page.page.process.steps.map((item, i) => (
                                                                            <div key={i} className="flex gap-2 items-center">
                                                                                <CMSInput
                                                                                    value={item}
                                                                                    onChange={e =>
                                                                                        updatePage(navIndex, subIndex, pageIndex, page => {
                                                                                            page.page.process.steps = updatePoint(
                                                                                                page.page.process.steps,
                                                                                                i,
                                                                                                e.target.value
                                                                                            );
                                                                                        })
                                                                                    }
                                                                                />
                                                                                {page.page.process.steps.length > MIN_POINTS && (
                                                                                    <button
                                                                                        className="text-red-400 text-sm"
                                                                                        onClick={() =>
                                                                                            updatePage(navIndex, subIndex, pageIndex, page => {
                                                                                                page.page.process.steps = removePoint(
                                                                                                    page.page.process.steps,
                                                                                                    i
                                                                                                );
                                                                                            })
                                                                                        }
                                                                                    >
                                                                                        ✕
                                                                                    </button>
                                                                                )}
                                                                            </div>
                                                                        ))}

                                                                        {page.page.process.steps.length < MAX_POINTS && (
                                                                            <button
                                                                                className="text-blue-400 text-sm mt-1"
                                                                                onClick={() =>
                                                                                    updatePage(navIndex, subIndex, pageIndex, page => {
                                                                                        page.page.process.steps = addPoint(page.page.process.steps);
                                                                                    })
                                                                                }
                                                                            >
                                                                                + Add Point
                                                                            </button>
                                                                        )}



                                                                        <CMSLabel labelText="Documents Required" />

                                                                        {page.page.documents.items.map((item, i) => (
                                                                            <div key={i} className="flex gap-2 items-center">
                                                                                <CMSInput
                                                                                    value={item}
                                                                                    onChange={e =>
                                                                                        updatePage(navIndex, subIndex, pageIndex, page => {
                                                                                            page.page.documents.items = updatePoint(
                                                                                                page.page.documents.items,
                                                                                                i,
                                                                                                e.target.value
                                                                                            );
                                                                                        })
                                                                                    }
                                                                                />
                                                                                {page.page.documents.items.length > MIN_POINTS && (
                                                                                    <button
                                                                                        className="text-red-400 text-sm"
                                                                                        onClick={() =>
                                                                                            updatePage(navIndex, subIndex, pageIndex, page => {
                                                                                                page.page.documents.items = removePoint(
                                                                                                    page.page.documents.items,
                                                                                                    i
                                                                                                );
                                                                                            })
                                                                                        }
                                                                                    >
                                                                                        ✕
                                                                                    </button>
                                                                                )}
                                                                            </div>
                                                                        ))}

                                                                        {page.page.documents.items.length < MAX_POINTS && (
                                                                            <button
                                                                                className="text-blue-400 text-sm mt-1"
                                                                                onClick={() =>
                                                                                    updatePage(navIndex, subIndex, pageIndex, page => {
                                                                                        page.page.documents.items = addPoint(page.page.documents.items);
                                                                                    })
                                                                                }
                                                                            >
                                                                                + Add Point
                                                                            </button>
                                                                        )}


                                                                        <CMSLabel labelText="Why Choose Us" />

                                                                        {page.page.whyChooseUs.items.map((item, i) => (
                                                                            <div key={i} className="flex gap-2 items-center">
                                                                                <CMSInput
                                                                                    value={item}
                                                                                    onChange={e =>
                                                                                        updatePage(navIndex, subIndex, pageIndex, page => {
                                                                                            page.page.whyChooseUs.items = updatePoint(
                                                                                                page.page.whyChooseUs.items,
                                                                                                i,
                                                                                                e.target.value
                                                                                            );
                                                                                        })
                                                                                    }
                                                                                />
                                                                                {page.page.whyChooseUs.items.length > MIN_POINTS && (
                                                                                    <button
                                                                                        className="text-red-400 text-sm"
                                                                                        onClick={() =>
                                                                                            updatePage(navIndex, subIndex, pageIndex, page => {
                                                                                                page.page.whyChooseUs.items = removePoint(
                                                                                                    page.page.whyChooseUs.items,
                                                                                                    i
                                                                                                );
                                                                                            })
                                                                                        }
                                                                                    >
                                                                                        ✕
                                                                                    </button>
                                                                                )}
                                                                            </div>
                                                                        ))}

                                                                        {page.page.whyChooseUs.items.length < MAX_POINTS && (
                                                                            <button
                                                                                className="text-blue-400 text-sm mt-1"
                                                                                onClick={() =>
                                                                                    updatePage(navIndex, subIndex, pageIndex, page => {
                                                                                        page.page.whyChooseUs.items = addPoint(page.page.whyChooseUs.items);
                                                                                    })
                                                                                }
                                                                            >
                                                                                + Add Point
                                                                            </button>
                                                                        )}


                                                                        <CMSLabel labelText="FAQ's" />
                                                                        {
                                                                            page.page.faqs.items.map((faq, i) => (
                                                                                <div key={i} className="border p-3 rounded space-y-2">
                                                                                    <CMSInput
                                                                                        value={faq.q}
                                                                                        onChange={e =>
                                                                                            updatePage(navIndex, subIndex, pageIndex, page => {
                                                                                                page.page.faqs.items[i].q = e.target.value;
                                                                                            })
                                                                                        }
                                                                                    />
                                                                                    <CMSTextarea
                                                                                        value={faq.a}
                                                                                        onChange={e =>
                                                                                            updatePage(navIndex, subIndex, pageIndex, page => {
                                                                                                page.page.faqs.items[i].a = e.target.value;
                                                                                            })
                                                                                        }
                                                                                    />
                                                                                </div>
                                                                            ))
                                                                        }

                                                                        <button
                                                                            className="mt-2 text-blue-400 hover:text-blue-300 text-sm"
                                                                            onClick={() =>
                                                                                updatePage(navIndex, subIndex, pageIndex, page => {
                                                                                    page.page.faqs.items.push({ q: "", a: "" });
                                                                                })
                                                                            }
                                                                        >
                                                                            + Add FAQ
                                                                        </button>



                                                                        <CMSLabel labelText="CTA Title" />
                                                                        <CMSInput
                                                                            value={page.page.cta.title}
                                                                            onChange={e =>
                                                                                updatePage(navIndex, subIndex, pageIndex, page => {
                                                                                    page.page.cta.title = e.target.value;
                                                                                })
                                                                            }
                                                                        />

                                                                        <CMSLabel labelText="CTA Description" />
                                                                        <CMSTextarea
                                                                            value={page.page.cta.description}
                                                                            onChange={e =>
                                                                                updatePage(navIndex, subIndex, pageIndex, page => {
                                                                                    page.page.cta.description = e.target.value;
                                                                                })
                                                                            }
                                                                        />

                                                                        <CMSLabel labelText="CTA Button Text" />
                                                                        <CMSInput
                                                                            value={page.page.cta.buttonText}
                                                                            onChange={e =>
                                                                                updatePage(navIndex, subIndex, pageIndex, page => {
                                                                                    page.page.cta.buttonText = e.target.value;
                                                                                })
                                                                            }
                                                                        />

                                                                    </div>
                                                                </CMSDetailsWrapper>
                                                            </CMSCard>
                                                        ))}

                                                        <button
                                                            onClick={() => addPage(navIndex, subIndex)}
                                                            className="mt-2 text-blue-400 hover:text-blue-300 text-sm"
                                                        >
                                                            + Add Page
                                                        </button>
                                                    </div>
                                                </div>
                                            </CMSDetailsWrapper>
                                        </CMSCard>
                                    ))}

                                    <button
                                        onClick={() => addSubcategory(navIndex)}
                                        className="mt-2 text-blue-400 hover:text-blue-300 text-sm"
                                    >
                                        + Add Subcategory
                                    </button>
                                </CMSSection>
                            ) : null
                        )
                    }

                    <CMSSubmitButton
                        onClick={saveNavItems}
                        loading={saving}
                        label="Save Navbar"
                        loadingLabel="Saving..."
                    />
                </div>
            </>
        );
    };

    export default NavbarCMS;