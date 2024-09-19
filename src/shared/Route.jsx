import { BrowserRouter, Route, Routes } from "react-router-dom";
import Category from "../pages/category/Category";
import Community from "../pages/community/Community";
import DetailPage from "../pages/detail-page/DetailPage";
import Login from "../pages/login/Login";
import MainPage from "../pages/main-page/MainPage";
import Profile from "../pages/profile/Profile";
import SignUp from "../pages/signup/Signup";
import Layout from "../components/Layout";

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
