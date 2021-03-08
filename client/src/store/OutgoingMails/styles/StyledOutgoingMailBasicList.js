import styled from "styled-components";

export const StyledOutgoingMailBasicList = styled.div`
  .outgoing-mails-basic-list-box table thead i {
    cursor: pointer;
    margin-left: 2px;
    margin-right: 2px;
    display: block;
  }
  .outgoing-mails-basic-list-box table tr:hover {
    background-color: #f1f1f1;
  }
  .outgoing-mails-basic-list-box table input {
    text-align: center;
  }
  .outgoing-mails-basic-list-box table thead .form-group,
  .outgoing-mails-basic-list-box table tbody tr:first-child .form-group {
    margin-bottom: 0px;
  }
  .outgoing-mails-basic-list-box table thead .form-group input {
    font-weight: normal;
  }
  .outgoing-mails-basic-list-box .search-item {
    position: relative;
  }
  .outgoing-mails-basic-list-box .search-item .reset-button {
    position: absolute;
    right: 5px;
    top: 5px;
  }
  .outgoing-mails-basic-list-box table .th-name{
    clear:both;
  }
  .outgoing-mails-basic-list-box table .th-sort{
    display:flex;
    flex-direction:row;
  }
  .outgoing-mails-basic-list-box table tr > th.ordinalNumber {
    width: 30px;
  }
  .outgoing-mails-basic-list-box table .number {
    width: 100px;
  }
  .outgoing-mails-basic-list-box table .date input[type="date"]{
    width: 110px;
  }
  .outgoing-mails-basic-list-box table .recipient {
    width: 105px;
  }
  .outgoing-mails-basic-list-box table .city {
    width: 30px;
  }
  .outgoing-mails-basic-list-box table .zipcode {
    width: 110px;
  }
  .outgoing-mails-basic-list-box table .street {
    width: 110px;
  }
  .outgoing-mails-basic-list-box table .collectionAmount {
    width: 110px;
  }
  .outgoing-mails-basic-list-box table .collectionAmountGr1 {
    width: 80px;
  }
  .outgoing-mails-basic-list-box table .weight {
    width: 110px;
  }
  .outgoing-mails-basic-list-box table .g {
    width: 80px;
  }
  .outgoing-mails-basic-list-box table .transmittingNumber {
    width: 110px;
  }
  .outgoing-mails-basic-list-box table .declaredAmount {
    width: 110px;
  }
  .outgoing-mails-basic-list-box table .declaredAmountGr2 {
    width: 80px;
  }
  .outgoing-mails-basic-list-box table .payment {
    width: 110px;
  }
  .outgoing-mails-basic-list-box table .paymentGr3 {
    width: 80px;
  }
  .outgoing-mails-basic-list-box table .description {
    width: 80px;
  }
  .outgoing-mails-basic-list-box table .actions {
    width: 95px;
  }
  .outgoing-mails-basic-list-box table thead .actions {
    text-align: center;
  }
  .outgoing-mails-basic-list-box table tbody .actions {
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
