import {createEffect} from "effector";
import {FormType, TableType} from "../types.tsx";
import {tableData} from "../data/TableData.tsx";
import { $data } from '../models/tableModel';

function getTableData(): TableType[] | [] {
    return tableData.length ? tableData : [];
}

export function wait(timeout = 100) {
    return new Promise((resolve) => setTimeout(resolve, timeout));
}

export const tableDataLoadFx = createEffect<void, TableType[], Error>(async () => {
    const tableData = getTableData();
    await wait();
    return tableData ?? [];
});

export const deleteRecordFx = createEffect<number, TableType[], Error>(async (id: number) => {
    const tableData = $data.getState();
    await wait();
    const updated = tableData.filter((item) => item.id !== id);
    return updated;
});

export const addRecordFx = createEffect(async(formData: FormType) => {
    const tableData = $data.getState();
    await wait();
    const maxId = Math.max(...tableData.map(item => item.id));
    return [...tableData, { ...formData, id: maxId + 1 }];
});

export const updateRecordFx = createEffect();

const updateTableData = async (updatedRecord: TableType) => {
    const tableData = $data.getState();
    await wait();
    const index = tableData.findIndex((item) => item.id === updatedRecord.id);
    if (index > -1) {
        const updated = { ...updatedRecord, age: Number(updatedRecord.age) } as TableType;
        tableData.splice(index, 1, updated);
    }
    return [...tableData];
};

updateRecordFx.use(updateTableData);