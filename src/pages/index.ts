import { createRoutesView } from "atomic-router-react";
import { mainRoute } from "./records";
import { detailsRoute } from "./records/[id]";

export const Pages = createRoutesView({
  routes: [mainRoute, detailsRoute],
});
