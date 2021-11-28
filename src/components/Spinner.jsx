import cx from 'classnames'

function Spinner({ className = "" }) {
  return (
    <div className={cx("spinner-border", className)} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}

export default Spinner;
