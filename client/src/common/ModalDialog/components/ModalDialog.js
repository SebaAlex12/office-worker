import React, { useState } from "react";
import { StyledModalDialog } from "../styles/StyledModalDialog";

import { WarningButton } from "../../../themes/basic";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ModalDialog = (props) => {
  const { title, width, minHeight } = props;
  const [open, setOpen] = useState(true);

  const $modalContent = open ? (
    <StyledModalDialog>
      <div className="modal-dialog-box">
        <div
          className="button-close"
          title="Zamknij okno"
          onClick={() => setOpen(false)}
          style={{
            position: "absolute",
            left: "0px",
            right: "0px",
            top: "0px",
            bottom: "0px",
            zIndex: "10010",
            cursor: "pointer",
          }}
        />
        <div
          className="content"
          style={{
            width: width ? width : "780px",
            minHeight: minHeight ? minHeight : "90vh",
            zIndex: "10011",
          }}
        >
          <div className="title">{title}</div>
          <WarningButton
            className="close-button"
            onClick={() => setOpen(false)}
            title="Zamknij okno"
          >
            <FontAwesomeIcon icon={faTimes} />
          </WarningButton>
          <div className="description">{props.children}</div>
        </div>
      </div>
    </StyledModalDialog>
  ) : null;

  return <React.Fragment>{$modalContent}</React.Fragment>;
};
export default ModalDialog;
