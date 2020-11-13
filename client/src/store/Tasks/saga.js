import axios from "axios";
import moment from "moment";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  FETCHING_TASKS,
  FETCHING_TASKS_BY_LOGGED_USER_PROJECTS,
  FETCH_TASKS_SUCCESS,
  ADDING_TASK,
  ADD_TASK_SUCCESS,
  REMOVING_TASK,
  REMOVE_TASK_SUCCESS,
  UPDATING_TASK,
  UPDATE_TASK_SUCCESS,
  SENDING_MAILING_TASK,
  SEND_MAILING_TASK_SUCCESS,
  TASKS_ERROR,
} from "./types";

import { UPDATE_MESSAGES_SUCCESS } from "../Messages/types";
// import { REMOVING_COMMENTS_RELATIVE_TASK } from "../Comments/types";

function* fetchTasksAsync(action) {
  try {
    const graph = {
      query: `
        query {
          fetchTasks(taskInput:{
            mailRemainderData: "${action.data.mailRemainderData}"}){
            _id
            projectId
            createdByUserId
            responsiblePersonId
            title
            status
            priority
            termAt
            description
            responsiblePersonLastComment
            finishedAt
            mailRemainderData
            createdAt
            files
            errors{
              path
              message
            }
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
    // console.log("fetch tasks", res.data.data.fetchTasks);
    yield put({ type: FETCH_TASKS_SUCCESS, payload: res.data.data.fetchTasks });
  } catch (error) {
    yield put({ type: TASKS_ERROR, payload: error });
  }
}

export function* fetchTasksWatcher() {
  yield takeEvery(FETCHING_TASKS, fetchTasksAsync);
}

function* fetchTasksByLoggedUserProjectsAsync(action) {
  const data = action.data;
  // console.log("resolver data", action);
  try {
    const graph = {
      query: `
        query {
          fetchTasksByLoggedUserProjects(taskInput:{
            mailRemainderData: "${data.mailRemainderData}"}){
            _id
            projectId
            createdByUserId
            responsiblePersonId
            title
            status
            priority
            termAt
            description
            responsiblePersonLastComment
            finishedAt
            mailRemainderData
            createdAt
            files
            errors{
              path
              message
            }
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
    // console.log("fetch tasks", res.data.data.fetchTasks);
    yield put({
      type: FETCH_TASKS_SUCCESS,
      payload: res.data.data.fetchTasksByLoggedUserProjects,
    });
  } catch (error) {
    yield put({ type: TASKS_ERROR, payload: error });
  }
}

export function* fetchTasksByLoggedUserProjectsWatcher() {
  yield takeEvery(
    FETCHING_TASKS_BY_LOGGED_USER_PROJECTS,
    fetchTasksByLoggedUserProjectsAsync
  );
}

function* addTaskAsync(action) {
  const data = action.data;

  const taskInput = {
    projectId: data.projectId,
    createdByUserId: data.createdByUserId,
    responsiblePersonId: data.responsiblePersonId,
    title: data.title,
    status: data.status,
    priority: data.priority,
    description: data.description,
    responsiblePersonLastComment: data.responsiblePersonLastComment,
    finishedAt: data.finishedAt,
    mailRemainderData: null,
    createdAt: moment(new Date(), "YYYY-MM-DD HH:mm:ss").format(),
    termAt: moment(data.termAt, "YYYY-MM-DD HH:mm:ss").format(),
    // finishedAt: data.finishedAt
  };
  console.log(taskInput);
  const graph = {
    query: `mutation {
      addTask(taskInput: {
        projectId: "${taskInput.projectId}",
        createdByUserId: "${taskInput.createdByUserId}",
        responsiblePersonId: "${taskInput.responsiblePersonId}",
        title: "${taskInput.title}",
        status: "${taskInput.status}",
        priority: "${taskInput.priority}",
        termAt: "${taskInput.termAt}",
        description: "${taskInput.description}",
        responsiblePersonLastComment: "${taskInput.responsiblePersonLastComment}",
        finishedAt: "${taskInput.finishedAt}",
        mailRemainderData: "${taskInput.mailRemainderData}",
        createdAt: "${taskInput.createdAt}"        
    }){
        _id
        projectId
        createdByUserId
        responsiblePersonId
        title
        status
        priority
        termAt
        description
        responsiblePersonLastComment
        finishedAt
        mailRemainderData
        createdAt
        files
        errors{
          path
          message
        }
      }
    }`,
  };

  const taskData = yield call(
    [axios, axios.post],
    "/graphql",
    JSON.stringify(graph),
    { headers: { "Content-Type": "application/json" } }
  );
  const response = taskData.data.data.addTask;

  if (response.errors) {
    yield put({ type: TASKS_ERROR, payload: response.errors });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { errors: response.errors },
    });
  } else {
    yield put({ type: ADD_TASK_SUCCESS, payload: response });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { success: [{ message: "Zadanie zostało dodane" }] },
    });
  }
}

