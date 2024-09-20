import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getUserProfile } from "../../api/auth";
import useUserStore from "../../zustand/useUserStore";
import { post } from "request";
import PostCard from "../community/PostCard";

const Profile = () => {
  const queryClient = useQueryClient();
  const { accessToken, user } = useUserStore();
  const [communityPosts, setCommunityPosts] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["profiles"],
    queryFn: () => getUserProfile(accessToken),
  });

  useEffect(() => {
    if (data) {
      setNickname(data.nickname);
    }
    fetch("http://localhost:5000/communityPosts")
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
    return <div>오류가 발생했습니다...</div>;
  }

  return (
    <div>
      <h1>My Page</h1>
      {communityPosts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          currentUserId={post.userId}
          onUpdate={() => queryClient.invalidateQueries(["posts"])}
        />
      ))}
    </div>
  );
};

export default Profile;
