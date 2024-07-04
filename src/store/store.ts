import {configureStore} from "@reduxjs/toolkit";
import { tableDataApi } from  "../api/tableDataApi"

const rootReducer = {
    [tableDataApi.reducerPath]: tableDataApi.reducer,
};

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(tableDataApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;