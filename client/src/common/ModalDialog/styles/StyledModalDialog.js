import styled from "styled-components";

export const StyledModalDialog = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  z-index: 10001;
  .modal-dialog-box .content {
    position: relative;
    display: block;
    margin-left: auto;
    margin-right: auto;
    color: #000;
    font-size: 16px;
    margin-top: 60px;
    background-color: #fff;
    padding: 30px;
    max-height: 1vh;
    overflow-y: auto;
  }
  .modal-dialog-box .content .title {
    font-size: 18px;
    font-weight: bold;
    float: left;
  }
  .modal-dialog-box .content .close-button {
    cursor: pointer;
    font-weight: bold;
    position: absolute;
    right: 2px;
    top: 5px;
  }
  .modal-dialog-box > .content > .description {
    clear: both;
  }
  .modal-dialog-box > .content > .description > iframe {
    width: 100%;
    height: 460px;
  }
  .mail-add-form-box > form {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .mail-add-form-box > form > .form-group {
    width: 50%;
    box-sizing: border-box;
    padding: 0px 10px;
  }
  .mail-add-form-box > form > .form-group:nth-child(7),
  .mail-add-form-box > form > .form-group:nth-child(8) {
    width: 100%;
  }
  .mail-add-form-box > form > .form-group:nth-child(7) textarea {
    height: 150px;
  }
`;
