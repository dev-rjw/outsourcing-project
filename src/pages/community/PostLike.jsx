import { useState } from "react";

const PostLike = () => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <h3 onClick={toggleLike} className="cursor-pointer">
      {liked ? "♥" : "♡"}
    </h3>
  );
};

export default PostLike;
