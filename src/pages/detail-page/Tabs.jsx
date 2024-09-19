import React from "react";
import DetailContent from "./DetailContent";
import { useState } from "react";
import DetailMap from "./DetailMap";
import DetailComments from "./DetailComments";

const Tabs = ({ id, detailData }) => {
  const [active, setActive] = useState("detailContent");

  const handleTabChange = (e) => {
    setActive(e);
  };

  return (
    <div className="flex-col text-center">
      <div className="flex space-x-3 mb-8">
        <button
          className={`flex-1 font-bold pt-4 pb-4 border-2 border-gray-300 cursor-pointer rounded ${
            active === "detailContent"
              ? "bg-primary text-white"
              : "bg-slate-200"
          }`}
          onClick={() => handleTabChange("detailContent")}
        >
          공연정보
        </button>
        <button
          className={`flex-1 font-bold border-2 pt-4 pb-4 border-gray-300 cursor-pointer rounded ${
            active === "map" ? "bg-primary text-white" : "bg-slate-200"
          }`}
          onClick={() => handleTabChange("map")}
        >
          위치정보
        </button>
        <button
          className={`flex-1 font-bold border-2 pt-4 pb-4 rounded border-gray-300 cursor-pointer ${
            active === "comments" ? "bg-primary text-white" : "bg-slate-200"
          }`}
          onClick={() => handleTabChange("comments")}
        >
          후기
        </button>
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
