import { routes } from "../../../router";
import { sample } from "effector";
import * as tableDataApi from "../../../api/tableDataApi.ts";

export const currentRoute = routes.details;

sample({
  clock: currentRoute.opened,
  fn: ({ params }) => params.id,
  target: tableDataApi.getRecordByIdQuery.start,
});

currentRoute.opened.watch((state) => console.log(state));
