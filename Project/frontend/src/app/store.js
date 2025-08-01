import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/auth/authSlice";
import postReducer from "../features/posts/postSlice";
import postParentReducer from "../features/posts/postParentSlice";
import commentReducer from "../features/comments/commentSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: postReducer,
        post: postParentReducer,
        comments: commentReducer,
    },
});
