import { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const AdminChat = () => {
  const [chats, setChats] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    axios.get("/api/chat").then((res) => setChats(res.data));

    socket.on("receiveMessage", (message) => {
      if (message.userId === selectedUser) {
        setMessages((prev) => [...prev, message]);
      }
    });

    socket.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("onlineUsers");
    };
  }, [selectedUser]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const messageData = { userId: selectedUser, message: newMessage, sender: "admin" };
      socket.emit("sendMessage", messageData);
      setNewMessage("");
    }
  };

  const smartReplies = [
    "Your order is on the way! 🚚",
    "You can return your item within 7 days.",
    "Payment options include UPI, Card, and COD.",
    "We offer free shipping on orders above ₹500.",
    "You can cancel your order from 'My Orders'.",
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold">Admin Live Chat</h2>
      <div className="grid grid-cols-4 gap-4">
        
        {/* Sidebar - User List */}
        <div className="border p-4">
          <h3 className="font-semibold mb-2">Users</h3>
          {chats.map((chat) => (
            <div
              key={chat.userId}
              className={`p-2 cursor-pointer rounded ${
                selectedUser === chat.userId ? "bg-purple-300" : "bg-gray-100"
              }`}
              onClick={() => setSelectedUser(chat.userId)}
            >
              <span className="font-medium">User {chat.userId}</span>
              {onlineUsers.includes(chat.userId) && <span className="text-green-500 ml-2">● Online</span>}
            </div>
          ))}
        </div>

        {/* Chat Section */}
        <div className="col-span-3 border p-4 flex flex-col h-[500px]">
          <h3 className="font-semibold mb-2">Chat with User {selectedUser}</h3>
          
          {/* Messages */}
          <div className="h-[350px] overflow-y-auto border p-3 rounded">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-2 ${msg.sender === "admin" ? "text-right" : "text-left"}`}>
                <p className="inline-block bg-gray-200 p-2 rounded shadow">
                  {msg.message}
                </p>
                <p className="text-xs text-gray-500">{new Date(msg.createdAt).toLocaleTimeString()}</p>
              </div>
            ))}
          </div>

          {/* Smart Replies */}
          <div className="flex gap-2 mt-2">
            {smartReplies.map((reply, idx) => (
              <button
                key={idx}
                onClick={() => setNewMessage(reply)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                {reply}
              </button>
            ))}
          </div>

          {/* Input & Send Button */}
          <div className="mt-2 flex">
            <input
              type="text"
              className="border p-2 w-full rounded"
              placeholder="Type a reply..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={sendMessage} className="bg-purple-600 text-white px-4 py-2 rounded ml-2">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminChat;
