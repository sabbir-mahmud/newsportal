"use client";
import Loading from "@/components/global/Loading/Loading";
import Paginator from "@/components/global/Paginator/Paginator";
import Articles from "@/components/modules/ui/Articles/Articles";
import Filters from "@/components/modules/ui/Filters/Filters";
import { useGetArticlesQuery } from "@/lib/api/articleSlice";
import { useAppSelector } from "@/lib/hooks";
import { FileText } from "lucide-react";
import { useEffect, useState } from "react";

const Home = () => {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

    const country = useAppSelector((state) => state.filter.country);
    const source = useAppSelector((state) => state.filter.source);
    const category = useAppSelector((state) => state.filter.category);

    const user = useAppSelector((state) => state.user);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
            setPage(1);
        }, 400);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    const {
        data: articlesData,
        isLoading,
        refetch,
    } = useGetArticlesQuery({
        page,
        search: debouncedSearchTerm.trim(),
        country: country,
        source: source,
        category: category,
    });

    useEffect(() => {
        setPage(1);
        refetch();
    }, [country, source, category, user, refetch]);

    if (isLoading) {
        return (
            <div className="mt-24 flex justify-center">
                <Loading />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Filters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                country={country}
                source={source}
                category={category}
            />

            {!articlesData || !articlesData.results.length ? (
                <div className="flex flex-col items-center justify-center mt-32 text-center px-4">
                    <FileText className="w-16 h-16 text-gray-400 mb-4" />
                    <h2 className="text-2xl font-semibold text-gray-700">
                        No Articles Found
                    </h2>
                    <p className="text-gray-500 mt-2 max-w-md">
                        We couldn’t find any articles at the moment. Please
                        check back later or try refreshing the page.
                    </p>
                </div>
            ) : (
                <>
                    <Articles articlesData={articlesData} />
                    <Paginator
                        page={page}
                        setPage={setPage}
                        count={articlesData.count}
                        length={articlesData.results.length}
                    />
                </>
            )}
        </div>
    );
};

export default Home;
