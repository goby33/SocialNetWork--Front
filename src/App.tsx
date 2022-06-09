import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Friends from './pages/Friends';
import NotFound from './pages/NotFound';
import Header from './components/layout/Header';
import Container from 'react-bootstrap/Container';
import { useToken } from './services/Auth';

function App() {

  const { token } = useToken();

  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <main>
          <Container className="mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
          </Container>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
