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

import { getInsights } from "../../../../api/home/home.api";
import { setInsights } from "../../../../api/client/client.api";

const Insights = () => {
    
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    /* -------- Fetch -------- */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getInsights();
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
    const updateHeroField = (field, value) => {
        setData(prev => ({
            ...prev,
            heroSection: {
                ...prev.heroSection,
                [field]: value,
            },
        }));
    };

    const updateStepField = (index, field, value) => {
        setData(prev => {
            const steps = [...prev.stepsSection];
            steps[index] = { ...steps[index], [field]: value };
            return { ...prev, stepsSection: steps };
        });
    };

    /* -------- Validation -------- */
    const isValid = () => {
        
        const h = data.heroSection;

        if (
            !h.title?.trim() ||
            !h.description?.trim() ||
            !h.ctaText?.trim()
        ) return false;

        return data.stepsSection.every(
            s =>
                s.title?.trim() &&
                s.description?.trim()
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
            await setInsights(data);
            toast.success("Insights saved successfully");
        } 
        catch (err) {
            console.error(err);
            toast.error("Failed to save Insights");
        } 
        finally {
            setSaving(false);
        }
    };

    /* -------- States -------- */
    if (loading) return <HomePageLoader count={10} />;
    if (!data) return <CMSFallback message="No data found" />;

    /* -------- UI -------- */
    return (
        <div className="flex flex-col gap-y-4">

            {/* HERO SECTION */}
            <CMSSection title="Insights Hero Section">
                <CMSCard>
                    <CMSLabel labelText="Title" />
                    <CMSInput
                        value={data.heroSection.title}
                        onChange={e =>
                            updateHeroField("title", e.target.value)
                        }
                    />

                    <CMSLabel labelText="Description" />
                    <CMSTextarea
                        value={data.heroSection.description}
                        onChange={e =>
                            updateHeroField("description", e.target.value)
                        }
                    />

                    <CMSLabel labelText="CTA Text" />
                    <CMSInput
                        value={data.heroSection.ctaText}
                        onChange={e =>
                            updateHeroField("ctaText", e.target.value)
                        }
                    />
                </CMSCard>
            </CMSSection>

            {/* STEPS SECTION */}
            <CMSSection title="Insights Steps Section">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.stepsSection.map((step, i) => (
                        <CMSCard key={step.id}>
                            <CMSLabel labelText={`Step ${i + 1} Title`} />
                            <CMSInput
                                value={step.title}
                                onChange={e =>
                                    updateStepField(i, "title", e.target.value)
                                }
                            />

                            <CMSLabel labelText="Description" />
                            <CMSTextarea
                                value={step.description}
                                onChange={e =>
                                    updateStepField(i, "description", e.target.value)
                                }
                            />

                        </CMSCard>
                    ))}
                </div>
            </CMSSection>

            <CMSButton
                onClick={saveData}
                loading={saving}
                label="Save Insights"
                loadingLabel="Saving Insights"
            />
        </div>
    );
};

export default Insights;