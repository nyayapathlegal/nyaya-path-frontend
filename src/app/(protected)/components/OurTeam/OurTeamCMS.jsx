"use client";

import { useEffect, useState } from "react";

import CMSSection from "../CMS/CMSSection";
import CMSInput from "../CMS/CMSInput";
import CMSTextarea from "../CMS/CMSTextarea";
import CMSCard from "../CMS/CMSCard";
import CMSSubmitButton from "../CMS/CMSSubmitButton";
import CMSLabel from "../CMS/CMSLabel";
import CMSFallback from "../CMS/CMSFallback";

import HomePageLoader from "../Loaders/HomePageLoader";
import toast from "react-hot-toast";

import { getOurTeam } from "../../../../api/home/home.api";
import { setOurTeam } from "../../../../api/client/client.api";

const slugify = (text = "") => text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const areDepartmentSlugsUnique = (departments = []) => {
    const slugs = departments.map(d => d.id?.trim()).filter(Boolean);
    return new Set(slugs).size === slugs.length;
};

const areMemberSlugsUnique = (departments = []) => {
    return departments.every(dept => {
        const slugs = dept.members.map(m => m.id?.trim()).filter(Boolean);
        return new Set(slugs).size === slugs.length;
    });
};


const OurTeamCMS = () => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const MAX_MEMBERS = 10;

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const res = await getOurTeam();
                setData(res);
            }
            catch (err) {
                console.error(err);
            }
            finally {
                setLoading(false);
            }
        };
        fetchTeam();
    }, []);


    const updateHero = (field, value) => {
        setData(prev => ({
            ...prev,
            hero: {
                ...prev.hero,
                [field]: value
            }
        }));
    };

    const updateHeroTitle = (field, value) => {
        setData(prev => ({
            ...prev,
            hero: {
                ...prev.hero,
                title: {
                    ...prev.hero.title,
                    [field]: value
                }
            }
        }));
    };

    const updateHeroStat = (index, field, value) => {
        setData(prev => {
            const updatedStats = prev.hero.stats.map((stat, i) =>
                i === index ? { ...stat, [field]: value } : stat
            );

            return {
                ...prev,
                hero: {
                    ...prev.hero,
                    stats: updatedStats
                }
            };
        });
    };


    const addDepartment = () => {
        setData(prev => ({
            ...prev,
            departments: [
                ...prev.departments,
                {
                    id: "",
                    label: "",
                    tagline: "",
                    members: [
                        {
                            id: "",
                            name: "",
                            role: "",
                            badge: "",
                            experience: "",
                            specialization: "",
                            photo: ""
                        }
                    ]
                }
            ]
        }));
    };

    const removeDepartment = (deptIndex) => {
        setData(prev => {
            if (prev.departments.length <= 1) return prev;

            return {
                ...prev,
                departments: prev.departments.filter((_, i) => i !== deptIndex)
            };
        });
    };

    const updateDepartment = (deptIndex, field, value) => {
        setData(prev => {
            const departments = prev.departments.map((dept, i) => {
                if (i !== deptIndex) return dept;

                let updated = { ...dept, [field]: value };

                if (field === "label") {
                    updated.id = slugify(value);
                }

                return updated;
            });

            return { ...prev, departments };
        });
    };


    const addMember = (deptIndex) => {
        setData(prev => {
            const departments = prev.departments.map((dept, i) => {
                if (i !== deptIndex) return dept;
                if (dept.members.length >= MAX_MEMBERS) return dept;

                return {
                    ...dept,
                    members: [
                        ...dept.members,
                        {
                            id: "",
                            name: "",
                            role: "",
                            badge: "",
                            experience: "",
                            specialization: "",
                            photo: ""
                        }
                    ]
                };
            });

            return { ...prev, departments };
        });
    };

    const removeMember = (deptIndex, memberIndex) => {
        setData(prev => {
            const departments = prev.departments.map((dept, i) => {
                if (i !== deptIndex) return dept;
                if (dept.members.length <= 1) return dept;

                return {
                    ...dept,
                    members: dept.members.filter((_, idx) => idx !== memberIndex)
                };
            });

            return { ...prev, departments };
        });
    };

    const updateMember = (deptIndex, memberIndex, field, value) => {
        setData(prev => {
            const departments = prev.departments.map((dept, dIdx) => {
                if (dIdx !== deptIndex) return dept;

                const members = dept.members.map((member, mIdx) => {
                    if (mIdx !== memberIndex) return member;

                    let updated = { ...member, [field]: value };

                    if (field === "name") {
                        const baseId = slugify(value);
                        let uniqueId = baseId;
                        let count = 1;

                        const usedIds = dept.members
                            .filter((_, idx) => idx !== memberIndex)
                            .map(m => m.id);

                        while (usedIds.includes(uniqueId)) {
                            uniqueId = `${baseId}-${count++}`;
                        }

                        updated.id = uniqueId;
                    }

                    return updated;
                });

                return { ...dept, members };
            });

            return { ...prev, departments };
        });
    };

    const isValid = () => {

        if (!data?.hero?.eyebrow?.trim() ||
            !data?.hero?.title?.line1?.trim() ||
            !data?.hero?.title?.highlight?.trim() ||
            !data?.hero?.title?.line2?.trim() ||
            !data?.hero?.title?.line3?.trim() ||
            !data?.hero?.description?.trim() ||
            !data?.hero?.quote?.trim()
        ) {
            toast.error("All Hero fields are required");
            return false;
        }

        const heroStatsValid =
            Array.isArray(data.hero?.stats) &&
            data.hero.stats.every(
                stat => stat.value?.trim() && stat.label?.trim()
            );



        if (!data.hero?.stats?.length) {
            toast.error("Hero stats required");
            return false;
        }


        if (!heroStatsValid) {
            toast.error("All Hero stats must be filled");
            return false;
        }


        if (!data?.departments?.length) {
            toast.error("At least 1 Department required");
            return false;
        }

        if (!areDepartmentSlugsUnique(data.departments)) {
            toast.error("Department Names must be unique");
            return false;
        }

        if (!areMemberSlugsUnique(data.departments)) {
            toast.error("Member Names must be unique");
            return false;
        }

        const allFilled = data.departments.every(dept =>
            dept.id?.trim() &&
            dept.label?.trim() &&
            dept.tagline?.trim() &&
            dept.members.length >= 1 &&
            dept.members.every(m =>
                m.id?.trim() &&
                m.name?.trim() &&
                m.role?.trim() &&
                m.badge?.trim() &&
                m.experience?.trim() &&
                m.specialization?.trim()
            )
        );

        if (!allFilled) {
            toast.error("All fields are required");
            return false;
        }

        return true;
    };



    const saveTeam = async () => {

        if (!isValid()) {
            return;
        }

        try {
            setSaving(true);
            await setOurTeam(data);
            toast.success("Our Team saved successfully");
        }
        catch (err) {
            toast.error("Failed to save Our Team");
        }
        finally {
            setSaving(false);
        }
    };

    if (loading) return <HomePageLoader count={12} />;
    if (!data) return <CMSFallback message="No team data found" />;

    return (
        <div className="flex flex-col gap-y-6">
            <CMSSection title="Hero Section">

                <CMSLabel labelText="Eyebrow" />
                <CMSInput
                    value={data.hero?.eyebrow || ""}
                    onChange={e => updateHero("eyebrow", e.target.value)}
                />

                <CMSLabel labelText="Title Line 1" />
                <CMSInput
                    value={data.hero?.title?.line1 || ""}
                    onChange={e => updateHeroTitle("line1", e.target.value)}
                />

                <CMSLabel labelText="Highlight Word" />
                <CMSInput
                    value={data.hero?.title?.highlight || ""}
                    onChange={e => updateHeroTitle("highlight", e.target.value)}
                />

                <CMSLabel labelText="Title Line 2" />
                <CMSInput
                    value={data.hero?.title?.line2 || ""}
                    onChange={e => updateHeroTitle("line2", e.target.value)}
                />

                <CMSLabel labelText="Title Line 3" />
                <CMSInput
                    value={data.hero?.title?.line3 || ""}
                    onChange={e => updateHeroTitle("line3", e.target.value)}
                />

                <CMSLabel labelText="Description" />
                <CMSTextarea
                    value={data.hero?.description || ""}
                    onChange={e => updateHero("description", e.target.value)}
                />

                <CMSLabel labelText="Quote" />
                <CMSTextarea
                    value={data.hero?.quote || ""}
                    onChange={e => updateHero("quote", e.target.value)}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    {data.hero?.stats?.map((stat, index) => (
                        <CMSCard key={index}>
                            <CMSLabel labelText="Value" />
                            <CMSInput
                                value={stat.value}
                                onChange={e =>
                                    updateHeroStat(index, "value", e.target.value)
                                }
                            />

                            <CMSLabel labelText="Label" />
                            <CMSInput
                                value={stat.label}
                                onChange={e =>
                                    updateHeroStat(index, "label", e.target.value)
                                }
                            />
                        </CMSCard>
                    ))}
                </div>

            </CMSSection>

            <CMSSection title="Team & Departments">


                {
                    data?.departments?.map((dept, deptIndex) => (
                        <CMSCard key={deptIndex}>

                            <div className="flex justify-between items-center">
                                <h3 className="font-semibold">
                                    Department {deptIndex + 1}
                                </h3>

                                {
                                    data?.departments?.length > 1 && (
                                        <button
                                            className="text-red-400 text-sm"
                                            onClick={() => removeDepartment(deptIndex)}
                                        >
                                            Remove Department
                                        </button>
                                    )
                                }
                            </div>

                            <CMSLabel labelText="Department Name" />
                            <CMSInput
                                value={dept.label}
                                onChange={e =>
                                    updateDepartment(deptIndex, "label", e.target.value)
                                }
                            />


                            <CMSLabel labelText="Tagline" />
                            <CMSInput
                                value={dept.tagline}
                                onChange={e =>
                                    updateDepartment(deptIndex, "tagline", e.target.value)
                                }
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                {dept.members.map((member, memberIndex) => (
                                    <CMSCard key={memberIndex}>

                                        <CMSLabel labelText="Name" />
                                        <CMSInput
                                            value={member.name}
                                            onChange={e =>
                                                updateMember(deptIndex, memberIndex, "name", e.target.value)
                                            }
                                        />

                                        <CMSLabel labelText="Role" />
                                        <CMSInput
                                            value={member.role}
                                            onChange={e =>
                                                updateMember(deptIndex, memberIndex, "role", e.target.value)
                                            }
                                        />

                                        <CMSLabel labelText="Badge" />
                                        <CMSInput
                                            value={member.badge}
                                            onChange={e =>
                                                updateMember(deptIndex, memberIndex, "badge", e.target.value)
                                            }
                                        />

                                        <CMSLabel labelText="Experience" />
                                        <CMSInput
                                            value={member.experience}
                                            onChange={e =>
                                                updateMember(deptIndex, memberIndex, "experience", e.target.value)
                                            }
                                        />

                                        <CMSLabel labelText="Specialization" />
                                        <CMSTextarea
                                            value={member.specialization}
                                            onChange={e =>
                                                updateMember(
                                                    deptIndex,
                                                    memberIndex,
                                                    "specialization",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <CMSLabel labelText="Photo URL" />
                                        <CMSInput
                                            value={member.photo}
                                            onChange={e =>
                                                updateMember(deptIndex, memberIndex, "photo", e.target.value)
                                            }
                                        />

                                        {dept.members.length > 1 && (
                                            <button
                                                className="mt-2 text-red-500 text-sm"
                                                onClick={() => removeMember(deptIndex, memberIndex)}
                                            >
                                                Remove Member
                                            </button>
                                        )}
                                    </CMSCard>
                                ))}
                            </div>

                            {dept.members.length < MAX_MEMBERS && (
                                <button
                                    className="mt-3 text-blue-400 text-sm"
                                    onClick={() => addMember(deptIndex)}
                                >
                                    + Add Member
                                </button>
                            )}

                        </CMSCard>
                    ))
                }

                <button
                    className="text-blue-400 text-sm"
                    onClick={addDepartment}
                >
                    + Add Department
                </button>

            </CMSSection>

            <CMSSubmitButton
                onClick={saveTeam}
                loading={saving}
                label="Save Our Team"
                loadingLabel="Saving Our Team..."
            />
        </div>
    );
};

export default OurTeamCMS;