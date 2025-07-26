import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commentService from "./commentService";

const initialState = {
    comments: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// Create comment
export const createComment = createAsyncThunk("comments/create", async (commentData, thunkAPI) => {
    let token = null;

    const userState = thunkAPI.getState().auth.user;

    if (userState) {
        token = userState.token;
    }

    return await commentService.createComment(commentData.postId, commentData.text, token);
});

// Get comments
export const getComments = createAsyncThunk("comments/get", async (postId, thunkAPI) => {
    return await commentService.getComments(postId);
});

export const commentSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createComment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createComment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.comments.push(action.payload);
            })
            .addCase(createComment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            .addCase(getComments.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getComments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.comments = action.payload;
            })
            .addCase(getComments.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    },
});

export const { reset } = commentSlice.actions;
export default commentSlice.reducer;

