import { createHistoryRouter, createRoute } from 'atomic-router';
import { createBrowserHistory, createMemoryHistory } from 'history';

/*export const tableRoute = createRoute();
export const detailsRoute = createRoute<{ id: number }>();*/

export const routes = {
    main: createRoute(),
    details: createRoute<{ id: number }>(),
}

const mainRoutes = [
    { path: '/', route: routes.main },
    { path: '/details/:id', route: routes.details },
];

export const router = createHistoryRouter({
    routes: mainRoutes,
});

const isSsr = typeof window === 'undefined';
const history = isSsr ? createMemoryHistory() : createBrowserHistory();

router.setHistory(history);
