import React, { Component } from "react";
import { connect } from "react-redux";

import { updateFilter } from "../actions";
import { StyledFilters } from "../styles/StyledFilters";

class FiltersForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statuses: [],
      projectName: "",
    };
  }
  componentDidMount() {
    const {
      filters: { statuses, projectName },
    } = this.props;
    this.setState({
      statuses,
      projectName,
    });
  }

  onChangeStatusHandler = (event) => {
    const { updateFilter } = this.props;
    let { statuses, projectName } = this.state;
    statuses.map((status) => {
      if (status.name === event.target.name) {
        status.active = event.target.checked;
      }
      return status;
    });
    updateFilter({ statuses, projectName });
    this.setState({
      statuses,
    });
  };

  render() {
    const { statuses } = this.state;
    let stateContent = "";

    if (statuses) {
      let counter = 1;
      stateContent = statuses.map((status) => {
        return (
          <div className="form-check" key={counter++}>
            <input
              className="form-check-input"
              type="checkbox"
              name={status.name}
              // value={status.active}
              onChange={this.onChangeStatusHandler}
              checked={status.active}
            />
            <label className="form-check-label" htmlFor={status.name}>
              {status.name}
            </label>
          </div>
        );
      });
    }

    return (
      <StyledFilters>
        <div className="filter-form-box">
          <form action="">
            <div className="form-group row">
              <label>[Stan]</label>
              {stateContent}
            </div>
          </form>
        </div>
      </StyledFilters>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.users.logged_user,
    filters: state.filters.filters,
  };
};

export default connect(mapStateToProps, { updateFilter })(FiltersForm);
