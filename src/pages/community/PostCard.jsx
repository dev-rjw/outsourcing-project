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
    <div className="max-w-100 max-h-100 bg-gray-100 border-2 rounded border-primary m-10 ">
      {isEditing ? (
        // 수정 모드 일때
        <div>
          <div>
            <textarea
              className="w-full h-20 bg-white border-solid border-gray-300 p-2 cursor-text"
              value={updatedContent}
              onChange={(e) => setUpdatedContent(e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleUpdate}
              className="text-gray-300 hover:text-primary transition duration-300 cursor-pointer"
            >
              저장하기
            </button>
          </div>
        </div>
      ) : (
        // 수정 모드가 아닐 때

        <div className="relative w-full h-full rounded ">
          <div className="absolute w-full flex justify-end p-2">
            <PostLike />
          </div>

          <div className="bg-gray-300 h-40 w-full object-cover rounded p-4">
            img
          </div>

          <div className="flex justify-start gap-2">
            <p className="text-black text-sm m-4"> 닉네임</p>
            <p className="text-gray-300 text-xs font-light flex justify-start items-center ">
              {" "}
              2024.09.13
            </p>
          </div>
          <p className=" h-20 p-4">{post.content}</p>

          <div className="flex justify-between  items-end py-4 m-4">
            <p className="text-left text-primary">#공연제목</p>
            <div className="flex gap-4 justify-end">
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
        </div>
      )}
    </div>
  );
};

export default PostCard;
