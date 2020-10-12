import {
  FETCHING_INCOMING_MAILS,
  ADDING_INCOMING_MAIL,
  REMOVING_INCOMING_MAIL,
  UPDATING_INCOMING_MAIL,
} from "./types";

export const fetchIncomingMails = () => ({
  type: FETCHING_INCOMING_MAILS,
});
export const addIncomingMail = (data) => ({
  type: ADDING_INCOMING_MAIL,
  data,
});
export const updateIncomingMail = (data) => ({
  type: UPDATING_INCOMING_MAIL,
  data,
});
export const removeIncomingMail = (incomingMailId) => ({
  type: REMOVING_INCOMING_MAIL,
  incomingMailId,
});
