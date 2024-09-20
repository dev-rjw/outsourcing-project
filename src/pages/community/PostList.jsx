import { useEffect, useState } from "react";
import PostInput from "./postInput";
import PostCard from "./postCard";
import { useQueryClient } from "@tanstack/react-query";
import { fetchPosts } from "../../api/communityCardApi";
import FilterBar from "./FilterBar";
import { getUserProfile } from "../../api/auth";
import useUserStore from "../../zustand/useUserStore";
import { getAllLike } from "../../api/communityLikesApi";

const PostList = () => {
  const queryClient = useQueryClient();
  const { user } = useUserStore();
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const token = localStorage.getItem("token");
  const [list, setList] = useState([]);

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

  useEffect(() => {
    initList();
  }, []);

  const initList = async () => {
    const data = await fetchPosts();
    const list = await getAllLike();
    let newData = [];

    for (let i = 0; i < data.length; i++) {
      newData.push(data[i]);
      for (let j = 0; j < list.length; j++) {
        if (newData[i].id == list[j].postId) {
          console.log(list[j].postId);
          newData[i].likes++;
        }
      }
    }

    setList(newData);
  };

  // 게시물 삭제 처리
  const handleDelete = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    queryClient.setQueryData(["posts"], updatedPosts);
    alert("삭제 되었습니다.");
  };

  // 좋아요 소팅
  const [sortOrder, setSortOrder] = useState("latest");
  const sortedPosts = [...list].sort((a, b) => {
    if (sortOrder === "latest") {
      //  최신순
      return new Date(b.date) - new Date(a.date);
      // 인기순
    } else if (sortOrder === "popular") {
      return b.likes - a.likes;
    }
    return 0;
  });

  // 소팅 방식 변경
  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  return (
    <div>
      <h2 className="m-10 font-bold text-3xl">
        YOUTUBE로 공연 꿀팁과 후기를 공유하고 이야기해봐요!
      </h2>
      <FilterBar onSortChange={handleSortChange} currentSortOrder={sortOrder} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <PostInput
          onPostAdded={() => queryClient.invalidateQueries(["posts"])}
        />
        {sortedPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onDelete={handleDelete}
            currentUserId={user?.id}
            onUpdate={() => queryClient.invalidateQueries(["posts"])}
          />
        ))}
      </div>
    </div>
  );
};

export default PostList;
