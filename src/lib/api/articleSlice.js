import { apiSlice } from "./apiSlice";

const articleSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getArticles: builder.query({
            query: () => ({
                url: "/articles/api/v1/articles/",
                method: "GET",
            }),
        }),
    }),
});

export const { useGetArticlesQuery } = articleSlice;
