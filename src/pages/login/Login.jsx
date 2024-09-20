import { Link, useNavigate } from "react-router-dom";
import { getUserProfile, login } from "../../api/auth";
import AuthForm from "./AuthForm";
import useUserStore from "../../zustand/useUserStore";

const Login = () => {
  const { setUser, setToken } = useUserStore();
  const navigate = useNavigate();

  const handleLogin = async (userData) => {
    try {
      const loginData = await login(userData);

      const userProfile = await getUserProfile(loginData.accessToken);
      setUser(userProfile);
      setToken(loginData.accessToken);
      navigate("/");
      alert("로그인에 성공했습니다.");
    } catch (error) {
      alert("로그인에 실패하였습니다. 아이디와 비밀번호를 확인해주세요.");
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <h1>로그인</h1>
        <AuthForm mode="login" onSubmit={handleLogin} />
        <div>
          <p>
            계정이 없으신가요? <Link to="/signup">회원가입</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
