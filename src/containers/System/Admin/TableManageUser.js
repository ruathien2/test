import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersRedux: [],
    };
  }

  componentDidMount() {
    this.props.getAllUsersRedux();
  }

  componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({
        usersRedux: this.props.listUsers,
      });
    }
  }

  handleDeleteUser = (user) => {
    this.props.deleteAUserRedux(user.id)
  }

  handleEditUser = (userId) => {
    this.props.handleEditUserFromParent(userId)
  }

  render() {
    let arrUsers = this.state.usersRedux;
    return (
        <div className="user-container">
          <div className="user-table mt-4 mx-1">
            <table id="customers">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {arrUsers &&
                  arrUsers.length > 0 &&
                  arrUsers.map((item, index) => {
                    return (
                      <tr className="divClass" key={index}>
                        <td>{item.email}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.address}</td>
                        <td>
                          <button className="btn-edit" onClick={() => this.handleEditUser(item)}>
                            <i className="fas fa-user-edit"></i>
                          </button>
                          <button className="btn-delete" onClick={() => this.handleDeleteUser(item)}>
                            <i className="fas fa-user-slash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsersRedux: () => dispatch(actions.fetchAllUsers()),
    deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
