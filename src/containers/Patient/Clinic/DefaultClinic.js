import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetaultClinic.scss";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import ProfileDoctor from "../Doctor/Modal/ProfileDoctor";
import { LANGUAGES } from "../../../utils";
import {
  getDetailClinicById,
  getAllCodeService,
} from "../../../services/userService";
import _ from "lodash";

class DefaultClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataDetailClinic: {},
      isShowAndHide: false,
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getDetailClinicById({
        id: id,
      });
      
      if (
        res &&
        res.errCode === 0
      ) {
        let data = res.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorClinic;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }

        this.setState({
          dataDetailClinic: res.data,
          arrDoctorId: arrDoctorId,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {}


  render() {
    let { arrDoctorId, dataDetailClinic} = this.state;
    let { language } = this.props;
    console.log(arrDoctorId)
    return (
      <div className="detail-specialty-container">
        <HomeHeader />
        <div className="description-specialty-container">
          <div className="description-specialty">
            {dataDetailClinic && !_.isEmpty(dataDetailClinic) && (
              <>
              <span>{dataDetailClinic.name}</span>
                <span
                  dangerouslySetInnerHTML={{
                    __html: dataDetailClinic.descriptionHTML,
                  }}
                ></span>
              </>
            )}
            {/* <div className="hideAndShow">
              <span>An Chi Tiet</span>
            </div> */}
          </div>
        </div>

        {arrDoctorId &&
          arrDoctorId.length > 0 &&
          arrDoctorId.map((item, index) => {
            return (
              <div className="each-doctor" key={index}>
                <div className="dt-content-left">
                  <ProfileDoctor
                    doctorId={item}
                    isShowAndHideDescription={true}
                    isShowLinkDetailt = {true}
                    isShowPrice = {false}
                  />
                </div>
                <div className="dt-content-right border-left">
                  <DoctorSchedule detailDoctorIdFromParent={item} />
                  <DoctorExtraInfor detailDoctorIdFromParent={item} />
                </div>
              </div>
            );
          })}
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

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClinic);
