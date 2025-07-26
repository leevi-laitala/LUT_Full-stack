import axios from "axios";

const API_URL = "/api/comments/";

const createComment = async (postId, text, token) => {
    let config = {};

    if (token) {
        config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    }

    const response = await axios.post(API_URL + postId, { text: text }, config);

    return response.data;
};

const getComments = async (postId) => {
    const response = await axios.get(API_URL + postId);
    return response.data;
};

const commentService = {
    createComment,
    getComments,
};

export default commentService;
