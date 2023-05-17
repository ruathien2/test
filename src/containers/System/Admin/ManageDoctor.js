import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils/constant";
import { getDetailDoctorService } from "../../../services/userService";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Save to Markdown Table
      contentMarkDown: "",
      contentHTML: "",
      usersRedux: [],
      selectedOption: "",
      description: "",
      listDoctors: [],
      hasOldData: false,
      // Save to doctor infor table
      listPrice: [],
      listPayment: [],
      listProvince: [],
      listClinic: [],
      listSpecialty: [],

      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      selectedClinic: "",
      selectedSpecialty: "",

      nameClinic: "",
      addressClinic: "",
      note: "",
      clinicId : '',
      specialtyId: ''
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctorRedux();
    this.props.getRequireDoctorInforRedux();
  }

  buildDataInputSelect = (inputData, type) => {
    console.log('sdsd', inputData)
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      if (type === "USERS") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.lastName} ${item.firstName}`;

          let labelEn = `${item.firstName} ${item.lastName}`;

          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.id;
          result.push(object);
        });
      }
      if (type === "PRICE") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi} VND`;

          let labelEn = `${item.valueEn} USD`;

          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
      if (type === "PAYMENT" || type === "PROVINCE") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi}`;

          let labelEn = `${item.valueEn}`;

          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
      if(type === "SPECIALTY" || type === "CLINIC") {
        inputData.map((item, index) => {
          let object = {};
          object.label = item.name;
          object.value = item.id;
          result.push(object);
        });
      }
    }
    return result;
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allDoctors,
        "USERS"
      );
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allDoctors,
        "USERS"
      );

      let { resPrice, resProvince, resPayment, resSpecialty, resClinic } =
        this.props.allRequireDoctorInfor;

      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.buildDataInputSelect(
        resProvince,
        "PROVINCE"
      );
      let dataSpecialty = this.buildDataInputSelect(resSpecialty, "SPECIALTY");
      let dataClinic = this.buildDataInputSelect(resClinic, "CLINIC");
      this.setState({
        listDoctors: dataSelect,
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
        listSpecialty: dataSpecialty,
        listClinic: dataClinic
      });
    }
    if (prevProps.allRequireDoctorInfor !== this.props.allRequireDoctorInfor) {
      let { resPrice, resProvince, resPayment, resSpecialty, resClinic } =
        this.props.allRequireDoctorInfor;

      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.buildDataInputSelect(
        resProvince,
        "PROVINCE"
      );
        let dataSpecialty = this.buildDataInputSelect(
        resSpecialty,
        "SPECIALTY"
      );
      let dataClinic = this.buildDataInputSelect(
        resClinic,
        "CLINIC"
      );
      console.log(dataSelectPayment, dataSelectPrice, dataSelectProvince, dataSpecialty);
      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
        listSpecialty: dataSpecialty,
        listClinic: dataClinic
      });
    }
    
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkDown: text,
      contentHTML: html,
    });
  };

  handleSaveContentMarkDown = () => {
    console.log(this.state)
    this.props.saveDetailInfoDoctorRedux({
      contentHTML: this.state.contentHTML,
      contentMarkDown: this.state.contentMarkDown,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
      action:
        this.state.hasOldData === true
          ? CRUD_ACTIONS.EDIT
          : CRUD_ACTIONS.CREATE,

      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
      clinicId: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : '',
      specialtyId : this.state.selectedSpecialty.value,
      clinicId: this.state.selectedClinic.value
    });
  };

  handleChange = async (selectedOption) => {
    this.setState({ selectedOption });
    let { listPrice, listPayment, listProvince, listSpecialty, listClinic } = this.state;

    let res = await getDetailDoctorService(selectedOption.value);

    if (res && res.errCode === 0 && res.data && res.data.markdown) {
      let markdown = res.data.markdown;
      let addressClinic = "",
        nameClinic = "",
        note = "",
        paymentId = "",
        priceId = "",
        provinceId = "",
        specialtyId = "",
        clinicId = "",
        selectedPayment1 = "",
        selectedPrice1 = "",
        selectedProvince1 = "",
        selectedSpecialty1 = "",
        selectedClinic1 = ""

      if (res.data.Doctor_infor) {
        addressClinic = res.data.Doctor_infor.addressClinic;
        nameClinic = res.data.Doctor_infor.nameClinic;
        note = res.data.Doctor_infor.note;

        paymentId = res.data.Doctor_infor.paymentId;
        priceId = res.data.Doctor_infor.priceId;
        provinceId = res.data.Doctor_infor.provinceId;
        specialtyId = res.data.Doctor_infor.specialtyId;
        clinicId = res.data.Doctor_infor.clinicId;

        selectedPayment1 = listPayment.find((item) => {
          return item && item.value === paymentId;
        });
        selectedPrice1 = listPrice.find((item) => {
          return item && item.value === priceId;
        });
        selectedProvince1 = listProvince.find((item) => {
          return item && item.value === provinceId;
        });
        selectedSpecialty1 = listSpecialty.find((item) => {
          return item && item.value === specialtyId;
        });
        selectedClinic1 = listClinic.find((item) => {
          return item && item.value === clinicId;
        });

        console.log(
          "check Anh Pham find arr Payment: ",
          selectedPayment1,
          listPayment,
          paymentId
        );
        console.log(
          "check Anh Pham find arr Price: ",
          selectedPrice1,
          listPrice,
          priceId
        );
        console.log(
          "check Anh Pham find arr Province: ",
          selectedProvince1,
          listProvince,
          provinceId
        );
        console.log(
          "check Anh Pham find arr Specialty: ",
          selectedSpecialty1,
          listSpecialty,
          specialtyId
        );
      }

      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkDown: markdown.contentMarkDown,
        description: markdown.description,
        hasOldData: true,
        addressClinic: addressClinic,
        nameClinic: nameClinic,
        note: note,
        selectedPrice: selectedPrice1,
        selectedPayment: selectedPayment1,
        selectedProvince: selectedProvince1,
        selectedSpecialty: selectedSpecialty1,
        selectedClinic: selectedClinic1
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkDown: "",
        description: "",
        hasOldData: false,
        addressClinic: "",
        nameClinic: "",
        note: "",
        selectedPayment: "",
        selectedPrice: "",
        selectedProvince: "",
        selectedSpecialty: "",
        selectedClinic: ""
      });
    }
  };

  handleChangeSelectDoctorInfor = async (selectedOption, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedOption;
    this.setState({
      ...stateCopy,
    });
  };

  handleOnChangeDesc = (e, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = e.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  render() {
    console.log('>>>Test list: ', this.state)
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">Tạo Thêm Thông Tin Bác Sĩ</div>
        <div className="more-info">
          <div className="content-right">
            <label htmlFor="">Chọn Bác Sĩ</label>
            <Select
              value={this.state.selectedOption}
              onChange={this.handleChange}
              options={this.state.listDoctors}
              placeholder={"Chọn Bác Sĩ"}
            />
          </div>
          <div className="content-left">
            <label htmlFor="">Thông Tin Giới Thiệu: </label>
            <textarea
              className="form-control"
              name=""
              id=""
              cols="30"
              rows="5"
              onChange={(e) => this.handleOnChangeDesc(e, "description")}
              value={this.state.description}
            ></textarea>
          </div>
        </div>
        <div className="more-infor-extra row">
          <div className="col-4 form-group">
            <label htmlFor="">Chọn Giá</label>
            <Select
              value={this.state.selectedPrice}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listPrice}
              placeholder={"Chọn Giá"}
              name="selectedPrice"
            />
          </div>
          <div className="col-4 form-group">
            <label htmlFor="">Phương Thức Thanh Toán</label>
            <Select
              value={this.state.selectedPayment}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listPayment}
              placeholder={"Phương Thức Thanh Toán"}
              name="selectedPayment"
            />
          </div>
          <div className="col-4 form-group">
            <label htmlFor="">Chọn Tỉnh Thành</label>
            <Select
              value={this.state.selectedProvince}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listProvince}
              placeholder={"Chọn Tỉnh Thành"}
              name="selectedProvince"
            />
          </div>
          <div className="col-4 form-group">
            <label htmlFor="">Tên Phòng Khám</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => this.handleOnChangeDesc(e, "nameClinic")}
              value={this.state.nameClinic}
            />
          </div>
          <div className="col-4 form-group">
            <label htmlFor="">Địa Chỉ Phòng Khám</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => this.handleOnChangeDesc(e, "addressClinic")}
              value={this.state.addressClinic}
            />
          </div>
          <div className="col-4 form-group">
            <label htmlFor="">Note</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => this.handleOnChangeDesc(e, "note")}
              value={this.state.note}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-4 form-group">
            <label htmlFor="">Chon Chuyen Khoa</label>
            <Select
                value={this.state.selectedSpecialty}
                onChange={this.handleChangeSelectDoctorInfor}
                options={this.state.listSpecialty}
              placeholder={"Chọn Chuyen Khoa"}
              name="selectedSpecialty"
            />
          </div>
          <div className="col-4 form-group">
            <label htmlFor="">Chon Co So</label>
            <Select
              value={this.state.selectedClinic}
              options={this.state.listClinic}
              placeholder={"Chọn Phong Kham"}
              onChange={this.handleChangeSelectDoctorInfor}
              name="selectedClinic"
            />
          </div>
        </div>
        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkDown}
          />
        </div>
        <button
          onClick={() => this.handleSaveContentMarkDown()}
          className={
            this.state.hasOldData === true
              ? "save-doctor-mark_down"
              : "create-doctor-mark_down"
          }
        >
          {this.state.hasOldData === true ? "Lưu Thông Tin" : "Tạo Thông Tin"}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
    allRequireDoctorInfor: state.admin.allRequireDoctorInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctor()),
    saveDetailInfoDoctorRedux: (data) =>
      dispatch(actions.saveDetailInfoDoctor(data)),
    getRequireDoctorInforRedux: () => dispatch(actions.getRequireDoctorInfor()),
    // getPositionStart: () => dispatch(actions.fetchPositionStart()),
    // getRoleStart: () => dispatch(actions.fetchRoleStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
