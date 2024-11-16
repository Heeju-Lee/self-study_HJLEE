import axios from "axios";

// 부모 알림 목록 조회
export const fetcParentNotifications = async (memberNo, authorization) => {
  try {
    const response = await axios.get(`/notification/parent/${memberNo}`, {
      headers: {
        Authorization: authorization,
      },
    });
    console.log("알림목록 : ", response.data);

    return response.data;
  } catch (err) {
    console.log("알림 조회 에러", err);
  }
};
// 아이 알림 목록 조회
export const fetchChildNotifications = async (memberNo, authorization) => {
  try {
    const response = await axios.get(`/notification/child/${memberNo}`, {
      headers: {
        Authorization: authorization,
      },
    });
    console.log("알림목록 : ", response.data);
    return response.data;
  } catch (err) {
    console.log("알림 조회 에러", err);
    return []; // 기본값 반환
  }
};

// 아이에게 알림 전송
// 부모가 아이에게 알림 전송
// export const sendNotificationToParent = async () => {
//   const notificationData = {
//     parentNum: userInfo.memberNo, // 부모 ID
//     childNum: 1, // 아이 ID
//     message: "부모님의 한마디77",
//     category: "info",
//     senderType: "parent",
//   };
//   const response = await fetch("/notification/sendToChild", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `${userInfo.authorization}`,
//     },
//     body: JSON.stringify(notificationData),
//   });

//   if (response.ok) {
//     console.log("아이에게 알림 전송 성공!");
//   } else {
//     console.error("아이에게 알림 전송 실패!");
//   }
// };

// 알림 읽음으로 업데이트
export const updateRead = async (notiNum, authorization) => {
  try {
    await axios.patch(
      `http://localhost:9999/notification/${notiNum}/read`,
      null,
      {
        headers: {
          Authorization: authorization,
        },
      }
    );
    console.log("알림 읽음 완료");
  } catch (err) {
    console.log("알림 읽음 처리 에러 : ", err);
  }
};
