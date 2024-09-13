import { useState } from "react";

const PostInput = ({ addPost }) => {
  const [content, setContent] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      id: Date.now(),
      content,
      youtubeLink,
      thumbnailUrl,
      date: new Date().toLocaleDateString(),
    };

    addPost(newPost);
    setContent("");
    setYoutubeLink("");
    setThumbnailUrl(null);
  };

  // 유튜브 썸네일 가져오기
  const handleYoutubeLinkChange = (e) => {
    const link = e.target.value;
    setYoutubeLink(link);

    // 유튜브 비디오 ID 추출
    const videoId = link.split("v=")[1]?.split("&")[0];
    if (videoId) {
      const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      setThumbnailUrl(thumbnail);
    }
  };

  return (
    <div className="max-w-100 max-h-100 bg-gray-50 border-2 rounded border-primary m-10">
      <div className="relative w-full h-full rounded ">
        <div className="bg-gray-200 h-40 w-full rounded flex items-center justify-center">
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt="YouTube Thumbnail"
              className="h-full w-full object-cover rounded"
            />
          ) : (
            <div>
              <input
                type="text"
                value={youtubeLink}
                onChange={handleYoutubeLinkChange}
                placeholder="YouTube 링크 입력"
                className="text-gray-300 w-full p-2"
              />
            </div>
          )}
        </div>
        <p className="text-black text-sm m-3"> 닉네임</p>
        <textarea
          className="w-full h-20 bg-white border-solid border-gray-300 p-2 cursor-text"
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex justify-between items-end m-4">
          <button className="text-gray-300 cursor-pointer "> #공연 제목</button>
          <button
            onClick={handleSubmit}
            className="text-black border-solid rounded border-primary hover:bg-primary hover:text-white  transition duration-300 cursor-pointer w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex justify-center items-center "
          >
            완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostInput;
