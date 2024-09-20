import axios from "axios";
const API_URL = "http://localhost:5000/likes";

export const addLike = async (likeData) => {
  try {
    const response = await axios.post(API_URL, likeData);
    const likeList = await axios.get(`${API_URL}?postId=${likeData.postId}`);
    return {
      likeData: response.data,
      count: likeList.data.length,
    };
  } catch (error) {
    throw new Error("error: add like");
  }
};

export const removeLike = async (likeId, postId) => {
  try {
    const response = await axios.delete(`${API_URL}/${likeId}`);
    const likeList = await axios.get(`${API_URL}?postId=${postId}`);
    return {
      likeData: response.data,
      count: likeList.data.length,
    };
  } catch (error) {
    throw new Error("error: remove like");
  }
};

export const getLikesByPostId = async (postId) => {
  try {
    const response = await axios.get(`${API_URL}?postId=${postId}`);
    return response.data;
  } catch (error) {
    throw new Error("error: fetch getLikesByPostId");
  }
};

export const getUserLikeStatus = async (postId, userId) => {
  try {
    const response = await axios.get(
      `${API_URL}?postId=${postId}&userId=${userId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("error: getUserLikeStatus");
  }
};

export const getLikesCount = async (postId) => {
  try {
    const response = await axios.get(`${API_URL}?postId=${postId}`);
    return response.data.length;
  } catch (error) {
    throw new Error("error: getLikesCount");
  }
};

export const getAllLike = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    throw new Error("error: getAllLike");
  }
};
