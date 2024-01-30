import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5001/api/v1";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const fetchAnswerFromBackend = async (userQuestion) => {
    try {
      const response = await axios.get(`${API_URL}/guest`, {
        params: {
          question: encodeURIComponent(userQuestion)
        }
      });

      console.log(response);

      if(response.status === 200){
        console.log(response.data.ans.text)
      }else{
        console.log("Error fetching data:", error);
      }
    } catch (error) {
      console.error('Something went wrong !!!')
      return { error: "Error fetching data" };
    }
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() !== "") {
      const userMessage = { text: inputMessage, sender: "user" };
      setMessages([...messages, userMessage]);
      console.log(inputMessage);
      // Fetch answer from the backend
      const response = await fetchAnswerFromBackend(inputMessage);
      console.log(response)
      setInputMessage("");
    }
  };

  useEffect(() => {
    // Simulating AI response after 1 second
    const timeoutId = setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Hello!!! How can I assist you today?", sender: "ai" },
      ]);
    }, 1000);

    // Cleanup function to clear the timeout on component unmount or dependency change
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          name="question"
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Enter your question"
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
