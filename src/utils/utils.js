// xml to JSON
export const xmlToJson = (xmlData) => {
  const cleanedString = xmlData.replace('\ufeff', '');
  let jsonData;
  parseString(cleanedString, (err, result) => {
    if (err !== null) {
      console.log('error: ', err);
      return;
    }
    jsonData = JSON.parse(JSON.stringify(result));
  });
  return jsonData;
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