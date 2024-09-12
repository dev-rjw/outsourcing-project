import { useState } from "react";
import PostLike from "./PostLike";

const PostCard = ({ post, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(post.content);

  // 수정
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // 수정저장
  const handleUpdate = () => {
    const updatedPost = {
      ...post,
      content: updatedContent,
    };
    onUpdate(updatedPost);
    toggleEdit();
  };

  return (
    <div className="max-w-80 max-h-100 bg-gray-100 border-2 rounded border-primary p-4 m-10 ">
      <div className="w-full flex justify-between">
        <h3>닉네임</h3>
        <PostLike />
      </div>

      {isEditing ? (
        // 수정 모드 일때
        <div>
          <div>
            <textarea
              className="border-solid border-gray-300 p-4 "
              value={updatedContent}
              onChange={(e) => setUpdatedContent(e.target.value)}
            />
          </div>
          <button
            onClick={handleUpdate}
            className="text-gray-300 hover:text-primary transition duration-300 cursor-pointer"
          >
            저장하기
          </button>
        </div>
      ) : (
        // 수정 모드가 아닐 때
        <div>
          <div className="w-full h-40  p-2 m-4">
            <p>{post.content}</p>
          </div>
          <div className="flex gap-4 flex-start">
            <button
              onClick={toggleEdit}
              className="text-gray-300 hover:text-primary transition duration-300 cursor-pointer"
            >
              수정하기
            </button>
            <button
              onClick={() => onDelete(post.id)}
              className="text-gray-300 hover:text-primary transition duration-300 cursor-pointer"
            >
              삭제하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
