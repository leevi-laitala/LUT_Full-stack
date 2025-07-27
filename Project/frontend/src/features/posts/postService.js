import axios from "axios";

const API_URL = "/api/posts/";

const createPost = async (postData, token) => {
    let config = {};

    if (token) {
        config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    }

    const response = await axios.post(API_URL, postData, config);

    return response.data;
};

const getMyPosts = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(API_URL, config);

    return response.data;
};

const getPost = async (postId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(API_URL + "post/" + postId, config);

    return response.data;
};

const getPostsFeed = async () => {
    const response = await axios.get(API_URL + "feed");
    return response.data;
};

const postService = {
    createPost,
    getMyPosts,
    getPost,
    getPostsFeed,
};

export default postService;
