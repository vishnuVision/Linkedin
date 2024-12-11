import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:false,
}

const authsSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        assignUser:(state,action)=>{
            state.user = action.payload
        },
    }
})

export const { assignUser } =  authsSlice.actions;
export default authsSlice.reducer