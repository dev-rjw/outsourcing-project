import axios from "axios";
const API_URL = "http://localhost:5000/communityPosts";

export const fetchPosts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error("error: fetchPosts");
  }
};

// 추가
export const createPost = async (post) => {
  try {
    const response = await axios.post(API_URL, post);
    return response.data;
  } catch (error) {
    throw new Error("error: createPost");
  }
};

//수정
export const updatePost = async (id, updatedPost) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedPost);
    return response.data;
  } catch (error) {
    throw new Error("error: updatePost");
  }
};

//삭제
export const deletePost = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("error: deletePost");
  }
};
