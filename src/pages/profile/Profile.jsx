import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getUserProfile } from "../../api/auth";
import useUserStore from "../../zustand/useUserStore";
import PostCard from "../community/PostCard";

const Profile = () => {
  const queryClient = useQueryClient();
  const { accessToken, user } = useUserStore();
  const [communityPosts, setCommunityPosts] = useState([]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["profiles"],
    queryFn: () => getUserProfile(accessToken),
  });

  useEffect(() => {
    // if (data) {
    //   setNickname(data.nickname);
    // }
    fetch(import.meta.env.VITE_DB_URL + "/communityPosts")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const filteredPosts = data.filter((post) => post.userId === user.id);
        setCommunityPosts(filteredPosts);
      });
  }, [data]);

  if (isLoading) {
    return <div>로딩중입니다...</div>;
  }

  if (isError) {
    return <div>오류가 발생했습니다...다시 로그인 해주세요</div>;
  }

  return (
    <div className="max-w-screen-lg mx-auto">
      <h1 className="flex justify-center font-bold text-xl">
        {user.nickname}'s page
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {communityPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            currentUserId={post.userId}
            onUpdate={() => queryClient.invalidateQueries(["posts"])}
          />
        ))}
      </div>
    </div>
  );
};

export default Profile;
