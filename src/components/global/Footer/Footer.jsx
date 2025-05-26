"use client";

import {
    useGetCategoriesQuery,
    useGetCountriesQuery,
    useGetSourcesQuery,
} from "@/lib/api/articleSlice";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setCategory, setCountry, setSource } from "@/lib/slices/filterSlice";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

const Footer = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);

    const { data: sources, isLoading: sourcesLoading } = useGetSourcesQuery({
        skip: !user,
    });
    const { data: categories, isLoading: categoriesLoading } =
        useGetCategoriesQuery({ skip: !user });
    const { data: countries, isLoading: countriesLoading } =
        useGetCountriesQuery({ skip: !user });

    return (
        <footer className="bg-white text-gray-700 mt-10 border-t">
            <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-5 gap-8">
                <div>
                    <h2 className="text-xl font-semibold mb-3">About Us</h2>
                    <p className="text-sm text-gray-600">
                        We connect people with trusted sources across categories
                        and countries.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-3">Sources</h2>
                    <ul className="space-y-2">
                        {!sourcesLoading && sources?.results?.length > 0 ? (
                            sources.results.slice(0, 9).map((source) => (
                                <li key={source.id}>
                                    <button
                                        onClick={() =>
                                            dispatch(
                                                setSource({
                                                    source: source.id || null,
                                                })
                                            )
                                        }
                                        className="hover:underline transition duration-200"
                                    >
                                        {source.name}
                                    </button>
                                </li>
                            ))
                        ) : (
                            <li className="text-gray-400 italic">
                                No sources available
                            </li>
                        )}
                    </ul>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-3">Categories</h2>
                    <ul className="space-y-2">
                        {!categoriesLoading &&
                        categories?.results?.length > 0 ? (
                            categories.results.slice(0, 7).map((category) => (
                                <li key={category.id}>
                                    <button
                                        onClick={() =>
                                            dispatch(
                                                setCategory({
                                                    category:
                                                        category.id || null,
                                                })
                                            )
                                        }
                                        className="hover:underline transition duration-200"
                                    >
                                        {category.name}
                                    </button>
                                </li>
                            ))
                        ) : (
                            <li className="text-gray-400 italic">
                                No categories available
                            </li>
                        )}
                    </ul>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-3">Countries</h2>
                    <ul className="space-y-2">
                        {!countriesLoading && countries?.results?.length > 0 ? (
                            countries.results.slice(0, 10).map((country) => (
                                <li key={country.code}>
                                    <button
                                        onClick={() =>
                                            dispatch(
                                                setCountry({
                                                    country: country?.id,
                                                })
                                            )
                                        }
                                        className="hover:underline transition duration-200"
                                    >
                                        {country.name}
                                    </button>
                                </li>
                            ))
                        ) : (
                            <li className="text-gray-400 italic">
                                No countries available
                            </li>
                        )}
                    </ul>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-3">Follow Us</h2>
                    <div className="flex gap-4 mt-2 text-gray-600">
                        <Link
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Facebook className="hover:text-blue-600 transition" />
                        </Link>
                        <Link
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Twitter className="hover:text-sky-500 transition" />
                        </Link>
                        <Link
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Instagram className="hover:text-pink-500 transition" />
                        </Link>
                        <Link
                            href="https://youtube.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Youtube className="hover:text-red-500 transition" />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="text-center text-sm text-gray-500 py-4 border-t">
                © {new Date().getFullYear()} News Portal. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
