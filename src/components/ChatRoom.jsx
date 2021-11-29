import InfoAlert from "./InfoAlert";

import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

function ChatRoom({
  socket,
  room,
  messages,
  onMessageSent = () => {},
  onMessageReceived = () => {},
}) {
  const [message, setMessage] = useState("");

  const { user } = useAuth();

  function handleMessageSubmit(event) {
    event.stopPropagation();
    event.preventDefault();
    setMessage("");

    socket.emit("message", {
      author_nickname: user.nickname,
      room_name: room.room_name,
      description: message,
    });

    onMessageSent({ message, event });
  }

  function handleMessageTyping(event) {
    event.stopPropagation();
    event.preventDefault();

    setMessage(event.target.value);
  }

  useEffect(() => {
    socket.on("message", (data) => {
      onMessageReceived({
        description: data.description,
        room: data.room,
        socket: socket.id,
      });
    });
  }, [socket, onMessageReceived]);

  if (!room) {
    return <InfoAlert message="Selecione um contato ao lado para começar" />;
  }

  return (
    <div className="d-flex flex-column h-100">
      <div className="p-3 fs-5 fw-semibold border-bottom bg-white">
        {room.user.full_name}{" "}
        <small className="text-muted fs-6">{`@${room.user.nickname}`}</small>
      </div>
      <div className="message-board flex-grow-1 p-3">
        {messages.map((message, index) => (
          <div key={index} className="">
            {message.description}
          </div>
        ))}
      </div>
      <div className="bg-white border-top p-3">
        <form className="row g-2" onSubmit={handleMessageSubmit}>
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
            <button type="submit" className="btn btn-primary w-100">
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChatRoom;
