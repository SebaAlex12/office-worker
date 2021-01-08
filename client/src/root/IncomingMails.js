import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../hoc/Auxiliary";
import TopNavigatorToolbar from "./TopNavigatorToolbar";
import { fetchIncomingMails } from "../store/IncomingMails/actions";
import IncomingMailsListContainer from "../store/IncomingMails/components/IncomingMailsListContainer";

class IncomingMails extends Component {
  constructor(props) {
    super(props);
    const {
      loggedUser: { status },
      fetchIncomingMails,
    } = this.props;
    switch (status) {
      case "Administrator":
        fetchIncomingMails();
        break;
      case "Menedżer":
        fetchIncomingMails();
        break;
      default:
        break;
    }
  }
  render() {
    const { incomingMails } = this.props;
    const incomingMailsContent =
      incomingMails.length > 0 ? <IncomingMailsListContainer /> : null;
    return (
      <Aux>
        <TopNavigatorToolbar
          visibleButtons={{
            IncomingMailAddFormButton: true,
            UserRegistryFormButton: true,
          }}
        />
        {incomingMailsContent}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.users.logged_user,
    incomingMails: state.incomingMails.incomingMails,
  };
};

export default connect(mapStateToProps, {
  fetchIncomingMails,
})(IncomingMails);
