import React, { useEffect } from "react";
import useKopisStore from "../../zustand/useKopisStore";
import { useParams } from "react-router-dom";

const DetailContent = ({ detailData }) => {
  const styurlsArray = Array.isArray(detailData.styurls)
    ? detailData.styurls
    : [detailData.styurls.styurl];
  return (
    <div className="">
      <div className="mb-8">
        <h4 className="font-extrabold text-3xl mb-8">유의사항</h4>
        <p>관람연령 : {detailData.prfage}</p>
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
