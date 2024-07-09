import {createEvent, createStore, sample} from "effector";
import * as tableDataApi from "../api/tableDataApi.ts";
import {FormType} from "../types.tsx";
import {TableType} from "../schemas.ts"

export const pageMounted = createEvent();
export const openModal = createEvent();
export const closeModal = createEvent();
export const deleteRecord = createEvent<number>();
export const addRecord = createEvent<FormType>();
export const updateRecord = createEvent<Partial<TableType>>();

export const $data = createStore<TableType[]>([])
    /*.on(tableDataApi.getTableDataQuery.finished.success, ({result}) => {
        console.log(result)
        return result;
    })*/
    .on(tableDataApi.deleteRecordMutation.finished.success, (state, {params}) => {
        return state.filter((item) => item.id !== params);
    })
    .on(tableDataApi.addRecordMutation.finished.success, (state, {result}) => {
        return [...state, result];
    })
    .on(tableDataApi.updateRecordMutation.finished.success, (state, {result}) => {
        const index = state.findIndex(item => item.id === result.id);
        if (index > -1) {
            const newState = [...state];
            newState.splice(index, 1, result);
            return newState;
        }
        return state
    });

export const $isModalOpen = createStore(false)
    .on(openModal, () => true)
    .on(closeModal, () => false)

export const $tableDataLoading = createStore(true)
    .on(tableDataApi.getTableDataQuery.finished.success, () => false)

export const $error = createStore<Error | null>(null);

sample({
    clock: pageMounted,
    target: tableDataApi.getTableDataQuery.start,
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
    target: $data,
});

sample({
    source: tableDataApi.getTableDataQuery.finished.failure,
    fn: ({ error }) =>  error.message,
    target: $error,
});

sample({
    source: tableDataApi.addRecordMutation.finished.failure,
    fn: ({ error }) => error.message,
    target: $error,
});

tableDataApi.getTableDataQuery.finished.failure.watch((error) => {
    console.log({error})
})