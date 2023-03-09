import storage from "redux-persist/lib/storage"
import authSlice from "./slices/auth.slice";
import {configureStore} from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";


const persistConfig = {key:"root", storage, version : 1}
const persistedReducer = persistReducer(persistConfig, authSlice)

//configurestore
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

const  persistor = persistStore(store)

module.exports = {store, persistor}