export function* addTaskWatcher() {
  yield takeEvery(ADDING_TASK, addTaskAsync);
}

function* updateTaskAsync(action) {
  const data = action.data;
  // console.log("isemty", data.responsiblePersonLastComment);
  // console.log("task saga data", data);
  const taskInput = {
    _id: data._id,
    projectId: data.projectId ? data.projectId : "",
    createdByUserId: data.createdByUserId ? data.createdByUserId : "",
    responsiblePersonId: data.responsiblePersonId
      ? data.responsiblePersonId
      : "",
    title: data.title ? data.title : "",
    status: data.status ? data.status : "",
    priority: data.priority ? data.priority : "",
    description: data.description ? data.description : "",
    responsiblePersonLastComment: data.responsiblePersonLastComment
      ? data.responsiblePersonLastComment
      : "",
    finishedAt: data.finishedAt
      ? moment(data.finishedAt, "YYYY-MM-DD HH:mm:ss").format()
      : "",
    mailRemainderData: data.mailRemainderData ? data.mailRemainderData : null,
    termAt: data.termAt
      ? moment(data.termAt, "YYYY-MM-DD HH:mm:ss").format()
      : "",
  };
  // console.log("task saga input", taskInput);
  const graph = {
    query: `mutation {
      updateTask(taskInput: {
      _id: "${taskInput._id}",  
      projectId: "${taskInput.projectId}",
      createdByUserId: "${taskInput.createdByUserId}",
      responsiblePersonId: "${taskInput.responsiblePersonId}",
      title: "${taskInput.title}",
      status: "${taskInput.status}",
      priority: "${taskInput.priority}",
      termAt: "${taskInput.termAt}",
      description: "${taskInput.description}",
      responsiblePersonLastComment: "${taskInput.responsiblePersonLastComment}",
      finishedAt: "${taskInput.finishedAt}",
      mailRemainderData: "${taskInput.mailRemainderData}",
      createdAt: "${taskInput.createdAt}"}){
        _id
        projectId
        createdByUserId
        responsiblePersonId
        title
        status
        priority
        termAt
        description
        responsiblePersonLastComment
        finishedAt
        mailRemainderData
        createdAt
        files
        errors{
          path
          message
        }
      }
    }`,
  };
  // console.log(graph);
  const taskData = yield call(
    [axios, axios.post],
    "/graphql",
    JSON.stringify(graph),
    { headers: { "Content-Type": "application/json" } }
  );
  // console.log("saga", taskData.data.data.updateTask);
  const response = taskData.data.data.updateTask;
  if (response.errors) {
    yield put({ type: TASKS_ERROR, payload: response.errors });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { errors: response.errors },
    });
  } else {
    yield put({
      type: UPDATE_TASK_SUCCESS,
      payload: response,
    });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { success: [{ message: "Zadanie zostało zaktualizowane" }] },
    });
  }
}

export function* updateTaskWatcher() {
  yield takeEvery(UPDATING_TASK, updateTaskAsync);
}

function* removeTaskAsync(action) {
  const taskId = action.data;
  // console.log("saga data", data);
  const graph = {
    query: `mutation {
      removeTask(taskId: "${taskId}"){
        _id
        errors{
          path
          message
        }
      }
    }`,
  };

  const taskData = yield call(
    [axios, axios.post],
    "/graphql",
    JSON.stringify(graph),
    { headers: { "Content-Type": "application/json" } }
  );
  const response = taskData.data.data.removeTask;

  if (response.errors) {
    yield put({ type: TASKS_ERROR, payload: response.errors });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { errors: response.errors },
    });
  } else {
    yield put({ type: REMOVE_TASK_SUCCESS, payload: response });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { success: [{ message: "Zadanie zostało usunięte" }] },
    });
  }
}

export function* removeTaskWatcher() {
  yield takeEvery(REMOVING_TASK, removeTaskAsync);
  // yield takeEvery(REMOVING_COMMENTS_RELATIVE_TASK)
}

function* sendMailingTaskAsync() {
  // console.log("saga data", data);
  const graph = {
    query: `mutation {
      sendMailingTask{
        errors{
          path
          message
        }
      }
    }`,
  };

  const taskData = yield call(
    [axios, axios.post],
    "/graphql",
    JSON.stringify(graph),
    { headers: { "Content-Type": "application/json" } }
  );
  // console.log("return data graph", taskData);
  const response = taskData.data.data.sendMailingTask;

  if (response.errors) {
    yield put({ type: TASKS_ERROR, payload: response.errors });
    yield put({
      type: SEND_MAILING_TASK_SUCCESS,
      payload: { errors: response.errors },
    });
  } else {
    yield put({ type: REMOVE_TASK_SUCCESS, payload: response });
    yield put({
      type: SEND_MAILING_TASK_SUCCESS,
      payload: { success: [{ message: "Mailing rozesłany" }] },
    });
  }
}

export function* sendMailingTaskWatcher() {
  yield takeEvery(SENDING_MAILING_TASK, sendMailingTaskAsync);
}
