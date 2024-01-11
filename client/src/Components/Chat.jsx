import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import "./Chat.css"; 

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  // Function to handle sending a message
  const sendMessage = () => {
    if (inputMessage.trim() !== "") {
      setMessages([...messages, { text: inputMessage, sender: "user" }]);
      setInputMessage("");
      //logic here to send the user's message to the backend if needed
      // and get the AI's response
      // Example: sendToBackend(inputMessage)
      //            .then(response => setMessages([...messages, { text: response, sender: "ai" }]))
      //            .catch(error => console.error("Error sending message to backend", error));
    }
  };

  // Example: useEffect to simulate AI responses
  useEffect(() => {
    // Simulating AI response after 1 second
    const timeoutId = setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Hello! How can I assist you today?", sender: "ai" },
      ]);
    }, 1000);

    // Cleanup function to clear the timeout on component unmount or dependency change
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="chat-container">
      {/* <div className="chat-header">
        <Link to="/">Back to Home</Link>
      </div> */}
      <div className="messages-container">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;