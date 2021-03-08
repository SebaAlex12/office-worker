import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../hoc/Auxiliary";
import TopNavigatorToolbar from "./TopNavigatorToolbar";
import { fetchOutgoingMails } from "../store/OutgoingMails/actions";
import OutgoingMailsListContainer from "../store/OutgoingMails/components/OutgoingMailsListContainer";

class OutgoingMails extends Component {
  constructor(props) {
    super(props);
    const {
      loggedUser: { status },
      fetchOutgoingMails,
    } = this.props;
    switch (status) {
      case "Administrator":
        fetchOutgoingMails();
        break;
      case "Menedżer":
        fetchOutgoingMails();
        break;
      default:
        break;
    }
  }
  render() {
    const { outgoingMails } = this.props;
    const outgoingMailsContent =
      outgoingMails.length > 0 ? <OutgoingMailsListContainer /> : null;
    return (
      <Aux>
        <TopNavigatorToolbar
          visibleButtons={{
            OutgoingMailAddFormButton: true,
            UserRegistryFormButton: true,
          }}
        />
        {outgoingMailsContent}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.users.logged_user,
    outgoingMails: state.outgoingMails.outgoingMails,
  };
};

export default connect(mapStateToProps, {
  fetchOutgoingMails,
})(OutgoingMails);
