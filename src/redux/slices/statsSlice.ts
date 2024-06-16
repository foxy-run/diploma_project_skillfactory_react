import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TSearchResults} from "../../types";


export const statsSlice = createSlice({
    name: 'stats',
    initialState: [] as TSearchResults,
    reducers: {
        getStats: (state: TSearchResults, action: PayloadAction<TSearchResults>) => {
            return action.payload;
        }
    }
})

export const {getStats} = statsSlice.actions;