function CommentItem({ comment }) {
    const options = { year: "numeric", month: "numeric", day: "numeric", hour: "2-digit", minute: "numeric" };
    const dateStr = new Date(comment.createdAt).toLocaleString("fi-FI", options).replace("klo", "at");

    return (
        <div className="comment">
            <div>
                <p>{comment.user} at {dateStr}</p>
            </div>
            <h2>{comment.text}</h2>
        </div>
    )
}

export default CommentItem;
