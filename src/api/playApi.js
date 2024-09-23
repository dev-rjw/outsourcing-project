import axios from "axios";
import { genreCodes } from "../utils/Kopis-api-common";
import { getDateString, parseXMLToJSON } from "../utils/utils";

// KOPIS 관련
const BASE_URL = "http://kopis.or.kr/openApi/restful/pblprfr";
const apiKey = import.meta.env.VITE_KOPIS_KEY;

const playApi = axios.create({ baseURL: BASE_URL });

// 오늘 공연 중인 데이터 등록순으로 최대 500개 불러오기
export const getData = async () => {
  try {
    const { data } = await playApi.get("/", {
      params: {
        service: apiKey,
        stdate: getDateString(),
        eddate: getDateString(),
        rows: 500,
        cpage: 1,
      },
    });
    return parseXMLToJSON(data).dbs.db;
  } catch (error) {
    console.error("Error fetching performance details:", error);
    throw new Error("데이터를 불러오는 중 오류가 발생했습니다.");
  }
};

// 장르별로 처음 5개 불러오기
export const getGenreData = async (genre) => {
  const { data } = await playApi.get(`?genrenm=${genre}&_start=0&_end=5`);
  return data;
};

const genreArray = Object.values(genreCodes);
// 장르별 데이터 동시에 불러오기
export const getClassifiedData = async () => {
  const responses = Promise.all(genreArray.map((genre) => getGenreData(genre)));
  return responses;
};

// 각 기준에 따라 데이터 불러오기
export const getGenreAreaData = async (genre, area, row, startDate, endDate) => {
  try {
    const { data } = await playApi.get("/", {
      params: {
        service: apiKey,
        stdate: startDate,
        eddate: endDate,
        rows: row,
        cpage: 1,
        shcate: genre === "장르별" ? null : genre,
        signgucode: area === "지역별" ? null : area,
      },
    });

    const result = parseXMLToJSON(data).dbs;
    if (result) {
      return result.db;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching performance details:", error);
    throw new Error("데이터를 불러오는 중 오류가 발생했습니다.");
  }
};

// 검색어 반영해 데이터 불러오기
export const searchGenreAreaData = async (searchValue, genre, area, row, startDate, endDate) => {
  const allData = await getGenreAreaData(genre, area, row, startDate, endDate);

  const data = allData.filter((data) => {
    return String(data["prfnm"]).includes(searchValue);
  });
  return data;
};
