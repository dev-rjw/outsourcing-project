import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "../pages/main-page/MainPage";
import Category from "../pages/category/Category";
import DetailPage from "../pages/detail-page/DetailPage";
import Community from "../pages/community/Community";
import Login from "../pages/login/Login";
import Layout from "../components/Layout";
import SignUp from "../pages/signup/Signup";
import Profile from "../pages/profile/Profile";

const RouterComponent = () => {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/category" element={<Category />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/community" element={<Community />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes >
      {/* <Footer /> */}
    </BrowserRouter >
  );
};

export default RouterComponent;
