import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './components/layouts/Header';
import Navirouter from './Navirouter';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
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
