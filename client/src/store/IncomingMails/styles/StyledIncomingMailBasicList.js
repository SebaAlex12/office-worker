import styled from "styled-components";

export const StyledIncomingMailBasicList = styled.div`
  .incoming-mails-basic-list-box .create-pdf-button{
    display: block;
    float: left;
  }
  .incoming-mails-basic-list-box table thead i {
    cursor: pointer;
    margin-left: 2px;
    margin-right: 2px;
    display: block;
    float: left;
  }
  .incoming-mails-basic-list-box table tr:hover {
    background-color: #f1f1f1;
  }
  .incoming-mails-basic-list-box table input {
    text-align: center;
  }
  .incoming-mails-basic-list-box table thead .form-group,
  .incoming-mails-basic-list-box table tbody tr:first-child .form-group {
    margin-bottom: 0px;
  }
  .incoming-mails-basic-list-box table thead .form-group input {
    font-weight: normal;
  }
  .incoming-mails-basic-list-box .search-item {
    position: relative;
  }
  .incoming-mails-basic-list-box .search-item .reset-button {
    position: absolute;
    right: 5px;
    top: 5px;
  }
  .incoming-mails-basic-list-box table tr > th.ordinalNumber {
    width: 30px;
  }
  .incoming-mails-basic-list-box table .number {
    width: 160px;
  }
  .incoming-mails-basic-list-box table .deliveryDate {
    width: 130px;
  }
  .incoming-mails-basic-list-box table .sender {
    width: 105px;
  }
  .incoming-mails-basic-list-box table .deliveryCase {
    width: 30px;
  }
  .incoming-mails-basic-list-box table .signature {
    width: 110px;
  }
  .incoming-mails-basic-list-box table .description {
    width: 80px;
  }
  .incoming-mails-basic-list-box table .actions {
    width: 95px;
  }
  .incoming-mails-basic-list-box table thead .actions {
    text-align: center;
  }
  .incoming-mails-basic-list-box table tbody .actions {
    text-align: right;
  }
  .catalog-item-desc-box {
    position: relative;
  }
  .catalog-item-desc-box button {
    position: absolute;
    right: 0px;
    bottom: 0px;
  }
`;
