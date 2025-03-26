import { useState } from "react";
import axios from "axios";

const AIChatbot = () => {
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    if (message.trim()) {
      setChat((prev) => [...prev, `You: ${message}`]);
      const { data } = await axios.post("http://localhost:5000/api/chatbot/ask", { message });
      setChat((prev) => [...prev, `Bot: ${data.response}`]);
      setMessage("");
    }
  };

  return (
    <div className="fixed bottom-20 right-6 bg-purple-600 text-white p-4 rounded-lg shadow-lg w-80">
      <h3 className="font-semibold">Chatbot</h3>
      <div className="h-40 overflow-y-auto">
        {chat.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask me anything..."
        className="w-full p-2 text-black rounded mt-2"
      />
      <button onClick={sendMessage} className="bg-white text-purple-600 px-4 py-2 mt-2 rounded">
        Send
      </button>
    </div>
  );
};

export default AIChatbot;
