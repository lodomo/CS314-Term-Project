import React, { useEffect, useState } from "react";
import axios from "axios";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const getChats = async () => {
    const { data } = await axios.get("/api/chat");
    setChats(data);
  };

  useEffect(() => {
    getChats();
  }, []);

  return (
    <div>
      {chats.map((val) => (
        <div>{val.chatName}</div>
      ))}
    </div>
  );
};

export default Chats;
