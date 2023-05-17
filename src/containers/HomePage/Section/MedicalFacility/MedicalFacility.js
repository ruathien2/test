import React, { Component } from "react";
import { connect } from "react-redux";
// import "./MedicalFacility.scss";
import { FormattedMessage } from "react-intl";
import "./MedicalFacility.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";
import { getAllClinic } from "../../../../services/userService";
import {withRouter} from "react-router";

class MedicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataClinic: [],
    };
  }

  async componentDidMount() {
    let res = await getAllClinic();
    console.log(res)
    if (res && res.errCode === 0) {
      this.setState({
        dataClinic: res.data,
      });
    }
  }

  handleViewDetailSpecialty = (clinicItem) => {
    console.log('>>>Check Specialty Item: ', clinicItem)
    this.props.history.push(`/detail-clinic/${clinicItem.id}`)
  }
  render() {
        const {settings} = this.props
        let{dataClinic} = this.state
    return (
      <React.Fragment>
        <div className="section-specialty medicial-facility">
          <div className="section-container medicial-facility__container">
            <div className="section-header">
              <h3>Cơ Sở Y Tế Nổi Bật</h3>
              <button>xem thêm</button>
            </div>
            <div className="section-body">
              <Slider {...settings}>
              {dataClinic &&
                  dataClinic.length > 0 &&
                  dataClinic.map((item, index) => {
                    return (
                      <div className="img-customie" key={index} onClick = {() => this.handleViewDetailSpecialty(item)}>
                        <div className="customie">
                          <img
                            src={item.image}
                            alt=""
                          />
                        </div>
                        <div className="title-container">
                          <span>{item.name}</span>
                        </div>
                      </div>
                    );
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));