import {currentRoute} from "./model.ts";
import RecordDetailsPage from "./RecordDetailsPage.tsx";

export const detailsRoute = {
    route: currentRoute,
    view: RecordDetailsPage,
}