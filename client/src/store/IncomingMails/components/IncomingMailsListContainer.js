import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../../hoc/Auxiliary";
import { StyledIncomingMailListContainer } from "../styles/StyledIncomingMailListContainer";
import { sortArray } from "../../../common/tools";
import { removeIncomingMail, updateIncomingMail } from "../actions";
import IncomingMailsBasicList from "./IncomingMailsBasicList";

class IncomingMailsListContainer extends Component {
  constructor(props) {
    super(props);
    const { incomingMails } = this.props;
    this.state = {
      incomingMails: incomingMails,
      filteredIncomingMails: incomingMails,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.incomingMails !== this.state.incomingMails) {
      this.setState({
        ...this.state,
        incomingMails: nextProps.incomingMails,
        filteredIncomingMails: nextProps.incomingMails,
      });
    }
  }
  sortItems = (column, direction) => {
    let { incomingMails } = this.state;

    if (direction === "asc") {
      sortArray(incomingMails, column);
    }
    if (direction === "desc") {
      sortArray(incomingMails, column, -1);
    }
    this.setState({
      incomingMails: incomingMails,
    });
  };
  removeIncomingMailsHandler = (id) => {
    const { removeIncomingMail } = this.props;

    const result = window.confirm(
      "Czy na pewno chcesz usunąć wybrany rekord !"
    );

    if (result) {
      removeIncomingMail(id);
      // if (response) {
      //   this.setState({
      //     incomingMails: incomingMails.filter((item) => item._id !== id),
      //     filteredIncomingMails: filteredIncomingMails.filter(
      //       (item) => item._id !== id
      //     ),
      //   });
      // }
    }
  };
  updateIncomingMailsHandler = async (element) => {
    const { incomingMails } = this.state;
    const { updateIncomingMail } = this.props;

    const response = await updateIncomingMail(element);
    if (response) {
      this.setState({
        incomingMails: incomingMails.map((item) =>
          item._id === element._id ? element : item
        ),
      });
    }
  };
  onChangeIncomingMailsSearcherHandler = (event) => {
    const { incomingMails } = this.state;
    if (event.target.name !== undefined && event.target.name.length > 0) {
      const filteredIncomingMails = incomingMails.filter((item) => {
        return (
          item[event.target.name]
            .toLowerCase()
            .indexOf(event.target.value.toLowerCase()) !== -1
        );
      });
      this.setState({
        filteredIncomingMails: filteredIncomingMails,
      });
    } else {
      this.setState({
        filteredIncomingMails: incomingMails,
      });
    }
  };
  render() {
    const { filteredIncomingMails } = this.state;
    let n = 1;
    const incomingMailListContent = filteredIncomingMails ? (
      <Aux key={n++}>
        <IncomingMailsBasicList
          items={filteredIncomingMails}
          sortItems={this.sortItems}
          removeItem={this.removeIncomingMailsHandler}
          updateItem={this.updateIncomingMailsHandler}
          searchItem={this.onChangeIncomingMailsSearcherHandler}
        />
      </Aux>
    ) : (
      <p>Trwa wczytywanie listy poczty przychodzącej...</p>
    );
    return (
      <StyledIncomingMailListContainer>
        <div className="incomingMail-list-container-box">
          <div className="title-box">
            <div className="list-counter">
              Liczba elementów: {filteredIncomingMails.length}
            </div>
            <h2>Poczta przychodząca</h2>
          </div>
          {incomingMailListContent}
        </div>
      </StyledIncomingMailListContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    incomingMails: state.incomingMails.incomingMails,
  };
};

export default connect(mapStateToProps, {
  removeIncomingMail,
  updateIncomingMail,
})(IncomingMailsListContainer);
