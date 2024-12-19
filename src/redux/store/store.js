import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authReducer.js";
import languageReducer from "../slices/language.js";

const store = configureStore({
    reducer:{
        authReducer,
        languageReducer
    }
})

export default store;