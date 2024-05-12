import {configureStore} from '@reduxjs/toolkit'
import userProfileSlice from '../features/userProfileSlice.js'

const store=configureStore({
    reducer:{
        user:userProfileSlice,
    }
})
export default store