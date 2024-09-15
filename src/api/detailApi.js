import axios from "axios";
import { XMLParser } from "fast-xml-parser";

const fetchDetailData = async (Id) => {
  const apiKey = import.meta.env.VITE_KOPIS_KEY; // Vite의 환경 변수 사용
  const url = `http://kopis.or.kr/openApi/restful/pblprfr/${Id}?service=${apiKey}`;

  try {
    const response = await axios.get(url);

    // XML 데이터를 JSON으로 변환
    const parser = new XMLParser({
      ignoreAttributes: false, // 속성 유지
      attributeNamePrefix: "", // 속성명 앞에 접두어 없이 처리
    });
    const jsonData = parser.parse(response.data);

    console.log(jsonData); // 변환된 JSON 데이터 콘솔 출력
    return jsonData;
  } catch (error) {
    console.error("Error fetching performance details:", error);
    throw new Error("데이터를 불러오는 중 오류가 발생했습니다.");
  }
};

export default fetchDetailData;
