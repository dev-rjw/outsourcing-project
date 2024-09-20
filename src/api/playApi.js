import axios from "axios";
import { genreCodes } from "../utils/Kopis-api-common";
import { getDateString, parseXMLToJSON } from "../utils/utils";

// KOPIS 관련
const BASE_URL = "http://kopis.or.kr/openApi/restful/pblprfr";
// const BASE_DB_URL = import.meta.env.VITE_DB_URL + "/performances";

const playApi = axios.create({ baseURL: BASE_URL });

export const getData = async () => {
  try {
    const { data } = await playApi.get("/", {
      params: {
        service: import.meta.env.VITE_KOPIS_KEY,
        stdate: getDateString(),
        eddate: getDateString(),
        rows: 100,
        cpage: 1,
      },
    });
    return parseXMLToJSON(data).dbs.db;
  } catch (error) {
    console.error("Error fetching performance details:", error);
    throw new Error("데이터를 불러오는 중 오류가 발생했습니다.");
  }
};

export const getGenreData = async (genre) => {
  const { data } = await playApi.get(`?genrenm=${genre}&_start=0&_end=5`);
  return data;
};

export const getGenreAreaData = async (genre, area, row, startDate, endDate) => {
  try {
    const { data } = await playApi.get("/", {
      params: {
        service: import.meta.env.VITE_KOPIS_KEY,
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

export const searchGenreAreaData = async (searchValue, genre, area, row, startDate, endDate) => {
  const allData = await getGenreAreaData(genre, area, row, startDate, endDate);

  const data = allData.filter((data) => {
    return String(data["prfnm"]).includes(searchValue);
  });
  return data;
};

const genreArray = Object.values(genreCodes);
export const getClassifiedData = async () => {
  const responses = Promise.all(genreArray.map((genre) => getGenreData(genre)));
  return responses;
};
