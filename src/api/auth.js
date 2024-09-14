import axios from "axios";

const API_URL = "https://moneyfulpublicpolicy.co.kr";

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

export const getUserProfile = async (token) => {
  const response = await axios.post(`${API_URL}/user`, {
    header: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateUserProfile = async (formData, token) => {
  const response = await axios.post(`${API_URL}/user`, formData, {
    header: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
