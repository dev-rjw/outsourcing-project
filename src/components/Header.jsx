import { Link, useLocation, useNavigate } from "react-router-dom";
import useUserStore from "../zustand/useUserStore";
import Community from "../pages/community/Community";

const Header = () => {
  const { user, clearUser } = useUserStore();
  const navigate = useNavigate();
  const currentLocation = useLocation().pathname;

  const handleLogout = () => {
    // localStorage.removeItem("token");
    clearUser();
    navigate("/");
  };
  return (
    <header className="max-w-screen-lg w-full flex justify-between mx-auto p-4 sticky top-0 bg-white z-[1]">
      <div>
        <LinkTo to="/" currentLocation={currentLocation} className="">
          커튼콜
        </LinkTo>
      </div>
      <div className="flex items-start gap-4">
        <LinkTo to="/community" currentLocation={currentLocation}>
          커뮤니티
        </LinkTo>
        <LinkTo to="/category" currentLocation={currentLocation}>
          카테고리
        </LinkTo>
        {user ? (
          <>
            <LinkTo to="/profile" currentLocation={currentLocation}>
              프로필
            </LinkTo>
            <div className="p-1">
              <button className="m-auto" onClick={handleLogout}>
                로그아웃
              </button>
            </div>
          </>
        ) : (
          <LinkTo to="/login" currentLocation={currentLocation}>
            로그인
          </LinkTo>
        )}
      </div>
    </header>
  );
};

export default Header;

const LinkTo = ({ to, children, currentLocation }) => {
  if (currentLocation === to) {
    // 현위치에 밑줄 표시
    if (to === '/') {
      return (
        <div className="p-1 border-b-[3px] border-solid border-primary border-0 font-['SF\_HambakSnow']">
          <Link to={to} className="m-auto">
            {children}
          </Link>
        </div>
      );
    }
    return (
      <div className="p-1 border-b-[3px] border-solid border-primary border-0">
        <Link to={to} className="m-auto">
          {children}
        </Link>
      </div>
    );
  } else {
    if (to === '/') {
      return (
        <div className="p-1 font-['SF\_HambakSnow']">
          <Link to={to} className="m-auto">
            {children}
          </Link>
        </div>
      );

    }
    return (
      <div className="p-1">
        <Link to={to} className="m-auto">
          {children}
        </Link>
      </div>
    );
  }
};
