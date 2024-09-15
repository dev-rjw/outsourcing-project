import { useState } from "react";
import { createPost } from "../../api/communityCardApi";

const PostInput = ({ onPostAdded }) => {
  const [content, setContent] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    const newPost = {
      content,
      youtubeLink,
      thumbnailUrl,
      date: new Date().toISOString(),
      likes: 0,
      comments: [],
      author: "닉네임",
    };

    createPost(newPost)
      .then((createdPost) => {
        console.log("게시글이 저장되었습니다:", createdPost);
        if (onPostAdded) {
          onPostAdded(createdPost);
        }

        setContent("");
        setYoutubeLink("");
        setThumbnailUrl(null);
      })
      .catch((error) => {
        console.error("게시글 저장 중 오류 발생:", error);
        alert("게시글 저장 중 오류가 발생했습니다. 다시 시도해주세요.");
      });
  };

  // 유튜브 썸네일 가져오기
  const handleYoutubeLinkChange = (e) => {
    const link = e.target.value;
    setYoutubeLink(link);

    // 유튜브 비디오 ID 추출
    const videoIdMatch = link.match(
      /(?:youtube\.com\/.*v=|youtu\.be\/)([^&]+)/i
    );
    const videoId = videoIdMatch ? videoIdMatch[1] : null;
    if (videoId) {
      const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      setThumbnailUrl(thumbnail);
    } else {
      setThumbnailUrl(null);
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
