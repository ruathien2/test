import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageClinic.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import { CommonUtils } from "../../../utils";
import { createNewClinic } from "../../../services/userService";
import { toast } from "react-toastify";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
      address: ""
    };
  }

  componentDidMount() {}

  handleOnChangeInput = (e, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = e.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionMarkdown: text,
      descriptionHTML: html,
    });
  };

  handleOnChangeImage = async (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);

      this.setState({
        imageBase64: base64,
      });
    }
  };

  handleSaveNewSpecialty = async () => {
    let res = await createNewClinic(this.state);
    if (res && res.errCode === 0) {
      toast.success("Create User Successed !!!");
    } else {
      toast.error("Update user Failed");
    }
    console.log(this.state);
  };

  render() {
    let { name, address } = this.state;
    return (
      <div className="manage-specialty-container">
        <div className="ms-title">Quan Ly Phong Kham</div>
        <div className="all-specialty">
          <div className="col-6 form-group">
            <label htmlFor="">Ten Chuyen Khoa</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => this.handleOnChangeInput(e, "name")}
            />
          </div>
          <div className="col-6 form-group">
            <label htmlFor="">Dia Chi</label>
            <input
              type="text"
              className="form-control"
              value={address}
              onChange={(e) => this.handleOnChangeInput(e, "address")}
            />
          </div>
          <div className="col-6 form-group">
            <label htmlFor="">Anh Chuyen Khoa</label>
            <input
              type="file"
              className="form-control-file"
              onChange={(e) => this.handleOnChangeImage(e)}
            />
          </div>
          <div className="col-12">
            <MdEditor
              style={{ height: "500px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.descriptionMarkdown}
            />
          </div>
          <div className="col-12">
            <button onClick={() => this.handleSaveNewSpecialty()}>Save</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
