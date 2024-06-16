import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TEncodedIds} from "../../types";

export const idsSlice = createSlice({
    name: 'objects',
    initialState: {
        ids: []
    } as TEncodedIds,
    reducers: {
        getItems: (state: TEncodedIds, action: PayloadAction<TEncodedIds>) => {
            return action.payload;
        },
    }
})

export const {getItems} = idsSlice.actions;