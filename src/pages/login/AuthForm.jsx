import { useState } from "react";

const AuthForm = ({ mode, onSubmit }) => {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    nickname: mode === "signup" ? "" : undefined,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const hangleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={hangleSubmit}
      className="flex flex-col justify-center items-center gap-4 p-5"
    >
      <input
        type="text"
        name="id"
        value={formData.id}
        onChange={handleChange}
        placeholder="아이디"
        required
        className="p-1 border-b border-solid border-primary border-0"
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="비밀번호"
        required
        className="p-1 border-b border-solid border-primary border-0"
      />

      {mode === "signup" && (
        <>
          {/* <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="비밀번호확인"
            required
          /> */}
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            placeholder="닉네임"
            required
            className="p-1 border-b border-solid border-primary border-0"
          />
        </>
      )}
      <button type="submit" className="px-3 py-2 rounded-lg bg-soft cursor-pointer">{mode === "login" ? "로그인" : "회원가입"}</button>
    </form>
  );
};

export default AuthForm;
