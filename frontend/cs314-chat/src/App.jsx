import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import ChatRoomList from "./components/ChatRoomList";
import ChatRoom from "./components/ChatRoom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<ChatRoomList />} />
        <Route path="/chat/:roomName" element={<ChatRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
