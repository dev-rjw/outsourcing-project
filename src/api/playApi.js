import axios from "axios";
import { genreCodes } from "../utils/Kopis-api-common";
import { getDateString, parseXMLToJSON } from "../utils/utils";

// KOPIS 관련
const BASE_URL = "http://kopis.or.kr/openApi/restful/pblprfr";
// // const API_KEY = import.meta.env.VITE_KOPIS_KEY;
// const url =
//   BASE_URL +
//   `?service=${API_KEY}&stdate=20240911&eddate=20240911&rows=10&cpage=1`;
//   // 7e6379e8f4ad4bc5a8d668d4dfea6e78

// const BASE_DB_URL = "http://localhost:5000/performances";
// const BASE_DB_URL = import.meta.env.VITE_DB_URL + "/performances";

// const playApi = axios.create({ baseURL: BASE_DB_URL });
const playApi = axios.create({ baseURL: BASE_URL });

export const getData = async () => {
  try {// const { data } = await playApi.get("/");
  const { data } = await playApi.get("/",{
    params : {
      service: import.meta.env.VITE_KOPIS_KEY,
      stdate: getDateString(),
      eddate: getDateString(),
      rows: 1000,
      cpage: 1,
    }
  });
  // console.log(parseXMLToJSON(data))
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

export const getGenreAreaData = async (genre, area, start, end, cpage) => {
  let url = `?_start=${start}&_end=${end}`;
  if (genre !== "장르별") url += `&genrenm=${genre}`;
  if (area !== "지역별") url += `&area=${area}`;
  const { data } = await playApi.get("/",{
    params : {
      service: import.meta.env.VITE_KOPIS_KEY,
      stdate: getDateString(),
      eddate: getDateString(),
      rows: 1000,
      cpage: 1,
      shcate: genre === '장르별' ? null : genre,
      signgucode: area === '지역별' ? null : area,
      _start: start,
      _end:end
    }
  });
  console.log(parseXMLToJSON(data).dbs.db)
  return parseXMLToJSON(data).dbs.db;
};

export const searchGenreAreaData = async (searchValue, genre, area, start, end, cpage) => {
  const allData = await getGenreAreaData(genre, area, start, end, cpage);

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
