import { useState } from "react";

const PostInput = ({ addPost }) => {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      id: Date.now(),
      content,
    };

    addPost(newPost);
    setContent("");
  };

  return (
    <div className="max-w-80 max-h-100 bg-gray-100 border-2 rounded border-primary p-4 m-10 flex flex-col justify-center items-center">
      <div className="w-full flex justify-between">
        <h3>닉네임</h3>
      </div>
      <textarea
        className="w-full h-40 bg-white border-solid border-gray-300 p-2 m-4 cursor-text"
        placeholder="내용을 입력하세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex justify-between items-center w-full">
        <button className="text-gray-300 cursor-pointer "> 파일 업로드</button>
        <button
          onClick={handleSubmit}
          className="text-black border-solid rounded border-primary hover:bg-primary hover:text-white  transition duration-300 cursor-pointer w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex justify-center items-center "
        >
          완료
        </button>
      </div>
    </div>
  );
};

export default PostInput;
