import { useParams } from "react-router-dom";
import MessageInput from "./MessageInput";

function ChatRoom() {
  const { roomName } = useParams();
  const mockMessages = [
    { sender: "User1", content: "Hello" },
    { sender: "User2", content: "Hi there!" },
  ];

  return (
    <div>
      <h1>Chat Room: {decodeURIComponent(roomName)}</h1>
      <div>
        {mockMessages.map((message, index) => (
          <p key={index}>
            <strong>{message.sender}:</strong> {message.content}
          </p>
        ))}
      </div>
      <MessageInput />
    </div>
  );
}

export default ChatRoom;
