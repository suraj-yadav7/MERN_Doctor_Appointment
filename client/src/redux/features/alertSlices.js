import { createSlice } from "@reduxjs/toolkit";

const initialState={
    loading:true
}

const alertSlices = createSlice({
    name:'alert',
    initialState,
    reducers:{
        hideLoading:(state)=>{
            state.loading=false
        }
    }
})
export const{hideLoading}=alertSlices.actions;
export default alertSlices.reducer;