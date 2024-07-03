import { useDispatch } from "react-redux";
import { tableActions } from "../store/tableSlice.ts";
import {ActionCreatorsMapObject, bindActionCreators} from "@reduxjs/toolkit";
import {AppDispatch} from "../store/store.ts";
import {useMemo} from "react";

/*
export const useActions = () => {
    const dispatch = useDispatch<AppDispatch>();
    return bindActionCreators(allActions, dispatch);
}*/

export const useActions = (actions: ActionCreatorsMapObject) => {
    const dispatch = useDispatch<AppDispatch>();
    return bindActionCreators(actions, dispatch);
    //return useMemo(() => bindActionCreators(actions, dispatch), []);
}
