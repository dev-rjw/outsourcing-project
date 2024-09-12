import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div>
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
      <main>{children}</main>
      <footer className="flex justify-between">
        <h1>5진스 강다연 류지원 박규리 정소현 조해인</h1>
        <h1>ⓒ 2024. 5진스 All rights reserved.</h1>
      </footer>
    </div>
  );
};

export default Layout;
