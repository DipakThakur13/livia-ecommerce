import { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000");

const LiveChat = ({ userId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    axios.get(`/api/chat/${userId}`).then((res) => setMessages(res.data));

    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => socket.off("receiveMessage");
  }, [userId]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const messageData = { userId, message: newMessage, sender: "user" };
      socket.emit("sendMessage", messageData);
      setNewMessage("");
    }
  };

  return (
    <div className="fixed bottom-5 right-5 bg-white p-4 shadow-lg rounded">
      <h3 className="font-semibold">💬 Live Chat</h3>
      <div className="h-40 overflow-y-auto border p-2">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === "user" ? "text-right" : "text-left"}>
            <p className="bg-gray-200 p-2 rounded">{msg.message}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        className="border p-2 w-full mt-2"
        placeholder="Type a message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={sendMessage} className="bg-purple-600 text-white px-4 py-1 rounded mt-2">
        Send
      </button>
    </div>
  );
};

export default LiveChat;
