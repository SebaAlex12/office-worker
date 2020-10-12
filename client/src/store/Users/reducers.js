import {
  FETCH_LOGGED_USER_SUCCESS,
  FETCH_USERS_SUCCESS,
  REGISTER_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
  USER_ERROR,
  LOGGED_OUT_SUCCESS,
} from "./types";

const initialState = {
  users: [],
  logged_user: null,
  errors: [],
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOGGED_USER_SUCCESS:
      return {
        ...state,
        logged_user: action.payload,
      };
    case FETCH_USERS_SUCCESS:
      return {
        users: action.payload,
        logged_user: state.logged_user,
      };
    case REGISTER_USER_SUCCESS:
      return {
        users: [...state.users, action.payload],
        logged_user: state.logged_user,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.map((user) => {
          return user._id === action.payload._id ? action.payload : user;
        }),
      };
    case LOGGED_OUT_SUCCESS:
      return {
        ...state,
        logged_user: action.payload,
      };
    case USER_ERROR:
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
};
