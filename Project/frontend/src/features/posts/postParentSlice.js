import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./postService";

const initialState = {
    post: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// Get specific post
export const getPost = createAsyncThunk("postParent/getPost", async (postId, thunkAPI) => {
    let token = null;

    const userState = thunkAPI.getState().auth.user;

    if (userState) {
        token = userState.token;
    }

    return await postService.getPost(postId, token);
});

export const postParentSlice = createSlice({
    name: "postParent",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.post = action.payload;
            })
            .addCase(getPost.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = postParentSlice.actions;
export default postParentSlice.reducer;

