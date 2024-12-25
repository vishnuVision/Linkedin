import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import { encryptTransform } from "redux-persist-transform-encrypt";
import storage from 'redux-persist/lib/storage';

import authReducer from "../slices/authReducer.js";
import languageReducer from "../slices/language.js";
import stateReducer from "../slices/state.reducer.js";

const rootReducer = combineReducers({
    authReducer,
    languageReducer,
    stateReducer
})

const encryptor = encryptTransform({
    secretKey: "dighefsiufhduhfuihd",
    onError: (error) => {
        console.error("Encryption error:", error);
    },
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['authReducer'],
    transforms: [encryptor],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        },
    }),
})

const persistor = persistStore(store);

export {
    store,
    persistor
}