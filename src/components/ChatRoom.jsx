import InfoAlert from "./InfoAlert";

import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import cx from 'classnames';
import dayjs from 'dayjs';

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
      onMessageReceived({ message: data });
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
          <div key={index} className="d-flex my-2">
            <div className={cx("px-3 py-1 rounded", {
              "bg-primary text-light ms-auto": message.author_nickname === user.nickname,
              "bg-white text-dark ml-auto": message.author_nickname !== user.nickname,
            })}>
              {message.description}
              <span className="ms-2" style={{ fontSize: '.7rem' }}>{dayjs(message.created_at).format('HH:mm')}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white border-top p-3">
        <form className="row g-2" onSubmit={handleMessageSubmit}>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Digite sua mensagem"
              value={message}
              onChange={handleMessageTyping}
            />
          </div>
          <div className="col-4 col-md-2">
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
