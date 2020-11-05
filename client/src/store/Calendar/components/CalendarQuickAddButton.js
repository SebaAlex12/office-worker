import React from "react";
import { useDispatch } from "react-redux";
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { addCalendar } from "../actions";
import { Button } from "../../../themes/basic";

const CalendarQuickAddButton = ({
  eventId,
  userId,
  eventType,
  title,
  description,
  selectedDate,
  status,
  btnTitle,
  disabled,
}) => {
  const dispatch = useDispatch();
  const data = {
    eventId: eventId ? eventId : "",
    userId: userId ? userId : "",
    eventType: eventType ? eventType : "",
    title: title ? title : "",
    description: description ? description : "",
    selectedDate: selectedDate ? selectedDate : "",
    status: status ? status : "",
  };

  const addHandler = (dispatch, data) => {
    dispatch(addCalendar(data));
  };

  return (
    <Button
      title={btnTitle}
      onClick={() => addHandler(dispatch, data)}
      disabled
    >
      <FontAwesomeIcon icon={faCalendarCheck} />
    </Button>
  );
};

export default CalendarQuickAddButton;
