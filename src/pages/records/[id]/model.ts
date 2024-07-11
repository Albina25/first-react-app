import {routes} from "../../../router"
import {sample} from "effector";
import * as tableDataApi from "../../../api/tableDataApi.ts";

export const currentRoute = routes.details;

sample ({
    clock: currentRoute.opened,
    source: currentRoute.$params,
    fn: ({id}) => {
        console.log('samle', id)
        return +id;
    },
    target: tableDataApi.getRecordByIdQuery.start,

})
