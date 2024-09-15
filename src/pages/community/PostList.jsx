import { useEffect, useState } from "react";
import PostInput from "./postInput";
import PostCard from "./postCard";
import { fetchPosts } from "../../api/communityCardApi";
import FilterBar from "./FilterBar";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [sortOrder, setSortOrder] = useState("latest");

  useEffect(() => {
    fetchPosts()
      .then((data) => setPosts(data))
      .catch((error) => console.error("게시글 불러오기 오류:", error));
  }, []);
  const handlePostAdded = (newPost) => {
    setPosts([...posts, newPost]);
  };

  //삭제
  const handleDelete = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);

    alert("삭제 되었습니다.");
  };

  //수정
  const handleUpdate = (updatedPost) => {
    const updatedPosts = posts.map((post) =>
      post.id === updatedPost.id ? updatedPost : post
    );
    setPosts(updatedPosts);
  };

  const handleLikesUpdated = (postId, newLikes) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, likes: newLikes } : post
    );
    setPosts(updatedPosts);
  };

  //좋아요 소팅
  const sortedPosts = [...posts].sort((a, b) => {
    if (sortOrder === "latest") {
      return new Date(b.date) - new Date(a.date);
    } else if (sortOrder === "popular") {
      return b.likes - a.likes;
    } else {
      return 0;
    }
  });
  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  return (
    <div>
      <FilterBar onSortChange={handleSortChange} currentSortOrder={sortOrder} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
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
