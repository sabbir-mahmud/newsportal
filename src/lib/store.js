import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import tokenReducer from "./slices/tokenReducer";
import userReducer from "./slices/userSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        user: userReducer,
        token: tokenReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});
