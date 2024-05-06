import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../Utils/axiosClient";
import { setLoading } from "./appConfigSlice";

export const getUserProfile = createAsyncThunk('user/getUserProfile',
    async (body, thunkAPI) => {
        try {
            const response = await axiosClient.post("/user/getUserProfile", body)
            return response.result
        } catch (error) {

        }
        

    }
)

export const LikeAndUnLikePost = createAsyncThunk('post/likeAndUnlike',async(body,thunkAPI)=>{
    try {
        const response = await axiosClient.post("/post/like", body)
        return response.result.post
    } catch (error) {
    }
    
})





const postSlice = createSlice({
    name: 'postSlice',
    initialState: {
        userProfile: {},
    },



    extraReducers: (builder) => {
        builder
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.userProfile = action.payload;
            })
            
        .addCase(LikeAndUnLikePost.fulfilled,(state,action)=>{
            const post = action.payload;
            const index = state.userProfile?.posts?.findIndex(item=>item._id === post._id);
            if(index !== undefined && index !== -1){
                state.userProfile.posts[index] = post;
            }

        })
        

    }
})

export default postSlice.reducer
