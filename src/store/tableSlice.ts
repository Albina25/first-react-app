import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {FormType, TableType} from '../types';
import { tableData } from '../data/TableData';

interface TableState {
    data: TableType[];
    isLoading: boolean;
    error: string;
}

const initialState: TableState = {
    data: tableData,
    isLoading: false,
    error: ''
};

const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        deleteRecord: (state, action: PayloadAction<number>) => {
            const index = state.data.findIndex(item => item.id === action.payload);

            if (index === -1) {
                return;
            }

            state.data.splice(index, 1);
        },
        addRecord: (state, action: PayloadAction<FormType>) => {
            const maxId = Math.max(...state.data.map(item => item.id));
            const newRecord = { ...action.payload, id: maxId + 1 };
            state.data.push(newRecord);
        },
        updateRecord: (state, action: PayloadAction<TableType>) => {
            console.log('1', action.payload)
            const index = state.data.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.data[index] = action.payload;
            }
        }
    },
});

export const { reducer: tableReducer, actions: tableActions } = tableSlice;
