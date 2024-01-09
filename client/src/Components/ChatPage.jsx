import React, { useState } from "react";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { text: newMessage, sender: "user" }]);
      setNewMessage("");
    }
  };

  return (
    <div>
        {/* <p>this will be the chat page</p> */}
      <h2>Chat Room</h2>
      <div className="chat-container">
        <div className="messages">
          {messages.map((message, index) => (
            <div key={index} className={message.sender === "user" ? "user-message" : "other-message"}>
              {message.text}
            </div>
          ))}
        </div>
        <div className="message-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
