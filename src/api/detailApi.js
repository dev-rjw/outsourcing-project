import axios from "axios";
import { XMLParser } from "fast-xml-parser";

const fetchKopisDataById = async () => {
  const id = "PF132236"; // 임시 ID
  const URL = `https://www.kopis.or.kr/openApi/restful/pblprfr/${id}`;

  try {
    const response = await axios.get(URL, {
      params: {
        service: import.meta.env.VITE_KOPIS_KEY, // .env 파일에서 API KEY 사용
      },
      responseType: "text", // XML 응답 처리
    });

    // XML을 JSON으로 변환
    const parser = new XMLParser({
      ignoreAttributes: false,
      allowBooleanAttributes: true,
      attributeNamePrefix: "@_", // 속성 이름에 접두사 추가
    });

    const jsonData = parser.parse(response.data);
    console.log("Parsed JSON Data:", JSON.stringify(jsonData, null, 2)); // 파싱된 JSON 확인
    console.log(jsonData);
    return jsonData; // JSON 데이터 반환
  } catch (error) {
    console.error("데이터 요청 중 에러 발생:", error);
    throw error; // 오류 발생 시 호출 측에서 처리할 수 있도록 오류 던지기
  }
};

export default fetchKopisDataById;
