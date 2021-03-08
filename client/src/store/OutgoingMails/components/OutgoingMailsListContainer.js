import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../../hoc/Auxiliary";
import { StyledOutgoingMailListContainer } from "../styles/StyledOutgoingMailListContainer";
import { sortArray } from "../../../common/tools";
import { removeOutgoingMail, updateOutgoingMail } from "../actions";
import OutgoingMailsBasicList from "./OutgoingMailsBasicList";

class OutgoingMailsListContainer extends Component {
  constructor(props) {
    super(props);
    const { outgoingMails } = this.props;
    this.state = {
      outgoingMails: outgoingMails,
      filteredOutgoingMails: outgoingMails,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.outgoingMails !== this.state.outgoingMails) {
      this.setState({
        ...this.state,
        outgoingMails: nextProps.outgoingMails,
        filteredOutgoingMails: nextProps.outgoingMails,
      });
    }
  }
  sortItems = (column, direction) => {
    let { outgoingMails } = this.state;

    if (direction === "asc") {
      sortArray(outgoingMails, column);
    }
    if (direction === "desc") {
      sortArray(outgoingMails, column, -1);
    }
    console.log("outgoingMails", outgoingMails);
    this.setState({
      outgoingMails: outgoingMails,
    });
  };
  removeOutgoingMailsHandler = (id) => {
    const { removeOutgoingMail } = this.props;

    const result = window.confirm(
      "Czy na pewno chcesz usunąć wybrany rekord !"
    );

    if (result) {
      removeOutgoingMail(id);
      // if (response) {
      //   this.setState({
      //     outgoingMails: outgoingMails.filter((item) => item._id !== id),
      //     filteredOutgoingMails: filteredOutgoingMails.filter(
      //       (item) => item._id !== id
      //     ),
      //   });
      // }
    }
  };
  updateOutgoingMailsHandler = async (element) => {
    const { outgoingMails } = this.state;
    const { updateOutgoingMail } = this.props;

    const response = await updateOutgoingMail(element);
    if (response) {
      this.setState({
        outgoingMails: outgoingMails.map((item) =>
          item._id === element._id ? element : item
        ),
      });
    }
  };
  onChangeOutgoingMailsSearcherHandler = (event) => {
    const { outgoingMails } = this.state;
    if (event.target.name !== undefined && event.target.name.length > 0) {
      const filteredOutgoingMails = outgoingMails.filter((item) => {
        return (
          item[event.target.name]
            .toLowerCase()
            .indexOf(event.target.value.toLowerCase()) !== -1
        );
      });
      this.setState({
        filteredOutgoingMails: filteredOutgoingMails,
      });
    } else {
      this.setState({
        filteredOutgoingMails: outgoingMails,
      });
    }
  };
  render() {
    const { filteredOutgoingMails } = this.state;
    let n = 1;
    const outgoingMailListContent = filteredOutgoingMails ? (
      <Aux key={n++}>
        <OutgoingMailsBasicList
          items={filteredOutgoingMails}
          sortItems={this.sortItems}
          removeItem={this.removeOutgoingMailsHandler}
          updateItem={this.updateOutgoingMailsHandler}
          searchItem={this.onChangeOutgoingMailsSearcherHandler}
        />
      </Aux>
    ) : (
      <p>Trwa wczytywanie listy poczty przychodzącej...</p>
    );
    return (
      <StyledOutgoingMailListContainer>
        <div className="outgoingMail-list-container-box">
          <div className="title-box">
            <div className="list-counter">
              Liczba elementów: {filteredOutgoingMails.length}
            </div>
            <h2>Poczta wychodząca</h2>
          </div>
          {outgoingMailListContent}
        </div>
      </StyledOutgoingMailListContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    outgoingMails: state.outgoingMails.outgoingMails,
  };
};

export default connect(mapStateToProps, {
  removeOutgoingMail,
  updateOutgoingMail,
})(OutgoingMailsListContainer);
