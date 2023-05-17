import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import "./Login.scss";
// import { FormattedMessage } from "react-intl";
import { handleLoginApi } from "../../services/userService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      isShowPassword: false,
      errMessage: "",
    };
  }

  onChangeUserName = (item) => {
    this.setState({
      userName: item.target.value,
    });
  };

  onChangePassword = (item) => {
    this.setState({
      password: item.target.value,
    });
  };

  handleOnClickLogin = async () => {
    this.setState({
      errMessage: "",
    });
    try {
      let data = await handleLoginApi(this.state.userName, this.state.password);
      if(data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message
        })
      }else if(data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user)
        console.log('Login succeeds')
      }
    } catch (err) {
      if (err.response) {
        if (err.response.data) {
          this.setState({
            errMessage: err.response.data.message,
          });
        }
      }
      console.log(err);
    }
  };

  handleShowPassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };

  handleKeyDown = (e) => {
    if(e.key === "Enter") {
      this.handleOnClickLogin()
    }
  }

  render() {
    const { userName, password, isShowPassword } = this.state;

    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-login">Login</div>
            <div className="col-12 form-group login-input">
              <label htmlFor="">Username:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Your Username"
                value={userName}
                onChange={(item) => this.onChangeUserName(item)}
              />
            </div>
            <div className="col-12 form-group login-input password">
              <label htmlFor="">Password:</label>
              <input
                type={isShowPassword === true ? "text" : "password"}
                className="form-control"
                placeholder="Enter Your Password"
                value={password}
                onChange={(item) => this.onChangePassword(item)}
                onKeyDown={this.handleKeyDown}
              />
              <span onClick={() => this.handleShowPassword()}>
                <i
                  className={
                    isShowPassword === true ? "far fa-eye" : "far fa-eye-slash"
                  }
                ></i>
              </span>
            </div>
            <div className="col-12" style={{ color: "red" }}>
              {this.state.errMessage}
            </div>
            <div className="col-12">
              <button
                className="btn-login"
                onClick={(item) => this.handleOnClickLogin(item)}
              >
                Login
              </button>
            </div>
            <div className="col-12">
              <span className="forgot-password">Forgot your password ?</span>
            </div>
            <div className="col-12 text-center">
              <span className="text-other-login mt-3">Or Login With:</span>
            </div>
            <div className="col-12 social-login">
              <i className="fab fa-google-plus-g google"></i>
              <i className="fab fa-facebook-f facebook"></i>
            </div>
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
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
