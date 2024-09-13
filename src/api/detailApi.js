import axios from "axios";
import { XMLParser } from "fast-xml-parser";

const fetchDetailData = async (Id) => {
  const apiKey = import.meta.env.VITE_KOPIS_KEY;
  const url = `http://kopis.or.kr/openApi/restful/pblprfr/${Id}?service=${apiKey}`;

  try {
    const response = await axios.get(url);

    // XML 데이터를 JSON으로 변환
    const parser = new XMLParser();
    const jsonData = parser.parse(response.data);

    console.log(jsonData);
    return jsonData;
  } catch (error) {
    console.error("Error fetching performance details:", error);
  }
};

export default fetchDetailData;
