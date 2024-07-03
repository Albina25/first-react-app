import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {FormType, TableType} from '../types';
import { tableData } from '../data/TableData';

interface TableState {
    data: TableType[];
}

const initialState: TableState = {
    data: tableData,
};

const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        deleteRecord: (state, action: PayloadAction<number>) => {
            state.data = state.data.filter(item => item.id !== action.payload);
        },
        addRecord: (state, action: PayloadAction<FormType>) => {
            const newRecord = { ...action.payload, id: state.data.length + 1 };
            state.data.push(newRecord);
        },
        updateRecord: (state, action: PayloadAction<TableType>) => {
            const index = state.data.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.data[index] = action.payload;
            }
        }
    },
});

export const tableActions = tableSlice.actions;
//export const { deleteRecord, addRecord } = tableSlice.actions;
export default tableSlice.reducer;