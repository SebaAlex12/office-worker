import {
  FETCH_STAGES_SUCCESS,
  ADD_STAGE_SUCCESS,
  REMOVE_STAGE_SUCCESS,
  UPDATE_STAGE_SUCCESS,
  STAGES_ERROR,
} from "./types";

const initialState = {
  stages: [],
  errors: [],
};

export const stagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STAGES_SUCCESS:
      return {
        ...state,
        stages: action.payload,
      };
    case ADD_STAGE_SUCCESS:
      return {
        ...state,
        stages: [action.payload, ...state.stages],
      };
    case REMOVE_STAGE_SUCCESS:
      return {
        ...state,
        stages: state.stages.filter(
          (stage) => stage._id !== action.payload._id
        ),
      };
    case UPDATE_STAGE_SUCCESS:
      return {
        ...state,
        stages: state.stages.map((stage) => {
          return stage._id === action.payload._id ? action.payload : stage;
        }),
      };
    case STAGES_ERROR:
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
};
