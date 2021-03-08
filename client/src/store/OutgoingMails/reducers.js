import {
    FETCH_OUTGOING_MAILS_SUCCESS,
    ADD_OUTGOING_MAIL_SUCCESS,
    REMOVE_OUTGOING_MAIL_SUCCESS,
    UPDATE_OUTGOING_MAIL_SUCCESS,
    OUTGOING_MAILS_ERROR,
  } from "./types";
  
  const initialState = {
    outgoingMails: [],
    errors: [],
  };
  
  export const outgoingMailsReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_OUTGOING_MAILS_SUCCESS:
        return {
          ...state,
          outgoingMails: action.payload,
        };
      case ADD_OUTGOING_MAIL_SUCCESS:
        return {
          ...state,
          outgoingMails: [...state.outgoingMails, action.payload],
        };
      case REMOVE_OUTGOING_MAIL_SUCCESS:
        return {
          ...state,
          outgoingMails: state.outgoingMails.filter(
            (outgoingMail) => outgoingMail._id !== action.payload._id
          ),
        };
      case UPDATE_OUTGOING_MAIL_SUCCESS:
        return {
          ...state,
          outgoingMails: state.outgoingMails.map((outgoingMail) => {
            return outgoingMail._id === action.payload._id
              ? action.payload
              : outgoingMail;
          }),
        };
      case OUTGOING_MAILS_ERROR:
        return {
          ...state,
          errors: action.payload,
        };
      default:
        return state;
    }
  };
  