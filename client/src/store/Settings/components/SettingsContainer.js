import React from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons";

import { addBackupDatabase } from "../actions";

import { Button } from "../../../themes/basic";

const SettingsContainer = () => {
  const dispatch = useDispatch();

  const BackupDatabaseHandler = async () => {
    await dispatch(addBackupDatabase());
  };

  return (
    <Button onClick={BackupDatabaseHandler}>
      <FontAwesomeIcon icon={faArrowAltCircleDown} /> Zapisz kopie bazy danych
    </Button>
  );
};

export default SettingsContainer;
