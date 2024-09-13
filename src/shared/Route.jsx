import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "../pages/main-page/MainPage";
import Category from "../pages/category/Category";
import DetailPage from "../pages/detail-page/DetailPage";
import Community from "../pages/community/Community";
import Header from "../components/Header";
import Footer from "../components/Footer";

const RouterComponent = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/category" element={<Category />} />
        <Route path="/detail" element={<DetailPage />} />
        <Route path="/community" element={<Community />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default RouterComponent;
