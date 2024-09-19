import React, { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import useUserStore from "../../zustand/useUserStore";
import { v4 as uuidv4 } from "uuid";
import {
  detailAddComment,
  detailDeleteComment,
  detailGetComment,
} from "../../api/detailApi";

const DetailComments = ({ id }) => {
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();
  const { user } = useUserStore();

  // 댓글 추가 mutation
  const addMutation = useMutation({
    mutationFn: (newComment) =>
      detailAddComment({ ...newComment, performanceId: id }),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", id]);
      setComment("");
    },
  });

  // 댓글 삭제 mutation
  const removeMutation = useMutation({
    mutationFn: detailDeleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", id]);
    },
  });

  // 댓글 가져오기 query
  const {
    data: comments = [], // 기본값을 빈 배열로 설정
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => detailGetComment(id),
  });

  if (isLoading) {
    return <p>로딩중입니다.</p>;
  }

  if (isError) {
    return <p>댓글을 가져오던 중 에러가 발생했습니다.</p>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      addMutation.mutate({
        email: user?.email || uuidv4(), // 로그인한 사용자 이메일 사용 또는 유니크 ID
        content: comment,
      });
    }
  };

  const handleDelete = (id) => {
    removeMutation.mutate(id);
  };

  return (
    <>
      <div>
        <h4 className="font-extrabold text-3xl mb-8">회원리뷰</h4>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              className="w-[750px] bg-slate-200 rounded mx-auto pb-4 mb-8 relative"
              key={comment.id}
            >
              <p className="font-bold text-left pl-4 mb-4">{comment.email}</p>
              <p>{comment.content}</p>
              <button
                onClick={() => handleDelete(comment.id)}
                className="cursor-pointer w-[50px] h-[30px] bg-accent rounded absolute bottom-2 right-2 "
              >
                삭제
              </button>
            </div>
          ))
        ) : (
          <p>리뷰가 없습니다.</p>
        )}
      </div>
      <form onSubmit={handleSubmit} className="mt-20">
        <h4 className="font-extrabold text-3xl mb-8">한줄평</h4>
        <input
          type="text"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          placeholder="리뷰를 작성해주세요"
          className="w-[700px] h-[100px] bg-slate-200 rounded"
        />
        <button
          type="submit"
          className="cursor-pointer w-[50px] h-[100px] bg-primary rounded text-white"
        >
          등록
        </button>
      </form>
    </>
  );
};

export default DetailComments;
