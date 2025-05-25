import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authModalReducer from "./slices/authModalSlice";
import filterReducer from "./slices/filterSlice";
import tokenReducer from "./slices/tokenReducer";
import userReducer from "./slices/userSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        authModal: authModalReducer,
        user: userReducer,
        token: tokenReducer,
        filter: filterReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});
