import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  FETCHING_PROJECTS,
  FETCHING_PROJECTS_BY_LOGGED_USER_PROJECTS,
  FETCH_PROJECTS_SUCCESS,
  ADDING_PROJECT,
  ADD_PROJECT_SUCCESS,
  REMOVING_PROJECT,
  REMOVE_PROJECT_SUCCESS,
  UPDATING_PROJECT,
  UPDATE_PROJECT_SUCCESS,
  PROJECTS_ERROR,
} from "./types";

import { UPDATE_MESSAGES_SUCCESS } from "../Messages/types";

function* fetchProjectsAsync(action) {
  // const data = action.data;
  // console.log("saga", data);
  try {
    const graph = {
      query: `
        query {
          fetchProjects{
            _id
            name
            signature
            type
            organ
            description
            lastStageDescription
            lastStageCreatedAt
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
      type: FETCH_PROJECTS_SUCCESS,
      payload: res.data.data.fetchProjects,
    });
  } catch (error) {
    yield put({ type: PROJECTS_ERROR, payload: error });
  }
}

export function* fetchProjectsWatcher() {
  yield takeEvery(FETCHING_PROJECTS, fetchProjectsAsync);
}

function* fetchProjectsByLoggedUserProjectsAsync(action) {
  const data = action.data;
  try {
    const graph = {
      query: `
        query {
          fetchProjectsByLoggedUserProjects(projects:"${data}"){
            _id
            name
            signature
            type
            organ
            description
            lastStageDescription
            lastStageCreatedAt
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
      type: FETCH_PROJECTS_SUCCESS,
      payload: res.data.data.fetchProjectsByLoggedUserProjects,
    });
  } catch (error) {
    yield put({ type: PROJECTS_ERROR, payload: error });
  }
}

export function* fetchProjectsByLoggedUserProjectsWatcher() {
  yield takeEvery(
    FETCHING_PROJECTS_BY_LOGGED_USER_PROJECTS,
    fetchProjectsByLoggedUserProjectsAsync
  );
}

function* addProjectAsync(action) {
  // try {
  const data = action.data;
  const projectInput = {
    name: data.name,
    signature: JSON.stringify(data.signature),
    type: data.type,
    organ: JSON.stringify(data.organ),
    description: data.description,
    createdAt: data.createdAt,
    termAt: data.termAt,
  };

  const graph = {
    query: `mutation {
      addProject(projectInput: {
      name: "${projectInput.name}",
      signature: """${projectInput.signature}""",
      type: "${projectInput.type}",
      organ: """${projectInput.organ}""",
      description: "${projectInput.description}",
      createdAt: "${projectInput.createdAt}",
      termAt: "${projectInput.termAt}",}){
        _id
        name
        signature
        type
        organ
        description
        createdAt
        termAt
        errors{
          path
          message
        }
      }
    }`,
  };

  console.log("graph", graph);

  const projectData = yield call(
    [axios, axios.post],
    "/graphql",
    JSON.stringify(graph),
    { headers: { "Content-Type": "application/json" } }
  );

  const response = projectData.data.data.addProject;
  // console.log("saga resolver ", response);
  if (response.errors) {
    yield put({ type: PROJECTS_ERROR, payload: response.errors });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { errors: response.errors },
    });
  } else {
    yield put({
      type: ADD_PROJECT_SUCCESS,
      payload: response,
    });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { success: [{ message: "Sprawa została dodana" }] },
    });
  }
}

export function* addProjectWatcher() {
  yield takeEvery(ADDING_PROJECT, addProjectAsync);
}

function* updateProjectAsync(action) {
  // try {
  const data = action.data;
  const projectInput = {
    _id: data._id,
    name: data.name ? data.name : "",
    signature: data.signature ? JSON.stringify(data.signature) : "",
    type: data.type ? data.type : "",
    organ: data.organ ? JSON.stringify(data.organ) : "",
    description: data.description ? data.description : "",
    lastStageDescription: data.lastStageDescription
      ? data.lastStageDescription
      : "",
    lastStageCreatedAt: data.lastStageCreatedAt ? data.lastStageCreatedAt : "",
    createdAt: data.createdAt ? data.createdAt : "",
    termAt: data.termAt ? data.termAt : "",
  };

  const graph = {
    query: `mutation {
      updateProject(projectInput: {
      _id: "${projectInput._id}",
      name: "${projectInput.name}",
      signature: """${projectInput.signature}""",
      type: "${projectInput.type}",
      organ: """${projectInput.organ}""",
      description: "${projectInput.description}",
      lastStageDescription: "${projectInput.lastStageDescription}",
      lastStageCreatedAt: "${projectInput.lastStageCreatedAt}",
      createdAt: "${projectInput.createdAt}",
      termAt: "${projectInput.termAt}",}){
        _id
        name
        signature
        type
        organ
        description
        lastStageDescription
        lastStageCreatedAt
        createdAt
        termAt
        errors{
          path
          message
        }
      }
    }`,
  };
  console.log("graphql", graph);
  const projectData = yield call(
    [axios, axios.post],
    "/graphql",
    JSON.stringify(graph),
    { headers: { "Content-Type": "application/json" } }
  );
  const response = projectData.data.data.updateProject;
  if (response.errors) {
    yield put({ type: PROJECTS_ERROR, payload: response.errors });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { errors: response.errors },
    });
  } else {
    yield put({
      type: UPDATE_PROJECT_SUCCESS,
      payload: response,
    });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { success: [{ message: "Sprawa została zaktualizowana" }] },
    });
  }
}

export function* updateProjectWatcher() {
  yield takeEvery(UPDATING_PROJECT, updateProjectAsync);
}

function* removeProjectAsync(action) {
  const { projectId } = action;
  console.log("saga data", action);
  const graph = {
    query: `mutation {
      removeProject(projectId: "${projectId}"){
        _id
        errors{
          path
          message
        }
      }
    }`,
  };

  const projectData = yield call(
    [axios, axios.post],
    "/graphql",
    JSON.stringify(graph),
    { headers: { "Content-Type": "application/json" } }
  );
  const response = projectData.data.data.removeProject;

  if (response.errors) {
    yield put({ type: PROJECTS_ERROR, payload: response.errors });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { errors: response.errors },
    });
  } else {
    yield put({ type: REMOVE_PROJECT_SUCCESS, payload: response });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { success: [{ message: "Wpis został usunięty" }] },
    });
  }
}

export function* removeProjectWatcher() {
  yield takeEvery(REMOVING_PROJECT, removeProjectAsync);
}
