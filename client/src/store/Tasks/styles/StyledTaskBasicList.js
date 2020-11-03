import styled from "styled-components";

export const StyledTaskBasicList = styled.div`
  .tasks-basic-list-box table thead i {
    cursor: pointer;
    margin-left: 2px;
    margin-right: 2px;
    display: block;
    float: left;
  }
  .tasks-basic-list-box table input {
    text-align: center;
  }
  .tasks-basic-list-box table thead .form-group,
  .tasks-basic-list-box table tbody tr:first-child .form-group {
    margin-bottom: 0px;
  }
  .tasks-basic-list-box table thead .form-group input {
    font-weight: normal;
  }
  .tasks-basic-list-box .search-item {
    position: relative;
  }
  .tasks-basic-list-box .search-item .reset-button {
    position: absolute;
    right: 5px;
    top: 5px;
  }
  .tasks-basic-list-box table tr:hover {
    background-color: #f1f1f1;
  }
  .tasks-basic-list-box table .title {
    width: 160px;
  }
  .tasks-basic-list-box table tr.complete {
    background-color: #d0efd0;
  }
  .tasks-basic-list-box table tr > th.ordinalNumber {
    width: 30px;
  }
  .tasks-basic-list-box table .projectName {
    width: 130px;
  }
  .tasks-basic-list-box table .status {
    width: 105px;
  }
  .tasks-basic-list-box table .priority {
    width: 30px;
  }
  .tasks-basic-list-box table .createdBy {
    width: 110px;
  }
  .tasks-basic-list-box table .responsiblePerson {
    width: 80px;
  }
  .tasks-basic-list-box table .termAt {
    width: 80px;
  }
  .tasks-basic-list-box table .createdAt {
    width: 80px;
  }
  .tasks-basic-list-box table .actions {
    width: 95px;
  }
  .tasks-basic-list-box table thead .actions {
    text-align: center;
  }
  .tasks-basic-list-box table tbody .actions {
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
