import React, { Component } from "react";
import { connect } from "react-redux";
// import "./HandBook.scss";
import { FormattedMessage } from "react-intl";
import "./HandBook.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";

class HandBook extends Component {
  render() {
        const {settings} = this.props
    return (
      <React.Fragment>
        <div className="section-specialty medicial-facility">
          <div className="section-container medicial-facility__container">
            <div className="section-header">
              <h3>Cẩm Nang</h3>
              <button>xem thêm</button>
            </div>
            <div className="section-body">
              <Slider {...settings}>
                <div className="img-customie">
                 <div className = "customie handbook-box">
                    <img
                      src="https://cdn.bookingcare.vn/fr/w500/2018/06/18/083122lo-go-viet-duc.jpg"
                      alt=""
                    />
                  <div className="title-container">
                    <span>Bệnh Viện Hữu Nghị Việt Đức</span>
                  </div>
                 </div>
                </div>
                <div className="img-customie">
                 <div className = "customie handbook-box">
                    <img
                      src="https://cdn.bookingcare.vn/fr/w500/2018/06/18/083122lo-go-viet-duc.jpg"
                      alt=""
                    />
                  <div className="title-container">
                    <span>Bệnh Viện Hữu Nghị Việt Đức</span>
                  </div>
                 </div>
                </div>
                <div className="img-customie">
                 <div className = "customie handbook-box">
                    <img
                      src="https://cdn.bookingcare.vn/fr/w500/2018/06/18/083122lo-go-viet-duc.jpg"
                      alt=""
                    />
                  <div className="title-container">
                    <span>Bệnh Viện Hữu Nghị Việt Đức</span>
                  </div>
                 </div>
                </div>
                <div className="img-customie">
                 <div className = "customie handbook-box">
                    <img
                      src="https://cdn.bookingcare.vn/fr/w500/2018/06/18/083122lo-go-viet-duc.jpg"
                      alt=""
                    />
                  <div className="title-container">
                    <span>Bệnh Viện Hữu Nghị Việt Đức</span>
                  </div>
                 </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
