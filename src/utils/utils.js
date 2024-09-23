import { XMLParser } from "fast-xml-parser";

// XML 데이터를 JSON으로 변환하는 함수
export const parseXMLToJSON = (xmlData) => {
  const parser = new XMLParser({
    ignoreAttributes: false, // 속성 유지
    attributeNamePrefix: "", // 속성명 앞에 접두어 없이 처리
  });
  return parser.parse(xmlData);
};

// 오늘 날짜 YYYYMMDD
export const getDateString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  // const date = today.getDate()-1;
  const date = ('0' + (today.getDate())).slice(-2);

  return `${year}${month}${date}`;
};