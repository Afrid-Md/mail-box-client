import { Button, NavLink } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import "./home-body-left-span.css";

function LeftSpan() {
  const history = useHistory();
  const newEmailHandler = () => {
    history.replace("/send-email-page");
  };
  return (
    <div className="left">
      <div className="compose">
        <Button
          style={{ fontFamily: "cursive", fontSize: "20px", width: "150px" }}
          onClick={newEmailHandler}
        >
          Compose
        </Button>
      </div>
      <div className="items">
        <Link to="/home-page" className="inboxLink">
          inbox
        </Link>
        <Link className="link" to='/sent-email-page'>Sent</Link>
        <Link className="link" to='/deleted-email-page'>Deleted</Link>
      </div>
    </div>
  );
}
export default LeftSpan;
