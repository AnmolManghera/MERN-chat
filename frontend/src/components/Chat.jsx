import React, { useEffect, useState } from "react";
import axios from "axios";
import { CloudCog } from "lucide-react";

function Chat() {
    const [chats,setChats] = useState([]);
  const fetchChats = async () => {
    const {data}= await axios.get("/api/chat");
    setChats(data);
    
  };
  useEffect(() => {
    fetchChats();
    
  }, []);

  return <div>
    {chats.map((chat)=>(
        <p key = {chat.id}>{chat.userId}</p>
    ))}
  </div>
}

export default Chat;
