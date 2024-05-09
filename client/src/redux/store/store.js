import {configureStore} from '@reduxjs/toolkit'
import alertSlices from '../features/alertSlices.js'
import userProfileSlice from '../features/userProfileSlice.js'

const store=configureStore({
    reducer:{
        user:userProfileSlice,
    }
})
export default store