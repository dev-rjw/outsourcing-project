import axios from "axios";
import { XMLParser } from "fast-xml-parser";

const URL = "https://www.kopis.or.kr/openApi/restful/pblprfr";

const fetchKopisData = async () => {
  try {
    const response = await axios.get(URL, {
      params: {
        service: import.meta.env.VITE_KOPIS_KEY,
        stdate: "20240101",
        eddate: "20241231",
        cpage: 1,
        rows: 10,
      },
      responseType: "text", // XML로 응답을 받을 때 설정
    });
    // XML 데이터 출력
    console.log("Raw XML Data:", response.data);
    // XML을 JSON으로 변환
    const parser = new XMLParser({
      ignoreAttributes: false,
      allowBooleanAttributes: true,
      attributeNamePrefix: "@_", // 속성에 '@' 접두사 붙이기
      textNodeName: "#text", // 텍스트 노드 이름
      ignoreNameSpace: true, // 네임스페이스 무시
    });
    const jsonData = parser.parse(response.data);
    // JSON 데이터 콘솔에 출력
    console.log("Parsed JSON Data:", JSON.stringify(jsonData, null, 2));
    return jsonData;
  } catch (error) {
    console.error("데이터 요청 중 에러 발생:", error);
    throw error;
  }
};
export default fetchKopisData;
