import { Link, useLocation, useNavigate } from "react-router-dom";
import useUserStore from "../zustand/useUserStore";
import Community from "../pages/community/Community";

const Header = () => {
  const { user, clearUser } = useUserStore();
  const navigate = useNavigate();
  console.log(location.pathname);

  const handleLogout = () => {
    localStorage.removeItem("token");
    clearUser();
    navigate("/login");
  };
  return (
    <header className="max-w-screen-lg w-full flex justify-between mx-auto p-4 sticky top-0 bg-white">
      <div>
        <Link to="/" className="to-home">홈</Link>
      </div>
      <div className="flex gap-4">
        <Link to="/community" className="to-community">커뮤니티</Link>
        <Link to="/category" className="to-category">카테고리</Link>
        {user ? (
          <>
            <Link to="/profile" className="to-profile">프로필</Link>
            <button onClick={handleLogout}>로그아웃</button>
          </>
        ) : (
          <Link to="/login" className="to-login">로그인</Link>
        )}
      </div>
    </header>
  );
};

export default Header;

const Paths = {
  home: '/',
  community: '/community',
  category: '/category',
  profile: '/profile',
  login: '/login',
}

const addUnderLine = () => {
  const location = useLocation();

  
}