import React, { useState } from "react";
import NavBar from "./Navbar in home/navbar";
import LeftSpan from "./Home body left span/home-body-left-span";
import InboxEmails from "./List of email/list-of-email";
import classes from "./home-page.module.css";

function HomePage() {
  return (
    <React.Fragment>
      <NavBar />
      <div className={classes.LeftSpaninhomebody}>
        <LeftSpan />
        <InboxEmails />
      </div>
    </React.Fragment>
  );
}
export default HomePage;
