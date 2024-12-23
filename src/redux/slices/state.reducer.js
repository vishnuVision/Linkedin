import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading:false,
    // isLogin:false
}

const stateSlice = createSlice({
    name:"state",
    initialState,
    reducers:{
        setIsLoading:{
            reducer:(state,action)=>{
                state.isLoading = action.payload
            },
        }
    }
})

export const { setIsLoading } =  stateSlice.actions;
export default stateSlice.reducer