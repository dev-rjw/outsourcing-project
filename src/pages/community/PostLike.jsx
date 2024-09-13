import { useState } from "react";

const PostLike = () => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <h2 onClick={toggleLike} className="cursor-pointer">
      {liked ? "♥" : "♡"}
    </h2>
  );
};

export default PostLike;
