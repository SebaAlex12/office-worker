import React, { Component } from "react";
import axios from "axios";

import ModalDialog from "../common/ModalDialog/components/ModalDialog";

class AxiosErrorHandler extends Component {
  state = {
    message: "",
    url: "",
    data: "",
  };
  sniffing = () => {
    axios.interceptors.request.use(null, (error) => {
      this.setState({
        ...this.state,
        message: error.message,
        url: error.config.url,
        data: error.config.data,
      });
      return Promise.reject(error);
    });
    axios.interceptors.response.use(null, (error) => {
      this.setState({
        ...this.state,
        message: error.message,
        url: error.config.url,
        data: error.config.data,
      });
      return Promise.reject(error);
    });
  };
  render() {
    const { message, url, data } = this.state;
    this.sniffing();
    const errorContent = message.length > 0 && (
      <ModalDialog minHeight="150px">
        <h4>Błąd żądania</h4>
        <ul style={{ listStyleType: "none", margin: "0px", padding: "0px" }}>
          <li>komunikat: {message}</li>
          <li>ścieżka: {url}</li>
          <li>dane: {data}</li>
        </ul>
        <span style={{ color: "green", fontWeight: "bold" }}>
          Prosimy wysłać ten komunikat do programisty on się tym zajmie
        </span>
      </ModalDialog>
    );
    return <React.Fragment>{errorContent}</React.Fragment>;
  }
}

export default AxiosErrorHandler;
