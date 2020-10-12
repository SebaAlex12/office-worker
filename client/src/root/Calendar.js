import React from "react";

import Aux from "../hoc/Auxiliary";
import TopNavigatorToolbar from "./TopNavigatorToolbar";
import CalendarContainer from "../store/Calendar/components/CalendarContainer";

function Calendar() {
  return (
    <Aux>
      <TopNavigatorToolbar
        visibleButtons={{
          UserRegistryFormButton: true,
        }}
      />
      <CalendarContainer />
    </Aux>
  );
}
export default Calendar;
