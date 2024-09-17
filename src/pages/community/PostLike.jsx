import { useState } from "react";

const PostLike = ({ postId, initialLikes, onLikesUpdated }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);

  const toggleLike = () => {
    const updatedLikes = liked ? likes - 1 : likes + 1;
    setLiked(!liked);
    setLikes(updatedLikes);

    // 서버에 좋아요 수 업데이트
    fetch(`http://localhost:4000/communityPosts/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: updatedLikes }),
    })
      .then((response) => response.json())
      .then(() => {
        if (onLikesUpdated) {
          onLikesUpdated(postId, updatedLikes);
        }
      });
  };
  return (
    <h2
      onClick={toggleLike}
      className="cursor-pointer text-primary  [text-shadow:0_0_6px_white]"
    >
      {liked ? "♥" : "♡"} {likes}
    </h2>
  );
};

export default PostLike;
