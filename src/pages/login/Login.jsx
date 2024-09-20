import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../../zustand/useUserStore";
import AuthForm from "./AuthForm";
import { getUserProfile, login } from "../../api/auth";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  const handleLogin = async (formData) => {
    try {
      const loginData = await login(formData);
      // localStorage.setItem("accessToken", loginData.accessToken);

      const userProfile = await getUserProfile(loginData.accessToken);
      setUser(userProfile);
      navigate("/");
      alert("로그인에 성공했습니다.");
    } catch (error) {
      alert("로그인에 실패하였습니다. 아이디와 비밀번호를 확인해주세요.");
    }
  };

  return (
    <div className="w-full h-[calc(100%-67px-128px)] flex justify-center items-center">
      <div className="w-80 h-60 flex flex-col justify-between items-center px-10 py-5 border border-solid border-gray-300 rounded-3xl">
        {/* <h1>로그인</h1> */}
        <AuthForm mode="login" onSubmit={handleLogin} />
        <div>
          <p className="text-xs">
            계정이 없으신가요? <Link to="/signup">회원가입</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
