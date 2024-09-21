import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../../api/communityCardApi";
import useUserStore from "../../zustand/useUserStore";
import { useNavigate } from "react-router-dom";

const PostInput = ({ initList }) => { // onPostAdded
  const navigate = useNavigate();
  const { user } = useUserStore();
  const [content, setContent] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [tag, setTag] = useState(null);
  const predefinedTags = ["꿀팁", "후기", "기대", "음악", "추천", "기타"];
  const queryClient = useQueryClient();

  if (!user) {
    return (
      <div className="max-w-100 max-h-100 bg-gray-50 border-2 rounded border-primary m-10 p-4">
        <div className="bg-gray-200 h-40 w-full rounded flex items-center justify-center">
          <p className="text-gray-500 text-center">
            로그인 후 <br />
            글을 작성할 수 있습니다.
          </p>
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => navigate("/login")}
            className="btn w-full my-20"
          >
            로그인하러가기
          </button>
        </div>
      </div>
    );
  }

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      // onPostAdded(createdPost);
      setContent("");
      setYoutubeLink("");
      setThumbnailUrl(null);
      setTag(null);
    },
    onError: (error) => {
      console.error("게시글 저장 중 오류 발생:", error);
      alert("게시글 저장 중 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    if (!tag) {
      alert("태그를 선택해주세요!");
      return;
    }

    const newPost = {
      content,
      youtubeLink,
      thumbnailUrl,
      tag: `#${tag}`,
      date: new Date().toISOString(),
      likes: 0,
      comments: [],
      author: user.nickname,
      userId: user.id,
    };
    await createPost(newPost);
    await initList();

    setContent("");
    setYoutubeLink("");
    setThumbnailUrl(null);
    setTag("");
  };

  const handleYoutubeLinkChange = (e) => {
    const link = e.target.value;
    setYoutubeLink(link);

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

  const handleTagChange = (e) => {
    setTag(e.target.value);
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
                className="text-gray-200 w-full p-2 text-center bg-gray-100"
              />
            </div>
          )}
        </div>
        <p className="text-black text-sm m-3">{user.username}</p>
        <textarea
          className="w-full h-20 bg-white border-solid border-gray-300 p-2 cursor-text"
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="flex justify-between items-end m-4">
          <select
            value={tag || ""}
            onChange={handleTagChange}
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

          <button onClick={handleSubmit} className="btn">
            완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostInput;
