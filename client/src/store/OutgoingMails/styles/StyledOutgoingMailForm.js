import styled from "styled-components";

export const StyledOutgoingMailForm = styled.div`
  .outgoing-mail-add-form-box {
    width: 960px;
    padding: 15px;
    background-color: #fff;
    -webkit-transition: all 0.3s ease-in-out 0s;
    transition: all 0.3s ease-in-out 0s;
    border-radius: 5px;
    border: 1px solid lightgrey;
  }
  .outgoing-mail-add-form-box form{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .outgoing-mail-add-form-box .form-group{
    margin-bottom: 15px;
    width: 25%;
    padding: 0px 15px;
  }
  .outgoing-mail-add-form-box .form-group.submit{
    width:100%;
    text-align:right;
  }
`;
