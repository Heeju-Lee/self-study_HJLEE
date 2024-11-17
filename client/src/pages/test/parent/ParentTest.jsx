import React, { useEffect, useState } from "react";
// import { useAuth } from "./AuthContext";
import axios from "axios"; // Axios 추가

/**
 *  SSE 연결
    클라이언트는 /subscribe/{id}를 호출하여 서버와 SSE 연결을 설정
    서버는 SseEmitter를 생성하고 저장하여 클라이언트와 실시간 통신을 유지
    부모나 아이가 /sendToChild 또는 /sendToParent를 호출하여 알림을 보냄
    서버는 알림 데이터를 저장하고, SseEmitter를 통해 해당 클라이언트에게 알림을 실시간으로 전송
 */
/**
 * 부모 TEST 페이지
 */
export default function ParentTest() {
  // const { authState, logout } = useAuth();
  const [eventSource, setEventSource] = useState(null); // SSE 연결상태
  const [notifications, setNotifications] = useState([]); // 알림 목록 상태

  // 로그인 유저정보
  const userInfo = {
    memberNo: localStorage.getItem("memberNo"),
    role: localStorage.getItem("role"),
    name: localStorage.getItem("name"),
    authorization: localStorage.getItem("Authorization"),
  };
  // TODO 부모찾기
  // http://localhost:9999/children/signup/findMyParent
  const findParent = async () => {
    // const response = await fetch(
    //   `/children/signup/findMyParent`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify()
    //   } )
    // }
  };

  // 기존 알림 목록 가져옴
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9999/notification/parent/${userInfo.memberNo}`,
        {
          headers: {
            Authorization: `${userInfo.authorization}`,
          },
        }
      );
      console.log("기존 알림 목록 : ", response.data);

      setNotifications(response.data); // 기존 알림 목록을 상태에 저장
    } catch (error) {
      console.error("알림 조회 에러", error);
    }
  };

  // 알림 읽음 상태 업데이트
  const updateRead = async (notiNum) => {
    try {
      await axios.patch(
        `http://localhost:9999/notification/${notiNum}/read`,
        null,
        {
          headers: {
            Authorization: `${userInfo.authorization}`,
          },
        }
      );
      console.log("알림 읽음 완료");
      fetchNotifications(); // 알림 목록 갱신
    } catch (err) {
      console.log("알림 읽음 처리 에러 : ", err);
    }
  };

  // 부모가 아이에게 알림 전송
  const sendNotificationToParent = async () => {
    const notificationData = {
      parentNum: userInfo.memberNo, // 부모 ID
      childNum: 1, // 아이 ID
      message: "다음달에는 용돈 아껴쓰자~~",
      category: "info",
      senderType: "parent",
    };
    const response = await fetch("/notification/sendToChild", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${userInfo.authorization}`,
      },
      body: JSON.stringify(notificationData),
    });

    if (response.ok) {
      console.log("아이에게 알림 전송 성공!");
    } else {
      console.error("아이에게 알림 전송 실패!");
    }
  };

  // SSE 연결
  useEffect(() => {
    // fetchNotifications();
    if (!userInfo.memberNo) {
      console.warn("memberNo가 유효하지 않습니다.");
      return;
    }

    if (eventSource) {
      console.log("[SSE] 이미 연결되었습니다.");
      return;
    }

    const sse = new EventSource(
      `http://localhost:9999/notification/subscribe/${userInfo.memberNo}`
    );

    sse.onopen = () => {
      console.log(`[SSE] ${userInfo.role}로서 연결됨`);
    };

    sse.onmessage = (event) => {
      if (event.data === "ping") {
        // 'ping' 이벤트는 무시하거나 연결 상태를 확인하는 데 사용
        console.log("[SSE] Keep-alive ping received");
      } else {
        console.log("[SSE] 받은 알림데이터:", event.data);

        try {
          const notification = JSON.parse(event.data);

          // 더미데이터는 수신시 알림 상태 변경하지않음
          if (notification.notiNum === -1) {
            return;
          }

          // 알림 목록 업데이트
          setNotifications((prevNotifications) => [
            notification,
            ...prevNotifications,
          ]);
        } catch (error) {
          console.error("Error parsing message:", error);
        }
      }
    };

    sse.onerror = (err) => {
      console.error("[SSE] Error occurred: ", err);
    };

    setEventSource(sse);

    return () => {
      console.log("[SSE] Cleaning up connection...");
      sse.close();
      setEventSource(null); //추가
      console.log("[SSE] Connection closed.");
    };
  }, [userInfo.memberNo]);

  // 컴포넌트 최초 렌더링시 기존 알림 가져오기;
  useEffect(() => {
    fetchNotifications();
  }, []);

  // 알림 목록 변경시 로그 출력
  useEffect(() => {
    console.log("알림 목록 변경됨:", notifications);
  }, [notifications]);

  return (
    <>
      <div>알림 테스트 - 부모페이지</div>
      <button onClick={sendNotificationToParent}>아이에게 알림 전송하기</button>
      <br />
      <p>아이로부터 도착한 알림 목록 </p>
      {notifications.some((notification) => !notification.isRead) && (
        <p style={{ color: "red" }}>새로운 알림이 있습니다!!</p>
      )}

      <br />
      <br />
      <ul>
        {notifications.map((notification, index) => (
          <li key={index} onClick={() => updateRead(notification.notiNum)}>
            {notification.message} - {notification.category}
            {notification.isRead ? "(읽음)" : "(새 알림)"}
          </li>
        ))}
      </ul>
    </>
  );
}
