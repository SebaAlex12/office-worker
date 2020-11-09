import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment/min/moment-with-locales";

import { updateProject } from "../../actions";
import ProjectsToggleEditItem from "../ProjectsToggleEditItem";
import { Button } from "../../../../themes/basic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import TextFieldGroup from "../../../../common/Forms/components/TextFieldGroup";

class ProjectsDetailsInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.item.name,
      signatures: this.props.item.signature ? this.props.item.signature : [],
      organs: this.props.item.organ ? this.props.item.organ : [],
      signatureValue: "",
      organValue: "",
    };
  }
  onChangeInput = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    });
  };
  updateItemName = () => {
    const { name } = this.state;
    const { item, updateProject } = this.props;
    const response = updateProject({ _id: item._id, name: name });
  };
  updateItemSignarure = async () => {
    const { signatures } = this.state;
    const { updateProject, item } = this.props;
    const response = await updateProject({
      _id: item._id,
      signature: signatures,
    });
  };
  updateItemOrgan = async () => {
    const { organs } = this.state;
    const { updateProject, item } = this.props;
    const response = await updateProject({
      _id: item._id,
      organ: organs,
    });
  };
  onChangeInputSignature = (event, id) => {
    const { signatures } = this.state;
    let data = signatures.map((item) => {
      if (item.id == id) {
        item.name = event.target.value;
      }
      return item;
    });
    this.setState({
      ...this.state,
      signatures: data,
    });
  };
  onChangeInputOrgan = (event, id) => {
    const { organs } = this.state;
    let data = organs.map((item) => {
      if (item.id == id) {
        item.name = event.target.value;
      }
      return item;
    });
    this.setState({
      ...this.state,
      organs: data,
    });
  };
  addItemSignature = async () => {
    const { signatures, signatureValue } = this.state;
    const { updateProject, item } = this.props;

    let data = [...signatures];

    if (signatureValue.length > 0) {
      data.push({
        id: data.length > 0 ? data[data.length - 1]["id"] + 1 : 1,
        name: signatureValue,
      });
      const response = await updateProject({
        _id: item._id,
        name: item.name,
        signature: data,
      });

      if (response) {
        this.setState({
          ...this.state,
          signatures: data,
          signatureValue: "",
        });
      }
    }
  };
  addItemOrgan = async () => {
    const { organs, organValue } = this.state;
    const { updateProject, item } = this.props;

    let data = [...organs];

    if (organValue.length > 0) {
      data.push({
        id: data.length > 0 ? data[data.length - 1]["id"] + 1 : 1,
        name: organValue,
      });
      const response = await updateProject({
        _id: item._id,
        name: item.name,
        organ: data,
      });

      if (response) {
        this.setState({
          ...this.state,
          organs: data,
          organValue: "",
        });
      }
    }
  };
  removeItemSignature = async (id) => {
    const result = window.confirm("Czy na pewno chcesz usunąć sygnaturę !");

    if (result) {
      const { signatures } = this.state;
      const { updateProject, item } = this.props;
      let data = signatures.filter((signature) => signature.id !== id);
      const response = await updateProject({ _id: item._id, signature: data });
      if (response) {
        this.setState({
          ...this.state,
          signatures: data,
        });
      }
    }
  };
  removeItemOrgan = async (id) => {
    const result = window.confirm("Czy na pewno chcesz usunąć organ !");

    if (result) {
      const { organs } = this.state;
      const { updateProject, item } = this.props;
      let data = organs.filter((organ) => organ.id !== id);
      const response = await updateProject({ _id: item._id, organ: data });
      if (response) {
        this.setState({
          ...this.state,
          organs: data,
        });
      }
    }
  };
  render() {
    const { name, signatures, organs, signatureValue, organValue } = this.state;
    const { item } = this.props;

    // console.log("state", this.state);

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
            <span
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "baseline",
              }}
            >
              <TextFieldGroup
                type="text"
                onChange={this.onChangeInput}
                name="name"
                value={name}
                style={{ width: "450px" }}
              />
              <Button className="edit" onClick={this.updateItemName}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </Button>
            </span>
          </div>
          <div className="type">
            <span>Rodzaj:</span>
            <span>{item.type}</span>
          </div>
        </div>
        <div className="right-box">
          <table className="signature-organ-box">
            <thead>
              <tr>
                <th className="signature">Sygnatura</th>
                <th className="organ">Organ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="signature">
                  <ProjectsToggleEditItem
                    items={signatures}
                    addItem={this.addItemSignature}
                    removeItem={this.removeItemSignature}
                    updateItem={this.updateItemSignarure}
                    onChangeInputUpdateItem={this.onChangeInputSignature}
                    onChangeInputItem={this.onChangeInput}
                    onChangeInputNameItem="signatureValue"
                    itemValue={signatureValue}
                  />
                </td>
                <td className="organ">
                  <ProjectsToggleEditItem
                    items={organs}
                    addItem={this.addItemOrgan}
                    removeItem={this.removeItemOrgan}
                    updateItem={this.updateItemOrgan}
                    // editItem={editItem}
                    onChangeInputUpdateItem={this.onChangeInputOrgan}
                    onChangeInputItem={this.onChangeInput}
                    onChangeInputNameItem="organValue"
                    itemValue={organValue}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default connect(null, { updateProject })(ProjectsDetailsInfo);
