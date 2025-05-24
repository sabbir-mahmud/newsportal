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
        getUser: builder.query({
            query: () => ({
                url: "articles/api/v1/profiles/",
                method: "GET",
            }),
            providesTags: ["profile"],
        }),
        updateUser: builder.mutation({
            query: ({ id, data }) => ({
                url: `auth/api/v1/user/${id}/`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["profile"],
        }),
        updateProfile: builder.mutation({
            query: ({ id, data }) => ({
                url: `articles/api/v1/profiles/${id}/`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["profile"],
        }),
        updatePassword: builder.mutation({
            query: (data) => ({
                url: "auth/api/v1/change-password/",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["auth"],
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useGetUserQuery,
    useUpdatePasswordMutation,
    useUpdateProfileMutation,
    useUpdateUserMutation,
} = authSlice;
