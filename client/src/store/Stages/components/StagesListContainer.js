import React, { Component } from "react";
import { connect } from "react-redux";

import StagesBasicList from "./StagesBasicList";
import { sortArray } from "../../../common/tools";
import { removeStage, updateStage } from "../actions";

class StagesListContainer extends Component {
  constructor(props) {
    super(props);
    const { stages } = this.props;
    this.state = {
      stages: stages ? stages : [],
      filteredStages: stages ? stages : [],
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.stages != this.state.stages) {
      this.setState({
        ...this.state,
        stages: nextProps.stages,
        filteredStages: nextProps.stages,
      });
    }
  }
  sortItems = (column, direction) => {
    let { stages } = this.state;

    if (direction === "asc") {
      sortArray(stages, column);
    }
    if (direction === "desc") {
      sortArray(stages, column, -1);
    }
    console.log("stages", stages);
    this.setState({
      stages: stages,
    });
  };
  removeStagesHandler = async (id) => {
    const { stages, filteredStages } = this.state;
    const { removeStage } = this.props;

    const result = window.confirm("Czy na pewno chcesz usunąć wybrany etap !");

    if (result) {
      const response = await removeStage(id);
      // if (response) {
      //   this.setState({
      //     stages: stages.filter((item) => item._id !== id),
      //     filteredStages: filteredStages.filter((item) => item._id !== id),
      //   });
      // }
    }
  };
  updateStagesHandler = async (element) => {
    const { stages } = this.state;
    const { updateStage } = this.props;

    const response = await updateStage(element);
    if (response) {
      this.setState({
        stages: stages.map((item) =>
          item._id == element._id ? element : item
        ),
      });
    }
  };
  onChangeStagesSearcherHandler = (event) => {
    const { stages } = this.state;
    if (event.target.name !== undefined) {
      const filteredStages = stages.filter((item) => {
        return (
          item[event.target.name].toLowerCase().indexOf(event.target.value) !==
          -1
        );
      });
      this.setState({
        filteredStages: filteredStages,
      });
    } else {
      this.setState({
        filteredStages: stages,
      });
    }
  };
  render() {
    const { filteredStages } = this.state;
    console.log("filteredStages", filteredStages);
    console.log("render");
    const stageListContent = (
      <StagesBasicList
        items={filteredStages}
        sortItems={this.sortItems}
        removeItem={this.removeStagesHandler}
        updateItem={this.updateStagesHandler}
        searchItem={this.onChangeStagesSearcherHandler}
      />
    );
    return (
      <div>
        <h1>Etapy</h1>
        {stageListContent}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stages: state.stages.stages,
  };
};

export default connect(mapStateToProps, { removeStage, updateStage })(
  StagesListContainer
);
