import { useState } from "react";

const PostLike = ({ postId, initialLikes }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);

  const toggleLike = () => {
    const updatedLikes = liked ? likes - 1 : likes + 1;
    setLiked(!liked);
    setLikes(updatedLikes);

    // 서버에 좋아요 수 업데이트
    fetch(`http://localhost:5000/communityPosts/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: updatedLikes }),
    })
      .then((response) => response.json())
      .catch((error) => console.error("좋아요 업데이트 오류:", error));
  };
  return (
    <h2 onClick={toggleLike} className="cursor-pointer text-primary">
      {liked ? "♥" : "♡"} {likes}
    </h2>
  );
};

export default PostLike;
