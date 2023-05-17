import React, { Component } from "react";
import { connect } from "react-redux";
import "./BookingModal.scss";
import { LANGUAGES } from "../../../../utils";
import { FormattedMessage } from "react-intl";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ProfileDoctor from "./ProfileDoctor";
import _ from "lodash";
import NumberFormat from "react-number-format";
import DatePicker from "../../../../components/Input/DatePicker";
import * as actions from '../../../../store/actions';
import Select from "react-select";
import {postPatientBookAppointment} from '../../../../services/userService';
import moment from "moment";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {

      fullName: '',
      phoneNumber: '',
      email: '',
      address: '',
      reasons: '',
      selectedGender: '',
      doctorId: '',
      birthday: '',
      genders: '',
      timeType: ''
    };
  }

  async componentDidMount() {
     this.props.getGenderStart()
  }

  buildDataGender = data => {
    let result = []
    let language = this.props.language

    if(data && data.length > 0) {
      data.map(item => {
        let obj = {}
        obj.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn
        obj.value = item.keyMap
        result.push(obj)
      })
    }
    return result
  }

  buildTimeBooking = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let  timeHour = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn
      let date =
        language === LANGUAGES.VI
          ? moment.unix(Number(dataTime.date) / 1000).format("dddd - DD/MM/YYYY")
          : moment.unix(Number(dataTime.date) / 1000).local('en').format("ddd - MM/DD/YYYY");
      return `${timeHour} - ${date}`
    }
    return '';
  };

  buildDoctorName = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let name = language === LANGUAGES.VI ? `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}` : `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`
      return `${name}`
    }
    return '';
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('sdfs',this.props.genders)
    if (this.props.language !== prevProps.language) {
      this.setState({
        genders: this.buildDataGender(this.props.genders)
      })
    }
    if(this.props.genders !== prevProps.genders) { 
      this.setState({
        genders: this.buildDataGender(this.props.genders)
      })
    }
    if(this.props.dataTime !== prevProps.dataTime) {
      let {dataTime} = this.props
      if(dataTime && !_.isEmpty(dataTime)) {
        let {timeType} = this.props.dataTime
        console.log(timeType, dataTime)
        let {doctorId} = this.props.dataTime ;
        this.setState({
          doctorId: doctorId,
          timeType: timeType
        })
      }
    }
  }

  handleChange = (e, id) => {
    let valueInput = e.target.value
    let stateCopy = {...this.state}
    stateCopy[id] = valueInput
    this.setState({
      ...stateCopy
    })
  }

  handleDatePicker = (date) => {
    this.setState({
      birthday: date[0]
    })
  }

  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedGender: selectedOption });
  };

  handleConfirmBooking = async() => {
    //!data.email || !data.doctorId || !data.timeType || data.timeType
    console.log(this.propsdataTime)
    let date = new Date(this.state.birthday).getTime()
    let timeString = this.buildTimeBooking(this.props.dataTime)
    let  doctorName = this.buildDoctorName(this.props.dataTime)


    let res = await postPatientBookAppointment({
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      reasons: this.state.reasons,
      date: this.props.dataTime.date,
      birthday: date,
      selectedGender: this.state.selectedGender.value,
      doctorId: this.state.doctorId,
      timeType: this.state.timeType,
      language: this.props.language,
      timeString: timeString,
      doctorName: doctorName
    })

    if(res && res.errCode === 0) {
      // toast
    }
    console.log('>>>Check state: ', res)
  }


  render() {
    let { isOpenModalBooking, closeModal, dataTime, language } = this.props;
    let {fullName, phoneNumber, email, address, reasons, birthday} = this.state
    let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : "";
    console.log(">>>Check", dataTime);  
    return (
      <div>
        <Modal
          isOpen={isOpenModalBooking}
          className="booking-modal-container"
          size="lg"
          centered
        >
          <div className="booking-modal-content">
            <div className="booking-modal-header">
              <span className="left">Thong Tin Dat Lich Kham Benh</span>
              <span className="right" onClick={() => closeModal()}>
                x
              </span>
            </div>
            <div className="booking-modal-body">
              {/* {JSON.stringify(dataModalScheduleTime)} */}
              <div className="doctor-infor">
                <ProfileDoctor
                  doctorId={doctorId}
                  isShowAndHideDescription={this.state.isShowAndHideDescription}
                  dataTime={dataTime}
                  isShowLinkDetailt = {false}
                  isShowPrice = {true}
                />
              </div>
              {/* fullName: '',
      phoneNumber: '',
      email: '',
      address: '',
      reasons: '',
      gender: '',
      doctorId: '',
      birthday: '' */}
              <div className="price"></div>
              <div className="row">
                <div className="col-6 form-group">
                  <label htmlFor="">Ho Ten</label>
                  <input type="text" className="form-control" value={fullName} onChange={(e) => this.handleChange(e, 'fullName')}/>
                </div>
                <div className="col-6 form-group">
                  <label htmlFor="">SDT</label>
                  <input type="text" className="form-control" value={phoneNumber} onChange={(e) => this.handleChange(e, 'phoneNumber')}/>
                </div>
                <div className="col-6 form-group">
                  <label htmlFor="">Email</label>
                  <input type="text" className="form-control" value={email} onChange={(e) => this.handleChange(e, 'email')}/>
                </div>
                <div className="col-6 form-group">
                  <label htmlFor="">Address</label>
                  <input type="text" className="form-control" value={address} onChange={(e) => this.handleChange(e, 'address')}/>
                </div>
                <div className="col-12 form-group">
                  <label htmlFor="">Ly Do Kham</label>
                  <input type="text" className="form-control" value={reasons} onChange={(e) => this.handleChange(e, 'reasons')}/>
                </div>
                <div className="col-6 form-group">
                  <label htmlFor="">Ngay Sinh</label>
                  <DatePicker
                  className="form-control"
                  onChange={this.handleDatePicker}
                  value={birthday}
              />
                </div>
                <div className="col-6 form-group">
                  <label htmlFor="">Gioi Tinh</label>
                  <Select
                     value={this.state.selectedGender}
                     onChange={this.handleChangeSelect}
                     options={this.state.genders}
                  />
                </div>
              </div>
            </div>
            <div className="bookinng-modal-footer">
              <button className="confirm" onClick={() => this.handleConfirmBooking()}>
                Xac nhan
              </button>
              <button className="cancel" onClick={() => closeModal()}>
                Huy
              </button>
            </div>
          </div>
          {/* toggle={} */}
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
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
 