import React, { useState, useEffect } from 'react';
import axios from "axios";
import styled from 'styled-components';

const EduVideo = () => {
  const token = localStorage.getItem("Authorization");
  const [videoList, setVideoList] = useState(null);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:9999/edu",
    //일일 한도가 있기 때문에 확인하고 싶을 때 주석 해제하기
      // headers: {
      //   Authorization: `${token}`,
      // },
    })
    .then((res) => {
      console.log(res.data);
      setVideoList(res.data);
    })
    .catch((err) => {
      alert("유튜브 불러오기 실패");
    });
  }, []); // 컴포넌트가 처음 렌더링될 때 한 번만 실행

  // videoList가 아직 없으면 로딩 상태 표시
  if (!videoList) {
    return <div>Loading...</div>;
  }

  // HTML 엔티티 디코딩 함수
  const decodeHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.documentElement.textContent || doc.body.textContent;
  };

  return (
    <Container>
      <PageTitle>🎥 경제 교육 비디오 </PageTitle>

      {/* 첫 번째 영상 크게 */}
      <MainVideoWrapper>
        <iframe
          src={`https://www.youtube.com/embed/${videoList[0].videoId}`}
          title={decodeHtml(videoList[0].title)}
          width="100%"
          height="500"
          frameBorder="0"
          allowFullScreen
        />
        <VideoDescription>{decodeHtml(videoList[0].description)} 🤓</VideoDescription>

        <Character>
          <img src="images/donny2.png" alt="연필 든 캐릭터" />
        </Character>
      </MainVideoWrapper>

      {/* 나머지 영상들은 3열 그리드 */}
      <VideoGrid>
        {videoList.slice(1).map((video, index) => (
          <VideoCard key={index}>
            <iframe
              src={`https://www.youtube.com/embed/${video.videoId}`}
              title={decodeHtml(video.title)}
              width="100%"
              height="200"
              frameBorder="0"
              allowFullScreen
            />
            <VideoDescription>{decodeHtml(video.description)} 🌟</VideoDescription>
          </VideoCard>
        ))}
      </VideoGrid>
    </Container>
  );
};

export default EduVideo;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100%;
  margin: 0;
`;

const PageTitle = styled.h1`
  font-size: 36px;
  font-weight: bold;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
`;

const MainVideoWrapper = styled.div`
  position: relative;
  margin-bottom: 30px;
  background-color: #2d7f76;  // 청록색 배경
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 900px;
`;

const Title = styled.h2`
  position: absolute;
  top: 20px;
  left: 20px;
  color: white;
  font-size: 28px;
  font-weight: bold;
`;

const VideoDescription = styled.p`
  color: white;
  font-size: 16px;
  margin-top: 10px;
  padding: 10px;
  background-color: #8B5E3C;  // 칠판 나무색 배경
  border-radius: 5px;
  text-align: center;
  font-weight: normal;
`;

const Character = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 300px;
  height: 300px;

  img {
    width: 100%;
    height: 100%;
  }

  animation: moveCharacter 5s infinite alternate;

  @keyframes moveCharacter {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(15px);
    }
  }
`;

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
  max-width: 900px;
  padding: 40px 0px;
`;

const VideoCard = styled.div`
  background-color: #2d7f76;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

// const VideoTitle = styled.p`
//   color: white;
//   text-align: center;
//   padding: 10px;
//   background-color: #444;
//   font-size: 16px;
//   margin: 0;
//   font-weight: bold;
// `;
