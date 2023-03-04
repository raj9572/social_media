import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../Utils/axiosClient";
import { setLoading } from "./appConfigSlice";
import { LikeAndUnLikePost } from "./postsSlice";

export const getFeedData = createAsyncThunk('user/getpostoffollowing',
    async (_, thunkAPI) => {
        try {
            const response = await axiosClient.get("/user/getpostoffollowing")
            console.log('respnse in feedData',response.result)
            return response.result
        } catch (error) {
            
        }
        

    }
)


export const followAndUnFollowUser = createAsyncThunk('user/followandunfollow,',async(body,thunkAPI)=>{
    try {
        const response = await axiosClient.post("/user/follow",body)
        return response.result.user
    } catch (error) {
        
    }
    

})




const feedSlice = createSlice({
    name: 'feedSlice',
    initialState: {
        followAndUnfollow:{},
        feedData: {},
    },



    extraReducers: (builder) => {
        builder
            .addCase(getFeedData.fulfilled, (state, action) => {
                state.feedData = action.payload;
            })
            .addCase(LikeAndUnLikePost.fulfilled, (state, action) => {
                const post = action.payload;
                const index = state.feedData?.posts?.findIndex(item => item._id === post._id);
                
                if (index != undefined && index != -1) {
                    state.feedData.posts[index] = post;
                }

            })
            .addCase(followAndUnFollowUser.fulfilled,(state,action)=>{
                const user = action.payload
                const index = state?.feedData?.followings.findIndex(item=>item._id === user._id)
                console.log(index)
                if( index != -1){
                    state.feedData?.followings.splice(index,1);
                }else{
                    console.log(user)
                    state.feedData?.followings.push(user)
                }
            })

    }
})

export default feedSlice.reducer
