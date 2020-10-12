import styled from "styled-components";

export const StyledProjectDetailsContainer = styled.div`
  .project-details-container-box {
    text-align: left;
  }
  .project-details-container-box > h1 {
    margin-top: 0px;
  }
  .project-info-box {
    display: flex;
    flex-direction: row;
  }
  .project-info-box .left-box,
  .project-info-box .right-box {
    width: 50%;
    text-align: left;
  }
  .project-info-box .left-box > div,
  .project-info-box .right-box > div {
    padding: 5px 0px;
  }
  .project-info-box .left-box span:first-child,
  .project-info-box .right-box span:first-child {
    font-weight: bold;
    width: 180px;
    display: inline-block;
  }
  .users-info-box .users-box {
    display: flex;
    flex-direction: row;
  }
  .users-info-box .user {
    display: flex;
    flex-direction: column;
  }
  .users-info-box .user {
    width: 50%;
    padding-right: 10px;
  }
  .users-info-box .user > div {
    padding: 5px 0px;
  }
  .users-info-box .user > div > span:first-child {
    font-weight: bold;
    width: 200px;
    display: inline-block;
  }
`;
