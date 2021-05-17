import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  FETCHING_OUTGOING_MAILS,
  FETCH_OUTGOING_MAILS_SUCCESS,
  ADDING_OUTGOING_MAIL,
  ADD_OUTGOING_MAIL_SUCCESS,
  REMOVING_OUTGOING_MAIL,
  REMOVE_OUTGOING_MAIL_SUCCESS,
  UPDATING_OUTGOING_MAIL,
  UPDATE_OUTGOING_MAIL_SUCCESS,
  OUTGOING_MAILS_ERROR,
} from "./types";

import { UPDATE_MESSAGES_SUCCESS } from "../Messages/types";

function* fetchOutgoingMailsAsync(action) {
  try {
    const graph = {
      query: `
        query {
          fetchOutgoingMails{
            _id
            date
            number
            recipient
            city
            zipcode
            street
            description
            comment
            collectionAmount
            collectionAmountGr1
            weight
            g
            transmittingNumber
            declaredAmount
            declaredAmountGr2
            payment
            paymentGr3
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
      type: FETCH_OUTGOING_MAILS_SUCCESS,
      payload: res.data.data.fetchOutgoingMails,
    });
  } catch (error) {
    yield put({ type: OUTGOING_MAILS_ERROR, payload: error });
  }
}

export function* fetchOutgoingMailsWatcher() {
  yield takeEvery(FETCHING_OUTGOING_MAILS, fetchOutgoingMailsAsync);
}

function* addOutgoingMailAsync(action) {
  // try {
  const data = action.data;
  const outgoingMailInput = {
    date: data.date,
    number: data.number,
    recipient: data.recipient,
    city: data.city,
    zipcode: data.zipcode,
    street: data.street,
    description: data.description,
    comment: data.comment,
    collectionAmount: data.collectionAmount,
    collectionAmountGr1: data.collectionAmountGr1,
    weight: data.weight,
    g: data.g,
    transmittingNumber: data.transmittingNumber,
    declaredAmount: data.declaredAmount,
    declaredAmountGr2: data.declaredAmountGr2,
    payment: data.payment,
    paymentGr3: data.paymentGr3,
  };

  const graph = {
    query: `mutation {
      addOutgoingMail(outgoingMailInput: {
      date: "${outgoingMailInput.date}",
      number: "${outgoingMailInput.number}",
      recipient: "${outgoingMailInput.recipient}",
      city: "${outgoingMailInput.city}",
      zipcode: "${outgoingMailInput.zipcode}",
      street: "${outgoingMailInput.street}",
      description: "${outgoingMailInput.description}",
      comment: "${outgoingMailInput.comment}",
      collectionAmount: "${outgoingMailInput.collectionAmount}",
      collectionAmountGr1: "${outgoingMailInput.collectionAmountGr1}",
      weight: "${outgoingMailInput.weight}",
      g: "${outgoingMailInput.g}",
      transmittingNumber: "${outgoingMailInput.transmittingNumber}",
      declaredAmount: "${outgoingMailInput.declaredAmount}",
      declaredAmountGr2: "${outgoingMailInput.declaredAmountGr2}",
      payment: "${outgoingMailInput.payment}",
      paymentGr3: "${outgoingMailInput.paymentGr3}"}){
        _id
        date
        number
        recipient
        city
        zipcode
        street
        description
        comment
        collectionAmount
        collectionAmountGr1
        weight
        g
        transmittingNumber
        declaredAmount
        declaredAmountGr2
        payment
        paymentGr3
        errors{
          path
          message
        }
      }
    }`,
  };

  const outgoingMailData = yield call(
    [axios, axios.post],
    "/graphql",
    JSON.stringify(graph),
    { headers: { "Content-Type": "application/json" } }
  );

  const response = outgoingMailData.data.data.addOutgoingMail;

  if (response.errors) {
    yield put({ type: OUTGOING_MAILS_ERROR, payload: response.errors });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { errors: response.errors },
    });
  } else {
    yield put({
      type: ADD_OUTGOING_MAIL_SUCCESS,
      payload: response,
    });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: {
        success: [{ message: "Poczta wychodząca - rekord dodany" }],
      },
    });
  }
}

export function* addOutgoingMailWatcher() {
  yield takeEvery(ADDING_OUTGOING_MAIL, addOutgoingMailAsync);
}

function* updateOutgoingMailAsync(action) {
  // try {
  const data = action.data;

  const outgoingMailInput = {
    _id: data._id,
    date: data.date ? data.date : "",
    number: data.number ? data.number : "",
    recipient: data.recipient ? data.recipient : "",
    city: data.city ? data.city : "",
    zipcode: data.zipcode ? data.zipcode : "",
    street: data.street ? data.street : "",
    description: data.description ? data.description : "",
    comment: data.comment ? data.comment : "",
    collectionAmount: data.collectionAmount ? data.collectionAmount : "",
    collectionAmountGr1: data.collectionAmountGr1 ? data.collectionAmountGr1 : "",
    weight: data.weight ? data.weight : "",
    g: data.g ? data.g : "",
    transmittingNumber: data.transmittingNumber ? data.transmittingNumber : "",
    declaredAmount: data.declaredAmount ?data.declaredAmount : "",
    declaredAmountGr2: data.declaredAmountGr2 ? data.declaredAmountGr2 : "",
    payment: data.payment ? data.payment : "",
    paymentGr3: data.paymentGr3 ? data.paymentGr3 : "",
  };

  const graph = {
    query: `mutation {
      updateOutgoingMail(outgoingMailInput: {
        _id: "${outgoingMailInput._id}",
        date: "${outgoingMailInput.date}",
        number: "${outgoingMailInput.number}",
        recipient: "${outgoingMailInput.recipient}",
        city: "${outgoingMailInput.city}",
        zipcode: "${outgoingMailInput.zipcode}",
        street: "${outgoingMailInput.street}",
        description: "${outgoingMailInput.description}",
        comment: "${outgoingMailInput.comment}",
        collectionAmount: "${outgoingMailInput.collectionAmount}",
        collectionAmountGr1: "${outgoingMailInput.collectionAmountGr1}",
        weight: "${outgoingMailInput.weight}",
        g: "${outgoingMailInput.g}",
        transmittingNumber: "${outgoingMailInput.transmittingNumber}",
        declaredAmount: "${outgoingMailInput.declaredAmount}",
        declaredAmountGr2: "${outgoingMailInput.declaredAmountGr2}",
        payment: "${outgoingMailInput.payment}",
        paymentGr3: "${outgoingMailInput.paymentGr3}"}){
        _id
        date
        number
        recipient
        city
        zipcode
        street
        description
        comment
        collectionAmount
        collectionAmountGr1
        weight
        g
        transmittingNumber
        declaredAmount
        declaredAmountGr2
        payment
        paymentGr3
        errors{
          path
          message
        }
      }
    }`,
  };
  const outgoingMailData = yield call(
    [axios, axios.post],
    "/graphql",
    JSON.stringify(graph),
    { headers: { "Content-Type": "application/json" } }
  );
  const response = outgoingMailData.data.data.updateOutgoingMail;
  if (response.errors) {
    yield put({ type: OUTGOING_MAILS_ERROR, payload: response.errors });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { errors: response.errors },
    });
  } else {
    yield put({
      type: UPDATE_OUTGOING_MAIL_SUCCESS,
      payload: response,
    });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: {
        success: [
          { message: "Poczta wychodząca - rekord został zaktualizowany" },
        ],
      },
    });
  }
}

export function* updateOutgoingMailWatcher() {
  yield takeEvery(UPDATING_OUTGOING_MAIL, updateOutgoingMailAsync);
}

function* removeOutgoingMailAsync(action) {
  const { outgoingMailId } = action;
  const graph = {
    query: `mutation {
      removeOutgoingMail(outgoingMailId: "${outgoingMailId}"){
        _id
        errors{
          path
          message
        }
      }
    }`,
  };

  const outgoingMailData = yield call(
    [axios, axios.post],
    "/graphql",
    JSON.stringify(graph),
    { headers: { "Content-Type": "application/json" } }
  );
  const response = outgoingMailData.data.data.removeOutgoingMail;

  if (response.errors) {
    yield put({ type: OUTGOING_MAILS_ERROR, payload: response.errors });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { errors: response.errors },
    });
  } else {
    yield put({ type: REMOVE_OUTGOING_MAIL_SUCCESS, payload: response });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: {
        success: [{ message: "Poczta wychodząca - rekord został usunięty" }],
      },
    });
  }
}

export function* removeOutgoingMailWatcher() {
  yield takeEvery(REMOVING_OUTGOING_MAIL, removeOutgoingMailAsync);
}
