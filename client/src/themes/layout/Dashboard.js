import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Link } from "react-router-dom";
// import io from "socket.io-client";
// import { socket } from "../../store/ini";

import { logoutUser } from "../../store/Users/actions";
import SettingsContainer from "../../store/Settings/components/SettingsContainer";
import Calendar from "../../root/Calendar";
import Projects from "../../root/Projects";
import Tasks from "../../root/Tasks";
import IncomingMails from "../../root/IncomingMails";
import MessagesAlertList from "../../store/Messages/components/MessagesAlertList";
import MailsListContainer from "../../store/Mails/components/MailsListContainer";

// import Preloader from "../../common/Preloader";
import { updateAlertMessages } from "../../store/Messages/actions";

class Dashboard extends Component {
  // constructor(props) {
  //   super(props);
  // const { updateAlertMessages, loggedUser } = this.props;

  // socket.on("chat", function (msg) {
  //   let users = msg.to.split(",");
  //   if (users.includes(loggedUser.name)) {
  //     if (msg.from !== loggedUser.name) {
  //       updateAlertMessages({ type: "messenger", data: msg });
  //     }
  //   }
  // });
  // }
  logoutUserHandler = async () => {
    const { logoutUser } = this.props;
    const reload = () => {
      window.location.href = "/";
    };
    await logoutUser();
    await reload();
  };
  render() {
    const { loggedUser } = this.props;

    return (
      <div className="dashboard-box">
        {/* <Preloader /> */}
        <MessagesAlertList />
        <div className="logged-user">
          Witaj:{" "}
          {loggedUser ? `${loggedUser.name} / ${loggedUser.status}` : null}
        </div>
        <Link className="btn btn-default" to="/projects">
          Lista spraw
        </Link>
        <Link className="btn btn-default" to="/tasks">
          Lista zadań
        </Link>
        <Link className="btn btn-default" to="/calendar">
          Kalendarz
        </Link>
        <Link className="btn btn-default" to="/incoming-mails">
          Poczta przychodząca
        </Link>
        {/* <Link className="btn btn-default" to="/mails">
          Poczta
        </Link> */}
        {loggedUser.status == "Administrator" && (
          <Link className="btn btn-default" to="/settings">
            Ustawienia
          </Link>
        )}
        <button className="btn btn-default" onClick={this.logoutUserHandler}>
          Logout
        </button>
        <div className="container">
          <Route exact path="/projects" component={Projects} />
          <Route exact path="/incoming-mails" component={IncomingMails} />
          <Route exact path="/tasks" component={Tasks} />
          {loggedUser.status == "Administrator" && (
            <Route exact path="/settings" component={SettingsContainer} />
          )}
          <Route exact path="/" component={Tasks} />
          <Route exact path="/mails" component={MailsListContainer} />
          <Route exact path="/calendar" component={Calendar} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.users.logged_user,
  };
};

export default connect(mapStateToProps, {
  logoutUser,
  updateAlertMessages,
})(Dashboard);
