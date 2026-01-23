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
const generateSlug = text =>
    text
        ?.toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

const createEmptyPage = () => ({
    id: "",
    slug: "",
    title: "",
    page: {
        hero: {
            heading: "",
            subheading: "",
            description: "",
            image: "",
        },
        section: {
            title: "",
            content: "",
        },
    },
});


const createEmptySubcategory = () => ({
    id: "",
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
            } catch (err) {
                console.error("Error fetching nav items:", err);
                setNavbarItems([]);
            } finally {
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


    /* ---------- validation ---------- */
const validateNavbar = () => {
    for (let navIndex = 0; navIndex < navbarItems.length; navIndex++) {
        const nav = navbarItems[navIndex];

        for (let subIndex = 0; subIndex < (nav.children || []).length; subIndex++) {
            const sub = nav.children[subIndex];

            const subName = sub.title || `Subcategory ${subIndex + 1}`;

            if (!sub.title?.trim()) {
                toast.error(`Subcategory title is empty (Menu: ${nav.title})`);
                return false;
            }

            for (let pageIndex = 0; pageIndex < (sub.children || []).length; pageIndex++) {
                const page = sub.children[pageIndex];
                const hero = page.page?.hero || {};
                const section = page.page?.section || {};

                const pageName = page.title || `Page ${pageIndex + 1}`;

                if (!page.title?.trim()) {
                    toast.error(`Page title is empty (Subcategory: ${subName})`);
                    return false;
                }

                if (!page.slug?.trim()) {
                    toast.error(`Page URL is empty (Page: ${pageName})`);
                    return false;
                }

                if (!hero.heading?.trim()) {
                    toast.error(`Hero Heading is empty (Page: ${pageName}, Subcategory: ${subName})`);
                    return false;
                }

                if (!hero.subheading?.trim()) {
                    toast.error(`Hero Subheading is empty (Page: ${pageName}, Subcategory: ${subName})`);
                    return false;
                }

                if (!hero.description?.trim()) {
                    toast.error(`Hero Description is empty (Page: ${pageName}, Subcategory: ${subName})`);
                    return false;
                }

                if (!hero.image?.trim()) {
                    toast.error(`Hero Image URL is empty (Page: ${pageName}, Subcategory: ${subName})`);
                    return false;
                }

                if (!section.title?.trim()) {
                    toast.error(`Section Title is empty (Page: ${pageName}, Subcategory: ${subName})`);
                    return false;
                }

                if (!section.content?.trim()) {
                    toast.error(`Section Content is empty (Page: ${pageName}, Subcategory: ${subName})`);
                    return false;
                }
            }
        }
    }

    return true; // ✅ valid
};



    /* ---------- save ---------- */
    const saveNavItems = async () => {
        if (!validateNavbar()) return;
        if (hasDuplicateSlugs(navbarItems)) return toast.error("Duplicate page URLs found");

        try {
            setSaving(true);
            await setNavItems({ navItems: navbarItems });
            toast.success("Navbar saved successfully");
        } catch (err) {
            console.error(err);
            toast.error("Failed to save navbar");
        } finally {
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
                {navbarItems.map(tab => (
                    <CMSTopButton
                        key={tab.id}
                        label={tab.title}
                        active={activeTab === tab.id}
                        onClick={() => setActiveTab(tab.id)}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="flex flex-col gap-y-4">
                {navbarItems.map((nav, navIndex) =>
                    nav.id !== activeTab ? null : (
                        <CMSSection key={nav.id} title={`Subcategories under ${nav.title}`}>
                            {/* Subcategories */}
                            {nav.children?.map((sub, subIndex) => (
                                <CMSCard key={`${nav.id}-${subIndex}`} className="relative border border-white/20">
                                    <CMSDetailsWrapper summary={sub.title || "New Subcategory"} defaultOpen={false}>
                                        {nav.children.length > 1 && (
                                            <button
                                                onClick={() => removeSubcategory(navIndex, subIndex)}
                                                className="absolute top-6 right-6 text-red-500 text-sm"
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
                                                                    className="absolute top-6 right-6 text-red-500 text-sm"
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

                                                                <CMSLabel labelText="Section Title" />
                                                                <CMSInput
                                                                    value={page.page.section.title}
                                                                    onChange={e =>
                                                                        updatePage(navIndex, subIndex, pageIndex, page => {
                                                                            page.page.section.title = e.target.value;
                                                                        })
                                                                    }
                                                                />


                                                                <CMSLabel labelText="Section Content" />
                                                                <CMSTextarea
                                                                    value={page.page.section.content}
                                                                    onChange={e =>
                                                                        updatePage(navIndex, subIndex, pageIndex, page => {
                                                                            page.page.section.content = e.target.value;
                                                                        })
                                                                    }
                                                                />

                                                            </div>
                                                        </CMSDetailsWrapper>
                                                    </CMSCard>
                                                ))}

                                                <button
                                                    onClick={() => addPage(navIndex, subIndex)}
                                                    className="mt-2 text-sm text-blue-400"
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
                                className="mt-4 text-sm text-green-400 font-semibold"
                            >
                                + Add Subcategory
                            </button>
                        </CMSSection>
                    )
                )}

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