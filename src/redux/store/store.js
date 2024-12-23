import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authReducer.js";
import languageReducer from "../slices/language.js";
import stateReducer from "../slices/state.reducer.js";

const store = configureStore({
    reducer:{
        authReducer,
        languageReducer,
        stateReducer
    }
})

export default store;