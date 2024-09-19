import { Link, useLocation, useNavigate } from "react-router-dom";
import useUserStore from "../zustand/useUserStore";
import Community from "../pages/community/Community";

const Header = () => {
  const { user, clearUser } = useUserStore();
  const navigate = useNavigate();
  const currentLocation = location.pathname;
  console.log(currentLocation);

  const handleLogout = () => {
    localStorage.removeItem("token");
    clearUser();
    navigate("/login");
  };
  return (
    <header className="max-w-screen-lg w-full flex justify-between mx-auto p-4 sticky top-0 bg-white z-[1]">
      <div>
        <LinkTo to="/" currentLocation={currentLocation}>홈</LinkTo>
      </div>
      <div className="flex gap-4">
        <LinkTo to="/community" currentLocation={currentLocation}>커뮤니티</LinkTo>
        <LinkTo to="/category" currentLocation={currentLocation}>카테고리</LinkTo>
        {user ? (
          <>
            <LinkTo to="/profile" currentLocation={currentLocation}>프로필</LinkTo>
            <button onClick={handleLogout}>로그아웃</button>
          </>
        ) : (
          <LinkTo to="/login" currentLocation={currentLocation}>로그인</LinkTo>
        )}
      </div>
    </header>
  );
};

export default Header;

const Paths = {
  home: ['/', '홈'],
  community: ['/community', '커뮤니티'],
  category: ['/category', '카테고리'],
  profile: ['/profile', '프로필'],
  login: ['/login', '로그인'],
}

const LinkTo = ({to, children, currentLocation}) => {
  if (currentLocation === to) {
    return (
      <div className="p-1 border-b-4 border-solid border-primary border-0">
        <Link to={to} className="to-profile">{children}</Link>
      </div>
    )
  }
  // else if (to !== '/' && currentLocation.includes(to)) {
  //   return (
  //     <div className="p-1 border-b-4 border-solid border-primary border-0">
  //       <Link to={to} className="to-profile">{children}</Link>
  //     </div>
  //   )
  // }
  else {
    return (
      <div className="p-1">
        <Link to={to} className="to-profile">{children}</Link>
      </div>
    )

  }
}