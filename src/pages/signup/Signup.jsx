import { Link, useNavigate } from "react-router-dom";
import { register } from "../../api/auth";
import AuthForm from "../login/AuthForm";
import Swal from "sweetalert2";

const SignUp = () => {
  const navigate = useNavigate();

  const handleSignup = async (FormData) => {
    try {
      await register(FormData);
      Swal.fire({
        title: "회원가입에 성공하였습니다.",
        text: "로그인페이지로 이동합니다.",
        icon: "success",
        confirmButtonText: "확인",
      });
      navigate("/login");
    } catch (error) {
      Swal.fire({
        title: "회원가입에 실패했습니다.",
        text: "다시 시도해주세요.",
        icon: "warning",
        confirmButtonText: "확인",
      });
    }
  };
  return (
    <div className="w-full h-[calc(100%-67px-128px)] flex justify-center items-center">
      <div className="w-80 h-72 flex flex-col justify-between items-center px-10 py-5 border border-solid border-gray-300 rounded-3xl">
        {/* <h1>회원가입</h1> */}
        <AuthForm mode="signup" onSubmit={handleSignup} />
        <div>
          <p className="text-xs">
            이미 계정이 있으신가요? <Link to="/login">로그인</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
