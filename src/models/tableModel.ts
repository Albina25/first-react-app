import {createEvent, createStore} from "effector";
import * as tableDataApi from "../api/tableDataApi.ts";
import {FormType, TableType} from "../types.tsx";

export const pageMounted = createEvent();
export const openModal = createEvent();
export const closeModal = createEvent();
export const deleteRecord = createEvent<number>();
export const addRecord = createEvent<FormType>();
export const updateRecord = createEvent<Partial<TableType>>();

export const $data = createStore<TableType[]>([])
    .on(tableDataApi.tableDataLoadFx.doneData, (_, data: TableType[]) => data)
    .on(tableDataApi.deleteRecordFx.doneData, (_, data: TableType[]) => data)
    .on(tableDataApi.addRecordFx.doneData, (_, data: TableType[]) => data)
    .on(tableDataApi.updateRecordFx.doneData, (_, data: TableType[]) => data);

export const $isModalOpen = createStore(false)
    .on(openModal, () => true)
    .on(closeModal, () => false)

export const $tableDataLoading = createStore(true)
    .on(tableDataApi.tableDataLoadFx.pending, () => true)
    .on(tableDataApi.tableDataLoadFx.done, () => false)
    .on(tableDataApi.deleteRecordFx.pending, () => true)
    .on(tableDataApi.deleteRecordFx.done, () => false)
    .on(tableDataApi.addRecordFx.pending, () => true)
    .on(tableDataApi.addRecordFx.done, () => false);

export const $error = createStore<Error | null>(null)
    .on(tableDataApi.tableDataLoadFx.fail, (_, { error }) => error)
    .on(tableDataApi.deleteRecordFx.fail, (_, { error }) => error)
    .on(tableDataApi.addRecordFx.fail, (_, { error }) => error)
    .on(tableDataApi.updateRecordFx.fail, (_, { error }) => error)

pageMounted.watch(tableDataApi.tableDataLoadFx);
deleteRecord.watch(id => tableDataApi.deleteRecordFx(id));
addRecord.watch(tableDataApi.addRecordFx);
updateRecord.watch(tableDataApi.updateRecordFx);





