import ContactItem from "./ContactItem";

export default function SideBar({
  contacts = [],
  activeChat = { index: 0 },
  onChange = () => {},
}) {
  function handleContactClick({ event, contact }) {
    onChange({ event, selected: contact });
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
        {contacts.map((contact, index) => (
          <ContactItem
            key={index}
            contact={contact}
            isActive={index === activeChat.index}
            onClick={(event) => handleContactClick({ event, contact })}
          />
        ))}
      </div>
    </div>
  );
}
