import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div>
        <Link to="/">홈</Link>
      </div>
      <div>
        <Link to="/community">커뮤니티</Link>
        <Link to="/category">카테고리</Link>
        <button>로그아웃</button>
      </div>
    </>
  );
};

export default Header;
