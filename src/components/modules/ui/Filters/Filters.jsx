"use client";
import {
    useGetCategoriesQuery,
    useGetCountriesQuery,
    useGetSourcesQuery,
} from "@/lib/api/articleSlice";
import { useAppDispatch } from "@/lib/hooks";
import { setCategory, setCountry, setSource } from "@/lib/slices/filterSlice";
import Select from "react-select";

const Filters = ({ searchTerm, setSearchTerm, country, source, category }) => {
    const dispatch = useAppDispatch();
    const { data: sources = { results: [] }, isLoading: sourcesLoading } =
        useGetSourcesQuery();
    const { data: categories = { results: [] }, isLoading: categoriesLoading } =
        useGetCategoriesQuery();
    const { data: countries = { results: [] }, isLoading: countriesLoading } =
        useGetCountriesQuery();

    const countryOptions = countries.results.slice(0, 25).map((c) => ({
        value: c.id,
        label: c.name,
    }));

    const sourceOptions = sources.results.slice(0, 25).map((s) => ({
        value: s.id,
        label: s.name,
    }));

    const categoryOptions = categories.results.slice(0, 25).map((c) => ({
        value: c.id,
        label: c.name,
    }));

    const getSelectedOption = (options, value) =>
        options.find((option) => option.value === value) || null;

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                />

                <Select
                    options={countryOptions}
                    value={getSelectedOption(countryOptions, country)}
                    onChange={(selected) =>
                        dispatch(
                            setCountry({ country: selected?.value || null })
                        )
                    }
                    placeholder={
                        countriesLoading ? "Loading countries..." : "Country"
                    }
                    isLoading={countriesLoading}
                    isClearable
                    className="react-select-container"
                    classNamePrefix="react-select"
                />

                <Select
                    options={sourceOptions}
                    value={getSelectedOption(sourceOptions, source)}
                    onChange={(selected) =>
                        dispatch(setSource({ source: selected?.value || null }))
                    }
                    placeholder={
                        sourcesLoading ? "Loading sources..." : "Source"
                    }
                    isLoading={sourcesLoading}
                    isClearable
                    className="react-select-container"
                    classNamePrefix="react-select"
                />

                <Select
                    options={categoryOptions}
                    value={getSelectedOption(categoryOptions, category)}
                    onChange={(selected) =>
                        dispatch(
                            setCategory({ category: selected?.value || null })
                        )
                    }
                    placeholder={
                        categoriesLoading ? "Loading categories..." : "Category"
                    }
                    isLoading={categoriesLoading}
                    isClearable
                    className="react-select-container"
                    classNamePrefix="react-select"
                />
            </div>
        </div>
    );
};

export default Filters;
