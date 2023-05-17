import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
import _ from "lodash";
//lodash dung de kiem tra object hoac arr
class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };

    this.listenToEmitter();
  }

  listenToEmitter() {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        firstName: "",
        lastName: "",
        address: "",
      });
    });
  }

  componentDidMount() {
    let user = this.props.currentUser;
    if (user && !_.isEmpty(user)) {
      this.setState({
        // email: user.email,
        // password: "harcode",
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
      });
    }
  }

  toggle = () => {
    this.props.toggleFromParent();
  };

  handleOnChangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };

  // Check Info in input enough
  checkValideInput = () => {
    let isValid = true;
    let arrInput = ["firstName", "lastName", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      //   console.log(
      //     ">>> Check inside loop: ",
      //     this.state[arrInput[i]],
      //     ">>> Feild: ",
      //     arrInput[i]
      //   );
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleSaveUser = () => {
    let isValid = this.checkValideInput();
    if (isValid === true) {
      // call API edit user
      this.props.editUser(this.state);
    }
  };

  render() {
    const { isOpen } = this.props;
    const { firstName, lastName, address } = this.state;


    return (
      <Modal
        isOpen={isOpen}
        toggle={this.toggle}
        size="lg"
        centered
        className={"modal-user-container"}
      >
        <ModalHeader toggle={this.toggle}>Edit user</ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label>First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => this.handleOnChangeInput(e, "firstName")}
              />
            </div>
            <div className="input-container">
              <label>Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => this.handleOnChangeInput(e, "lastName")}
              />
            </div>
            <div className="input-container max-width-input">
              <label>Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => this.handleOnChangeInput(e, "address")}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            onClick={() => {
              this.handleSaveUser();
            }}
          >
            Save Changes
          </Button>
          <Button color="secondary" className="px-3" onClick={this.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
