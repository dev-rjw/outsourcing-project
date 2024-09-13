import React from "react";
import DetailContent from "./DetailContent";
import Comments from "./Comments";
import Map from "./Map";
import { useState } from "react";

const Tabs = () => {
  const [active, setActive] = useState("detailContent");

  const handleTabChange = (e) => {
    setActive(e);
  };
  return (
    <div>
      <button
        onClick={() => {
          handleTabChange("detailContent");
        }}
      >
        공연정보
      </button>
      <button
        onClick={() => {
          handleTabChange("map");
        }}
      >
        위치정보
      </button>
      <button
        onClick={() => {
          handleTabChange("comments");
        }}
      >
        후기
      </button>
      <div>
        {active === "detailContent" && <DetailContent />}
        {active === "map" && <Map />}
        {active === "comments" && <Comments />}
      </div>
    </div>
  );
};

export default Tabs;
