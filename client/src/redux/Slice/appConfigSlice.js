import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../Utils/axiosClient";

export const getMYInfo = createAsyncThunk('user/getmyinfo', async (body, thunkAPI) => {

    try {
        const response = await axiosClient.get('/user/getmyinfo')
        return response.result;


    } catch (error) {
        return Promise.reject(error)
    }
    

}
)

export const updateMyProfile = createAsyncThunk('user/', async (body, thunkAPI) => {
    try {
        const response = await axiosClient.put('/user/', body)
        window.location.reload()
        return response.result;



    } catch (error) {
        return Promise.reject(error)
    }
    

})

const appConfigSlice = createSlice({
    name: 'appConfigeSlice',
    initialState: {
        isLoading:false,
        myProfile: null,
        toastData:{},
    },

    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload
        },
        showToast:(state,action)=>{
            state.toastData=action.payload
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(getMYInfo.fulfilled, (state, action) => {
                state.myProfile = action.payload.user
            })
            .addCase(updateMyProfile.fulfilled, (state, action) => {
                state.myProfile = action.payload.user
            })
    }
})

export default appConfigSlice.reducer

export const { setLoading,showToast } = appConfigSlice.actions