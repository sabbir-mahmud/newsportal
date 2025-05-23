"use client";
import Loading from "@/components/global/Loading/Loading";
import Paginator from "@/components/global/Paginator/Paginator";
import Articles from "@/components/modules/ui/Articles/Articles";
import { useGetArticlesQuery } from "@/lib/api/articleSlice";
import { FileText } from "lucide-react";
import { useState } from "react";

const Home = () => {
    const [page, setPage] = useState(1);
    const { data: articlesData, isLoading } = useGetArticlesQuery({
        page,
    });

    if (isLoading) {
        return (
            <div className="mt-24 flex justify-center">
                <Loading />
            </div>
        );
    }

    if (articlesData || !articlesData.results.length) {
        return (
            <div className="flex flex-col items-center justify-center mt-32 text-center px-4">
                <FileText className="w-16 h-16 text-gray-400 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-700">
                    No Articles Found
                </h2>
                <p className="text-gray-500 mt-2 max-w-md">
                    We couldn’t find any articles at the moment. Please check
                    back later or try refreshing the page.
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-4">
            <Articles articlesData={articlesData} />
            <Paginator
                page={page}
                setPage={setPage}
                count={articlesData.count}
                length={articlesData.results.length}
            />
        </div>
    );
};

export default Home;
