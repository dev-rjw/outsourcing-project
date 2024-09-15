import React, { useEffect } from "react";
import useKopisStore from "../../zustand/kopisStore";

const DetailContent = () => {
  const { data, fetchData } = useKopisStore((state) => ({
    data: state.data,
    fetchData: state.fetchData,
  }));
  const id = "PF248932"; // 임시 ID

  useEffect(() => {
    fetchData(id);
  }, [fetchData, id]);

  // 데이터가 아직 로딩 중이거나 비어 있을 때 처리
  if (!data) {
    return <div>Loading...</div>;
  }

  if (data.length === 0) {
    return <div>No data available</div>;
  }

  const { prfage = "정보없음", styurls = "정보없음" } = data;

  const styurlsArray = Array.isArray(styurls) ? styurls : [styurls.styurl];
  return (
    <div className="">
      <div className="mb-8">
        <h4 className="font-extrabold text-3xl mb-8">유의사항</h4>
        <p>관람연령 : {prfage}</p>
      </div>
      <div>
        <h4 className="font-extrabold text-3xl mb-8">공연정보</h4>
        {styurlsArray?.map((styurl, index) => {
          return (
            <img key={index} src={styurl} alt="공연정보" className="w-full" />
          );
        })}
      </div>
    </div>
  );
};

export default DetailContent;
