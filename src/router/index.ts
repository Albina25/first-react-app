import { createHistoryRouter, createRoute } from "atomic-router";
import { sample } from "effector";
import { createBrowserHistory } from "history";
import { initApp } from "../config/init";

export const routes = {
  main: createRoute(),
  details: createRoute<{ id: number }>(),
};

const mainRoutes = [
  { path: "/", route: routes.main },
  { path: "/details/:id", route: routes.details },
];

export const router = createHistoryRouter({
  routes: mainRoutes,
});

sample({
  clock: initApp,
  fn: () => createBrowserHistory(),
  target: router.setHistory,
});
