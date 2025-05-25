import { createSlice } from "@reduxjs/toolkit";

let initialState = { country: null, category: null, source: null };

export const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setCountry: (state, action) => {
            return {
                ...state,
                country: action.payload.country,
            };
        },
        setCategory: (state, action) => {
            return {
                ...state,
                category: action.payload.category,
            };
        },
        setSource: (state, action) => {
            return {
                ...state,
                source: action.payload.source,
            };
        },
    },
});

export const { setCountry, setCategory, setSource } = filterSlice.actions;
export default filterSlice.reducer;
