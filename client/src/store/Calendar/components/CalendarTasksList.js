import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment/min/moment-with-locales";

import { Button } from "../../../themes/basic";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { removeCalendar } from "../actions";

class CalendarTasksList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DailyEvents: [],
    };
  }
  componentDidMount() {
    const { taskDailyEvents } = this.props;
    this.setState({
      DailyEvents: taskDailyEvents,
    });
  }
  removeEvent = async (id) => {
    const { removeCalendar, closeModal } = this.props;
    const response = await removeCalendar(id);
    if (response) {
      closeModal();
    }
  };
  render() {
    const { tasks } = this.props;
    const { DailyEvents } = this.state;

    let listContainer = [];
    if (DailyEvents.length > 0) {
      listContainer = DailyEvents.map((event) => {
        const task = tasks.filter((item) => item._id === event.eventId);
        return (
          <tr key={event._id}>
            <td>{task[0].title}</td>
            <td>{task[0].projectName}</td>
            <td>{task[0].status}</td>
            <td>{task[0].priority}</td>
            <td>{task[0].termAt}</td>
            <td>
              <Button
                onClick={() => this.removeEvent(event._id)}
                title="Usuń wydarzenie"
              >
                <FontAwesomeIcon icon={faTimes} />
              </Button>
            </td>
          </tr>
        );
      });
    }

    return (
      <div>
        <h2>
          Lista przypisanych zadań na dzień: <br />
          {DailyEvents.length > 0
            ? moment(new Date(DailyEvents[0].selectedDate))
                .locale("pl")
                .format("LLLL")
            : null}
        </h2>
        <table>
          <thead>
            <tr>
              <th>Nazwa</th>
              <th>Projekt</th>
              <th>Stan</th>
              <th>Priorytet</th>
              <th>Termin</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>{listContainer}</tbody>
        </table>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    tasks: state.tasks.tasks,
  };
};
export default connect(mapStateToProps, { removeCalendar })(CalendarTasksList);
