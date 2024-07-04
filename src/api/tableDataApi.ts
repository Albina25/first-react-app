import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {TableType} from "../types.tsx";

type tableDataResponse = TableType[];

export const tableDataApi = createApi({
    reducerPath: 'tableDataApi',
    tagTypes: ['TableData'],
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    endpoints: (builder) => ({
        getTableData: builder.query<tableDataResponse, number>({
            query: (limit: number = 5)  => ({
                url: `tableData`,
                params: {
                    _limit: limit
                }
            }),
            providesTags: (result) => result
                ? [
                    ...result.map(({ id }) => ({ type: 'TableData' as const, id })),
                    { type: 'TableData', id: 'LIST' },
                ]
                : [{ type: 'TableData', id: 'LIST' }],
        }),
        addRecord: builder.mutation<TableType, Partial<TableType>>({
            query: (body) => ({
                url: 'tableData',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'TableData', id: 'LIST' }]
        }),
        deleteRecord: builder.mutation<void, number>({
            query(id) {
                return {
                    url: `tableData/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: [{ type: 'TableData', id: 'LIST' }],
        }),
        updateRecord: builder.mutation<TableType, Partial<TableType>>({
            query(data) {
                const { id, ...body } = data
                return {
                    url: `tableData/${id}`,
                    method: 'PATCH',
                    body: body,
                }
            },
            invalidatesTags: [{ type: 'TableData', id: 'LIST' }],
        })
    }),
});

export const { useGetTableDataQuery, useAddRecordMutation, useDeleteRecordMutation, useUpdateRecordMutation } = tableDataApi;
