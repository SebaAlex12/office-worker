import {
  FETCHING_SETTINGS,
  UPDATING_SETTINGS,
  ADDING_BACKUP_DATABASE,
} from "./types";

export const fetchSettings = (data) => ({
  type: FETCHING_SETTINGS,
  data,
});

export const updateSettings = (data) => ({
  type: UPDATING_SETTINGS,
  data,
});

export const addBackupDatabase = () => ({
  type: ADDING_BACKUP_DATABASE,
});
