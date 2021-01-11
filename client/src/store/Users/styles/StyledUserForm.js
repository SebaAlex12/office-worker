import styled from "styled-components";

export const StyledUserForm = styled.div`
  .registry-form-box {
    padding: 15px;
    background-color: #fff;
    -webkit-transition: all 0.3s ease-in-out 0s;
    transition: all 0.3s ease-in-out 0s;
    border-radius: 5px;
    border: 1px solid lightgrey;
  }
  .registry-form-box .multi-checkboxes {
    height: 150px;
    overflow-y: scroll;
    text-align: left;
  }
  .registry-form-box .multi-checkboxes .checkbox-item {
    display: flex;
    flex-direction: row;
    padding: 2px;
  }
  .registry-form-box .multi-checkboxes .checkbox-item input {
    cursor: pointer;
    padding: 5px;
  }
  .registry-form-box .multi-checkboxes .checkbox-item div {
    cursor: auto;
    padding-left: 5px;
  }
`;
