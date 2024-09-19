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
    <header className="flex-col m-4">
      <Link to="/">커튼콜</Link>
      <nav className="flex ">
        <div className="flex ">
          <Link to="/category">장르별</Link>
          <Link to="/category">장소별</Link>
          <Link to="/community">커뮤니티</Link>
        </div>
        <div className="flex">
          <input placeholder="검색내용입력"></input>
          <button>검색이모지</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
