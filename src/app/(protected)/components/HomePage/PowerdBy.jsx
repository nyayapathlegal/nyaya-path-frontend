"use client";

import { useEffect, useState } from "react";
import CMSSection from "../CMS/CMSSection";
import CMSInput from "../CMS/CMSInput";
import CMSCard from "../CMS/CMSCard";
import CMSButton from "../CMS/CMSSubmitButton";
import CMSFallback from "../CMS/CMSFallback";
import HomePageLoader from "../Loaders/HomePageLoader";
import CMSLabel from "../CMS/CMSLabel";
import CMSTextarea from "../CMS/CMSTextarea";
import toast from "react-hot-toast";

import { getPoweredByFeatures } from "../../../../api/home/home.api";
import { setPoweredByFeatures } from "../../../../api/client/client.api";

const PoweredBy = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    /* -------- Fetch -------- */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getPoweredByFeatures();
                setData(res);
            } 
            catch (err) {
                console.error(err);
                setData(null);
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    /* -------- Update helpers -------- */
    const updateSectionField = (field, value) => {
        setData(prev => ({
            ...prev,
            poweredBySection: {
                ...prev.poweredBySection,
                [field]: value,
            },
        }));
    };

    const updateFeatureField = (index, field, value) => {
        setData(prev => {
            const features = [...prev.features];
            features[index] = { ...features[index], [field]: value };
            return { ...prev, features };
        });
    };

    /* -------- Validation -------- */
    const isValid = () => {
        const s = data.poweredBySection;

        if (
            !s.heading?.trim() ||
            !s.subheading?.trim() ||
            !s.description?.trim() ||
            !s.ctaText?.trim()
        ) {
            return false;
        }

        return data.features.every(
            f => f.title?.trim() && f.desc?.trim()
        );
    };

    /* -------- Save -------- */
    const saveData = async () => {
        if (!isValid()) {
            toast.error("All fields are required");
            return;
        }

        try {
            setSaving(true);
            await setPoweredByFeatures(data);
            toast.success("Powered By Section saved");
        } catch (err) {
            console.error(err);
            toast.error("Failed to save Powered By Section");
        } finally {
            setSaving(false);
        }
    };

    /* -------- States -------- */
    if (loading) return <HomePageLoader count={9} />;
    if (!data) return <CMSFallback message="No data found" />;

    /* -------- UI -------- */
    return (
        <div className="flex flex-col gap-y-4">
            <CMSSection title="Powered By Section">
                <CMSCard>

                    {/* Section Content */}
                    <CMSLabel labelText="Heading" />
                    <CMSInput
                        value={data.poweredBySection.heading}
                        onChange={e =>
                            updateSectionField("heading", e.target.value)
                        }
                    />

                    <CMSLabel labelText="Subheading" />
                    <CMSInput
                        value={data.poweredBySection.subheading}
                        onChange={e =>
                            updateSectionField("subheading", e.target.value)
                        }
                    />

                    <CMSLabel labelText="Description" />
                    <CMSTextarea
                        value={data.poweredBySection.description}
                        onChange={e =>
                            updateSectionField("description", e.target.value)
                        }
                    />

                    <CMSLabel labelText="CTA Text" />
                    <CMSInput
                        value={data.poweredBySection.ctaText}
                        onChange={e =>
                            updateSectionField("ctaText", e.target.value)
                        }
                    />

                    {/* Features */}
                    <CMSLabel labelText="Features" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        {data.features.map((feature, i) => (
                            <CMSCard
                                key={i}
                             
                            >
                                <CMSLabel labelText={`Title ${i + 1}`} />
                                <CMSInput
                                    value={feature.title}
                                    onChange={e =>
                                        updateFeatureField(i, "title", e.target.value)
                                    }
                                />

                                <CMSLabel labelText="Description" />
                                <CMSTextarea
                                    value={feature.desc}
                                    onChange={e =>
                                        updateFeatureField(i, "desc", e.target.value)
                                    }
                                />

                            </CMSCard>
                        ))}
                    </div>

                </CMSCard>
            </CMSSection>

            <CMSButton
                onClick={saveData}
                loading={saving}
                label="Save Powered By"
                loadingLabel="Saving Powered By..."
            />
        </div>
    );
};

export default PoweredBy;
