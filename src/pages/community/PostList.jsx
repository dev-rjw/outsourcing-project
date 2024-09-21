import { useEffect, useState } from "react";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { deletePost, fetchPosts } from "../../api/communityCardApi";
import FilterBar from "./FilterBar";
import { getUserProfile } from "../../api/auth";
import useUserStore from "../../zustand/useUserStore";
import { getAllLike } from "../../api/communityLikesApi";
import PostCard from "./PostCard";
import PostInput from "./PostInput";

const PostList = () => {
  const queryClient = useQueryClient();

  const { user } = useUserStore();
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const token = localStorage.getItem("token");
  // const [list, setList] = useState([]);
  const [sortOrder, setSortOrder] = useState("latest");

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (token) {
        try {
          const userProfile = await getUserProfile(token);
          setLoggedInUserId(userProfile.id);
        } catch (error) {
          console.error("사용자 정보를 가져오는 중 오류 발생:", error);
        }
      }
    };
    fetchUserProfile();
  }, [token]);

  // useEffect(() => {
  //   initList();
  // }, []);

  const initList = async () => {
    const data = await fetchPosts();
    const list = await getAllLike();
    let newData = [];

    for (let i = 0; i < data.length; i++) {
      data[i].likes = list.filter((ele) => ele.postId === data[i].id).length;
      newData.push(data[i]);
    }
    return newData;
  };

  const {
    data: allPosts,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["posts", sortOrder],
    queryFn: initList,
  });

  if (isPending) {
    return (
      <div className="w-full h-[calc(100%-67px-128px)] flex items-center">
        <p className="m-auto">로딩중입니다.</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-[calc(100%-67px-128px)] flex items-center">
        <p className="m-auto">데이터 조회 중 오류가 발생했습니다.</p>
      </div>
    );
  }

  const handleDelete = async (id) => {
    await deletePost(id);
    queryClient.invalidateQueries(["posts"]);
    // await initList();
    alert("삭제 되었습니다.");
  };

  const sortedPosts = [...allPosts].sort((a, b) => {
    if (sortOrder === "latest") {
      return new Date(b.date) - new Date(a.date);
    } else if (sortOrder === "popular") {
      return b.likes - a.likes;
    }
    return 0;
  });

  const handleSortChange = (order) => {
    setSortOrder(order);
    queryClient.invalidateQueries(["posts"]);
  };

  return (
    <div>
      {user?.nickname && (
        <h2 className="m-10 font-bold text-3xl">
          <span className="text-3xl">{user?.nickname}님, </span>
          <span className="text-xl">
            YOUTUBE로 공연 꿀팁과 후기를 공유하고 이야기해봐요!
          </span>
        </h2>
      )}
      <FilterBar onSortChange={handleSortChange} currentSortOrder={sortOrder} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <PostInput
          initList={initList}
          // onPostAdded={() => queryClient.invalidateQueries(["posts"])}
        />
        {sortedPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onDelete={handleDelete}
            currentUserId={user?.id}
            onUpdate={() => queryClient.invalidateQueries(["post"])}
          />
        ))}
      </div>
    </div>
  );
};

export default PostList;
