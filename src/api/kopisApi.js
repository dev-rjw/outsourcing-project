const fetchKopis = async () => {
  try {
    const response = await axios.get(URL, {
      params: {
        service: import.meta.env.VITE_KOPIS_KEY, // .env 파일에서 API KEY 사용
        stdate: "240101", // 시작 날짜
        eddate: "240913", // 종료 날짜
        cpage: 1, // 현재 페이지
        rows: 10, // 페이지당 항목 수
      },
      responseType: "text", // XML 응답 처리
    });

    console.log("Raw XML Data:", response.data); // 받아온 XML 데이터 확인

    const parser = new XMLParser({
      ignoreAttributes: false,
      allowBooleanAttributes: true,
      attributeNamePrefix: "@_", // 속성 이름에 접두사 추가
    });

    const jsonData = parser.parse(response.data);

    console.log("Parsed JSON Data:", JSON.stringify(jsonData, null, 2)); // JSON 데이터 확인

    return jsonData; // JSON 데이터를 반환
  } catch (error) {
    console.error("데이터 요청 중 에러 발생:", error);
    throw error; // 오류 발생 시 던지기
  }
};
