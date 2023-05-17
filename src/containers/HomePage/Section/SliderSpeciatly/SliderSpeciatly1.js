import React, { Component } from "react";
import { connect } from "react-redux";
// import "./SliderSpecialty1.scss";
import { FormattedMessage } from "react-intl";
import "./SliderSpeciatly1.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";
import { getAllSpecialty } from "../../../../services/userService";
import {withRouter} from "react-router";


class SliderSpecialty1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: [],
    };
  }

  async componentDidMount() {
    let res = await getAllSpecialty();
    console.log(res)
    if (res && res.errCode === 0) {
      this.setState({
        dataSpecialty: res.data,
      });
    }
  }

  handleViewDetailSpecialty = (specialtyItem) => {
    console.log('>>>Check Specialty Item: ', specialtyItem)
    this.props.history.push(`/detail-specialty/${specialtyItem.id}`)
  }

  render() {
    let { dataSpecialty } = this.state;
    return (
      <React.Fragment>
        <div className="section-specialty specialty">
          <div className="section-container">
            <div className="section-header">
              <h3>Chuyên Khoa Phổ Biến</h3>
              <button>xem thêm</button>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                {dataSpecialty &&
                  dataSpecialty.length > 0 &&
                  dataSpecialty.map((item, index) => {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SliderSpecialty1));
