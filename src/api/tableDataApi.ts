import {
    createJsonMutation,
    createJsonQuery,
    declareParams,
    unknownContract
} from '@farfetched/core';
import {zodContract} from "@farfetched/zod";
import {TableTypeSchema, TableType, TableTypeArraySchema} from "../schemas.ts";
import {FormType} from "../types.tsx";

const getTableDataArrayContract = zodContract(TableTypeArraySchema);
const getTableDataContract = zodContract(TableTypeSchema);

const getTableDataQuery = createJsonQuery({
    params: declareParams<void>(),
    request: {
        method: 'GET',
        url: 'http://localhost:31299/tableData',
    },
    response: {
        contract: getTableDataArrayContract,
    },
});

const deleteRecordMutation = createJsonMutation({
    params: declareParams<number>(),
    request: {
        method: 'DELETE',
        url:(id) => `http://localhost:31299/tableData/${id}`,
    },
    response: {
        contract: unknownContract,
        status: { expected: 204 },
    },
});

const addRecordMutation = createJsonMutation({
    params: declareParams<FormType>(),
    request: {
        method: 'POST',
        url:() => `http://localhost:31299/tableData`,
        body: (newRecord) => (newRecord),
    },
    response: {
        contract: getTableDataContract,
        status: { expected: 201 },
    },
});

const updateRecordMutation = createJsonMutation({
    params: declareParams<TableType>(),
    request: {
        method: 'PATCH',
        url:({id}) => `http://localhost:31299/tableData/${id}`,
        body: (updatedRecord) => (updatedRecord),
    },
    response: {
        contract: getTableDataContract,
        status: { expected: 200 },
    },
});

export { getTableDataQuery, deleteRecordMutation, addRecordMutation, updateRecordMutation };

/*const getTableDataQuery = createQuery({
    //contract: getTableDataArrayContract,
    handler: async () => {
        try {
            const response = await fetch(`/api/tableData`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const DataParse = TableTypeArraySchema.parse(data);
            return DataParse;
        } catch (error) {
            throw new Error('Catch error...');
        }

    },
});*/