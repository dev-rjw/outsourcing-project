import axios from "axios";
import { parseXMLToJSON } from "../utils/utils";

const apiKey = import.meta.env.VITE_KOPIS_KEY;

// 공연 상세 데이터를 가져오는 함수
export const fetchDetailData = async (id) => {
  const url = `http://kopis.or.kr/openApi/restful/pblprfr/${id}?service=${apiKey}`;

  try {
    const response = await axios.get(url);
    const jsonData = parseXMLToJSON(response.data);
    console.log(jsonData); // 변환된 JSON 데이터 콘솔 출력
    return jsonData;
  } catch (error) {
    console.error("DetailDataError", error);
    throw new Error("데이터를 불러오는 중 오류가 발생했습니다.");
  }
};

// 공연 장소 데이터를 가져오는 함수
export const fetchMapData = async (placeId) => {
  const mapUrl = `http://www.kopis.or.kr/openApi/restful/prfplc/${placeId}?service=${apiKey}`;

  try {
    const response = await axios.get(mapUrl);
    const jsonData = parseXMLToJSON(response.data);
    return jsonData;
  } catch (error) {
    console.error("Map Error", error);
    throw new Error("데이터를 불러오는 중 오류가 발생했습니다.");
  }
};

// 상세페이지 댓글 작성 기능
const jsonUrl = import.meta.env.VITE_DB_URL + "/comments";
const commentApi = axios.create({ baseURL: jsonUrl });

// 댓글 추가
export const detailAddComment = async (newComment) => {
  const { data } = await commentApi.post("/", newComment);
  return data;
};

// 특정 공연의 댓글 가져오기
export const detailGetComment = async (performanceId) => {
  const { data } = await commentApi.get("/");
  return data.filter((comment) => comment.performanceId === performanceId);
};

// 댓글 삭제
export const detailDeleteComment = async (id) => {
  const { data } = await commentApi.delete(`/${id}`);
  return data;
};
