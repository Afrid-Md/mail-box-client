import { Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import classes from  "./left-span-in-deletePage.module.css";

function LeftSpan() {
  const lengthOfUnread = useSelector(
    (state) => state.listdata.inboxunread.length
  );

  const history = useHistory();
  const newEmailHandler = () => {
    history.replace("/send-email-page");
  };
  return (
    <div className={classes.leftInDelete}>
      <div className={classes.compose}>
        <Button
          style={{ fontFamily: "cursive", fontSize: "20px", width: "150px" }}
          onClick={newEmailHandler}
        >
          Compose
        </Button>
      </div>
      <div className={classes.items}>
        <span className={classes.inboxSpan}>
          <Link className={classes.inboxText} to='/home-page'>inbox</Link>
          <span className={classes.unreadText}>
            <p>unread({lengthOfUnread})</p>
          </span>
        </span>
        <Link className={classes.sentText} to='/sent-page'>sent</Link>
        <Link className={classes.deleteText} to='/delete-page'>deleted</Link>
      </div>
    </div>
  );
}
export default LeftSpan;
