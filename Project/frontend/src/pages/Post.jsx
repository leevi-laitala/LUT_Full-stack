import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";

import { getPost } from "../features/posts/postParentSlice";
import { getComments } from "../features/comments/commentSlice";

import PostItem from "../components/PostItem";
import CommentItem from "../components/CommentItem";
import CommentForm from "../components/CommentForm";

function Post() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const postId = location.pathname.slice(1);

    const { user } = useSelector((state) => state.auth);
    const { comments, isLoading, isError, message } = useSelector((state) => state.comments);
    const { post } = useSelector((state) => state.post);

    useEffect(() => {
        if (isError) {
            console.log(message)
        }

        dispatch(getComments(postId));
        dispatch(getPost(postId));

    }, [user, navigate, isError, message, dispatch]);

    if (isLoading) {
        return <Spinner />;
    }

    return <>
        {post ? (
            <PostItem key={postId} post={post}/>
        ) : (
            <Spinner />
        )}

        {comments.length > 0 ? (
            <div>
                {comments.map((comment) => (
                    <CommentItem key={comment._id} comment={comment} />
                ))}
            </div>
        ) : (
            <h3>There are no comments yet</h3>
        )}

        <CommentForm />
    </>;
}

export default Post;
