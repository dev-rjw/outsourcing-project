import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../zustand/useUserStore";

const Header = () => {
  const { user, clearUser } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    clearUser();
    navigate("/login");
  };
  return (
    <>
      <div>
        <Link to="/">홈</Link>
      </div>
      <div>
        <Link to="/community">커뮤니티</Link>
        <Link to="/category">카테고리</Link>
        {user ? (
          <>
            <Link to="/profile">프로필</Link>
            <button onClick={handleLogout}>로그아웃</button>
          </>
        ) : (
          <Link to="/login">로그인</Link>
        )}
      </div>
    </>
  );
};

export default Header;
