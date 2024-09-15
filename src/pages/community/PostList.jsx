import { useEffect, useState } from "react";
import PostInput from "./postInput";
import PostCard from "./postCard";
import { fetchPosts } from "../../api/communityCardApi";

const PostList = () => {
  const [posts, setPosts] = useState([]);

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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
      <PostInput onPostAdded={handlePostAdded} />
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
};

export default PostList;
