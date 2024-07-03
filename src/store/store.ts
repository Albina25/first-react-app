import {configureStore} from "@reduxjs/toolkit";
import tableReducer from './tableSlice';
import tableSlice from "./tableSlice";

export const store = configureStore({
    reducer: {
        table: tableReducer,
        /*middleware: getDefaultMiddleware =>
            getDefaultMiddleware().concat(tableSlice.middleware),*/
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;