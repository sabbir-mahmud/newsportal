import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

let storedUserData = Cookies.get("auth");
let initialState = storedUserData ? JSON.parse(storedUserData) : null;

export const tokenSlice = createSlice({
    name: "token",
    initialState,
    reducers: {
        setToken: (state, action) => {
            Cookies.set("auth", JSON.stringify(action.payload), {
                expires: 30,
            });
            return action.payload;
        },
    },
});

export const { setToken } = tokenSlice.actions;
export default tokenSlice.reducer;
