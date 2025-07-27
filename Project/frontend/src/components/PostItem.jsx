import { Link } from "react-router-dom";

function PostItem({ post }) {
    const options = { year: "numeric", month: "numeric", day: "numeric", hour: "2-digit", minute: "numeric" };
    const dateStr = new Date(post.createdAt).toLocaleString("fi-FI", options).replace("klo", "at");

    let redirect = `/${post._id}`;

    return (
        <Link to={redirect}>
            <div className="post">
                <div>
                    <p>Posted by {post.user} at {dateStr}</p>
                </div>
                <h2>{post.title}</h2>
                <p>{post.text}</p>
            </div>
        </Link>
    )
}

export default PostItem;

