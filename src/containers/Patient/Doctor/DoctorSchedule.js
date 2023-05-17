import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import { LANGUAGES } from "../../../utils";
import localization from "moment/locale/vi";
import moment from "moment/moment";
import { getScheduleDoctorByDate } from "../../../services/userService";
import BookingModal from "./Modal/BookingModal";
import { FormattedMessage } from "react-intl";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvailableTime: [],
      isOpenModalBooking: false,
      dataModalScheduleTime: {} 
    };
  }

  async componentDidMount() {
    let allDays = this.getArrDays(this.props.language);
    if(this.props.detailDoctorIdFromParent) {
      let res = await getScheduleDoctorByDate(
        this.props.detailDoctorIdFromParent,
        allDays[0].value
      );
      this.setState({
        allAvailableTime: res.data ? res.data : [],
      });
    }
    this.setState({
      allDays: allDays,
    });
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      let allDays = this.getArrDays(this.props.language);
      this.setState({
        allDays: allDays,
      });
    }

    if (
      this.props.detailDoctorIdFromParent !== prevProps.detailDoctorIdFromParent
    ) {
      let allDays = this.getArrDays(this.props.language);
      let res = await getScheduleDoctorByDate(
        this.props.detailDoctorIdFromParent,
        allDays[0].value
      );
      this.setState({
        allAvailableTime: res.data ? res.data : [],
      });
    }
  }

  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  getArrDays = (language) => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUAGES.VI) {
        if (i === 0) {
          let ddMM = moment(new Date()).format("DD/MM");
          let today = `Hôm nay - ${ddMM}`;
          object.label = today;
        } else {
          let labelVi = moment(new Date())
            .add(i, "days")
            .format("dddd - DD/MM");
          object.label = this.capitalize(labelVi);
        }
      } else if(language === LANGUAGES.EN){
        if (i === 0) {
          let ddMM = moment(new Date()).format("DD/MM");
          let today = `Today - ${ddMM}`;
          object.label = today;
        }else{
          object.label = moment(new Date())
            .add(i, "days")
            .locale("en")
            .format("ddd - DD/MM");
        }
      }
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();

      allDays.push(object);
    }
    return allDays;
  };

  handleOnChangeSelect = async (e) => {
    if (
      this.props.detailDoctorIdFromParent &&
      this.props.detailDoctorIdFromParent !== -1
    ) {
      let doctorId = this.props.detailDoctorIdFromParent;
      let date = e.target.value;
      let res = await getScheduleDoctorByDate(doctorId, date);
      if (res && res.errCode === 0) {
        this.setState({
          allAvailableTime: res.data ? res.data : [],
        });
      }
      console.log('Check ALL Shceduler',res, doctorId, date)
    }
  };

  handelScheduleTime = (time)  => {
    console.log('>>Check handel schedule time: ', time)
    this.setState ({
      isOpenModalBooking: true,
      dataModalScheduleTime: time
    })
  }

  closeModal = () => {
    this.setState({
      isOpenModalBooking: false
    })
  }

  render() {
    let { allDays, allAvailableTime, dataModalScheduleTime, isOpenModalBooking } = this.state;
    let { language } = this.props;
    return (
      <>
        <div className="doctor-shedule-container">
          <div className="all-schedule">
            <select onChange={(e) => this.handleOnChangeSelect(e)}>
              {allDays &&
                allDays.length > 0 &&
                allDays.map((item, index) => {
                  return (
                    <option key={index} value={item.value}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="all-available-time">
            <div className="text-calendar">
              <i className="fas fa-calendar-alt"> 
                <span> <FormattedMessage id="patient.detail-doctor.schedule"/></span>
              </i>
            </div>
            <div className="time-content">
              {allAvailableTime && allAvailableTime.length > 0 ? (
                <>
                  <div className="time-content-btn">
                    {allAvailableTime.map((item, index) => {
                      let timeDisplay =
                        language === LANGUAGES.VI
                          ? item.timeTypeData.valueVi
                          : item.timeTypeData.valueEn;
                      return (
                        <button
                          key={index}
                          className={language === LANGUAGES.VI ? "btn-vi" : "btn-en"}
                          onClick={() => {
                            this.handelScheduleTime(item)
                          }}
                        >
                          {timeDisplay}
                        </button>
                      );
                    })}
                  </div>
                  <div className="book-free">
                    <span><FormattedMessage id="patient.detail-doctor.choose"/><FormattedMessage id="patient.detail-doctor.book-free"/></span>
                  </div>
                </>
              ) : (
                <div><FormattedMessage id="patient.detail-doctor.no-schedule"/></div>
              )}
            </div>
          </div>
        </div>
        <BookingModal
          isOpenModalBooking={isOpenModalBooking}
          closeModal = {this.closeModal}
          dataTime = {dataModalScheduleTime}
        />
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
