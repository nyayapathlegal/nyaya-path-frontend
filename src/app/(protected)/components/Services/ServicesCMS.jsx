"use client";

import { useEffect, useState } from "react";
import CMSInput from "../CMS/CMSInput";
import CMSCard from "../CMS/CMSCard";
import CMSSubmitButton from "../CMS/CMSSubmitButton";
import CMSLabel from "../CMS/CMSLabel";
import CMSFallback from "../CMS/CMSFallback";
import CMSTopButton from "../CMS/CMSTopButtons";
import CMSSection from "../CMS/CMSSection";
import CMSTextarea from "../CMS/CMSTextarea";
import HomePageLoader from "../Loaders/HomePageLoader";
import toast from "react-hot-toast";
import { getServices } from "@/api/home/home.api";
import { setServices } from "@/api/client/client.api";
import CMSDetailsWrapper from "../CMS/CMSDetailsWrapper";

/* ---------- helpers ---------- */
const generateSlug = text =>
    text
        ?.toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

const hasDuplicateSlugs = services => {
    return services.some(service => {
        const slugs = service.subServices
            .map(sub => sub.slug?.trim())
            .filter(Boolean);

        return new Set(slugs).size !== slugs.length;
    });
};

/* -------------------------------- */

const ServicesCMS = () => {

    const [data, setData] = useState(null);
    const [activeTab, setActiveTab] = useState(0);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getServices();
                setData(res);
            }
            catch {
                setData(null);
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const MAX_SERVICES = 5;
    const MAX_SUB_SERVICES = 6;
    const MAX_POINTS = 6;


    // Update field helper
    const updateField = (path, value) => {
        setData(prev => {
            const copy = structuredClone(prev);
            const keys = path.split(".");
            let obj = copy;
            for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
            obj[keys[keys.length - 1]] = value;
            return copy;
        });
    };

    // Tabs Services handlers
    const addService = () => {
        setData(prev => {
            if (prev.services.length >= MAX_SERVICES) {
                toast.error("Maximum 5 services allowed");
                return prev;
            }

            return {
                ...prev,
                services: [
                    ...prev.services,
                    {
                        title: "",
                        description: "",
                        image: "",
                        subServices: [
                            {
                                title: "",
                                slug: "page-1",
                                description: "",
                                points: [""], // default 1 point
                            },
                        ],
                    },
                ],
            };
        });
    };

    const removeService = index => {
        setData(prev => {
            if (prev.services.length === 1) {
                toast.error("At least one service is required");
                return prev;
            }

            const copy = structuredClone(prev);
            copy.services.splice(index, 1);
            return copy;
        });

        setActiveTab(prevTab =>
            prevTab >= index ? Math.max(prevTab - 1, 0) : prevTab
        );
    };

    // Sub-services handlers
    const addSubService = index => {
        setData(prev => {
            const copy = structuredClone(prev);

            if (copy.services[index].subServices.length >= MAX_SUB_SERVICES) {
                toast.error("Maximum 6 pages allowed per service");
                return prev;
            }

            copy.services[index].subServices.push({
                title: "",
                slug: `page-${copy.services[index].subServices.length + 1}`,
                description: "",
                points: [""], // default 1 point
            });

            return copy;
        });
    };

    const updateSubServiceTitle = (i, j, title) => {
        setData(prev => {
            const copy = structuredClone(prev);
            copy.services[i].subServices[j].title = title;
            copy.services[i].subServices[j].slug = generateSlug(title);
            return copy;
        });
    };

    const removeSubService = (serviceIndex, subIndex) => {
        setData(prev => {
            const copy = structuredClone(prev);

            if (copy.services[serviceIndex].subServices.length === 1) {
                toast.error("At least 1 page is required");
                return prev;
            }

            copy.services[serviceIndex].subServices.splice(subIndex, 1);
            return copy;
        });
    };

    // Points handlers
    const addPoint = (serviceIndex, subIndex) => {
        setData(prev => {
            const copy = structuredClone(prev);

            if (copy.services[serviceIndex].subServices[subIndex].points.length >= MAX_POINTS) {
                toast.error("Maximum 6 points allowed");
                return prev;
            }

            copy.services[serviceIndex].subServices[subIndex].points.push("");
            return copy;
        });
    };

    const updatePoint = (serviceIndex, subIndex, pointIndex, value) => {
        setData(prev => {
            const copy = structuredClone(prev);
            copy.services[serviceIndex].subServices[subIndex].points[pointIndex] = value;
            return copy;
        });
    };

    const removePoint = (serviceIndex, subIndex, pointIndex) => {
        setData(prev => {
            const copy = structuredClone(prev);
            const points = copy.services[serviceIndex].subServices[subIndex].points;

            if (points.length === 1) {
                toast.error("At least 1 point is required");
                return prev;
            }

            points.splice(pointIndex, 1);
            return copy;
        });
    };

    // Validation
    const validateServices = () => {

        if (!data?.services || data.services.length === 0) {
            toast.error("At least 1 service is required");
            return false;
        }


        if (hasDuplicateSlugs(data?.services)) {
            toast.error("Service Titles must be unique.");
            return false;
        }

        for (let i = 0; i < data.services.length; i++) {
            const service = data.services[i];

            if (!service.title?.trim()) {
                toast.error(`Service ${i + 1}: Title is required`);
                return false;
            }

            if (!service.description?.trim()) {
                toast.error(`Service ${i + 1}: Description is required`);
                return false;
            }

            // ✅ Zero pages check
            if (!service.subServices || service.subServices.length === 0) {
                toast.error(`Service ${i + 1}: At least 1 page is required`);
                return false;
            }

            for (let j = 0; j < service.subServices.length; j++) {
                const sub = service.subServices[j];

                if (!sub.title?.trim()) {
                    toast.error(`Service ${i + 1}, Page ${j + 1}: Title is required`);
                    return false;
                }

                if (!sub.description?.trim()) {
                    toast.error(`Service ${i + 1}, Page ${j + 1}: Description is required`);
                    return false;
                }

                // ✅ Zero points check
                if (!sub.points || sub.points.length === 0) {
                    toast.error(`Service ${i + 1}, Page ${j + 1}: At least 1 point is required`);
                    return false;
                }

                for (let k = 0; k < sub.points.length; k++) {
                    if (!sub.points[k]?.trim()) {
                        toast.error(
                            `Service ${i + 1}, Page ${j + 1}, Point ${k + 1}: Cannot be empty`
                        );
                        return false;
                    }
                }
            }
        }

        return true;
    };

    // Save services
    const saveServices = async () => {
        if (!validateServices()) return;

        try {
            setSaving(true);
            await setServices(data);
            toast.success("Services saved successfully");
        }
        catch {
            toast.error("Failed to save services");
        }
        finally {
            setSaving(false);
        }
    };


    if (loading) return <HomePageLoader count={10} />;
    if (!data) return <CMSFallback message="No services data found." />;

    return (
        <>
            {/* Left content */}
            <CMSSection title="Services Page Content">
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
            </CMSSection>


            {/* Tabs */}
            <div className="flex gap-4 border-b border-white/10">
                {
                    data.services.map((_, i) => (
                        <div key={i} className="relative group">

                            <CMSTopButton
                                label={`Service ${i + 1}`}
                                active={activeTab === i}
                                onClick={() => setActiveTab(i)}
                            />

                            {/* Hover delete icon */}
                            <button
                                onClick={e => {
                                    e.stopPropagation(); // prevent tab switch
                                    removeService(i);
                                }}
                                className="
                                    absolute -top-1 -right-1
                                    hidden group-hover:flex
                                    items-center justify-center
                                    w-5 h-5
                                    rounded-full
                                    bg-red-500 text-white
                                    text-xs
                                    duration-200 ease-in-out
                                    hover:bg-red-600
                                "
                                title="Remove Service"
                            >
                                ✕
                            </button>

                        </div>
                    )
                    )}

                {
                    data?.services?.length < MAX_SERVICES && (
                        <button
                            className="mt-2 text-blue-400 hover:text-blue-300 text-sm"
                            onClick={addService}
                        >
                            + Add Service
                        </button>
                    )
                }


            </div>

            {/* Active service */}
            <div className="mt-4 transition-opacity duration-300 ease-in-out opacity-100">
                <div className="flex flex-col gap-y-4">
                    {
                        data.services.map((service, i) =>
                            i === activeTab ? (
                                <CMSSection key={i} title="Service Details">
                                    <CMSCard>
                                        <CMSLabel labelText="Service Title" />
                                        <CMSInput
                                            value={service.title}
                                            onChange={e =>
                                                updateField(`services.${i}.title`, e.target.value)
                                            }
                                        />
                                        <CMSLabel labelText="Service Description" />
                                        <CMSTextarea
                                            value={service.description}
                                            onChange={e =>
                                                updateField(`services.${i}.description`, e.target.value)
                                            }
                                        />
                                        <CMSLabel labelText="Image URL" />
                                        <CMSInput
                                            value={service.image}
                                            onChange={e =>
                                                updateField(`services.${i}.image`, e.target.value)
                                            }
                                        />
                                    </CMSCard>

                                    {/* Sub-services */}
                                    {
                                        service.subServices.map((sub, j) => (
                                            <CMSCard key={j} className="relative"> 
                                                
                                                <CMSDetailsWrapper summary={sub.title || "New Page"} defaultOpen={false}>
                                                  
                                                    {
                                                        service.subServices.length > 1 ? (
                                                            <button
                                                                type="button"
                                                                onClick={() => removeSubService(i, j)}
                                                                className="text-red-500 text-sm absolute top-6 right-6 hover:text-red-400"
                                                            >

                                                                ✕ Remove Page
                                                            </button>
                                                        ) : null
                                                    }
                                                 

                                                    <CMSCard>
                                                        <CMSLabel labelText="Service Slug" />
                                                        <CMSInput value={sub.slug} readOnly />

                                                        <CMSLabel labelText="Service Title" />
                                                        <CMSInput
                                                            value={sub.title}
                                                            onChange={e =>
                                                                updateSubServiceTitle(i, j, e.target.value)
                                                            }
                                                        />

                                                        <CMSLabel labelText="Service Description" />
                                                        <CMSTextarea
                                                            value={sub.description}
                                                            onChange={e =>
                                                                updateField(
                                                                    `services.${i}.subServices.${j}.description`,
                                                                    e.target.value
                                                                )
                                                            }
                                                        />

                                                        {/* Points */}
                                                        <CMSLabel labelText="Points" />

                                                        <div className="flex flex-col gap-2">
                                                            {sub.points.map((point, k) => (
                                                                <div key={k} className="flex gap-2 items-center">
                                                                    <CMSInput
                                                                        value={point}
                                                                        onChange={e =>
                                                                            updatePoint(i, j, k, e.target.value)
                                                                        }
                                                                    />
                                                                    {
                                                                        sub.points.length > 1 && (
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => removePoint(i, j, k)}
                                                                                className="text-red-400 hover:text-red-300 text-sm"
                                                                            >
                                                                                ✕
                                                                            </button>
                                                                        )
                                                                    }

                                                                </div>
                                                            ))}

                                                            {sub.points.length < MAX_POINTS && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => addPoint(i, j)}
                                                                    className="text-blue-400 hover:text-blue-300 text-sm"
                                                                >
                                                                    + Add Point
                                                                </button>
                                                            )}
                                                        </div>
                                                    </CMSCard> 
                                                </CMSDetailsWrapper>
                                            </CMSCard>
                                        ))
                                    }

                                    {
                                        service?.subServices?.length < MAX_SUB_SERVICES && (
                                            <button
                                                className="mt-2 text-blue-400 hover:text-blue-300 text-sm"
                                                onClick={() => addSubService(i)}
                                            >
                                                + Add Page
                                            </button>
                                        )
                                    }
                                </CMSSection>
                            ) : null
                        )
                    }

                    <CMSSubmitButton
                        onClick={saveServices}
                        loading={saving}
                        label="Save Services"
                        loadingLabel="Saving Services..."
                    />
                </div>
            </div>
        </>
    );
};

export default ServicesCMS;