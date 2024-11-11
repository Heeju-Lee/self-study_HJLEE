import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Header from "./components/layouts/Header";
import Navirouter from "./Navirouter";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  // 역할과 사용자 ID (role : ROLE_PARENT , ROLE_CHILD)
  // 로그인 정보가 없으면 로그인 페이지로 이동

  return (
    <div className="App">
      <BrowserRouter>
        <Container>
          <Header />
          <Navirouter />
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
