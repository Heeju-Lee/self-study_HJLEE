import { useEffect, useState } from "react";

export const useSSE = (url, onMessage) => {
  const [eventSource, setEventSource] = useState(null); // SSE 연결상태
  const [connectionError, setConnectionError] = useState(false); // 연결 에러 상태

  // SSE 연결
  useEffect(() => {
    if (!url) return;

    // if (eventSource) {
    //   console.log("[SSE] 이미 연결되었습니다.");
    // }
    let sse; //
    sse = new EventSource(url);

    const setupSSE = () => {
      console.log("[SSE] 연결시도 중..");
      setConnectionError(false); // 초기화

      sse.onopen = () => {
        console.log(`[SSE] 연결됨`);
      };
      sse.onmessage = (event) => {
        if (event.data !== "ping") {
          // ping 이벤트는 무시하거나 연결 상태를 확인할때 사용됨
          // console.log("[SSE] keep-alive ping ");
          console.log("[SSE] 받은 알림 데이터 : ", event.data);

          try {
            const data = JSON.parse(event.data); // 데이터 파싱
            onMessage && onMessage(data); // 메세지 핸들러 호출
          } catch (err) {
            console.error("에러 파싱 : ", err);
          }
        }
      };
      sse.onerror = (err) => {
        console.log("[SSE] 에러발생 : ", err);
        setConnectionError(true); // 에러 상태 설정
        sse.close(); //! 연결 종료
      };

      setEventSource(sse);
    };

    // 초기 연결 시도
    setupSSE();

    return () => {
      console.log("[SSE] Cleaning up connection...");
      if (sse) sse.close();

      setEventSource(null);
    };
  }, []);

  return { eventSource, connectionError };
};
