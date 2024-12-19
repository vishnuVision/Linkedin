import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    language:localStorage.getItem("language") || localStorage.setItem("language","en") && "en",
}

const languageSlice = createSlice({
    name:"language",
    initialState,
    reducers:{
        setLanguage:(state,action)=>{
            state.language = action.payload;
            localStorage.setItem("language",state.language)
        }
    }
})

export const { setLanguage } =  languageSlice.actions;
export default languageSlice.reducer