import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./postService";

const initialState = {
    posts: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// Create new post
export const createPost = createAsyncThunk("posts/create", async (postData, thunkAPI) => {
    let token = null;

    const userState = thunkAPI.getState().auth.user;

    if (userState) {
        token = userState.token;
    }

    return await postService.createPost(postData, token);
});

// Get posts feed
export const getFeed = createAsyncThunk("posts/getFeed", async (_, thunkAPI) => {
    return await postService.getPostsFeed();
});

// Get specific post
export const getPost = createAsyncThunk("posts/getPost", async (postId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await postService.getPost(postId, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.posts.push(action.payload);
            })
            .addCase(createPost.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            .addCase(getFeed.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getFeed.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.posts = action.payload;
            })
            .addCase(getFeed.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    },
});

export const { reset } = postSlice.actions;
export default postSlice.reducer;

