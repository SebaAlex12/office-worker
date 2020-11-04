import React from "react";
import "./App.css";
import moment from "moment";

import store from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import jwt_decode from "jwt-decode";

import logo from "./adwokaci-lodz.png";

import { loginUser, fetchLoggedUser, fetchUsers } from "./store/Users/actions";
import { fetchProjects } from "./store/Projects/actions";
import LoginForm from "./store/Users/components/LoginForm";
import { fetchSettings } from "./store/Settings/actions";

import Dashboard from "./themes/layout/Dashboard";
import MessagesList from "./store/Messages/components/MessagesList";

import { StyledResponsive } from "./StyledResponsive";

if (localStorage.jwtTokenAuthorization) {
  const {
    _id,
    name,
    email,
    address,
    phone,
    status,
    company,
    projects,
    users,
    lastActive,
    createdAt,
    tokenCreatedAt,
    logged,
  } = jwt_decode(localStorage.jwtTokenAuthorization);

  const expiredMinutes = 560;

  const difference = moment(new Date()).diff(tokenCreatedAt, "minutes");
  // console.log("difference", difference);

  if (difference < expiredMinutes) {
    store.dispatch(
      fetchLoggedUser({
        _id,
        name,
        email,
        address,
        phone,
        status,
        company,
        projects,
        users,
        createdAt,
        lastActive,
        tokenCreatedAt,
        logged,
      })
    );
    if (status === "Administrator") {
      store.dispatch(fetchUsers());
      store.dispatch(fetchProjects());
    } else {
      store.dispatch(fetchUsers());
      store.dispatch(fetchProjects());
    }
    store.dispatch(fetchSettings());
  } else {
    localStorage.removeItem("jwtTokenAuthorization");
  }
}

function App() {
  const loginUserHandler = async (data) => {
    try {
      const response = await store.dispatch(loginUser(data));
      if (response) {
        console.log("response", response);
        setTimeout(() => (window.location.href = "/"), 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Provider store={store}>
      <ThemeProvider theme={{ mode: "light" }}>
        <Router>
          <StyledResponsive>
            <div className="App">
              <MessagesList />
              {!localStorage.jwtTokenAuthorization ||
              localStorage.jwtTokenAuthorization === undefined ? (
                <div className="login-box">
                  <img
                    style={{
                      padding: "10px",
                      marginTop: "50px",
                    }}
                    src={logo}
                    alt=""
                  />
                  <LoginForm loginUserHandler={loginUserHandler} />
                </div>
              ) : (
                <Dashboard />
              )}
            </div>
          </StyledResponsive>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
