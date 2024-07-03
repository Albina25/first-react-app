import { useDispatch } from "react-redux";
import {ActionCreatorsMapObject, bindActionCreators} from "@reduxjs/toolkit";
import {AppDispatch} from "../store/store.ts";
import {useMemo} from "react";

export const useActions = (actions: ActionCreatorsMapObject) => {
    const dispatch = useDispatch<AppDispatch>();
    return useMemo(() => bindActionCreators(actions, dispatch), []);
}
