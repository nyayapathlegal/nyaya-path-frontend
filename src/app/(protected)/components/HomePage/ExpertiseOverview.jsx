"use client";

import { useEffect, useState } from "react";
import CMSSection from "../CMS/CMSSection";
import CMSInput from "../CMS/CMSInput";
import CMSCard from "../CMS/CMSCard";
import CMSButton from "../CMS/CMSSubmitButton"; // Reusable CMS button
import CMSFallback from "../CMS/CMSFallback";
import HomePageLoader from "../Loaders/HomePageLoader";
import toast from "react-hot-toast";

import { getExpertiesOverview } from  "../../../../api/home/home.api";
import { setExpertiesOverview } from "../../../../api/client/client.api";
import CMSLabel from "../CMS/CMSLabel";
import CMSTextarea from "../CMS/CMSTextarea";

const ExpertiesOverview = () => {
    
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    /* -------- Fetch data -------- */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getExpertiesOverview();
                setData(res);
            } 
            catch (err) {
                console.error("Failed to fetch expertise", err);
                setData(null);
            } 
            finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    /* -------- Update helpers -------- */
    const updateField = (field, value) => {
        setData(prev => ({ ...prev, [field]: value }));
    };

    const updateCardField = (field, value) => {
        setData(prev => ({
            ...prev,
            card: {
                ...prev.card,
                [field]: value,
            },
        }));
    };

    const updateMetricValue = (index, value) => {
        let num = parseInt(value);
        if (isNaN(num)) num = 1;
        if (num < 1) num = 1;
        if (num > 100) num = 100;

        setData(prev => {
            const copy = { ...prev };
            if (copy.card?.metrics?.[index]) {
                copy.card.metrics[index].value = num;
            }
            return copy;
        });
    };
        // Valid fields
    const isValid = () => {
        
        if (!data.card?.title.trim() || !data.description?.trim()) {
            return false;
        }

        return true;
    }

    /* -------- Save -------- */
    const saveData = async () => {
        
        if (!isValid()) {
            toast.error("All fields are required");
            return;
        }
        
        try {
            setSaving(true);
            await setExpertiesOverview(data);
            toast.success("Expertise saved successfully");
        } 
        catch (err) {
            console.error("Failed to save Expertise", err);
            toast.error("Failed to save Expertise");
        } 
        finally {
            setSaving(false);
        }
    };

    /* -------- Loader -------- */
    if (loading) return <HomePageLoader count={5} />;

    if (!data) return <CMSFallback message="No expertise found." />;

    /* -------- Render -------- */
    return (
        <div className="flex flex-col gap-y-4">
            <CMSSection title="Expertise Section">
                <CMSCard>

                    {/* -------- Card Title -------- */}
                    <CMSLabel labelText="Title" />
                    <CMSInput
                        value={data.card?.title}
                        onChange={e => updateCardField("title", e.target.value)}
                    />


                    {/* -------- Description -------- */}
                    <CMSLabel labelText="Description" />
                    <CMSTextarea
                        value={data.description}
                        onChange={e => updateField("description", e.target.value)}
                    />


                    {/* -------- Metrics -------- */}
                    <CMSLabel labelText="Counters" />
                    {data.card?.metrics?.map((metric, i) => (
                        <div key={i} className="flex gap-2 items-center mt-2">
                            <CMSInput
                                value={metric.label}
                                onChange={e => updateMetricValue(i, e.target.value)}
                                readOnly={true}
                            />
                            <CMSInput
                                value={metric.value}
                                onChange={e => updateMetricValue(i, e.target.value)}
                                type="number"
                            />
                        </div>
                    ))}
                </CMSCard>


            </CMSSection>
            {/* -------- Save Button -------- */}
            <CMSButton
                onClick={saveData}
                loading={saving}
                label="Save Expertise"
                loadingLabel="Saving Expertise..."
            />
        </div>
    );
};
export default ExpertiesOverview;
