import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment/min/moment-with-locales";

import { updateProject } from "../../actions";
import ProjectsToggleEditItem from "../ProjectsToggleEditItem";

class ProjectsDetailsInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signatures: [
        {
          id: 1,
          name: "TGERTS",
        },
        {
          id: 2,
          name: "YWKER",
        },
      ],
      organs: [
        {
          id: 1,
          name: "Sąd najwyższy w Sadach",
        },
        {
          id: 2,
          name: "Sąd troche niższy w Kolonii",
        },
      ],
      toggleAddSignature: false,
      toggleAddOrgan: false,
    };
  }
  render() {
    const {
      signatures,
      organs,
      toggleAddSignature,
      toggleAddOrgans,
    } = this.state;
    const { item } = this.props;

    return (
      <div className="project-info-box">
        <div className="left-box">
          <div className="createdAt">
            <span>Data zarejestrowania:</span>
            <span>
              {moment(new Date(item.createdAt)).locale("pl").format("LLLL")}
            </span>
          </div>
          <div className="name">
            <span>Nazwa sprawy:</span>
            <span>{item.name}</span>
          </div>
          <div className="type">
            <span>Rodzaj:</span>
            <span>{item.type}</span>
          </div>
        </div>
        <div className="right-box">
          <ProjectsToggleEditItem items={signatures} title="Sygnatura:" />
          <ProjectsToggleEditItem items={organs} title="Organ:" />
        </div>
      </div>
    );
  }
}

export default connect(null, { updateProject })(ProjectsDetailsInfo);
