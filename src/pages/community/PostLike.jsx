import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addLike,
  getUserLikeStatus,
  removeLike,
} from "../../api/communityLikesApi";
import useUserStore from "../../zustand/useUserStore";
import Swal from "sweetalert2";

const PostLike = ({ postId, initialLikes }) => {
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
      queryClient.invalidateQueries(["post"]);
    },
    onError: (error) => {
      console.error("좋아요 업데이트 오류:", error);
    },
  });

  const toggleLike = () => {
    if (!user) {
      Swal.fire({
        text: "로그인이 필요합니다.",
        icon: "warning",
        confirmButtonText: "확인",
      });
      return;
    }
    mutation.mutate();
  };

  return (
    <h2
      onClick={toggleLike}
      className="cursor-pointer bg-primary bg-opacity-70 text-white text-[0.8rem] px-1 rounded-full  "
    >
      {liked ? "♥" : "♡"} {likes}
    </h2>
  );
};

export default PostLike;
