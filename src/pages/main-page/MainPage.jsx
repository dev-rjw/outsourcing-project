import React from "react";
import Genre from "./Genre";
import Embla from "./Embla";

const MainPage = () => {
  return (
    <div className="main-body max-w-screen-lg w-full mx-auto flex flex-col items-center">
      <Embla />
      <Genre />
    </div>
  );
};

export default MainPage;
