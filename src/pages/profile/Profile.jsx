import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getUserProfile } from "../../api/auth";
import useUserStore from "../../zustand/useUserStore";
import PostCard from "../community/PostCard";
import { fetchPosts } from "../../api/communityCardApi";

const Profile = () => {
  const queryClient = useQueryClient();
  const { accessToken, user } = useUserStore();
  const [communityPosts, setCommunityPosts] = useState([]);

  const { isLoading, isError } = useQuery({
    queryKey: ["profiles"],
    queryFn: () => getUserProfile(accessToken),
  });

  useEffect(() => {
    const fetchCommunityPosts = async () => {
      try {
        const data = await fetchPosts();
        const filteredPosts = data.filter((post) => post.userId === user.id);
        setCommunityPosts(filteredPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchCommunityPosts();
  }, [user.id]);

  if (isLoading) {
    return <div>로딩중입니다...</div>;
  }

  if (isError) {
    return <div>오류가 발생했습니다...다시 로그인 해주세요</div>;
  }

  return (
    <div className="max-w-screen-lg mx-auto h-[calc(100%-75px-128px)]">
      <h1 className="flex justify-center font-bold text-xl ">
        {user.nickname}'s page
      </h1>
      {communityPosts.length === 0 ? (
        <div className="flex justify-center mt-4 mb-4 text-xl ">
          작성한 게시글이 없습니다.
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default Profile;
