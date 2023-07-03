import { useSelector, useDispatch } from "react-redux";
import { BiRefresh } from "react-icons/bi";
import { FcEmptyTrash } from "react-icons/fc";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classes from "./list-of-email.module.css";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { listdataActions } from "../../Store/list-data";

function InboxEmails() {
  const history = useHistory();
  const [show, setShow] = useState(true);
  const inboxunreadEmails = useSelector((state) => state.listdata.inboxunread);
  const inboxreadEmials = useSelector((state) => state.listdata.inboxread);
  const userIsLoggedin = useSelector((state) => state.auth.isAuthenticated);
  const email = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();

  useEffect(() => {
    if (inboxunreadEmails.length === 0 && inboxreadEmials.length === 0) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [inboxunreadEmails.length, inboxreadEmials.length]);

  // if (userIsLoggedin) {
  //   window.onload = () => {
  //     fetch(
  //       `https://mail-box-client-ade18-default-rtdb.firebaseio.com/${email}/inbox.json`
  //     )
  //       .then((response) => {
  //         if (response.ok) {
  //           return response.json();
  //         } else {
  //           return response.json().then((data) => {
  //             throw new Error(data.error.message);
  //           });
  //         }
  //       })
  //       .then((data) => {
  //         if (data === null) {
  //           return;
  //         } else {
  //           const inboxArray = Object.values(data);
  //           const Emailsid = Object.keys(data);

  //           for (let i = 0; i < inboxArray.length; i++) {
  //             if (inboxArray[i].unread === true) {
  //               dispatch(
  //                 listdataActions.inboxunreadEmail({
  //                   mail: { ...inboxArray[i] },
  //                   id: Emailsid[i],
  //                 })
  //               );
  //             } else {
  //               dispatch(
  //                 listdataActions.inboxreadEmail({
  //                   mail: { ...inboxArray[i] },
  //                   id: Emailsid[i],
  //                 })
  //               );
  //             }
  //           }
  //         }
  //       })
  //       .catch((error) => {
  //         toast.error(error.message, {
  //           position: "top-right",
  //           autoClose: 3000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: false,
  //           pauseOnFocusLoss: false,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "dark",
  //         });
  //       });
  //   };
  // }

  if(userIsLoggedin){
    window.onload =() => {
      fetchData();
    }
  }

  const refreshPageHandler = () => {
    window.location.reload();
  };

  const deleteHandler = (mail) => {
    const id = mail.id;
    fetch(
      `https://mail-box-client-ade18-default-rtdb.firebaseio.com/${email}/inbox/${id}.json`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (response.ok) {
          toast.success("Email removed successfully!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            pauseOnFocusLoss: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          dispatch(listdataActions.inboxreadRemoveEmail({ id: id }));
          dispatch(listdataActions.inboxunreadremoveEmail({ id: id }));
          return response.json();
        } else {
          return response.json().then((data) => {
            throw new Error(data.error.message);
          });
        }
      })
      .then((data) => {
        console.log(data);
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
       })
      .then(
        fetch(
          `https://mail-box-client-ade18-default-rtdb.firebaseio.com/${email}/deletedEmails.json`,
          {
            method: "POST",
            body : JSON.stringify({
              userEmial: mail.userEmial,
              emailheWantstoSend: mail.emailheWantstoSend,
              title: mail.title,
              subject: mail.subject,
              unread : mail.unread,
              date : mail.date
            })
          }
        )
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              return response.json().then((data) => {
                throw new Error(data.error.message);
              });
            }
          })
          .then((data) => {
            console.log(data);
          }).catch((error) => {
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
          })
      )
  };

  const fetchData = async() =>{
    try{
      let response = await fetch(
        `https://mail-box-client-ade18-default-rtdb.firebaseio.com/${email}/inbox.json`
      )
  
      let data = await response.json();
  
      if(response.ok){
      }
      else{
        throw new Error(data.error.message);
      }

      if(data === null){
        return;
      }
      else{
        const inboxArray = Object.values(data);
        const Emailsid = Object.keys(data);

        for (let i = 0; i < inboxArray.length; i++) {
          if (inboxArray[i].unread === true) {
            dispatch(
              listdataActions.inboxunreadEmail({
                mail: { ...inboxArray[i] },
                id: Emailsid[i],
              })
            );
          } else {
            dispatch(
              listdataActions.inboxreadEmail({
                mail: { ...inboxArray[i] },
                id: Emailsid[i],
              })
            );
          }
        }
      }
    }catch(error){
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
    }finally{
      setTimeout(fetchData , 2000);
    }
  }




  const openFullEmailHandler = (mail) => {
    const replaceEmail = {
      userEmial: mail.userEmial,
      emailheWantstoSend: mail.emailheWantstoSend,
      title: mail.title,
      subject: mail.subject,
      unread: false,
      date: mail.date,
    };

    if (mail.unread === true) {
      fetch(
        `https://mail-box-client-ade18-default-rtdb.firebaseio.com/${email}/inbox/${mail.id}.json`,
        {
          method: "PUT",
          body: JSON.stringify(replaceEmail),
        }
      )
        .then((response) => {
          if (response.ok) {
            dispatch(listdataActions.inboxunreadremoveEmail({ id: mail.id }));
            dispatch(listdataActions.inboxreadEmail({ mail: {...mail, unread : false}, id : mail.id}));
            return response.json();
          } else {
            return response.json().then((data) => {
              throw new Error(data.error.message);
            });
          }
        })
        .then((data) => {
          console.log(data);
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
    }
    dispatch(listdataActions.addCurrEmail({ email: mail }));
    history.replace("/fullemail-page");
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
        {show ? (
          <p className={classes.empty}>your inbox is empty !</p>
        ) : (
          <ul className={classes.inboxList}>
            {inboxunreadEmails.map((mail) => (
              <li key={mail.id} className={classes.unreadLi}>
                <span className={classes.fromEmailText}>
                  <p>{mail.userEmial}</p>
                </span>
                <span className={classes.aboutEmailText}>
                  <p
                    onClick={() => openFullEmailHandler(mail)}
                    className={classes.textTitle}
                  >
                    {mail.title}
                  </p>
                </span>
                <Button
                  variant="outline-danger"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "30px",
                  }}
                  onClick={() => deleteHandler(mail)}
                >
                  <FcEmptyTrash />
                </Button>
              </li>
            ))}
          </ul>
        )}
        {
          <ul className={classes.inboxList}>
            {inboxreadEmials.map((mail) => (
              <li
                key={mail.id}
                className={classes.readEmail}
              >
                <span className={classes.readEmailFromText}>
                  <p>{mail.userEmial}</p>
                </span>
                <span className={classes.readEmailTitle}>
                  <p className={classes.textTitle} onClick={() => openFullEmailHandler(mail)}>{mail.title}</p>
                </span>
                <Button
                  variant="outline-danger"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "30px",
                  }}
                  onClick={() => deleteHandler(mail)}
                >
                  <FcEmptyTrash />
                </Button>
              </li>
            ))}
          </ul>
        }
      </div>
    </React.Fragment>
  );
}
export default InboxEmails;
