import {createSlice} from '@reduxjs/toolkit'

const initialState ={
    userData:''
}

const userProfileSlice = createSlice({
    name:'userProfileData',
    initialState,
    reducers:{
       adduser:(state,action)=>{
        console.log("reducerL : ", action.payload)
        state.userData=action.payload
       }
    }
})

export const {adduser} = userProfileSlice.actions
export default userProfileSlice.reducer