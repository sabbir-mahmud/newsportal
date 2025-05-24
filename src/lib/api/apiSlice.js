import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLogout } from "../slices/userSlice";

const URL = process.env.NEXT_PUBLIC_API_HOST;

const baseQuery = fetchBaseQuery({
    baseUrl: URL,
    prepareHeaders: (headers, { getState }) => {
        const token = getState().token?.access_token;

        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        api.dispatch(userLogout());
    }

    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReAuth,
    tagTypes: [
        "auth",
        "profile",
        "articles",
        "countries",
        "categories",
        "sources",
    ],
    endpoints: (builder) => ({}),
});

export const {} = apiSlice;
