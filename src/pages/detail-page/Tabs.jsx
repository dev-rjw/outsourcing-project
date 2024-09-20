import React, { useState } from "react";
import DetailContent from "./DetailContent";
import DetailMap from "./DetailMap";
import DetailComments from "./DetailComments";

// 각 버튼에 대응하는 고유한 키 설정
const Buttons = [
  { key: "detailContent", label: "공연정보" },
  { key: "map", label: "위치정보" },
  { key: "comments", label: "후기" },
];

const Tabs = ({ id, detailData }) => {
  const [active, setActive] = useState("detailContent");

  const handleTabChange = (key) => {
    setActive(key); // 클릭된 버튼의 key로 상태 변경
  };

  return (
    <div className="flex-col text-center">
      <div className="flex space-x-3 mb-8">
        {Buttons.map((button) => (
          <button
            key={button.key} // 고유 key 설정
            className={`flex-1 font-bold pt-4 pb-4 cursor-pointer  rounded ${
              active === button.key
                ? "bg-primary text-white"
                : "border-solid border-2 border-primary "
            }`}
            onClick={() => handleTabChange(button.key)}
          >
            {button.label}
          </button>
        ))}
      </div>
      <div>
        {active === "detailContent" && (
          <DetailContent detailData={detailData} />
        )}
        {active === "map" && <DetailMap detailData={detailData} />}
        {active === "comments" && <DetailComments id={id} />}
      </div>
    </div>
  );
};

export default Tabs;
