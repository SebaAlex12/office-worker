import React, { Component } from "react";
import { connect } from "react-redux";

import TextFieldGroup from "../../../common/Forms/components/TextFieldGroup";

import { BiggerButton, SmallerButton, ListBox } from "../../../themes/basic";
import { StyledUserList } from "../styles/StyledUserList";
import {
  faTimes,
  faArrowAltCircleDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { removeUser, updateUser } from "../actions";
import UsersLastActiveList from "./UsersLastActiveList";
import UsersHistoryQuickView from "../../UsersHistory/components/UsersHistoryQuickView";

import { updateFilter } from "../../Filters/actions";
import UsersItem from "./UsersItem";

class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userFilterName: "",
      toggleUsersList: false,
    };
  }
  removeUserHandler = (id) => {
    const { removeUser } = this.props;
    removeUser(id);
  };
  updateUserHandler = (data) => {
    const { updateUser } = this.props;
    updateUser(data);
  };
  removeProjectFilterResponsiblePersonHandler = () => {
    const {
      updateFilter,
      filters: { statuses, priorities, projectName },
    } = this.props;
    updateFilter({ statuses, priorities, projectName, responsiblePerson: "" });
  };
  filterItems = (items) => {
    const { userFilterName } = this.state;
    const filteredItems = items.filter((item) => {
      return item.name.toLowerCase().indexOf(userFilterName) !== -1;
    });
    if (document.querySelector(".remove-filter")) {
      if (userFilterName.length > 0) {
        document.querySelector(".remove-filter").classList.add("active");
      } else {
        document.querySelector(".remove-filter").classList.remove("active");
      }
    }
    return filteredItems;
  };
  toggleClassHandler = (event) => {
    event.preventDefault();
    event.target.classList.toggle("active");
    this.setState({
      userFilterName: "",
    });
  };
  onChangeInput = (event) => {
    this.setState({
      ...this.state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  render() {
    const {
      loggedUser,
      filters: { responsiblePerson },
    } = this.props;
    const { toggleUsersList, userFilterName } = this.state;

    let users = this.state.users > 0 ? this.state.users : this.props.users;

    if (users && users.length > 0) {
      users = this.filterItems(users);
    }

    const usersContent = users.map((user) => {
      return <UsersItem item={user} key={user._id} />;
    });
    const windowHeight = window.innerHeight - 50;

    return (
      <StyledUserList>
        <div className="users-box">
          <UsersLastActiveList />
          {/* {loggedUser.status === "Administrator" ||
          loggedUser.status === "Menedżer" ? (
            <UsersHistoryQuickView />
          ) : null} */}
          <React.Fragment>
            <BiggerButton
              variant="primary"
              title="Pokaż listę użytkowników"
              onClick={() =>
                this.setState({
                  toggleUsersList: !toggleUsersList,
                })
              }
            >
              <FontAwesomeIcon icon={faArrowAltCircleDown} />
              <span>Lista użytkowników</span>
            </BiggerButton>
            <i
              onClick={
                responsiblePerson !== ""
                  ? this.removeProjectFilterResponsiblePersonHandler
                  : null
              }
            ></i>
          </React.Fragment>
          {toggleUsersList ? (
            <ListBox
              className="users-list"
              style={{ height: `${windowHeight}px` }}
            >
              <SmallerButton
                className="remove-filter"
                onClick={this.toggleClassHandler}
              >
                <FontAwesomeIcon title="usuń filtrowanie" icon={faTimes} />
              </SmallerButton>
              <div className="filter-box">
                <TextFieldGroup
                  onChange={this.onChangeInput}
                  value={userFilterName}
                  type="text"
                  name="userFilterName"
                  className="form-control"
                  placeholder="filtruj po nazwie"
                  title="filtruj po nazwie"
                />
              </div>
              <div className="items">{usersContent}</div>
            </ListBox>
          ) : null}
        </div>
      </StyledUserList>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
    loggedUser: state.users.logged_user,
    filters: state.filters.filters,
  };
};

export default connect(mapStateToProps, {
  removeUser,
  updateUser,
  updateFilter,
})(UsersList);
