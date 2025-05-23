import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

let storedUserData = Cookies.get("auth");
let initialState = storedUserData ? JSON.parse(storedUserData) : null;

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserData: (state, action) => {
            return action.payload;
        },
        userLogout: (state) => {
            Cookies.remove("auth");
            return null;
        },
        setUserDetails: (state, action) => {
            return action.payload;
        },
    },
});

export const { setUserData, userLogout, setUserDetails } = userSlice.actions;
export default userSlice.reducer;
