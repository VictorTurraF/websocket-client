import cx from "classnames";

export default function ContactItem({
  contact: { fullName },
  isActive = false,
  onClick = () => {}
}) {
  return (
    <button
      className={cx("list-group-item list-group-item-action py-3 lh-tight", {
        active: isActive,
      })}
      aria-current="true"
      onClick={onClick}
    >
      <div className="d-flex w-100 align-items-center justify-content-between">
        <strong className="mb-1">{fullName}</strong>
        <small>Ontem</small>
      </div>
      <div className="col-10 mb-1 small">Lacus feugiat rutrum sollicitudin, aliquam molestie lorem dictum, nec elit.</div>
    </button>
  );
}
