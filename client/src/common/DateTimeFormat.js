import React, { useState } from "react";
import moment from "moment/min/moment-with-locales";
import styled from "styled-components";

import { SmallerButton } from "../themes/basic";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DateTimeFormat = ({ date, short }) => {
  const [toggle, setToggle] = useState(0);
  const dateContent = short ? (
    <DateTimeFormatStyled>
      <SmallerButton
        onClick={() => setToggle(!toggle)}
        title={moment(new Date(date)).locale("pl").format("LLLL")}
      >
        <FontAwesomeIcon icon={faClock} />
      </SmallerButton>
      {toggle ? (
        <span className="tooltip-box">
          {moment(new Date(date)).locale("pl").format("LLLL")}
        </span>
      ) : null}
      {moment(new Date(date)).locale("pl").format("L")}
    </DateTimeFormatStyled>
  ) : (
    <DateTimeFormatStyled>
      {moment(new Date(date)).locale("pl").format("LLLL")}
    </DateTimeFormatStyled>
  );
  return dateContent;
};

export default DateTimeFormat;

const DateTimeFormatStyled = styled.div`
  position: relative;
  .tooltip-box {
    position: absolute;
    padding: 10px 15px;
    background-color: #fff;
    border: 1px solid grey;
  }
`;
