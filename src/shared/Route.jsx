import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "../pages/main-page/MainPage";
import Category from "../pages/category/Category";
import DetailPage from "../pages/detail-page/DetailPage";
import Community from "../pages/community/Community";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Login from "../pages/login/Login";

const RouterComponent = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/category" element={<Category />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/community" element={<Community />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default RouterComponent;
