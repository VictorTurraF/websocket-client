import InfoAlert from "./InfoAlert";

import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

function ChatRoom({ socket, room, messages, onMessageSent }) {
  const [message, setMessage] = useState("");

  const { user } = useAuth();

  function handleSendButtonClick(event) {
    event.stopPropagation();
    event.preventDefault();

    console.log(room);
    console.log(message);

    const newMessage = {
      description: message,
    };

    socket.emit("message", {
      author_nickname: user.nickname,
      room_name: `${user.nickname}_${room.user.nickname}`,
      description: message,
    });

    onMessageSent({ message, event })
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
          <div key={index} className="">{message.description}</div>
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
