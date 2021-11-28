import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Chat from "../components/Chat";
import SideBar from "../components/SideBar";

function Dashboard() {
  const availableChats = [
    {
      id: "eb10822d-5e17-44d4-8b1a-da3ee709d77f",
      first_name: "Amanda",
      last_name: "Turra",
      cpf: "12304931802",
      phone: "14997774244",
      birth_date: "2002-01-26T00:00:00.000Z",
      biography: null,
      info: null,
      graduation: null,
      job: null,
      created_at: "2021-10-13T00:37:57.345Z",
      updated_at: "2021-10-13T00:37:57.345Z",
    },
    
    {
      id: "74537778-eb2b-431e-90c3-e348c9a45c5e",
      first_name: "Gabriel",
      last_name: "Turra",
      cpf: "12304931802",
      phone: "14997774244",
      birth_date: "2008-05-12T00:00:00.000Z",
      biography: null,
      info: null,
      graduation: null,
      job: null,
      created_at: "2021-10-13T00:48:36.705Z",
      updated_at: "2021-10-13T00:48:36.705Z",
    },
  ];

  const contacts = availableChats.map((user) => ({
    ...user,
    fullName: `${user.first_name} ${user.last_name}`,
  }));

  const [socket, setSocket] = useState();
  const [activeChat, setActiveChat] = useState({
    index: 0,
    userId: availableChats[0].id,
    user: availableChats[0],
  });

  useEffect(() => {
    const newSocket = io("http://localhost:3333");
    setSocket(newSocket);
  }, []);

  useEffect(() => {
    
  }, [activeChat]);

  function handleSideBarChange({ selected }) {
    console.log(selected);
    setActiveChat({
      index: availableChats.findIndex((user) => user.id === selected.id),
      userId: selected.id,
      user: selected,
    });
  }

  return (
    <div className="text-start d-flex h-100 w-100">
      <div className="border-end" style={{ maxWidth: "400px" }}>
        <SideBar
          onChange={handleSideBarChange}
          contacts={contacts}
          activeChat={activeChat}
        />
      </div>
      <div className="flex-grow-1">
        <Chat contact={activeChat} />
      </div>
    </div>
  );
}

export default Dashboard;
