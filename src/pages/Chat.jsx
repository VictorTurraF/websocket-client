import { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../hooks/useAuth";
import Chat from "../components/ChatRoom";
import SideBar from "../components/SideBar";
import Spinner from "../components/Spinner";
import * as client from "../services/rooms";

function Dashboard() {
  const [rooms, setRooms] = useState([]);
  const [activeRoom, setActiveRoom] = useState();
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useAuth();

  function handleSideBarChange({ selected }) {
    setActiveRoom(selected);
  }

  const handleMessageReceived = useCallback(
    function (data) {
      setMessages([...messages, { description: data.description }]);
    },
    [messages]
  );

  useEffect(() => {
    async function requestRooms() {
      try {
        const { data } = await client.listAll();
        return data;
      } catch (error) {
        console.warn("Erro buscar salas disponível");
        console.warn(error);
        return null;
      }
    }

    async function fetchRooms() {
      const rooms = await requestRooms();
      if (!!rooms) {
        setRooms(rooms);
        setIsLoading(false);
      }
    }

    fetchRooms();
  }, []);

  useEffect(() => {
    const newSocket = io("http://localhost:3333");
    setSocket(newSocket);
  }, []);

  useEffect(() => {
    if (!!activeRoom) {
      console.log(activeRoom.room_name)
      socket.emit(
        "select_room",
        {
          user,
          contact: activeRoom.user,
          type: activeRoom.type,
          room_name: activeRoom.room_name
        },
        (response) => {
          setMessages(response.messages);
        }
      );
    }
  }, [activeRoom, socket]);

  if (isLoading) {
    return <Spinner className="mx-auto" />;
  }

  return (
    <div className="text-start d-flex h-100 w-100">
      <div className="border-end" style={{ maxWidth: "400px" }}>
        <SideBar
          onChange={handleSideBarChange}
          rooms={rooms}
          activeRoom={activeRoom}
        />
      </div>
      <div className="flex-grow-1">
        <Chat
          socket={socket}
          room={activeRoom}
          messages={messages}
          onMessageReceived={handleMessageReceived}
        />
      </div>
    </div>
  );
}

export default Dashboard;
