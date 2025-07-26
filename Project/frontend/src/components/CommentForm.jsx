import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { createComment } from "../features/comments/commentSlice";

function CommentForm() {
    const [ text, setText ] = useState("");

    const dispatch = useDispatch();
    const location = useLocation();

    const postId = location.pathname.slice(1);

    const onSubmit = (e) => {
        e.preventDefault();

        const commentData = {
            postId: postId,
            text: text,
        };

        dispatch(createComment(commentData));
        setText("");
    };

    return (
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="text">Add comment</label>
                    <input type="text" name="text" id="text" placeholder="Comment" value={text} onChange={(e) => setText(e.target.value)}/>
                </div>
                <div className="formGroup">
                    <button className="btn btn-block" type="submit">Post comment</button>
                </div>
            </form>
        </section>
    );
}

export default CommentForm;
