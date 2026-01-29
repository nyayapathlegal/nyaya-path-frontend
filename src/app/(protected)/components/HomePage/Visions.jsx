"use client";

import { useEffect, useState } from "react";
import CMSSection from "../CMS/CMSSection";
import CMSInput from "../CMS/CMSInput";
import CMSTextarea from "../CMS/CMSTextarea";
import CMSCard from "../CMS/CMSCard";
import CMSSubmitButton from "../CMS/CMSSubmitButton";
import CMSLabel from "../CMS/CMSLabel";
import CMSFallback from "../CMS/CMSFallback";

import { getVision } from  "../../../../api/home/home.api";
import { setVision } from "../../../../api/client/client.api";

import HomePageLoader from "../Loaders/HomePageLoader";
import toast from "react-hot-toast";

const Visions = () => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const MAX_ITEMS = 8;

    // Fetch legal features data
    useEffect(() => {
        const fetchFeatures = async () => {
            try {
                const data = await getVision();
                setData(data);
            } 
            catch (err) {
                console.error("Failed to vision data", err);
                setData(null);
            } 
            finally {
                setLoading(false);
            }
        };
        fetchFeatures();
    }, []);

    // Update section fields
    const updateField = (field, value) => {
        setData(prev => ({ ...prev, [field]: value }));
    };

    // Update feature item
    const updateItem = (index, field, value) => {
        setData(prev => {
            const newItems = [...prev.items];
            newItems[index] = { ...newItems[index], [field]: value };
            return { ...prev, items: newItems };
        });
    };

    // Add feature (max 8)
    const addItem = () => {
        setData(prev => {
            if (prev.items.length >= MAX_ITEMS) return prev;
            return {
                ...prev,
                items: [...prev.items, { title: "", description: "" }]
            };
        });
    };

    // Remove feature
    const removeItem = (index) => {
        setData(prev => ({
            ...prev,
            items: prev.items.filter((_, i) => i !== index)
        }));
    };
    
    // Valid fields
    const isValid = () => {
        
        if (!data.leftTitle?.trim() || !data.leftSubtitle?.trim() || !data.para?.trim()) {
            return false;
        }

        return data.items.every(
            item =>
                item.title?.trim() &&
                item.description?.trim()
        );
    };

    // Save features
    const saveFeatures = async () => {

        if (!isValid()) {
            toast.error("All fields are required");
            return;
        }

        try {
            setSaving(true);
            await setVision(data);
            toast.success("Visions saved successfully");
        } 
        catch (err) {
            console.error("Failed to save Visions", err);
            toast.error("Failed to save Visions");
        } 
        finally {
            setSaving(false);
        }
    };


    if (loading) {
        return <HomePageLoader count={11} />
    }
    
    if (!data) {
        return <CMSFallback message="No visions found." />;
    }

    return (
        <div className="flex flex-col gap-y-4">
            <CMSSection title="Visions Section">
                {/* Left Content */}
                <CMSCard>
                    <CMSLabel labelText="Left Title" />
                    <CMSInput
                        value={data.leftTitle}
                        onChange={e => updateField("leftTitle", e.target.value)}
                    />

                    <CMSLabel labelText="Left Subtitle" />
                    <CMSInput
                        value={data.leftSubtitle}
                        onChange={e => updateField("leftSubtitle", e.target.value)}
                    />

                    <CMSLabel labelText="Paragraph" />
                    <CMSTextarea
                        value={data.para}
                        onChange={e => updateField("para", e.target.value)}
                    />
                </CMSCard>

                {/* Feature Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.items.map((item, index) => (
                        <CMSCard key={index}>
                            <CMSLabel labelText={`Feature ${index + 1} Title`} />
                            <CMSInput
                                value={item.title}
                                onChange={e =>
                                    updateItem(index, "title", e.target.value)
                                }
                            />

                            <CMSLabel
                                labelText={`Feature ${index + 1} Description`}
                            />
                            <CMSTextarea
                                value={item.description}
                                onChange={e =>
                                    updateItem(
                                        index,
                                        "description",
                                        e.target.value
                                    )
                                }
                            />

                            <button
                                className="mt-2 text-red-500 text-sm hover:text-red-400"
                                onClick={() => removeItem(index)}
                            >
                                Remove Feature
                            </button>
                        </CMSCard>
                    ))}
                </div>

                {/* Add Feature Button */}
                
                
                {
                    data?.items?.length < MAX_ITEMS && (
                    <button
                        className="mt-2 text-blue-400 hover:text-blue-300 text-sm"
                        onClick={addItem}
                    >
                        + Add Feature
                    </button>
                    )
                }


            </CMSSection>

            <CMSSubmitButton
                onClick={saveFeatures}
                loading={saving}
                label="Save Visions"
                loadingLabel="Saving Visions..."
            />
        </div>
    );
};

export default Visions;