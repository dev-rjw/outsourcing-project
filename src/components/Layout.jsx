import { Link } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <header>
        <nav>
          <Link>홈버튼(프로젝트명으로 바꾸기)</Link>
          <Link>장르별</Link>
          <Link>장소별</Link>
          <input></input>
        </nav>
      </header>
    </div>
  );
};

export default Layout;
