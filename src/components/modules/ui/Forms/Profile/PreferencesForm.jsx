"use client";

import {
    useGetCategoriesQuery,
    useGetCountriesQuery,
    useGetSourcesQuery,
} from "@/lib/api/articleSlice";
import { useAppSelector } from "@/lib/hooks";
import { useMemo, useState } from "react";
import MultiSelect from "../MultiSelect";

const PreferencesForm = () => {
    const user = useAppSelector((state) => state.user);
    const [bio, setBio] = useState(user?.bio || "");
    const [selectedSources, setSelectedSources] = useState(
        user?.source_preferences || []
    );
    const [selectedCountries, setSelectedCountries] = useState(
        user?.country_preferences || []
    );
    const [selectedCategories, setSelectedCategories] = useState(
        user?.category_preferences || []
    );

    const { data: sources, isLoading: sourcesLoading } = useGetSourcesQuery({
        skip: !user,
    });
    const { data: categories, isLoading: categoriesLoading } =
        useGetCategoriesQuery({ skip: !user });
    const { data: countries, isLoading: countriesLoading } =
        useGetCountriesQuery({ skip: !user });

    const fallbackSources = [
        { id: 1, name: "BBC News" },
        { id: 2, name: "CNN" },
        { id: 3, name: "Al Jazeera" },
        { id: 4, name: "Reuters" },
    ];
    const fallbackCountries = [
        { id: 1, name: "United States" },
        { id: 2, name: "United Kingdom" },
        { id: 3, name: "Germany" },
    ];
    const fallbackCategories = [
        { id: 1, name: "World" },
        { id: 2, name: "Politics" },
        { id: 3, name: "Business" },
        { id: 4, name: "Technology" },
    ];

    const allSources = useMemo(
        () => sources?.results || fallbackSources,
        [sources]
    );
    const allCountries = useMemo(
        () => countries?.results || fallbackCountries,
        [countries]
    );
    const allCategories = useMemo(
        () => categories?.results || fallbackCategories,
        [categories]
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            bio,
            source_preferences: selectedSources.map((s) => s.id),
            country_preferences: selectedCountries.map((c) => c.id),
            category_preferences: selectedCategories.map((c) => c.id),
        };

        console.log("Submitted Payload:", payload);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
            <h2 className="text-xl font-semibold">Update Preferences</h2>

            <div>
                <label className="block font-medium">Bio</label>
                <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="textarea textarea-bordered w-full border p-2 rounded-md"
                    rows={5}
                />
            </div>

            <MultiSelect
                title="Sources"
                label="News Sources"
                name="source_preferences"
                isLoading={sourcesLoading}
                renderOptions={() =>
                    allSources?.map((s) => ({ value: s.id, label: s.name }))
                }
                defaultValueRenderer={() =>
                    selectedSources?.map((s) => ({
                        value: s.id,
                        label: s.name,
                    }))
                }
                onChange={(options) =>
                    setSelectedSources(
                        options.map((opt) => ({
                            id: opt.value,
                            name: opt.label,
                        }))
                    )
                }
            />

            <MultiSelect
                title="Countries"
                label="Countries"
                name="country_preferences"
                isLoading={countriesLoading}
                renderOptions={() =>
                    allCountries?.map((c) => ({ value: c.id, label: c.name }))
                }
                defaultValueRenderer={() =>
                    selectedCountries?.map((c) => ({
                        value: c.id,
                        label: c.name,
                    }))
                }
                onChange={(options) =>
                    setSelectedCountries(
                        options.map((opt) => ({
                            id: opt.value,
                            name: opt.label,
                        }))
                    )
                }
            />

            <MultiSelect
                title="Categories"
                label="Categories"
                name="category_preferences"
                isLoading={categoriesLoading}
                renderOptions={() =>
                    allCategories?.map((c) => ({ value: c.id, label: c.name }))
                }
                defaultValueRenderer={() =>
                    selectedCategories?.map((c) => ({
                        value: c.id,
                        label: c.name,
                    }))
                }
                onChange={(options) =>
                    setSelectedCategories(
                        options.map((opt) => ({
                            id: opt.value,
                            name: opt.label,
                        }))
                    )
                }
            />

            <button
                type="submit"
                className="px-4 py-2 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700"
            >
                Save Preferences
            </button>
        </form>
    );
};

export default PreferencesForm;
