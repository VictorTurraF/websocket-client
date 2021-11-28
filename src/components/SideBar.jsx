import ContactItem from "./ContactItem";

export default function SideBar({
  rooms = [],
  activeRoom = { index: 0 },
  onChange = () => {},
}) {
  function handleRoomClick({ event, room }) {
    onChange({ event, selected: room });
  }

  return (
    <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white h-100">
      <a
        href="/"
        className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom"
      >
        <svg className="bi me-2" width="30" height="24">
          <use xlinkHref={"#bootstrap"}></use>
        </svg>
        <span className="fs-5 fw-semibold">Contatos</span>
      </a>
      <div className="list-group list-group-flush border-bottom scrollarea">
        {rooms.map((room, index) => (
          <ContactItem
            key={index}
            contactName={room.user.name}
            isActive={index === activeRoom.index}
            onClick={(event) => handleRoomClick({ event, room })}
          />
        ))}
      </div>
    </div>
  );
}
