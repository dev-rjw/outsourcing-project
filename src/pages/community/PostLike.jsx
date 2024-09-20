import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addLike,
  getUserLikeStatus,
  removeLike,
} from "../../api/communityLikesApi";
import useUserStore from "../../zustand/useUserStore";

const PostLike = ({ postId, initialLikes, post }) => {
  const { user } = useUserStore();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [likeId, setLikeId] = useState(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchUserLikeStatus = async () => {
      if (user) {
        const likesData = await getUserLikeStatus(postId, user.id);
        if (likesData.length > 0) {
          setLiked(true);
          setLikeId(likesData[0].id);
        }
      }
    };

    fetchUserLikeStatus();
  }, [postId, user]);

  // 좋아요 수 업데이트
  const mutation = useMutation({
    mutationFn: () => {
      if (liked) {
        return removeLike(likeId, postId);
      } else {
        return addLike({ postId, userId: user.id });
      }
    },
    onSuccess: (data) => {
      if (liked) {
        setLikes(data.count);
        setLiked(false);
      } else {
        setLikes(data.count);
        setLiked(true);
        setLikeId(data.likeData.id);
      }
      queryClient.invalidateQueries(["posts"]);
    },
    onError: (error) => {
      console.error("좋아요 업데이트 오류:", error);
    },
  });

  const toggleLike = () => {
    mutation.mutate();
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
