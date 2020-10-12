import {
  FETCHING_STAGES,
  ADDING_STAGE,
  REMOVING_STAGE,
  UPDATING_STAGE,
} from "./types";

export const fetchStages = (data) => ({
  type: FETCHING_STAGES,
  data,
});
export const addStage = (data) => ({
  type: ADDING_STAGE,
  data,
});
export const updateStage = (data) => ({
  type: UPDATING_STAGE,
  data,
});
export const removeStage = (stageId) => ({
  type: REMOVING_STAGE,
  stageId,
});
