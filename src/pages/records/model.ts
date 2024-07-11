import { routes } from "../../router";
import { createEvent, createStore, sample } from "effector";
import * as tableDataApi from "../../api/tableDataApi.ts";
import { FormType } from "../../types.tsx";
import { TableType } from "../../schemas.ts";
import { redirect } from "atomic-router";

export const currentRoute = routes.main;

export const pageMounted = createEvent();
export const openModal = createEvent();
export const closeModal = createEvent();
export const deleteRecord = createEvent<number>();
export const addRecord = createEvent<FormType>();
export const updateRecord = createEvent<Partial<TableType>>();
export const getRecordById = createEvent<number>();
export const openRecord = createEvent<number>();

export const $record = createStore<TableType | null>(null);
export const $data = createStore<TableType[]>([])
  /*.on(tableDataApi.getTableDataQuery.finished.success, ({result}) => {
        console.log(result)
        return result;
    })*/
  .on(
    tableDataApi.deleteRecordMutation.finished.success,
    (state, { params }) => {
      return state.filter((item) => item.id !== params);
    }
  )
  .on(tableDataApi.addRecordMutation.finished.success, (state, { result }) => {
    return [...state, result];
  })
  .on(
    tableDataApi.updateRecordMutation.finished.success,
    (state, { result }) => {
      const index = state.findIndex((item) => item.id === result.id);
      if (index > -1) {
        const newState = [...state];
        newState.splice(index, 1, result);
        return newState;
      }
      return state;
    }
  );

export const $isModalOpen = createStore(false)
  .on(openModal, () => true)
  .on(closeModal, () => false);

export const $tableDataLoading = createStore(true).on(
  tableDataApi.getTableDataQuery.finished.success,
  () => false
);

export const $error = createStore<Error | null>(null);

sample({
  clock: pageMounted,
  target: tableDataApi.getTableDataQuery.start,
});

sample({
  clock: getRecordById,
  target: tableDataApi.getRecordByIdQuery.start,
});

sample({
  source: tableDataApi.getRecordByIdQuery.$data,
  target: $record,
});

sample({
  clock: deleteRecord,
  target: tableDataApi.deleteRecordMutation.start,
});

sample({
  clock: addRecord,
  target: tableDataApi.addRecordMutation.start,
});

sample({
  clock: updateRecord,
  target: tableDataApi.updateRecordMutation.start,
});

sample({
  source: tableDataApi.getTableDataQuery.$data,
  filter: (data) => !!data,
  target: $data,
});

sample({
  source: tableDataApi.getTableDataQuery.finished.failure,
  fn: () => new Error(),
  target: $error,
});

sample({
  source: tableDataApi.addRecordMutation.finished.failure,
  fn: () => new Error(),
  target: $error,
});

tableDataApi.getTableDataQuery.finished.failure.watch((error) => {
  console.log({ error });
});

sample({
  clock: openRecord,
  fn: (id) => ({ id }),
  target: routes.details.open,
});

sample({
  clock: currentRoute.updated,
  source: routes.details.$params,
  fn: ({ id }) => id,
  target: tableDataApi.getRecordByIdQuery.start,
});

redirect({
  clock: tableDataApi.updateRecordMutation.finished.success,
  route: currentRoute,
});

currentRoute.$params.watch(console.log);
tableDataApi.getRecordByIdQuery.finished.success.watch(() => {
  console.log("success");
});
