import React, { Component } from "react";
import { connect } from "react-redux";
import "./RemedyModal.scss";
import { LANGUAGES, CommonUtils } from "../../../utils";
import { FormattedMessage } from "react-intl";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class RemedyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email: '',
        imgBase64: ''
    };
  }

  async componentDidMount() {
    if(this.props.dataModal) {
        this.setState({
            email: this.props.dataModal.email
        })
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.dataModal !== this.props.dataModal) {
        this.setState({
            email: this.props.dataModal.email,
        })
    }
  }

  handleOnChange = (e, id) => {
    let valueInput = e.target.value
    let sateCopy = {...this.sate}
    sateCopy[id] = valueInput
    this.setState({
        ...sateCopy
    })
  }

  handleOnChangeImage = async (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imgBase64: base64
      });
    }
  };

  handleSendRedemy = () => {
    this.props.sendRemedyModal(this.state)
  }

  render() {
    let { isShowRemedyModal, closeRemedyModal, dataTime, language, dataModal, sendRemedyModal } =
      this.props;
    console.log(">>>Check", dataTime);
    return (
      <div>
        <Modal
          isOpen={isShowRemedyModal}
          className="booking-modal-container"
          size="lg"
          centered
        >
          <div className="modal-header">
            <h5 className="modal-title">Modal title</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={closeRemedyModal}>
                <span aria-hidden="true">x</span>
            </button>
          </div>
          <ModalBody>
            <div className="row">
                <div className="col-6 form-group">
                        <label htmlFor="">Email benh nhan</label>
                        <input type="email" className="form-control" value={this.state.email} onChange={(e) => this.handleOnChange(e, 'email')}/>
                </div>
                <div className="col-6 form-group">
                        <label htmlFor="">Chon File Hoa Don</label>
                        <input type="file" className="form-control-file" onChange={(e) => this.handleOnChangeImage(e)}/>
                </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.handleSendRedemy()}>
              Send
            </Button>{" "}
            <Button color="secondary" onClick={closeRemedyModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
