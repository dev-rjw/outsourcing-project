import { useState } from "react";

const PostLike = () => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  const toggleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  return (
    <h2 onClick={toggleLike} className="cursor-pointer text-primary">
      {liked ? "♥" : "♡"} {likes}
    </h2>
  );
};

export default PostLike;
