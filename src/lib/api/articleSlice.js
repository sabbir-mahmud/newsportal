import { apiSlice } from "./apiSlice";

const articleSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getArticles: builder.query({
            query: ({ page, search }) => {
                let url = `/articles/api/v1/articles/?page=${page}`;
                if (search) {
                    url += `&search=${search}`;
                }

                return { url, method: "GET" };
            },
        }),
    }),
});

export const { useGetArticlesQuery } = articleSlice;
