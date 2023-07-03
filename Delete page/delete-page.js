import React from "react";
import NavBar from '../Home Page/Navbar in home/navbar';
import LeftSpan from "./Left span in delete page/left-span-in-deletePage";
import DeletedEmails from './List of email/list-of-email';
import classes from './delete-page.module.css';


function DeletePage() {
  return (
    <React.Fragment>
      <NavBar />
      <div className={classes.LeftSpaninhomebody}>
        <LeftSpan />
        <DeletedEmails/>
      </div>
    </React.Fragment>
  );
}
export default DeletePage;