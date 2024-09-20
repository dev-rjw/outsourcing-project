import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getUserProfile, updateProfile } from "../../api/auth";
import useUserStore from "../../zustand/useUserStore";

const Profile = () => {
  const queryClient = useQueryClient();
  const { user, setUser } = useUserStore();
  const [nickname, setNickname] = useState();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["profiles"],
    queryFn: getUserProfile,
  });

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries(["profiles"]);
    },
  });

  if (isLoading) {
    return <div>로딩중입니다...</div>;
  }

  if (isError) {
    return <div>오류가 발생했습니다...</div>;
  }

  const handleNicknameChange = async (e) => {
    setNickname(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = { nickname };
      const updataUser = await updateProfile(formData, user.accessToken);
      setUser(updataUser);
      alert("프로필이 성공적으로 업데이트 되었습니다.");
    } catch (error) {
      alert("프로필 업데이트에 실패했습니다. 다시 시도해주세요.");
    }
  };
  return (
    <div>
      <div>
        <h1>My Page</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>닉네임</label>
            <input onChange={handleNicknameChange} />
          </div>
          <button type="submit">프로필 업데이트</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
