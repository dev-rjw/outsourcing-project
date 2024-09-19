import { useState } from "react";
import PostLike from "./PostLike";
import PostCardPopup from "./PostCardPopup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost, updatePost } from "../../api/communityCardApi";

const PostCard = ({ post, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(post.content);
  const [updatedYoutubeLink, setUpdatedYoutubeLink] = useState(
    post.youtubeLink
  );
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [updatedTag, setUpdatedTag] = useState(
    post.tag?.replace("#", "") || ""
  );

  const queryClient = useQueryClient();

  const predefinedTags = ["꿀팁", "후기", "기대", "음악", "추천", "기타"];

  // 팝업 열기
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

  // 수정 모드 토글
  const toggleEdit = (e) => {
    e.stopPropagation();
    setIsEditing(!isEditing);
  };

  // 게시물 업데이트
  const updatePostMutation = useMutation({
    mutationFn: (updatedPost) => updatePost(post.id, updatedPost),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["posts"]);
      setIsEditing(false);
      onUpdate(data);
    },
    onError: (error) => {
      console.error("게시글 수정 error:", error);
    },
  });

  // 게시물 삭제
  const deletePostMutation = useMutation({
    mutationFn: () => deletePost(post.id),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
    onError: (error) => {
      console.error("게시글 삭제 error:", error);
    },
  });

  // 게시물 업데이트
  const handleUpdate = () => {
    let formattedTag = updatedTag;
    if (!updatedTag.startsWith("#")) {
      formattedTag = `#${updatedTag}`;
    }
    const updatedPost = {
      ...post,
      content: updatedContent,
      youtubeLink: updatedYoutubeLink,
      thumbnailUrl: getYoutubeThumbnail(updatedYoutubeLink),
      tag: formattedTag,
      date: new Date().toISOString(),
    };

    updatePostMutation.mutate(updatedPost);
  };

  // 게시물 삭제
  const handleDelete = (e) => {
    e.stopPropagation();
    deletePostMutation.mutate();
  };

  // 유튜브 링크 변경
  const handleYoutubeLinkChange = (e) => {
    const link = e.target.value;
    setUpdatedYoutubeLink(link);
    setThumbnailUrl(getYoutubeThumbnail(link));
  };

  return (
    <div className="max-w-100 max-h-100 bg-gray-100 border-2 rounded border-primary m-10">
      {isEditing ? (
        <div>
          <div className="bg-gray-300 h-40 w-full object-cover rounded">
            <input
              type="text"
              value={updatedYoutubeLink}
              onChange={handleYoutubeLinkChange}
              placeholder="수정 링크 입력"
              className="w-full p-2 bg-gray-100 text-gray-200 focus:outline-none focus:text-gray-800"
            />
            {(thumbnailUrl || updatedYoutubeLink) && (
              <img
                src={thumbnailUrl || getYoutubeThumbnail(updatedYoutubeLink)}
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

          <div className="flex justify-between items-end m-4">
            <select
              value={updatedTag || ""}
              onChange={(e) => setUpdatedTag(e.target.value)}
              className="text-gray-500 rounded softBtn"
            >
              <option value="" disabled>
                #태그 선택 ▾
              </option>
              {predefinedTags.map((tagItem) => (
                <option key={tagItem} value={tagItem}>
                  #{tagItem}
                </option>
              ))}
            </select>

            <button onClick={handleUpdate} className="softBtn">
              저장
            </button>
          </div>
        </div>
      ) : (
        <div className="relative w-full h-full rounded">
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
              onClick={(e) => e.stopPropagation()}
            >
              <PostLike
                initialLikes={post.likes}
                post={post}
                postId={post.id}
              />
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

            <div className="flex justify-start">
              <p className="text-black text-sm ml-4 mt-2">닉네임</p>
              <p className="text-gray-300 text-xs font-light flex justify-start items-center ml-2 mt-2">
                {new Date(post.date).toLocaleDateString()}
              </p>
            </div>
            <p className="h-[4rem] p-4 overflow-hidden [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] [text-overflow:ellipsis]">
              {post.content}
            </p>

            <div className="flex justify-between items-end py-4 mx-4 my-2">
              <p className="text-left text-primary">{post.tag}</p>
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
