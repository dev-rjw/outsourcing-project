import { useState } from "react";
import useUserStore from "../../zustand/useUserStore";
import { updateProfile } from "../../api/auth";

const Profile = () => {
  const { user, setUser } = useUserStore();
  const [nickname, setNickname] = useState();

  const handleNicknameChange = async (e) => {
    setNickname(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try{
    //     const response = await updateProfile({ nickname });
    //     setUser({ ...user, nickname: response.nickname });
    // } catch
  };
  return <div>Profile</div>;
};

export default Profile;
