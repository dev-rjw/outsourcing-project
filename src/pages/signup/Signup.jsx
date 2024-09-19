import { Link, useNavigate } from "react-router-dom";
import { register } from "../../api/auth";
import AuthForm from "../login/AuthForm";

const SignUp = () => {
  const navigate = useNavigate();

  const handleSignup = async (FormData) => {
    try {
      await register(FormData);
      alert("회원가입에 성공하였습니다. 로그인페이지로 이동합니다.");
      navigate("/login");
    } catch (error) {
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };
  return (
    <div>
      <div>
        <h1>회원가입</h1>
        <AuthForm mode="signup" onSubmit={handleSignup} />
      </div>
      <p>
        이미 계정이 있으신가요? <Link to="/login">로그인</Link>
      </p>
    </div>
  );
};

export default SignUp;
