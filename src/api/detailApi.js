import axios from "axios";

const API_URL = "http://localhost:4000/db"; // json-server URL

const fetchKopisDataById = async (id) => {
  try {
    // json-server에서 특정 ID의 공연 정보를 가져오기
    const response = await axios.get(`${API_URL}${id}`);

    // 해당 ID의 공연 정보가 있는지 확인
    if (response.data.length === 0) {
      throw new Error("해당 ID의 공연 정보를 찾을 수 없습니다.");
    }

    const performance = response.data[0]; // 첫 번째 결과 가져오기
    return performance;
  } catch (error) {
    console.error("공연 정보 요청 중 에러 발생:", error);
    throw new Error(error.message);
  }
};

export default fetchKopisDataById;
