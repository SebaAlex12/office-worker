import axios from "axios";
import { call, put, takeEvery, select } from "redux-saga/effects";
import {
  FETCHING_STAGES,
  FETCH_STAGES_SUCCESS,
  ADDING_STAGE,
  ADD_STAGE_SUCCESS,
  REMOVING_STAGE,
  REMOVE_STAGE_SUCCESS,
  UPDATING_STAGE,
  UPDATE_STAGE_SUCCESS,
  STAGES_ERROR,
} from "./types";
import { addCalendar } from "../Calendar/actions";
import { updateProject } from "../Projects/actions";

import { UPDATE_MESSAGES_SUCCESS } from "../Messages/types";

const getLoggedUser = (state) => state.users.logged_user;

function* fetchStagesAsync(action) {
  const stageInput = action.data;
  // console.log("saga", data);
  try {
    const graph = {
      query: `
        query{fetchStages(stageInput: {
          projectId: "${stageInput.projectId}",
        }){
            _id
            projectId
            description
            createdBy
            createdAt
            termAt
          }
        }
    `,
    };
    const res = yield call(
      [axios, axios.post],
      "/graphql",
      JSON.stringify(graph),
      { headers: { "Content-Type": "application/json" } }
    );
    yield put({
      type: FETCH_STAGES_SUCCESS,
      payload: res.data.data.fetchStages,
    });
  } catch (error) {
    yield put({ type: STAGES_ERROR, payload: error });
  }
}

export function* fetchStagesWatcher() {
  yield takeEvery(FETCHING_STAGES, fetchStagesAsync);
}

function* addStageAsync(action) {
  // try {
  const data = action.data;
  const loggedUser = yield select(getLoggedUser);
  const stageInput = {
    projectId: data.projectId,
    description: data.description,
    createdBy: loggedUser.name,
    createdAt: data.createdAt,
    termAt: data.termAt,
  };

  const graph = {
    query: `mutation {
      addStage(stageInput: {
        projectId: "${stageInput.projectId}",
      description: "${stageInput.description}",
      createdBy: "${stageInput.createdBy}",
      createdAt: "${stageInput.createdAt}",
      termAt: "${stageInput.termAt}",}){
        _id
        projectId
        description
        createdBy
        createdAt
        termAt
        errors{
          path
          message
        }
      }
    }`,
  };

  const stageData = yield call(
    [axios, axios.post],
    "/graphql",
    JSON.stringify(graph),
    { headers: { "Content-Type": "application/json" } }
  );

  const response = stageData.data.data.addStage;
  if (response.errors) {
    yield put({ type: STAGES_ERROR, payload: response.errors });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { errors: response.errors },
    });
  } else {
    yield put({
      type: ADD_STAGE_SUCCESS,
      payload: response,
    });

    /* update project set last stage */
    yield put(
      updateProject({
        _id: response.projectId,
        lastStageId: response._id,
        lastStageDescription: response.description,
        lastStageCreatedAt: response.createdAt,
      })
    );

    /*  add stage to calendar  */
    if (response.termAt.length > 0) {
      const calendarData = {
        eventId: response._id,
        userId: loggedUser._id,
        eventType: "Projekt",
        title: response.description,
        description: response.description,
        selectedDate: response.termAt,
        status: "enabled",
      };
      yield put(addCalendar(calendarData));
    }
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { success: [{ message: "Etap został dodany" }] },
    });
  }
}

export function* addStageWatcher() {
  yield takeEvery(ADDING_STAGE, addStageAsync);
}

function* updateStageAsync(action) {
  // try {
  const data = action.data;

  const stageInput = {
    _id: data._id,
    projectId: data.projectId ? data.projectId : "",
    description: data.description ? data.description : "",
    createdBy: data.createdBy ? data.createdBy : "",
    createdAt: data.createdAt ? data.createdAt : "",
    termAt: data.termAt ? data.termAt : "",
  };

  const graph = {
    query: `mutation {
      updateStage(stageInput: {
      _id: "${stageInput._id}",
      projectId: "${stageInput.projectId}",
      description: "${stageInput.description}",
      createdBy: "${stageInput.createdBy}",
      createdAt: "${stageInput.createdAt}",
      termAt: "${stageInput.termAt}",}){
        _id
        projectId
        description
        createdBy
        createdAt
        termAt
        errors{
          path
          message
        }
      }
    }`,
  };
  // console.log(graph);
  const stageData = yield call(
    [axios, axios.post],
    "/graphql",
    JSON.stringify(graph),
    { headers: { "Content-Type": "application/json" } }
  );
  const response = stageData.data.data.updateStage;
  if (response.errors) {
    yield put({ type: STAGES_ERROR, payload: response.errors });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { errors: response.errors },
    });
  } else {
    yield put({
      type: UPDATE_STAGE_SUCCESS,
      payload: response,
    });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { success: [{ message: "Etap został zaktualizowany" }] },
    });
  }
}

export function* updateStageWatcher() {
  yield takeEvery(UPDATING_STAGE, updateStageAsync);
}

function* removeStageAsync(action) {
  const { stageId } = action;
  const graph = {
    query: `mutation {
      removeStage(stageId: "${stageId}"){
        _id
        errors{
          path
          message
        }
      }
    }`,
  };

  const stageData = yield call(
    [axios, axios.post],
    "/graphql",
    JSON.stringify(graph),
    { headers: { "Content-Type": "application/json" } }
  );
  const response = stageData.data.data.removeStage;

  if (response.errors) {
    yield put({ type: STAGES_ERROR, payload: response.errors });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { errors: response.errors },
    });
  } else {
    yield put({ type: REMOVE_STAGE_SUCCESS, payload: response });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { success: [{ message: "Etap został usunięty" }] },
    });
  }
}

export function* removeStageWatcher() {
  yield takeEvery(REMOVING_STAGE, removeStageAsync);
}
