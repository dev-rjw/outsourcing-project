import { Link, useNavigate } from "react-router-dom";
import { getUserProfile, login } from "../../api/auth";
import AuthForm from "./AuthForm";
import useUserStore from "../../zustand/useUserStore";
import Swal from "sweetalert2";

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
      Swal.fire({
        text: "로그인에 성공했습니다.",
        icon: "success",
        confirmButtonText: "확인",
      });
    } catch (error) {
      Swal.fire({
        title: "로그인에 실패하였습니다.",
        text: "아이디와 비밀번호를 확인해주세요.",
        icon: "warning",
        confirmButtonText: "확인",
      });
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
