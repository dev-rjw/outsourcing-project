import React, { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import useUserStore from "../../zustand/useUserStore";
import {
  detailAddComment,
  detailDeleteComment,
  detailGetComment,
} from "../../api/detailApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const DetailComments = ({ id }) => {
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();
  const { user } = useUserStore();
  const navigate = useNavigate();

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
    data: comments = [],
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
    if (!user) {
      Swal.fire({
        title: "로그인 필요",
        text: "로그인한 사용자만 작성 가능합니다.",
        icon: "warning",
        confirmButtonText: "확인",
      }).then(() => navigate("/login"));
      return;
    }
    if (comment.trim() === "") {
      Swal.fire({
        title: "공백 오류",
        text: "공백은 입력할 수 없습니다.",
        icon: "warning",
        confirmButtonText: "확인",
      });
    } else {
      const currentDate = new Date().toLocaleString("ko-KR");
      addMutation.mutate({
        email: user.id,
        content: comment,
        date: currentDate,
      });
    }
  };

  const handleDelete = (id, email) => {
    if (user?.id !== email) {
      Swal.fire({
        title: "권한 오류",
        text: "작성자만 댓글을 삭제할 수 있습니다.",
        icon: "error",
        confirmButtonText: "확인",
      });
      return;
    }

    Swal.fire({
      title: "댓글 삭제",
      text: "이 댓글을 삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        removeMutation.mutate(id);
      }
    });
  };

  return (
    <>
      <div className="border-solid border-t-0 border-r-0 border-l-0 pb-12 border-2">
        <h4 className="font-extrabold text-3xl mb-8">회원리뷰</h4>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              className="w-[800px] min-h-[150px] bg-slate-200 rounded mx-auto pb-4 mb-8 relative"
              key={comment.id}
            >
              <div className="flex justify-between">
                <p className="font-bold text-left pl-4 pt-2 mb-4">
                  {comment.email}
                </p>
                <p className="text-xs pr-4 pt-2">{comment.date}</p>
              </div>
              <p className="text-left p-4">{comment.content}</p>
              <button
                onClick={() => handleDelete(comment.id, comment.email)}
                className="cursor-pointer w-[50px] h-[30px] bg-accent rounded absolute bottom-2 right-2"
              >
                삭제
              </button>
            </div>
          ))
        ) : (
          <p>리뷰가 없습니다.</p>
        )}
      </div>

      {/* 댓글 입력 폼 */}
      <form
        onSubmit={handleSubmit}
        className="mt-20 flex flex-col items-center justify-center rounded mb-12 "
      >
        <h4 className="font-extrabold text-3xl mb-8">한줄평</h4>
        <div className="w-[800px] min-h-[150px] flex justify-center relative">
          <textarea
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            placeholder="리뷰를 작성해주세요"
            className="w-[800px] min-h-[150px] text-white text-left p-4 bg-gray-500 px-4 placeholder:text-gray-200 rounded resize-none"
            rows="4"
          />
          <button
            type="submit"
            className="cursor-pointer w-[50px] h-[30px] rounded absolute bottom-2 right-2 bg-primary text-white right-0 font-bold"
          >
            등록
          </button>
        </div>
      </form>
    </>
  );
};

export default DetailComments;
