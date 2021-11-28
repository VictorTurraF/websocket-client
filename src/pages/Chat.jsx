import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Chat from "../components/Chat";
import SideBar from "../components/SideBar";
import Spinner from '../components/Spinner';
import * as client from "../services/rooms";

function Dashboard() {
  const [activeRoom, setActiveRoom] = useState();
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  function handleSideBarChange({ selected }) {
    setActiveRoom(selected);
  }

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
        setIsLoading(false)
      }
    }

    fetchRooms();
  }, []);

  if (isLoading) {
    return <Spinner className="mx-auto" />
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
        <Chat room={activeRoom} />
      </div>
    </div>
  );
}

export default Dashboard;
