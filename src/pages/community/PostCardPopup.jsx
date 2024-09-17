import { useEffect, useState } from "react";
import { updatePost } from "../../api/communityCardApi";
// import PostLike from "./PostLike";

const PostCardPopup = ({ post, onClose, onUpdate }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [updatedComment, setUpdatedComment] = useState("");

  useEffect(() => {
    setComments(post.comments || []);
  }, [post.comments]);

  // 댓글 추가
  const handleAddComment = () => {
    if (comment.trim()) {
      const newComment = {
        id: Date.now(),
        text: comment,
      };

      const updatedComments = [...comments, newComment];
      setComments(updatedComments);
      setComment("");

      const updatedPost = { ...post, comments: updatedComments };
      updatePost(post.id, updatedPost)
        .then((data) => {
          setComments(data.comments);
          if (onUpdate) {
            onUpdate(data);
          }
        })
        .catch((error) => console.error("댓글 추가 오류:", error));
    }
  };

  // 댓글 삭제
  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter(
      (comment) => comment.id !== commentId
    );

    const updatedPost = { ...post, comments: updatedComments };
    updatePost(post.id, updatedPost)
      .then((data) => {
        setComments(data.comments);
        alert("댓글이 삭제되었습니다.");
        if (onUpdate) {
          onUpdate(data);
        }
      })
      .catch((error) => console.error("댓글 삭제 오류:", error));
  };

  // 댓글 수정 모드
  const handleEditComment = (id, text) => {
    setIsEditing(id);
    setUpdatedComment(text);
  };

  // 댓글 업데이트
  const handleUpdateComment = () => {
    const updatedComments = comments.map((comment) =>
      comment.id === isEditing ? { ...comment, text: updatedComment } : comment
    );

    const updatedPost = { ...post, comments: updatedComments };
    updatePost(post.id, updatedPost)
      .then((data) => {
        setComments(data.comments);
        setIsEditing(null);
        setUpdatedComment("");
        if (onUpdate) {
          onUpdate(data);
        }
      })
      .catch((error) => console.error("댓글 수정 오류:", error));
  };

  // 유튜브 썸네일
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
          {/* <div className="flex justify-end">
            <PostLike />
          </div> */}
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
          <p className="text-black text-sm m-2"> 닉네임</p>
          <p className="text-gray-300 text-xs font-light flex justify-start items-center ">
            {new Date(post.date).toLocaleDateString()}
          </p>
        </div>
        <p className="mt-4 ml-2 text-gray-700">{post.content}</p>

        <div className="flex justify-between items-end py-4">
          <p className="text-left text-primary">{post.tag}</p>
        </div>

        {/* 댓글 */}
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
                // 댓글 수정 모드
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
                // 댓글 표시
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">{comment.text}</p>
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
