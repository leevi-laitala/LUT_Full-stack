import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../features/posts/postSlice";



function GoalForm() {
    const [ text, setText ] = useState("");
    const [ title, setTitle ] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlePostId = async (postData) => {
        const result = await dispatch(createPost(postData));

        const postId = result.payload._id;
    
        navigate(`/${postId}`);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const postData = {
            title: title,
            text: text,
        }

        setText("");

        handlePostId(postData);
    };

    return (
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="text">New post</label>
                    <input type="text" name="text" id="text" placeholder="Title (optional)" value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className="form-group">
                    <input type="text" name="text" id="text" placeholder="Text" value={text} onChange={(e) => setText(e.target.value)}/>
                </div>
                <div className="formGroup">
                    <button className="btn btn-block" type="submit">Create post</button>
                </div>
            </form>
        </section>
    );
}

export default GoalForm;
