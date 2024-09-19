import axios from "axios";
import { genreCodes } from "../utils/Kopis-api-common";

// KOPIS 관련
// const BASE_URL = "http://kopis.or.kr/openApi/restful/pblprfr";
// // const API_KEY = import.meta.env.VITE_KOPIS_KEY;
// const url =
//   BASE_URL +
//   `?service=${API_KEY}&stdate=20240911&eddate=20240911&rows=10&cpage=1`;
//   // 7e6379e8f4ad4bc5a8d668d4dfea6e78

// const BASE_DB_URL = "http://localhost:5000/performances";
const BASE_DB_URL = import.meta.env.VITE_DB_URL + "/performances";

const playApi = axios.create({ baseURL: BASE_DB_URL });

export const getData = async () => {
  const { data } = await playApi.get("/");
  return data;
};

export const getGenreData = async (genre) => {
  const { data } = await playApi.get(`?genrenm=${genre}&_start=0&_end=5`);
  return data;
};

export const getGenreAreaData = async (genre, area, start, end) => {
  let url = `?_start=${start}&_end=${end}`;
  if (genre !== "장르별") url += `&genrenm=${genre}`;
  if (area !== "지역별") url += `&area=${area}`;
  const { data } = await playApi.get(url);
  return data;
};

export const searchGenreAreaData = async (searchValue, genre, area, start, end) => {
  const allData = await getGenreAreaData(genre, area, start, end);

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
