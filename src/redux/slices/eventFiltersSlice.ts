import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TEventFiltersInfo} from "../../types";

export const eventFiltersSlice = createSlice({
    name: 'tariffLimits',
    initialState: {} as TEventFiltersInfo,
    reducers: {
        getLimitInfo: (state: TEventFiltersInfo, action: PayloadAction<TEventFiltersInfo>) => {
            return action.payload;
        },
        count: (state: TEventFiltersInfo, action: PayloadAction) => {
            state.eventFiltersInfo.usedCompanyCount += 1;
        }
    }
})

export const {getLimitInfo, count} = eventFiltersSlice.actions;