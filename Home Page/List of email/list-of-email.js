import { useSelector, useDispatch } from "react-redux";
import { BiRefresh } from "react-icons/bi";
import { FcEmptyTrash } from "react-icons/fc";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classes from "./list-of-email.module.css";
import React from "react";
import { listdataActions } from "../../Store/list-data";

function InboxEmails() {
  const inboxEmails = useSelector((state) => state.listdata.inbox);
  const userIsLoggedin = useSelector((state) => state.auth.isAuthenticated);
  const email = useSelector((state) => state.auth.email);
  const dispatch= useDispatch();

  if (userIsLoggedin) {
    window.onload = () => {
      fetch(
        `https://mail-box-client-ade18-default-rtdb.firebaseio.com/${email}/inbox.json`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            return response.json().then((data) => {
              throw new Error(data.error.message);
            });
          }
        }).then((data)=>{
          const inboxArray = Object.values(data);
          const Emailsid = Object.keys(data);
  
          for (let i = 0; i < inboxArray.length; i++) {
            dispatch(
              listdataActions.inboxEmail({
                mail: { ...inboxArray[i] },
                id: Emailsid[i],
              })
            );
          }
          console.log(inboxArray);
        })
        .catch((error) => {
          toast.error(error.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            pauseOnFocusLoss: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        });
    };
  }

  const refreshPageHandler = () => {
    window.location.reload();
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <div className={classes.emailsSpan}>
        <span className={classes.refreshbuttonspan}>
          <Button
            variant="warning"
            onClick={refreshPageHandler}
            style={{ marginRight: "10px" }}
          >
            <BiRefresh style={{ fontSize: "40px" }} />
          </Button>
        </span>
        <ul className={classes.inboxList}>
          {inboxEmails.map((mail) => 
          (
            <li className={classes.email} key={mail.id}>
              <span className={classes.emailspan}>
                <p>{mail.userEmial}</p>
              </span>
              <span className={classes.titleSpan}>
                <p className={classes.about}>{mail.title}</p>
              </span>
              <Button
                variant="outline-danger"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FcEmptyTrash />
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
}
export default InboxEmails;
