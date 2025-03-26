import { useState } from "react";
import axios from "axios";

const Chatbot = ({ userId }) => {
  const [messages, setMessages] = useState([{ text: "Hello! How can I help you today? 😊", sender: "bot" }]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);

    try {
      const { data } = await axios.post("/api/chatbot", { userId, message: input });
      setMessages([...newMessages, { text: data.reply, sender: "bot" }]);
    } catch (error) {
      setMessages([...newMessages, { text: "Sorry, I couldn't process that request.", sender: "bot" }]);
    }

    setInput("");
  };

  return (
    <div className="fixed bottom-5 left-5 bg-white p-4 shadow-lg rounded w-64">
      <h3 className="font-semibold">🤖 AI Chatbot</h3>
      <div className="h-40 overflow-y-auto border p-2">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === "user" ? "text-right" : "text-left"}>
            <p className="bg-gray-200 p-2 rounded">{msg.text}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        className="border p-2 w-full mt-2"
        placeholder="Ask me anything..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={sendMessage} className="bg-purple-600 text-white px-4 py-1 rounded mt-2">
        Send
      </button>
    </div>
  );
};

export default Chatbot;
