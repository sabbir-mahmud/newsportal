import { apiSlice } from "./apiSlice";

const articleSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getArticles: builder.query({
            query: ({ page, search, country, source, category }) => {
                console.log("Fetching articles with params:", {
                    page,
                    search,
                    country,
                    source,
                    category,
                });

                let url = `articles/api/v1/articles/?page=${page}`;
                if (search) {
                    url += `&search=${search}`;
                }
                if (country) {
                    url += `&country=${country}`;
                }
                if (source) {
                    url += `&source=${source}`;
                }
                if (category) {
                    url += `&category=${category}`;
                }

                return { url, method: "GET" };
            },
            providesTags: ["articles"],
        }),
        getCountries: builder.query({
            query: () => ({
                url: "core/api/v1/countries?page_size=100",
                method: "GET",
            }),
            providesTags: ["countries"],
        }),
        getCategories: builder.query({
            query: () => ({
                url: "core/api/v1/categories?page_size=100",
                method: "GET",
            }),
            providesTags: ["categories"],
        }),
        getSources: builder.query({
            query: () => ({
                url: "core/api/v1/sources?page_size=100",
                method: "GET",
            }),
            providesTags: ["sources"],
        }),
    }),
});

export const {
    useGetArticlesQuery,
    useGetSourcesQuery,
    useGetCategoriesQuery,
    useGetCountriesQuery,
} = articleSlice;
