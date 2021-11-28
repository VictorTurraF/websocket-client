import InfoAlert from "./InfoAlert";

import { useState } from "react";

function ChatRoom({ room }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  function handleSendButtonClick(event) {
    event.stopPropagation();
    event.preventDefault();

    const newMessage = {
      description: message,
    };

    setMessages([...messages, newMessage]);
  }

  function handleMessageTyping(event) {
    event.stopPropagation();
    event.preventDefault();

    setMessage(event.target.value);
  }

  if (!room) {
    return <InfoAlert message="Selecione um contato ao lado para começar" />;
  }

  return (
    <div className="d-flex flex-column h-100">
      <div className="p-3 fs-5 fw-semibold border-bottom bg-white">
        {room.user.name}
      </div>
      <div className="message-board flex-grow-1 p-3">
        {messages.map((message, index) => (
          <div className="">{message.description}</div>
        ))}
      </div>
      <div className="bg-white border-top p-3">
        <form className="row g-2">
          <div className="col-10">
            <input
              type="text"
              className="form-control"
              placeholder="Digite sua mensagem"
              value={message}
              onChange={handleMessageTyping}
            />
          </div>
          <div className="col-2">
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={handleSendButtonClick}
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChatRoom;
