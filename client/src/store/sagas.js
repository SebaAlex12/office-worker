import { fork, all } from "redux-saga/effects";
import { fetchFiltersWatcher, updateFilterWatcher } from "./Filters/saga";
import {
  updateMessagesWatcher,
  updateAlertMessagesWatcher,
  removeAlertMessagesWatcher,
  fetchMessagesWatcher,
} from "./Messages/saga";
import {
  fetchCalendarsWatcher,
  addCalendarWatcher,
  updateCalendarWatcher,
  removeCalendarWatcher,
} from "./Calendar/saga";
import {
  fetchTasksWatcher,
  fetchTasksByLoggedUserProjectsWatcher,
  addTaskWatcher,
  updateTaskWatcher,
  removeTaskWatcher,
  sendMailingTaskWatcher,
} from "./Tasks/saga";
import {
  fetchCommentsWatcher,
  addCommentWatcher,
  removeCommentsByTaskIdWatcher,
} from "./Comments/saga";
import { addMailWatcher, fetchMailsWatcher } from "./Mails/saga";
import {
  fetchSettingsWatcher,
  updateSettingWatcher,
  addBackupDatabaseWatcher,
} from "./Settings/saga";
import {
  loginUserWatcher,
  registerUserWatcher,
  updateUserWatcher,
  fetchLoggedUserWatcher,
  fetchUsersWatcher,
  fetchUsersByLoggedUserProjectsWatcher,
  logoutUserWatcher,
} from "./Users/saga";
import {
  fetchUsersHistoryWatcher,
  addUserHistoryWatcher,
} from "./UsersHistory/saga";
import {
  fetchProjectsWatcher,
  fetchProjectsByLoggedUserProjectsWatcher,
  addProjectWatcher,
  updateProjectWatcher,
  removeProjectWatcher,
} from "./Projects/saga";
import {
  fetchStagesWatcher,
  addStageWatcher,
  updateStageWatcher,
  removeStageWatcher,
} from "./Stages/saga";
import {
  fetchIncomingMailsWatcher,
  addIncomingMailWatcher,
  updateIncomingMailWatcher,
  removeIncomingMailWatcher,
} from "./IncomingMails/saga";
import {
  fetchOutgoingMailsWatcher,
  addOutgoingMailWatcher,
  updateOutgoingMailWatcher,
  removeOutgoingMailWatcher,
} from "./OutgoingMails/saga";

import {
  fetchFilesWatcher,
  addFileWatcher,
  removeFileWatcher,
} from "./Files/saga";

export default function* rootSaga() {
  yield all([
    fork(addBackupDatabaseWatcher),
    fork(fetchSettingsWatcher),
    fork(updateSettingWatcher),
    fork(updateMessagesWatcher),
    fork(updateAlertMessagesWatcher),
    fork(removeAlertMessagesWatcher),
    fork(fetchMessagesWatcher),
    fork(fetchCalendarsWatcher),
    fork(addCalendarWatcher),
    fork(updateCalendarWatcher),
    fork(removeCalendarWatcher),
    fork(loginUserWatcher),
    fork(registerUserWatcher),
    fork(updateUserWatcher),
    fork(fetchLoggedUserWatcher),
    fork(fetchUsersWatcher),
    fork(fetchUsersByLoggedUserProjectsWatcher),
    fork(logoutUserWatcher),
    fork(fetchTasksWatcher),
    fork(fetchTasksByLoggedUserProjectsWatcher),
    fork(sendMailingTaskWatcher),
    fork(addTaskWatcher),
    fork(fetchCommentsWatcher),
    fork(addCommentWatcher),
    fork(addMailWatcher),
    fork(fetchMailsWatcher),
    fork(removeCommentsByTaskIdWatcher),
    fork(updateTaskWatcher),
    fork(removeTaskWatcher),
    fork(fetchUsersHistoryWatcher),
    fork(addUserHistoryWatcher),
    fork(fetchProjectsWatcher),
    fork(fetchProjectsByLoggedUserProjectsWatcher),
    fork(addProjectWatcher),
    fork(updateProjectWatcher),
    fork(removeProjectWatcher),
    fork(fetchStagesWatcher),
    fork(addStageWatcher),
    fork(updateStageWatcher),
    fork(removeStageWatcher),
    fork(fetchIncomingMailsWatcher),
    fork(addIncomingMailWatcher),
    fork(updateIncomingMailWatcher),
    fork(removeIncomingMailWatcher),
    fork(fetchOutgoingMailsWatcher),
    fork(addOutgoingMailWatcher),
    fork(updateOutgoingMailWatcher),
    fork(removeOutgoingMailWatcher),
    fork(fetchFiltersWatcher),
    fork(updateFilterWatcher),
    fork(fetchFilesWatcher),
    fork(addFileWatcher),
    fork(removeFileWatcher),
  ]);
}
