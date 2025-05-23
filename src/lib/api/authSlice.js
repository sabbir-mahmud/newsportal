import { apiSlice } from "./apiSlice";

const authSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: "auth/api/v1/login/",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["auth"],
        }),
        register: builder.mutation({
            query: (data) => ({
                url: "auth/api/v1/register/",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["auth"],
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation } = authSlice;
