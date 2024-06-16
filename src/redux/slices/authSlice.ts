import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TToken} from "../../types";

export const authSlice = createSlice({
    name: 'authorization',
    initialState: {
        accessToken: '',
        expire: ''
    } as TToken,
    reducers: {
        authorize: (state: TToken, action: PayloadAction<TToken>) => {
            return action.payload;
        },
        deleteToken: (state: TToken, action: PayloadAction<TToken>) => {
            return action.payload;
        }
    }
})

export const {authorize, deleteToken} = authSlice.actions;