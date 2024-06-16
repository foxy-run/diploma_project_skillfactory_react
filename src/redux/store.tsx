import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {authSlice} from "./slices/authSlice";
import {eventFiltersSlice} from "./slices/eventFiltersSlice";
import {checkboxStatusSlice, checkboxOptionsSlice} from "./slices/checkboxSlice";
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {statsSlice} from "./slices/statsSlice";
import {idsSlice} from "./slices/idsSlice";
import {articlesSlice} from "./slices/articlesSlice";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const reducer = combineReducers({
    authorization: authSlice.reducer,
    tariffLimits: eventFiltersSlice.reducer,
    checkboxStatus: checkboxStatusSlice.reducer,
    checkboxOptions: checkboxOptionsSlice.reducer,
    stats: statsSlice.reducer,
    objects: idsSlice.reducer,
    articles: articlesSlice.reducer
})

const persistConfig = {
    key: 'root',
    version: 1,
    storage
}

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // @ts-ignore
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
});

export const persistor = persistStore(store)
