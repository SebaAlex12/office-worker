import {
  FETCH_INCOMING_MAILS_SUCCESS,
  ADD_INCOMING_MAIL_SUCCESS,
  REMOVE_INCOMING_MAIL_SUCCESS,
  UPDATE_INCOMING_MAIL_SUCCESS,
  INCOMING_MAILS_ERROR,
} from "./types";

const initialState = {
  incomingMails: [],
  errors: [],
};

export const incomingMailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INCOMING_MAILS_SUCCESS:
      return {
        ...state,
        incomingMails: action.payload,
      };
    case ADD_INCOMING_MAIL_SUCCESS:
      return {
        ...state,
        incomingMails: [...state.incomingMails, action.payload],
      };
    case REMOVE_INCOMING_MAIL_SUCCESS:
      return {
        ...state,
        incomingMails: state.incomingMails.filter(
          (incomingMail) => incomingMail._id !== action.payload._id
        ),
      };
    case UPDATE_INCOMING_MAIL_SUCCESS:
      return {
        ...state,
        incomingMails: state.incomingMails.map((incomingMail) => {
          return incomingMail._id === action.payload._id
            ? action.payload
            : incomingMail;
        }),
      };
    case INCOMING_MAILS_ERROR:
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
};
