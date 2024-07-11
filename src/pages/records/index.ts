import {currentRoute} from "./model.ts";
import TablePage from "./TablePage.tsx";

export const mainRoute = {
    route: currentRoute,
    view: TablePage,
}