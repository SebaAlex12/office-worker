import styled from "styled-components";

export const StyledStageBasicList = styled.div`
  .stages-basic-list-box table thead i {
    cursor: pointer;
    margin-left: 2px;
    margin-right: 2px;
    display: block;
    float: left;
  }
  .stages-basic-list-box table input {
    text-align: center;
  }
  .stages-basic-list-box table thead .form-group,
  .stages-basic-list-box table tbody tr:first-child .form-group {
    margin-bottom: 0px;
  }
  .stages-basic-list-box table thead .form-group input {
    font-weight: normal;
  }
  .stages-basic-list-box .search-item {
    position: relative;
  }
  .stages-basic-list-box .search-item .reset-button {
    position: absolute;
    right: 5px;
    top: 5px;
  }
  .stages-basic-list-box table tr > th.ordinalNumber {
    width: 30px;
  }
  .stages-basic-list-box table .createdAt {
    width: 130px;
  }
  .stages-basic-list-box table .description {
    width: 280px;
  }
  .stages-basic-list-box table .createdBy {
    width: 150px;
  }
  .stages-basic-list-box table .termAt {
    width: 80px;
  }
  .stages-basic-list-box table .actions {
    width: 110px;
  }
  .stages-basic-list-box table thead .actions {
    text-align: center;
  }
  .stages-basic-list-box table tbody .actions {
    text-align: right;
  }
`;
