import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePost } from "../../api/communityCardApi";
import useUserStore from "../../zustand/useUserStore";

const PostCardPopup = ({ post, onClose, onUpdate }) => {
  const { user } = useUserStore();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [updatedComment, setUpdatedComment] = useState("");

  const queryClient = useQueryClient();

  useEffect(() => {
    setComments(post.comments || []);
  }, [post.comments]);

  const addCommentMutation = useMutation({
    mutationFn: (updatedPost) => updatePost(post.id, updatedPost),
    onSuccess: (data) => {
      setComments(data.comments);
      if (onUpdate) {
        onUpdate(data);
      }
      queryClient.invalidateQueries(["posts"]);
    },
    onError: (error) => {
      console.error("댓글 추가 error:", error);
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: (updatedPost) => updatePost(post.id, updatedPost),
    onSuccess: (data) => {
      setComments(data.comments);
      alert("댓글이 삭제되었습니다.");
      if (onUpdate) {
        onUpdate(data);
      }
      queryClient.invalidateQueries(["posts"]);
    },
    onError: (error) => {
      console.error("댓글 삭제 error:", error);
    },
  });

  const updateCommentMutation = useMutation({
    mutationFn: (updatedPost) => updatePost(post.id, updatedPost),
    onSuccess: (data) => {
      setComments(data.comments);
      setIsEditing(null);
      setUpdatedComment("");
      if (onUpdate) {
        onUpdate(data);
      }
      queryClient.invalidateQueries(["posts"]);
    },
    onError: (error) => {
      console.error("댓글 수정 error:", error);
    },
  });

  const handleAddComment = () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (comment.trim()) {
      const newComment = {
        id: Date.now(),
        text: comment,
        userId: user.id,
        nickname: user.nickname,
      };

      const updatedComments = [...comments, newComment];
      setComment("");
      const updatedPost = { ...post, comments: updatedComments };

      addCommentMutation.mutate(updatedPost);
    }
  };

  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter(
      (comment) => comment.id !== commentId
    );
    const updatedPost = { ...post, comments: updatedComments };

    deleteCommentMutation.mutate(updatedPost);
  };

  const handleEditComment = (id, text) => {
    setIsEditing(id);
    setUpdatedComment(text);
  };

  const handleUpdateComment = () => {
    const updatedComments = comments.map((comment) =>
      comment.id === isEditing ? { ...comment, text: updatedComment } : comment
    );
    const updatedPost = { ...post, comments: updatedComments };

    updateCommentMutation.mutate(updatedPost);
  };

  const getYoutubeThumbnail = (link) => {
    const videoId = link.split("v=")[1]?.split("&")[0];
    return videoId
      ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
      : null;
  };

  const thumbnailUrl = getYoutubeThumbnail(post.youtubeLink);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white px-8 py-4 rounded-md max-w-2xl w-full relative">
        <div className="flex justify-between items-center w-full">
          <button onClick={onClose} className="softBtn mb-1">
            X
          </button>
        </div>

        {thumbnailUrl ? (
          <a href={post.youtubeLink} target="_blank" rel="noopener noreferrer">
            <img
              src={thumbnailUrl}
              alt="YouTube Thumbnail"
              className="h-full w-full object-cover rounded "
            />
          </a>
        ) : (
          <div className="bg-soft h-80 w-full rounded flex justify-center items-center">
            <p className="text-gray-300">*^^*</p>
          </div>
        )}

        <div className="flex justify-start">
          <p className="text-black text-sm m-2"> {post.author}</p>
          <p className="text-gray-300 text-xs font-light flex justify-start items-center ">
            {new Date(post.date).toLocaleDateString()}
          </p>
        </div>
        <p className="mt-4 ml-2 text-gray-700">{post.content}</p>

        <div className="flex justify-between items-end py-4">
          <p className="text-left text-primary">{post.tag}</p>
        </div>

        <hr className="border-solid border-gray-100 mb-3 " />
        <div className="flex justify-between ">
          <input
            type="text"
            placeholder="댓글 입력"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full bg-gray-100 rounded mr-2 pl-2"
          />
          <button className="btn" onClick={handleAddComment}>
            입력
          </button>
        </div>

        <div className="mt-4">
          {comments.map((comment) => (
            <div key={comment.id} className="mt-2">
              {isEditing === comment.id ? (
                <div className="flex justify-between items-center">
                  <input
                    type="text"
                    value={updatedComment}
                    onChange={(e) => setUpdatedComment(e.target.value)}
                    className="w-full bg-gray-100 rounded mr-2 pl-2"
                  />
                  <button
                    onClick={handleUpdateComment}
                    className="softBtn text-xs w-10"
                  >
                    저장
                  </button>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">{comment.text}</p>

                  {comment.userId === user.id && (
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          handleEditComment(comment.id, comment.text)
                        }
                        className="softBtn text-xs"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="softBtn text-xs"
                      >
                        삭제
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostCardPopup;
