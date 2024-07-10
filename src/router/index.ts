//import {createHistoryRouter, createRoute} from 'atomic-router';
//import { createBrowserHistory, createMemoryHistory } from 'history';
//import {RouteType} from "../types.tsx";

import  { TablePage } from '../pages/TablePage.tsx';
import RecordDetailsPage from "../pages/RecordDetailsPage.tsx";
//import RecordDetailsPage from "../pages/RecordDetailsPage.tsx";

//const tableRoute = createRoute();


// 1. Define routes
/*const routes = [
    { path: '/', route: tableRoute, view: TablePage },
    //{ path: '/details/:id', route: detailsRoute, view: RecordDetailsPage, exact: true },
];*/

export const routes = [
    { path: '/', component: TablePage, exact: true},
    { path: '/details/:id', component: RecordDetailsPage, exact: true },
];

/*const router = createHistoryRouter({
    routes,
});

const isSsr = typeof window === 'undefined';
const history = isSsr ? createMemoryHistory() : createBrowserHistory();

router.setHistory(history);*/

export { router, tableRoute, detailsRoute };
