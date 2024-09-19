import { useState } from "react";
import PostInput from "./postInput";
import PostCard from "./postCard";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPosts } from "../../api/communityCardApi";
import FilterBar from "./FilterBar";

const PostList = () => {
  const queryClient = useQueryClient();
  const {
    data: posts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  // 게시물 추가 처리
  const handlePostAdded = (newPost) => {
    queryClient.invalidateQueries(["posts"]);
  };

  // 게시물 삭제 처리
  const handleDelete = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    queryClient.setQueryData(["posts"], updatedPosts);
    alert("삭제 되었습니다.");
  };

  // 게시물 수정
  const handleUpdate = (updatedPost) => {
    const updatedPosts = posts.map((post) =>
      post.id === updatedPost.id ? updatedPost : post
    );
    queryClient.setQueryData(["posts"], updatedPosts);
  };

  // 좋아요 업데이트
  const handleLikesUpdated = (postId, newLikes) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, likes: newLikes } : post
    );
    queryClient.setQueryData(["posts"], updatedPosts);
  };

  // 좋아요 소팅
  const [sortOrder, setSortOrder] = useState("latest");
  const sortedPosts = [...posts].sort((a, b) => {
    if (sortOrder === "latest") {
      return new Date(b.date) - new Date(a.date);
    } else if (sortOrder === "popular") {
      return b.likes - a.likes;
    } else {
      return 0;
    }
  });

  // 소팅 방식 변경
  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  if (isLoading) {
    return <h4>로딩 중입니다...</h4>;
  }

  if (isError) {
    return <h4>게시글을 불러오는 중 오류가 발생했습니다.</h4>;
  }

  return (
    <div>
      <h2 className="m-10 font-bold text-3xl">
        YOUTUBE로 공연 꿀팁과 후기를 공유하고 이야기해봐요!
      </h2>
      <FilterBar onSortChange={handleSortChange} currentSortOrder={sortOrder} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <PostInput onPostAdded={handlePostAdded} />
        {sortedPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            onLikesUpdated={handleLikesUpdated}
          />
        ))}
      </div>
    </div>
  );
};

export default PostList;
