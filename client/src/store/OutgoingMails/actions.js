import {
    FETCHING_OUTGOING_MAILS,
    ADDING_OUTGOING_MAIL,
    REMOVING_OUTGOING_MAIL,
    UPDATING_OUTGOING_MAIL,
  } from "./types";
  
  export const fetchOutgoingMails = () => ({
    type: FETCHING_OUTGOING_MAILS,
  });
  export const addOutgoingMail = (data) => ({
    type: ADDING_OUTGOING_MAIL,
    data,
  });
  export const updateOutgoingMail = (data) => ({
    type: UPDATING_OUTGOING_MAIL,
    data,
  });
  export const removeOutgoingMail = (outgoingMailId) => ({
    type: REMOVING_OUTGOING_MAIL,
    outgoingMailId,
  });
  