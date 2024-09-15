import { useState } from "react";
import PostLike from "./PostLike";
import PostCardPopup from "./PostCardPopup";
import { deletePost, updatePost } from "../../api/communityCardApi";

const PostCard = ({ post, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(post.content);
  const [updatedYoutubeLink, setUpdatedYoutubeLink] = useState(
    post.youtubeLink
  );
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // 팝업
  const openPopup = () => {
    if (!isEditing) {
      setIsPopupOpen(true);
    }
  };

  const closePopup = (e) => {
    e.stopPropagation();
    setIsPopupOpen(false);
  };

  // 유튜브 썸네일 URL 생성
  const getYoutubeThumbnail = (link) => {
    const videoIdMatch = link.match(
      /(?:youtube\.com\/.*v=|youtu\.be\/)([^&]+)/i
    );
    const videoId = videoIdMatch ? videoIdMatch[1] : null;
    return videoId
      ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
      : null;
  };

  // 수정
  const toggleEdit = (e) => {
    e.stopPropagation(); //수정삭제 누르면 팝업안뜨게
    setIsEditing(!isEditing);
  };

  // 수정저장
  const handleUpdate = () => {
    const updatedPost = {
      ...post,
      content: updatedContent,
      youtubeLink: updatedYoutubeLink,
      thumbnailUrl: getYoutubeThumbnail(updatedYoutubeLink),
      date: new Date().toISOString(),
    };

    updatePost(post.id, updatedPost)
      .then((data) => {
        onUpdate(data);
        setIsEditing(false);
      })
      .catch((error) => console.error("게시글 수정 오류:", error));
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    deletePost(post.id)
      .then(() => {
        onDelete(post.id);
      })
      .catch((error) => console.error("게시글 삭제 오류:", error));
  };

  // 유튜브 링크 변경
  const handleYoutubeLinkChange = (e) => {
    const link = e.target.value;
    setUpdatedYoutubeLink(link);
    setThumbnailUrl(getYoutubeThumbnail(link));
  };

  return (
    <div className="max-w-100 max-h-100 bg-gray-100 border-2 rounded border-primary m-10 ">
      {isEditing ? (
        // 수정 모드 일때
        <div>
          <div className="bg-gray-300 h-40 w-full object-cover rounded">
            <input
              type="text"
              value={updatedYoutubeLink}
              onChange={handleYoutubeLinkChange}
              className="w-full p-2 text-gray-700"
            />
            {thumbnailUrl && (
              <img
                src={thumbnailUrl}
                alt="YouTube Thumbnail"
                className="h-full w-full object-cover rounded"
              />
            )}
          </div>

          <textarea
            className="w-full h-20 bg-white border-solid border-gray-300 p-2 cursor-text"
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.target.value)}
          />

          <div className="flex justify-end m-4">
            <button onClick={handleUpdate} className="softBtn">
              저장
            </button>
          </div>
        </div>
      ) : (
        // 수정 모드가 아닐 때
        <div className="relative w-full h-full rounded ">
          <div className="cursor-pointer" onClick={openPopup}>
            {isPopupOpen && (
              <PostCardPopup
                post={post}
                onClose={closePopup}
                onUpdate={onUpdate}
              />
            )}
            <div
              className="absolute w-full flex justify-end p-2"
              onClick={(e) => e.stopPropagation()} //하트 눌렀을때에는 팝업 안뜨게..
            >
              <PostLike postId={post.id} initialLikes={post.likes} />
            </div>

            <div className="bg-gray-300 h-40 w-full object-cover rounded">
              {post.youtubeLink ? (
                <img
                  src={getYoutubeThumbnail(post.youtubeLink)}
                  alt="YouTube Thumbnail"
                  className="h-full w-full object-cover rounded"
                />
              ) : (
                <div className="bg-soft h-full w-full rounded flex justify-center items-center">
                  <p className="text-gray-300">*^^*</p>
                </div>
              )}
            </div>

            <div className="flex justify-start ">
              <p className="text-black text-sm ml-4 mt-2"> 닉네임</p>
              <p
                className="text-gray-300 text-xs font-light flex justify-start items-center ml-2 mt-2
            "
              >
                {new Date(post.date).toLocaleDateString()}
              </p>
            </div>
            <p className=" h-20 p-4">{post.content}</p>

            <div className="flex justify-between  items-end py-4 m-4">
              <p className="text-left text-primary">#공연</p>
              <div className="flex gap-4 justify-end">
                <button onClick={toggleEdit} className="softBtn">
                  수정
                </button>
                <button onClick={handleDelete} className="softBtn">
                  삭제
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
