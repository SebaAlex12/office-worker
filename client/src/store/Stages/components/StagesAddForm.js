import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

import TextFieldGroup from "../../../common/Forms/components/TextFieldGroup";
import TextareaFieldGroup from "../../../common/Forms/components/TextareaFieldGroup";
import { addStage } from "../actions";
import { StyledStageAddForm } from "../styles/StyledStageAddForm";

import { updateProject } from "../../Projects/actions";

class StagesAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      termAt: "",
    };
  }
  onChangeInput = (event) => {
    this.setState({
      ...this.state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  onChangeSelect = (event) => {
    this.setState({
      ...this.state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  addHandler = async (event) => {
    const { addStage, projectId, updateProject, stages } = this.props;
    const { description, termAt } = this.state;

    const data = {
      projectId,
      description,
      termAt,
    };
    event.preventDefault();
    const stageResponse = await addStage(data);
    if (stageResponse) {
      const projectResponse = await updateProject({
        _id: projectId,
        lastStageDescription: description,
        lastStageCreatedAt: termAt,
      });
    }
    this.setState({
      ...this.state,
      description: "",
      termAt: "",
    });
  };
  render() {
    const { description, termAt } = this.state;

    return (
      <StyledStageAddForm>
        <div className="stage-add-form-box">
          <form action="">
            <TextareaFieldGroup
              title="Treść wpisu"
              onChange={this.onChangeInput}
              name="description"
              value={description}
              cols="4"
              rows="6"
              placeholder="Treść wpisu"
            />
            <TextFieldGroup
              label="Termin czynności"
              type="datetime-local"
              title="Termin czynności"
              onChange={this.onChangeInput}
              name="termAt"
              value={termAt}
              placeholder="Wprowadź termin czynności"
            />
            <div className="form-group">
              <input
                onClick={this.addHandler}
                className="btn btn-primary float-right"
                type="submit"
                value="dodaj"
              />
            </div>
          </form>
        </div>
      </StyledStageAddForm>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stages: state.stages.stages,
  };
};

export default connect(mapStateToProps, { addStage, updateProject })(
  StagesAddForm
);
