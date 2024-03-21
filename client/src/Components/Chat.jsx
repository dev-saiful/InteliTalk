import { useState, useEffect } from "react";
import { LiaRobotSolid } from "react-icons/lia";
import { SlUser } from "react-icons/sl";
import axios from "axios";
import './Chat.css';

const API_URL = "http://localhost:5001/api/v1";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchAnswerFromBackend = async (userQuestion) => {
    setIsLoading(true); // Set loading state to true
    try {
      const response = await axios.get(`${API_URL}/guest`, {
        params: {
          question: encodeURIComponent(userQuestion)
        }
      });

      if (response.status === 200) {
        const aiMessage = { text: response.data.ans.text, sender: "ai" };
        setMessages(prevMessages => [...prevMessages, aiMessage]);
      } else {
        console.log("Error fetching data:", error);
      }
    } catch (error) {
      console.error('Something went wrong !!!')
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() !== "") {
      const userMessage = { text: inputMessage, sender: "user" };
      setMessages([...messages, userMessage]);
      await fetchAnswerFromBackend(inputMessage);
      setInputMessage("");
    }
  };

    //Function for the Enter button
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {
    // Simulating AI response after 1 second
    const timeoutId = setTimeout(() => {
      const aiMessage = { text: "Hello! How can I assist you today?", sender: "ai" };
      setMessages(prevMessages => [...prevMessages, aiMessage]);
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
            {message.sender === "ai" && (              
              <div className="ai-message-content">
                <LiaRobotSolid className="bot-icon" />
                <div className="bot-text">{message.text}</div>
              </div>
            )}
            {message.sender === "user" && (
              <div className="user-message-content">
               
                <div className="user-text">{message.text}</div>
                <SlUser className="user-icon" />
              </div>
            )}
          </div>
        ))}

        {/* Loading animation */}
        {isLoading && <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>}
      </div>
      <div className="input-container">
        <input
          name="question"
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter your question"
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
