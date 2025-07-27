import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import { getFeed } from "../features/posts/postSlice";

import PostItem from "../components/PostItem";
import PostForm from "../components/PostForm";

function Feed() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { posts, isLoading, isError, message } = useSelector((state) => state.posts);

    useEffect(() => {
        if (isError) {
            console.log(message)
        }

        dispatch(getFeed());

    }, [user, navigate, isError, message, dispatch]);

    if (isLoading) {
        return <Spinner />;
    }
    return <>
        <h1>Feed</h1>
        
        <PostForm />

        {posts.length > 0 ? (
            <div>
                {posts.map((post) => (
                    <PostItem key={post._id} post={post} />
                ))}
            </div>
        ) : (
            <h3>There are no posts yet</h3>
        )}
    </>;
}

export default Feed;
