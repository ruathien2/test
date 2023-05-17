import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import logo from '../../assets/images/bookingcare-2020.svg';
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils/constant";
import { changeLanguageApp } from "../../store/actions/appActions";
import { withRouter } from "react-router";

class HomeHeader extends Component {

  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language)
    //fire redux event: actions
  }

  returnHome = () => {
    this.props.history.push(`/home`)
  }

  render() {
    let language = this.props.language
    return (
      <div className="wrapper">
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars"></i>
              <div className="header-logo">
                <img src={logo} alt="" onClick={() => this.returnHome()}/>
              </div>
            </div>
            <div className="center-content">
              <div className="child-content">
                <div>
                  <b><FormattedMessage id="home-header.specialist"/></b>
                </div>
                <div className="sub-title"><FormattedMessage id="home-header.searchdoctor"/></div>
              </div>
              <div className="child-content">
                <div>
                  <b><FormattedMessage id="home-header.healthfacilities"/></b>
                </div>
                <div className="sub-title"><FormattedMessage id="home-header.choosehospitalclinic"/></div>
              </div>
              <div className="child-content">
                <div>
                  <b><FormattedMessage id="home-header.doctor"/></b>
                </div>
                <div className="sub-title"><FormattedMessage id="home-header.chooseagooddoctor"/></div>
              </div>
              <div className="child-content">
                <div>
                  <b><FormattedMessage id="home-header.checkuppackage"/></b>
                </div>
                <div className="sub-title"><FormattedMessage id="home-header.generalhealthcheck"/></div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <i className="far fa-question-circle"></i><FormattedMessage id="home-header.support"/>
              </div>
              <div className={language === LANGUAGES.VI ? "flag-language-vn active" : "flag-language-vn"}><span onClick={() => {this.changeLanguage(LANGUAGES.VI)}}>VI</span></div>
              <div className={language === LANGUAGES.EN ? "flag-language-vn active" : "flag-language-en"}><span onClick={() => {this.changeLanguage(LANGUAGES.EN)}}>EN</span></div>
            </div>
          </div>
        </div>
       {this.props.isShowBanner === true && <div className="home-header-banner">
          <div className="content-up">
            <div className="title-container">
              <div className="title-1"><FormattedMessage id="banner.medicalbackground"/></div>
              <div className="title-2">
                <b><FormattedMessage id="banner.comprehensivehealthcare"/></b>
              </div>
            <div className="search">
              <i className="fas fa-search"></i>
              <input type="text" placeholder="Tìm Chuyên Khoa Khám Bệnh" />
            </div>
            </div>
          </div>
          <div className="content-down">
            <div className="options">
                <div className="option-child">
                    <div className="icon-child">
                        <img src="https://bookingcare.vn/assets/anh/kham_chuyenkhoa.png" alt="" />
                    </div>
                    <div className="text-child"><FormattedMessage id="banner.specialistexamination"/></div>
                </div>
                <div className="option-child">
                    <div className="icon-child">
                        <img src="https://bookingcare.vn/assets/anh/kham_tuxa.png" alt="" />
                    </div>
                    <div className="text-child"><FormattedMessage id="banner.remoteexamination"/></div>
                </div>
                <div className="option-child">
                    <div className="icon-child">
                        <img src="https://bookingcare.vn/assets/anh/kham_tongquat.png" alt="" />
                    </div>
                    <div className="text-child"><FormattedMessage id="banner.generalexamination"/></div>
                </div>
                <div className="option-child">
                    <div className="icon-child">
                        <img src="https://bookingcare.vn/assets/anh/dichvu_xetnghiem.png" alt="" />
                    </div>
                    <div className="text-child"><FormattedMessage id="banner.medicaltests"/></div>
                </div>
                <div className="option-child">
                    <div className="icon-child">
                        <img src="https://bookingcare.vn/assets/anh/suckhoe_tinhthan.png" alt="" />
                    </div>
                    <div className="text-child"><FormattedMessage id="banner.mentalhealth"/></div>
                </div>
                <div className="option-child">
                    <div className="icon-child">
                        <img src="https://bookingcare.vn/assets/anh/kham_nhakhoa.png" alt="" />
                    </div>
                    <div className="text-child"><FormattedMessage id="banner.dentalexamination"/></div>
                </div>
                <div className="option-child">
                    <div className="icon-child">
                        <img src="https://cdn.bookingcare.vn/fo/2022/05/16/151930-phau-thuat.jpg" alt="" />
                    </div>
                    <div className="text-child"><FormattedMessage id="banner.surgerypackage"/></div>
                </div>
                <div className="option-child">
                    <div className="icon-child">
                        <img src="https://bookingcare.vn/assets/anh/kham_tainha.png" alt="" />
                    </div>
                    <div className="text-child"><FormattedMessage id="banner.medicalproducts"/></div>
                </div>
                <div className="option-child">
                    <div className="icon-child">
                        <img src="https://cdn.bookingcare.vn/fo/2022/07/29/101157-icon-lich-su.jpg" alt="" />
                    </div>
                    <div className="text-child"><FormattedMessage id="banner.businesshealth"/></div>
                </div>
            </div>
          </div>
        </div>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => {
      dispatch(changeLanguageApp(language))
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
