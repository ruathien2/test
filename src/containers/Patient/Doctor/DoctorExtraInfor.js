import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfor.scss";
import { LANGUAGES } from "../../../utils";
import localization from "moment/locale/vi";
import moment from "moment/moment";
import { getExtraDoctorInforById } from "../../../services/userService";
import NumberFormat from "react-number-format";
import { FormattedMessage } from "react-intl";

class DoctorExtraInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfor: true,
      extraInfor: {},
    };
  }

  async componentDidMount() {
    if (this.props.detailDoctorIdFromParent) {
      let data = await getExtraDoctorInforById(
        this.props.detailDoctorIdFromParent
      );
      if (data && data.errCode === 0) {
        this.setState({
          extraInfor: data.data,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }

    if (
      this.props.detailDoctorIdFromParent !== prevProps.detailDoctorIdFromParent
    ) {
      let data = await getExtraDoctorInforById(
        this.props.detailDoctorIdFromParent
      );
      if (data && data.errCode === 0) {
        this.setState({
          extraInfor: data.data,
        });
      }
    }
  }

  showHideDetailInfor = (status) => {
    this.setState({
      isShowDetailInfor: !this.state.isShowDetailInfor,
    });
  };

  render() {
    let { isShowDetailInfor, extraInfor } = this.state;
    console.log("check sset state: ", extraInfor);
    let { language } = this.props;
    console.log("dlgjslfkafhlfksldflk", this.state);
    return (
      <div className="doctor-extra-infor-container">
        <div className="cotent-up">
          <div className="text-address">
            <FormattedMessage id="patient.doctor-schedule.text-address" />
          </div>
          <div className="name-clinic">
            {extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ""}
          </div>
          <div className="detail-address">
            {extraInfor && extraInfor.addressClinic
              ? extraInfor.addressClinic
              : ""}
          </div>
        </div>

        <div className="content-down">
          {isShowDetailInfor === false ? (
            <>
              <div>
                <FormattedMessage id="patient.doctor-schedule.examination-price" />{" "}
                {extraInfor &&
                  extraInfor.priceIdTypeData &&
                  language === LANGUAGES.VI && (
                    <NumberFormat
                      displayType={"text"}
                      thousandSeparator={true}
                      value={extraInfor.priceIdTypeData.valueVi}
                      suffix={"VND"}
                    />
                  )}
                {extraInfor &&
                  extraInfor.priceIdTypeData &&
                  language === LANGUAGES.EN && (
                    <NumberFormat
                      displayType={"text"}
                      thousandSeparator={true}
                      value={extraInfor.priceIdTypeData.valueEn}
                      suffix={"$"}
                    />
                  )}
                .
                <br />
                <span
                  className="hideandshow"
                  onClick={(status) => this.showHideDetailInfor(status)}
                >
                  <FormattedMessage id="patient.doctor-schedule.view-details" />
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="price-table">
                <span>
                  <FormattedMessage id="patient.doctor-schedule.examination-price" />
                </span>
                <span className="price">
                  {extraInfor &&
                    extraInfor.priceIdTypeData &&
                    language === LANGUAGES.VI && (
                      <NumberFormat
                        displayType={"text"}
                        thousandSeparator={true}
                        value={extraInfor.priceIdTypeData.valueVi}
                        suffix={"VND"}
                      />
                    )}
                  {extraInfor &&
                    extraInfor.priceIdTypeData &&
                    language === LANGUAGES.EN && (
                      <NumberFormat
                        displayType={"text"}
                        thousandSeparator={true}
                        value={extraInfor.priceIdTypeData.valueEn}
                        suffix={"$"}
                      />
                    )}
                </span>
                <div>
                  {extraInfor && extraInfor.note ? extraInfor.note : ""}
                </div>
                <div className="note">
                  <span>
                    <FormattedMessage id="patient.doctor-schedule.payment-type" />: 
                    <span className="type-payment">
                      {extraInfor &&
                        extraInfor.paymentIdTypeData &&
                        language === LANGUAGES.VI && (
                          extraInfor.paymentIdTypeData.valueVi
                        )}
                      {extraInfor &&
                        extraInfor.priceIdTypeData &&
                        language === LANGUAGES.EN && (
                          extraInfor.priceIdTypeData.valueEn
                        )}
                    </span>
                  </span>
                </div>
              </div>
              <div
                className="hideandshow"
                onClick={(status) => this.showHideDetailInfor(status)}
              >
                <FormattedMessage id="patient.doctor-schedule.hide-price-list" />
              </div>
            </>
          )}
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
