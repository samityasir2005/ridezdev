import React, { useState } from "react";
import "../styles/SupportChat.css"; // We'll create this CSS file for styling
import image from "../assets/Rida/support-rida.png"; // We'll create this image file for the chat icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadset } from "@fortawesome/free-solid-svg-icons";

const SupportChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="support-chat">
      <button className="chat-toggle" onClick={toggleChat}>
        <FontAwesomeIcon icon={faHeadset} style={{ color: "#ffffff" }} />
      </button>
      <div className={`chat-window ${isOpen ? "open" : ""}`}>
        <h2>Chat with Rida the robot</h2>
        <div className="rida-image-container">
          <img src={image} alt="Rida" className="rida-image" />
        </div>
        {/* Add your chat interface here */}
        Coming soon ...
        <br></br>
        For now, please email us at: <strong>support@urid.ca</strong>
        <br></br>
        <br></br>
        <p>Powered by GPT 4</p>
      </div>
    </div>
  );
};

export default SupportChat;
