import { createSlice } from "@reduxjs/toolkit";

let initialState = { open: false, type: "login" };

export const authModalSlice = createSlice({
    name: "authModal",
    initialState,
    reducers: {
        openAuthModal: (state, action) => {
            return {
                ...state,
                open: true,
                type: action.payload.type,
            };
        },
        closeAuthModal: (state) => {
            return {
                ...state,
                open: false,
            };
        },
        setAuthModalType: (state, action) => {
            return {
                ...state,
                type: action.payload.type,
            };
        },
    },
});

export const { openAuthModal, closeAuthModal, setAuthModalType } =
    authModalSlice.actions;
export default authModalSlice.reducer;
