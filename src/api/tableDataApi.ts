//import { TableType } from "../types.tsx";
import { tableData } from "../data/TableData.tsx";
import {createMutation, createQuery} from '@farfetched/core';
import {zodContract} from "@farfetched/zod";
import {TableTypeSchema, TableType} from "../schemas.ts";
import {z} from "zod";
import {FormType} from "../types.tsx";

const getTableDataArrayContract = zodContract(TableTypeSchema.array());
const getTableDataContract = zodContract(TableTypeSchema);

const getTableDataQuery = createQuery({
    contract: getTableDataArrayContract,
    handler: async () => {
        try {
            const response = await fetch(`/api/tableData`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data)
            return data;
        } catch (error) {
            throw new Error('Catch error...');
        }

    },
});
const deleteRecordMutation = createQuery({
    handler: async (id: number) => {
        try {
            const response = await fetch(`/api/tableData/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const updated = tableData.filter((item) => item.id !== id);
            return updated as TableType;
        } catch (e) {
            throw new Error('Catch error...');
        }
    },
});
const addRecordMutation = createQuery({
    contract: getTableDataContract,
    handler: async (newRecord: FormType) => {
        try {
            console.log('newRecord', newRecord)

            const response = await fetch(`/api/tableData/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newRecord),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (e) {
            throw new Error('Catch error...');
        }
    }
});
const updateRecordMutation = createMutation({
    contract: getTableDataContract,
    handler: async (updatedRecord: z.infer<typeof TableTypeSchema>) => {
        try {
            const { id, ...body } = updatedRecord;
            const response = await fetch(`/api/tableData/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (e) {
            throw new Error('Catch error...');
        }
    }
});

export { getTableDataQuery, deleteRecordMutation, addRecordMutation, updateRecordMutation };
