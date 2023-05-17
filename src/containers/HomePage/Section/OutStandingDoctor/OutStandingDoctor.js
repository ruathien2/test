import React, { Component } from "react";
import { connect } from "react-redux";
// import "./OutStandingDoctor.scss";
import { FormattedMessage } from "react-intl";
import "./OutStandingDoctor.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";
import * as actions from '../../../../store/actions';
import { LANGUAGES} from "../../../../utils/constant";
import {withRouter} from "react-router";

class OutStandingDoctor extends Component {

  constructor(props){
    super(props)
    this.state = {
      arrDoctors: []
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux
      })
    }
  }

  componentDidMount() {
    this.props.getTopDoctor()
  }

  handleViewDetailDoctor = (doctorItem) => {
    console.log('>>>Check Doctor Item: ', doctorItem)
    this.props.history.push(`/detail-doctor/${doctorItem.id}`)
  }

  render() {
    let arrDoctorsMap = this.state.arrDoctors
    console.log('>>>Check topDoctorsArr: ', arrDoctorsMap)
    let {language} = this.props
    return (
      <React.Fragment>
        <div className="section-specialty oustanding-doctor">
          <div className="section-container">
            <div className="section-header">
              <h3>Bác Sĩ Nổi Bật Tuần Qua</h3>
              <button>xem thêm</button>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
               {arrDoctorsMap && arrDoctorsMap.length > 0 && arrDoctorsMap.map((item, index) => {
                let imageBase64 = ''
                if(item.image) {
                  imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                }
                let nameVi = `${item.positionData.valueVi}, ${item.firstName} ${item.lastName}`
                let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`
                return (
                  <div className="img-customie border-box" key={index} onClick = {() => this.handleViewDetailDoctor(item)}> 
                  <div className="box">
                    <div className="customie img-doctor" style={{backgroundImage: `url(${imageBase64})`}}>
                    </div>
                    <div className="des-doctor">
                      <span>{language === LANGUAGES.VI ? nameVi : nameEn}</span>
                    </div>
                    <div className="des-job">
                        <span>Sức Khỏe Tâm Thần - Tư Vấn, Trị Liệu Tâm Lý</span>
                    </div>
                  </div>
                </div>
                )
               })}
              </Slider>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    topDoctorsRedux: state.admin.topDoctors
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTopDoctor: () => dispatch(actions.fetchTopDoctor())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
