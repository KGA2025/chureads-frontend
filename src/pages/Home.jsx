import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import Nav from "../components/layout/Nav";
import FeedItem from "../components/FeedItem";
import { useNavigate } from "react-router-dom";
import { auth } from "./../firebase";
import useSSE from "../hooks/useSSE";

const Home = () => {
  // logic
  const history = useNavigate();
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const currentUser = auth.currentUser;
  const isLoggedIn = !!currentUser; // !!를 붙일 시 무조건 boolean형태로 바꿔줌

  const [feedList, setFeedList] = useState([]);

  // SSE 연결
  const { isConnected } = useSSE();

  const handleEdit = (data) => {
    history(`/edit/${data._id}`); // edit페이지로 이동
  };

  // DELETE /posts/:id - 특정 게시물 삭제
  const deletePost = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("게시물 삭제 실패:", error);
    }
  };

  const handleDelete = async (selectedItem) => {
    // TODO: 백엔드에 Delete 요청
    const result = await deletePost(selectedItem._id);
    console.log("🚀 ~ handleDelete ~ result:", result);

    // UI 업데이트
    const filterList = feedList.filter((item) => item._id !== selectedItem._id);
    setFeedList(filterList); // setFeedlist함수 통해서 feedList 변수 수정(useState)
  };

  const handleLike = (selectedId) => {
    console.log("🚀 ~ handleLike ~ selectedId:", selectedId);
  };

  const handleLogout = async () => {
    // 1. firebase 로그아웃
    if (isLoggedIn) {
      // 로그인 상태인 경우
      const ok = window.confirm("Are you sure logout?");
      ok && (await auth.signOut());
    }
    // 2. /login으로 이동
    history("/login");
  };

  useEffect(() => {
    // 페이지 진입시 딱 한번 실행
    // TODO: 백엔드에 Get 요청
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/posts`);
        if (!response.ok) {
          throw new Error(`HTTP error: status: ${response.status}`);
        }

        const result = await response.json();
        setFeedList(result);
        console.log("🚀 ~ fetchPosts ~ result:", result);
      } catch (error) {
        console.error("게시물 조회 실패:", error);
      }
    };
    fetchPosts();
  }, [API_BASE_URL]);

  useEffect(() => {
    // home페이지 진입 시, 로그인되지 않은 사용자는 바로 로그인 페이지로 이동
    !isLoggedIn && history("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // view
  return (
    <div className="h-full pt-20 pb-[74px] overflow-hidden">
      {/* START: 헤더 영역 */}
      <Header isLoggedIn={true} onClick={handleLogout} />
      {/* END: 헤더 영역 */}
      <main className="h-full overflow-auto">
        {/* TODO */}

        <div>
          {/* START: 피드 영역 */}
          <span className="block p-2 text-right text-sm">
            {isConnected ? "✅" : "❌"}
          </span>
          {feedList.length ? (
            <ul>
              {feedList.map((feed) => (
                <FeedItem
                  key={feed._id}
                  data={feed}
                  tags={feed.tags}
                  isAuthor={feed.userId === currentUser.uid}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  onLike={handleLike}
                />
              ))}
            </ul>
          ) : (
            <p>No Data</p>
          )}

          {/* END: 피드 영역 */}
        </div>
      </main>
      {/* START: 네비게이션 영역 */}
      <Nav />
      {/* END: 네비게이션 영역 */}
    </div>
  );
};

export default Home;
