import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLike } from "../../api/communityCardApi";

const PostLike = ({ postId, initialLikes, post }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);

  const queryClient = useQueryClient();

  // 좋아요 수 업데이트
  const mutation = useMutation({
    mutationFn: () => {
      const updatedLikes = liked ? likes - 1 : likes + 1;
      updateLike(postId, { ...post, likes: updatedLikes });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
    onError: (error) => {
      console.error("좋아요 업데이트 오류:", error);
    },
  });

  const toggleLike = () => {
    const newPost = { ...post, likes: post.likes };
    setLiked(!liked);

    mutation.mutate();
  };

  return (
    <h2
      onClick={toggleLike}
      className="cursor-pointer text-primary  [text-shadow:0_0_6px_white]"
    >
      {liked ? "♥" : "♡"} {post.likes}
    </h2>
  );
};

export default PostLike;
