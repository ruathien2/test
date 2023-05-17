import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailDoctor.scss";
import { getDetailDoctorService } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfor from "./DoctorExtraInfor";
import Comment from "../SocialPlugin/Comment";
import LikeAndShare from "../SocialPlugin/LikeAndShare";

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
      currentDoctorId: -1,
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      this.setState({
        currentDoctorId: id,
      });
      let res = await getDetailDoctorService(id);
      if (res && res.errCode === 0) {
        this.setState({
          detailDoctor: res.data,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    let { language } = this.props;
    let nameVi = "",
      nameEn = "";
    if (this.state.detailDoctor && this.state.detailDoctor.positionId) {
      nameVi = `${this.state.detailDoctor.positionData.valueVi}, ${this.state.detailDoctor.firstName} ${this.state.detailDoctor.lastName}`;
      nameEn = `${this.state.detailDoctor.positionData.valueEn}, ${this.state.detailDoctor.firstName} ${this.state.detailDoctor.lastName}`;
    }
    console.log(
      "Check like share: ",
      process.env.REACT_APP_LOCALHOST,
      typeof process.env.REACT_APP_LOCALHOST
    );
    let currentURL =
      Number(process.env.REACT_APP_LOCALHOST) == 1
        ? "http://eric-restaurant-bot-tv.herokuapp.com"
        : window.location.href;

    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="doctor-detail-container">
          <div className="intro-doctor">
            <div className="content-left">
              <img
                className="customie"
                src={this.state.detailDoctor.image}
                alt=""
              />
            </div>
            <div className="content-right">
              <div className="up">
                {language === LANGUAGES.VI ? nameVi : nameEn}
              </div>
              <div className="down">
                {this.state.detailDoctor &&
                  this.state.detailDoctor.markdown && (
                    <span>{this.state.detailDoctor.markdown.description}</span>
                  )}
                <div className="like-share-plugin">
                  <LikeAndShare dataHref={currentURL} />
                </div>
              </div>
            </div>
          </div>
          <div className="schedule-doctor">
            <div className="content-left">
              <DoctorSchedule
                detailDoctorIdFromParent={this.state.currentDoctorId}
              />
            </div>
            <div className="content-right">
              <DoctorExtraInfor
                detailDoctorIdFromParent={this.state.currentDoctorId}
              />
            </div>
          </div>
          <div className="detail-info-doctor">
            {this.state.detailDoctor &&
              this.state.detailDoctor.markdown &&
              this.state.detailDoctor.markdown.contentHTML && (
                <span
                  dangerouslySetInnerHTML={{
                    __html: this.state.detailDoctor.markdown.contentHTML,
                  }}
                ></span>
              )}
          </div>
          <div className="comment-doctor">
            <Comment dataHref={currentURL} width={"100%"} />
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
