import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  UPDATING_SETTINGS,
  UPDATE_SETTINGS_SUCCESS,
  FETCHING_SETTINGS,
  FETCH_SETTINGS_SUCCESS,
  ADDING_BACKUP_DATABASE,
  ADD_DATABASE_SUCCESS,
  SETTINGS_ERROR,
} from "./types";

import { UPDATE_MESSAGES_SUCCESS } from "../Messages/types";

function* fetchSettingsAsync() {
  try {
    const graph = {
      query: `
        query {
          fetchSettings{
            _id
            mailingDate
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
    // console.log("saga", res.data);
    yield put({
      type: FETCH_SETTINGS_SUCCESS,
      payload: res.data.data.fetchSettings,
    });
  } catch (error) {
    yield put({ type: SETTINGS_ERROR, payload: error });
  }
}

export function* fetchSettingsWatcher() {
  yield takeEvery(FETCHING_SETTINGS, fetchSettingsAsync);
}

function* updateSettingAsync(action) {
  // try {
  const data = action.data;

  const settingsInput = {
    _id: data._id,
    mailingDate: data.mailingDate ? data.mailingDate : "",
  };

  const graph = {
    query: `mutation {
        updateSettings(settingsInput: {
        _id: "${settingsInput._id}",  
        mailingDate: "${settingsInput.mailingDate}"}){
          _id
          mailingDate
        }
      }`,
  };
  // console.log(graph);
  const settingsData = yield call(
    [axios, axios.post],
    "/graphql",
    JSON.stringify(graph),
    { headers: { "Content-Type": "application/json" } }
  );
  const response = settingsData.data.data.updateSettings;
  if (response.errors) {
    yield put({ type: SETTINGS_ERROR, payload: response.errors });
    yield put({
      type: UPDATE_SETTINGS_SUCCESS,
      payload: { errors: response.errors },
    });
  } else {
    yield put({
      type: UPDATE_SETTINGS_SUCCESS,
      payload: response,
    });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { success: [{ message: "Ustawienia zostały zaktualizowane" }] },
    });
  }
}

export function* updateSettingWatcher() {
  yield takeEvery(UPDATING_SETTINGS, updateSettingAsync);
}

function* addBackupDatabaseAsync() {
  const graph = "";

  const settingsData = yield call(
    [axios, axios.post],
    "/backup-database",
    JSON.stringify(graph),
    { headers: { "Content-Type": "application/json" } }
  );
  const response = settingsData;
  yield put({
    type: ADD_DATABASE_SUCCESS,
    payload: response,
  });
  yield put({
    type: UPDATE_MESSAGES_SUCCESS,
    payload: { success: [{ message: "Kopia bazy danych została utworzona" }] },
  });
}

export function* addBackupDatabaseWatcher() {
  yield takeEvery(ADDING_BACKUP_DATABASE, addBackupDatabaseAsync);
}
