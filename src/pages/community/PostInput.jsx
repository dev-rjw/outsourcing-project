const PostInput = () => {
  return (
    <div className="max-w-80 max-h-100 bg-gray-100 border-2 rounded border-primary p-4 m-10 flex flex-col justify-center items-center">
      <h3 className="self-start">닉네임</h3>

      <textarea
        className="w-full h-40 border-solid border-gray-300 p-2 m-4 cursor-text"
        placeholder="내용을 입력하세요"
      />
      <div className="flex justify-between items-center w-full">
        <button className="text-gray-400 cursor-pointer "> 파일 업로드</button>
        <button className="bg-white text-black border-solid rounded border-primary hover:bg-primary hover:text-white p-1 transition duration-300 cursor-pointer">
          완료
        </button>
      </div>
    </div>
  );
};

export default PostInput;
