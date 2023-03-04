import {configureStore} from '@reduxjs/toolkit'
import appConfigReducer from './Slice/appConfigSlice'
import postReducer from './Slice/postsSlice'
import feedDataReducer from './Slice/feedSlice'
export default configureStore({
       reducer:{
              appConfigReducer,
              postReducer,
              feedDataReducer,
       }
})