import {useDispatch} from "react-redux";
import {tableActions} from "../store/tableSlice.ts";
import {bindActionCreators} from "@reduxjs/toolkit";

const allActions = {
    ...tableActions
}
export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(allActions, dispatch);
}