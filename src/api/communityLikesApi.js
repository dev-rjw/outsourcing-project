import axios from "axios";
const API_URL = "http://localhost:5000/likes";

// 좋아요 추가
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

// 좋아요 삭제
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

//  좋아요 목록 가져오기
export const getLikesByPostId = async (postId) => {
  try {
    const response = await axios.get(`${API_URL}?postId=${postId}`);
    return response.data;
  } catch (error) {
    throw new Error("error: fetch getLikesByPostId");
  }
};

// 포스트에 좋아요를 눌렀는지 확인
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

//카운트
export const getLikesCount = async (postId) => {
  try {
    const response = await axios.get(`${API_URL}?postId=${postId}`);
    return response.data.length;
  } catch (error) {
    throw new Error("error: getLikesCount");
  }
};

//전체 카드와 좋아요 카운트 합침
export const getAllLike = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    throw new Error("error: getAllLike");
  }
};
