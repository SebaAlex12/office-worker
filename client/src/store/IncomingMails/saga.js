import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  FETCHING_INCOMING_MAILS,
  FETCH_INCOMING_MAILS_SUCCESS,
  ADDING_INCOMING_MAIL,
  ADD_INCOMING_MAIL_SUCCESS,
  REMOVING_INCOMING_MAIL,
  REMOVE_INCOMING_MAIL_SUCCESS,
  UPDATING_INCOMING_MAIL,
  UPDATE_INCOMING_MAIL_SUCCESS,
  INCOMING_MAILS_ERROR,
} from "./types";

import { UPDATE_MESSAGES_SUCCESS } from "../Messages/types";

function* fetchIncomingMailsAsync(action) {
  // const data = action.data;
  // console.log("saga", data);
  try {
    const graph = {
      query: `
        query {
          fetchIncomingMails{
            _id
            number
            deliveryDate
            sender
            deliveryCase
            signature
            description
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
      type: FETCH_INCOMING_MAILS_SUCCESS,
      payload: res.data.data.fetchIncomingMails,
    });
  } catch (error) {
    yield put({ type: INCOMING_MAILS_ERROR, payload: error });
  }
}

export function* fetchIncomingMailsWatcher() {
  yield takeEvery(FETCHING_INCOMING_MAILS, fetchIncomingMailsAsync);
}

function* addIncomingMailAsync(action) {
  // try {
  const data = action.data;
  const incomingMailInput = {
    number: data.number,
    deliveryDate: data.deliveryDate,
    sender: data.sender,
    deliveryCase: data.deliveryCase,
    signature: data.signature,
    description: data.description,
  };

  const graph = {
    query: `mutation {
      addIncomingMail(incomingMailInput: {
      number: "${incomingMailInput.number}",
      deliveryDate: "${incomingMailInput.deliveryDate}",
      sender: "${incomingMailInput.sender}",
      deliveryCase: "${incomingMailInput.deliveryCase}",
      signature: "${incomingMailInput.signature}",
      description: "${incomingMailInput.description}"}){
        _id
        number
        deliveryDate
        sender
        deliveryCase
        signature
        description
        errors{
          path
          message
        }
      }
    }`,
  };

  const incomingMailData = yield call(
    [axios, axios.post],
    "/graphql",
    JSON.stringify(graph),
    { headers: { "Content-Type": "application/json" } }
  );

  const response = incomingMailData.data.data.addIncomingMail;
  // console.log("saga resolver ", response);
  if (response.errors) {
    yield put({ type: INCOMING_MAILS_ERROR, payload: response.errors });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { errors: response.errors },
    });
  } else {
    yield put({
      type: ADD_INCOMING_MAIL_SUCCESS,
      payload: response,
    });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: {
        success: [{ message: "Poczta przychodząca - rekord dodany" }],
      },
    });
  }
}

export function* addIncomingMailWatcher() {
  yield takeEvery(ADDING_INCOMING_MAIL, addIncomingMailAsync);
}

function* updateIncomingMailAsync(action) {
  // try {
  const data = action.data;

  const incomingMailInput = {
    _id: data._id,
    number: data.number ? data.number : "",
    deliveryDate: data.deliveryDate ? data.deliveryDate : "",
    sender: data.sender ? data.sender : "",
    deliveryCase: data.deliveryCase ? data.deliveryCase : "",
    signature: data.signature ? data.signature : "",
    description: data.description ? data.description : "",
  };

  const graph = {
    query: `mutation {
      updateIncomingMail(incomingMailInput: {
      _id: "${incomingMailInput._id}",
      number: "${incomingMailInput.number}",
      deliveryDate: "${incomingMailInput.deliveryDate}",
      sender: "${incomingMailInput.sender}",
      deliveryCase: "${incomingMailInput.deliveryCase}",
      signature: "${incomingMailInput.signature}",
      description: "${incomingMailInput.description}"}){
        _id
        number
        deliveryDate
        sender
        deliveryCase
        signature
        description
        errors{
          path
          message
        }
      }
    }`,
  };
  // console.log(graph);
  const incomingMailData = yield call(
    [axios, axios.post],
    "/graphql",
    JSON.stringify(graph),
    { headers: { "Content-Type": "application/json" } }
  );
  const response = incomingMailData.data.data.updateIncomingMail;
  if (response.errors) {
    yield put({ type: INCOMING_MAILS_ERROR, payload: response.errors });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { errors: response.errors },
    });
  } else {
    yield put({
      type: UPDATE_INCOMING_MAIL_SUCCESS,
      payload: response,
    });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: {
        success: [
          { message: "Poczta przychodząca - rekord został zaktualizowany" },
        ],
      },
    });
  }
}

export function* updateIncomingMailWatcher() {
  yield takeEvery(UPDATING_INCOMING_MAIL, updateIncomingMailAsync);
}

function* removeIncomingMailAsync(action) {
  const { incomingMailId } = action;
  console.log("saga data", action);
  const graph = {
    query: `mutation {
      removeIncomingMail(incomingMailId: "${incomingMailId}"){
        _id
        errors{
          path
          message
        }
      }
    }`,
  };

  const incomingMailData = yield call(
    [axios, axios.post],
    "/graphql",
    JSON.stringify(graph),
    { headers: { "Content-Type": "application/json" } }
  );
  const response = incomingMailData.data.data.removeIncomingMail;

  if (response.errors) {
    yield put({ type: INCOMING_MAILS_ERROR, payload: response.errors });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { errors: response.errors },
    });
  } else {
    yield put({ type: REMOVE_INCOMING_MAIL_SUCCESS, payload: response });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: {
        success: [{ message: "Poczta przychodząca - rekord został usunięty" }],
      },
    });
  }
}

export function* removeIncomingMailWatcher() {
  yield takeEvery(REMOVING_INCOMING_MAIL, removeIncomingMailAsync);
}
