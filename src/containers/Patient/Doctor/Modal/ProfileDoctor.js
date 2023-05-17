import React, { Component } from "react";
import { connect } from "react-redux";
import "./ProfileDoctor.scss";
import { LANGUAGES } from "../../../../utils";
import { FormattedMessage } from "react-intl";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { getProfileDoctorById } from "../../../../services/userService";
import NumberFormat from "react-number-format";
import _ from "lodash";
import moment, { lang } from "moment";
import {Link} from 'react-router-dom';

class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }

  async componentDidMount() {
    let data = await this.getInforDoctor(this.props.doctorId);
    this.setState({
      dataProfile: data,
    });
  }

  getInforDoctor = async (id) => {
    let result = {};

    if (id) {
      let res = await getProfileDoctorById(id);
      if (res && res.errCode === 0) {
        result = res.data;
      }
    }
    return result;
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }

    if (this.props.doctorId !== prevProps.doctorId) {
      // let data = await this.getInforDoctor(this.props.doctorId)
      // this.setState({
      //    dataProfile: data
      // })
    }
  }

  renderTimeBooking = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let  timeHour = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn
      let date =
        language === LANGUAGES.VI
          ? moment.unix(Number(dataTime.date) / 1000).format("dddd - DD/MM/YYYY")
          : moment.unix(Number(dataTime.date) / 1000).local('en').format("ddd - MM/DD/YYYY");
      return (
        <>
          <div>{timeHour} - {date}</div>
          <div>Mien Phi Dat Lich</div>
        </>
      );
    }
    return <></>;
  };

  render() {
    console.log(">>Check state: ", this.state);
    let { dataProfile } = this.state;
    let { language, isShowAndHideDescription, dataTime,  isShowLinkDetailt, isShowPrice, doctorId} = this.props;
    let nameEn = "",
      nameVi = "";
    if (this.state.dataProfile && this.state.dataProfile.positionId) {
      nameVi = `${this.state.dataProfile.positionData.valueVi}, ${this.state.dataProfile.firstName} ${this.state.dataProfile.lastName}`;
      nameEn = `${this.state.dataProfile.positionData.valueEn}, ${this.state.dataProfile.firstName} ${this.state.dataProfile.lastName}`;
    }
    console.log(">>Data profile: ", dataTime);
    return (
      <div>
        <div className="profile-doctor-container">
          <div className="intro-doctor">
            <div className="content-left">
              <img
                className="customie"
                src={this.state.dataProfile.image}
                alt=""
              />
              {isShowLinkDetailt === true && <div>
                  <Link to = {`/detail-doctor/${doctorId}`}>Xem Thêm</Link>
                </div>}
              <div className="price">
                Gia Kham:
               {isShowPrice === true && 
                 language === LANGUAGES.VI ? (
                  <NumberFormat
                    displayType={"text"}
                    thousandSeparator={true}
                    value={
                      dataProfile.Doctor_infor &&
                      dataProfile.Doctor_infor.priceIdTypeData &&
                      dataProfile.Doctor_infor.priceIdTypeData.valueVi
                    }
                    suffix={"VND"}
                  />
                ) : (
                  <NumberFormat
                    displayType={"text"}
                    thousandSeparator={true}
                    value={
                      dataProfile.Doctor_infor &&
                      dataProfile.Doctor_infor.priceIdTypeData &&
                      dataProfile.Doctor_infor.priceIdTypeData.valueEn
                    }
                    suffix={"$"}
                  />
                )
               }
              </div>
            </div>
            <div className="content-right">
              <div className="up">
                <p>{language === LANGUAGES.VI ? nameVi : nameEn}</p>
              </div>
              <div className="down">
                <>
                  {isShowAndHideDescription === true ? (
                    this.state.dataProfile &&
                    this.state.dataProfile.markdown && (
                      <span>
                        {this.state.dataProfile.markdown.description}
                      </span>
                    )
                  ) : (
                    <>{this.renderTimeBooking(dataTime)}</>
                  )}
                </>
              </div>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
