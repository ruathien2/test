import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSchedule.scss";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils/constant";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import { saveBulkDoctor } from "../../../services/userService";

class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctors: [],
      selectedDoctor: {},
      currentDate: "",
      rangeTime: [],
      isSelected: false,
      
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctorRedux();
    this.props.fetchAllScheduleHoursRedux();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
      let data = this.props.allScheduleTime;
      if (data && data.length > 0) {
        // data.map(item => {
        //   item.isSelected = false
        //   return item
        // })
        data = data.map((item) => ({ ...item, isSelected: false }));
      }
      this.setState({
        rangeTime: data,
      });
    }
    // if(prevProps.language !== this.props.language) {
    //   let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
    //   this.setState({
    //     listDoctors: dataSelect
    //   })
    // }
  }

  buildDataInputSelect = (inputData) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi = `${item.lastName} ${item.firstName}`;
        let labelEn = `${item.firstName} ${item.lastName}`;

        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };

  handleChange = async (selectedOption) => {
    this.setState({ selectedDoctor: selectedOption });
  };

  handleDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
  };

  handleClickBtnTime = time => {
    let {rangeTime} = this.state
    if(rangeTime && rangeTime.length > 0) {
      rangeTime = rangeTime.map(item => {
        if(item.id === time.id) 
          item.isSelected = !item.isSelected
        return item
      })
      this.setState({
        rangeTime: rangeTime
      })
    }
  }

  handleSave = async() => {
    let {rangeTime, selectedDoctor, currentDate} = this.state
    let result = []
    let formatedDate = new Date(currentDate).getTime();
    if(rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter(item => item.isSelected === true)
      if(selectedTime && selectedTime.length > 0) {
        selectedTime.map((schedule, index) => {
          let obj = {}
          obj.doctorId = selectedDoctor.value
          obj.date = formatedDate.toString()
          obj.timeType = schedule.keyMap
          result.push(obj)
        })
      }else{
        // toast err
      }
    }
    let res = await saveBulkDoctor({
      arrSchedule: result,
      doctorId: selectedDoctor.value,
      formatedDate: formatedDate
    })
    // them toast thong bao
    console.log('res:', res)
    console.log('result:', result)
  }

  render() {
    let { rangeTime } = this.state;
    let { language } = this.props;
    let yesterday = new Date(new Date().setDate(new Date().getDate()-1));
    console.log("Check :", rangeTime);
    return (
      <div className="manage-schedule-container">
        <div className="m-s-title">
          <FormattedMessage id="manage-schedule.title" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-6 form-group">
              <label htmlFor="">
                <FormattedMessage id="manage-schedule.choose-doctor" />
              </label>
              <Select
                value={this.state.selectedDoctor}
                onChange={this.handleChange}
                options={this.state.listDoctors}
              />
            </div>
            <div className="col-6 form-group">
              <label htmlFor="">
                <FormattedMessage id="manage-schedule.choose-date" />
              </label>
              <DatePicker
                className="form-control"
                onChange={this.handleDatePicker}
                value={this.state.currentDate}
                minDate={yesterday}
              />
            </div>
            <div className="col-12 pick-hour-container">
              {rangeTime &&
                rangeTime.length > 0 &&
                rangeTime.map((item, index) => {
                  return (
                    <button className={item.isSelected === true ? "btn btn-schedule active" : "btn btn-schedule"} key={index} onClick={() => this.handleClickBtnTime(item)}>
                      {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                    </button>
                  );
                })}
            </div>
            <button className="btn btn-primary" onClick={() => this.handleSave()}><FormattedMessage id="manage-schedule.save"/></button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
    allScheduleTime: state.admin.allScheduleTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctor()),
    fetchAllScheduleHoursRedux: () => dispatch(actions.fetchAllScheduleHours()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
