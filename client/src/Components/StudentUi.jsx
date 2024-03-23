import { useState, useEffect } from "react";
import { LiaRobotSolid } from "react-icons/lia";
import { SlUser } from "react-icons/sl";
import axios from "axios";
import './Student.css'

const API_URL = "http://localhost:5001/api/v1";

const Student = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Retrieve token when needed
  const getToken = () => localStorage.getItem('token');

  const fetchAnswerFromBackend = async (userQuestion) => {
    setIsLoading(true); // Set loading state to true
    const token = getToken();    
  
    try {
      const response = await axios.get(`${API_URL}/student`, {
        params: {
          question: encodeURIComponent(userQuestion)
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      if (response.status === 200) {
        const aiMessage = { text: response.data.ans.text, sender: "ai" };
        setMessages(prevMessages => [...prevMessages, aiMessage]);
      } else {
        console.log("Error fetching data:", response.status);
        // Display error message to the user
        // Example: setMessages(prevMessages => [...prevMessages, { text: "Error fetching data", sender: "ai" }]);
      }
    } catch (error) {
      console.log('Something went wrong:', error); // Log the error message
      // Display error message to the user
      // Example: setMessages(prevMessages => [...prevMessages, { text: "Something went wrong", sender: "ai" }]);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  const handleSendMessage = async () => {
    const token = getToken();
    if (inputMessage.trim() !== "") {
      const userMessage = { text: inputMessage, sender: "user" };
      setMessages([...messages, userMessage]);
      await fetchAnswerFromBackend(inputMessage, token); // Pass token as an argument
      setInputMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const aiMessage = { text: "Hello! How can I assist you today?", sender: "ai" };
      setMessages(prevMessages => [...prevMessages, aiMessage]);
    }, 1000);

    return () => clearTimeout(timeoutId);
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

export default Student;
