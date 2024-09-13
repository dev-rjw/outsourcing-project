import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "../pages/main-page/MainPage";
import Category from "../pages/category/Category";
import DetailPage from "../pages/detail-page/DetailPage";
import Community from "../pages/community/Community";

const RouterComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/category" element={<Category />} />
        <Route path="/detail" element={<DetailPage />} />
        <Route path="/community" element={<Community />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterComponent;
