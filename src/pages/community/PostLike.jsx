import axios from "axios";
import { useState } from "react";
import { updateLike } from "../../api/communityCardApi";

const PostLike = ({ postId, initialLikes, onLikesUpdated }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);

  const toggleLike = () => {
    console.log(postId);
    const updatedLikes = liked ? likes - 1 : likes + 1;
    console.log(updatedLikes);
    setLiked(!liked);
    setLikes(updatedLikes);
    updateLike(postId, {
      likes: updatedLikes,
    });

    // 서버에 좋아요 수 업데이트
    // axios
    //   .patch(`http://localhost:5000/communityPosts/${postId}`, {
    //     likes: updatedLikes,
    //   })
    //   .then(() => {
    //     if (onLikesUpdated) {
    //       onLikesUpdated(postId, updatedLikes);
    //     }
    //   });
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
