import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type TCheckboxStatus = {
    active: boolean,
    id: number
}

type TCheckboxoption = {
    option: string,
    status: boolean,
    id: number
}

export const checkboxStatusSlice = createSlice({
    name: 'checkboxStatus',
    initialState: [] as TCheckboxStatus[],
    reducers: {
        checkStatus: (state: TCheckboxStatus[], action: PayloadAction<TCheckboxStatus>) => {
            let itemIndex = state.findIndex((item: TCheckboxStatus) => item.id === action.payload.id);
            state.splice(itemIndex, 1, {
                active: action.payload.active,
                id: action.payload.id
            });
        },
        initializeStatus: (state: TCheckboxStatus[], action: PayloadAction<TCheckboxStatus>) => {
            state.push({
                active: action.payload.active,
                id: action.payload.id
            });
        },
        deleteStatus: (state: TCheckboxStatus[], action: PayloadAction<number>) => {
            let itemIndex = state.findIndex((item: TCheckboxStatus) => item.id === action.payload);
            state.splice(itemIndex, 1);
        }
    }
})

export const checkboxOptionsSlice = createSlice({
    name: 'checkboxOptions',
    initialState: [] as TCheckboxoption[],
    reducers: {
        initializeOptions: (state: TCheckboxoption[], action: PayloadAction<TCheckboxoption>) => {
            state.push(action.payload);
        },
        checkOptions: (state: TCheckboxoption[], action: PayloadAction<TCheckboxoption>) => {
            let itemIndex = state.findIndex((item: TCheckboxoption) => item.id === action.payload.id);
            state.splice(itemIndex, 1, {
                option: action.payload.option,
                id: action.payload.id,
                status: action.payload.status
            });
        }
    }
})

export const {initializeStatus, checkStatus, deleteStatus} = checkboxStatusSlice.actions;
export const {initializeOptions, checkOptions} = checkboxOptionsSlice.actions;