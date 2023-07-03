import React from "react";
import NavBar from "../Home Page/Navbar in home/navbar";
import LeftSpan from "./Left span in sent page/left-span-in-sent-page";
import classes from './sent-email-page.module.css';
import SentEmails from "./List of email/list-of-email";


function SentEmailPage() {
  return (
    <React.Fragment>
      <NavBar />
      <div className={classes.LeftSpaninhomebody}>
        <LeftSpan />
        <SentEmails/>
      </div>
    </React.Fragment>
  );
}
export default SentEmailPage;
 