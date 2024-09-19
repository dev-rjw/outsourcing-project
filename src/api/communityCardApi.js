const API_URL = "http://localhost:5000/communityPosts";

export const fetchPosts = () => {
  return fetch(`${API_URL}`).then((response) => response.json());
};

// 추가
export const createPost = (post) => {
  return fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  }).then((response) => response.json());
};

//수정
export const updatePost = (id, updatedPost) => {
  return fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedPost),
  }).then((response) => response.json());
};

//좋아요
export const updateLike = (id, updateLike) => {
  return fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateLike),
  }).then((response) => response.json());
};

//삭제
export const deletePost = (id) => {
  return fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  }).then((response) => response.json());
};
