import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TArticle} from "../../types";

export const articlesSlice = createSlice({
    name: 'articles',
    initialState: [] as TArticle[],
    reducers: {
        getArticles: (state: TArticle[], action: PayloadAction<TArticle[]>) => {
            return action.payload
        },
    }
})

export const {getArticles} = articlesSlice.actions;