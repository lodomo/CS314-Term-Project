import { Link } from "react-router-dom";

const mockChatRooms = ["Room 1", "Room 2", "Room 3"];

function ChatRoomList() {
  return (
    <div>
      <h1>Chat Rooms</h1>
      <ul>
        {mockChatRooms.map((room, index) => (
          <li key={index}>
            <Link to={`/chat/${encodeURIComponent(room)}`}>{room}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatRoomList;
