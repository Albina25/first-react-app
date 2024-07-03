import { useDispatch } from "react-redux";
import { tableActions } from "../store/tableSlice.ts";
import { bindActionCreators } from "@reduxjs/toolkit";
import {AppDispatch} from "../store/store.ts";

const allActions = {
    ...tableActions
}
export const useActions = () => {
    const dispatch = useDispatch<AppDispatch>();
    return bindActionCreators(allActions, dispatch);
}