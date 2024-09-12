const PostInput = () => {
  return (
    <div className="w-[300px] h-[400px] bg-gray-100 border-2 border-primary p-4 m-10 flex flex-col justify-center items-center">
      <h3>닉네임</h3>

      <textarea
        className="w-full h-40 border-solid border-gray-300 p-2 m-4"
        placeholder="내용을 입력하세요"
      />
      <div className="flex justify-between items-center w-full">
        <button className="text-gray-400 "> 파일 업로드</button>
        <button className="bg-white text-black border-solid border-primary hover:bg-primary hover:text-white p-1 transition duration-300">
          완료
        </button>
      </div>
    </div>
  );
};

export default PostInput;
