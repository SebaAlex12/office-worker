import { combineReducers } from "redux";

import { calendarsReducer } from "./Calendar/reducers";
import { tasksReducer } from "./Tasks/reducers";
import { settingsReducer } from "./Settings/reducers";
import { commentsReducer } from "./Comments/reducers";
import { mailsReducer } from "./Mails/reducers";
import { usersReducer } from "./Users/reducers";
import { usersHistoryReducer } from "./UsersHistory/reducers";
import { projectsReducer } from "./Projects/reducers";
import { stagesReducer } from "./Stages/reducers";
import { incomingMailsReducer } from "./IncomingMails/reducers";
import { filesReducer } from "./Files/reducers";
import { filtersReducer } from "./Filters/reducers";
import { messagesReducer } from "./Messages/reducers";

export const reducers = combineReducers({
  calendars: calendarsReducer,
  tasks: tasksReducer,
  settings: settingsReducer,
  comments: commentsReducer,
  mails: mailsReducer,
  users: usersReducer,
  usersHistory: usersHistoryReducer,
  projects: projectsReducer,
  stages: stagesReducer,
  incomingMails: incomingMailsReducer,
  files: filesReducer,
  filters: filtersReducer,
  messages: messagesReducer,
});
