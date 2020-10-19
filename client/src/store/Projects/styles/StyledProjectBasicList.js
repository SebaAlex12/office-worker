import styled from "styled-components";

export const StyledProjectBasicList = styled.div`
  .projects-basic-list-box table thead i {
    cursor: pointer;
    margin-left: 2px;
    margin-right: 2px;
    display: block;
    float: left;
  }
  .projects-basic-list-box table input {
    text-align: center;
  }
  .projects-basic-list-box table thead .form-group,
  .projects-basic-list-box table tbody tr:first-child .form-group {
    margin-bottom: 0px;
  }
  .projects-basic-list-box table thead .form-group input {
    font-weight: normal;
  }
  .projects-basic-list-box .search-item {
    position: relative;
  }
  .projects-basic-list-box .search-item .reset-button {
    position: absolute;
    right: 5px;
    top: 5px;
  }
  .projects-basic-list-box table tr:hover {
    background-color: #f1f1f1;
  }
  .projects-basic-list-box table tr > th.ordinalNumber {
    width: 30px;
  }
  .projects-basic-list-box table tr > th.name {
    width: 160px;
  }
  .projects-basic-list-box table tr > th.createdAt {
    width: 130px;
  }
  .projects-basic-list-box table tr > th.type {
    width: 105px;
  }
  .projects-basic-list-box table tr > th.signature {
    width: 30px;
  }
  .projects-basic-list-box table tr > th.lastComments {
    width: 110px;
  }
  .projects-basic-list-box table tr > th.termAt {
    width: 80px;
  }
  .projects-basic-list-box table tr > th.actions {
    width: 95px;
  }
  .projects-basic-list-box table thead .actions {
    text-align: center;
  }
  .projects-basic-list-box table tbody .actions {
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
