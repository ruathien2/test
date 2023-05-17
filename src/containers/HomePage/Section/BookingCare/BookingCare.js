import React, { Component } from "react";
import { connect } from "react-redux";
// import "./BookingCare.scss";
import { FormattedMessage } from "react-intl";
import "./BookingCare.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";

class BookingCare extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="section-specialty bookingcare">
          <div className="bokkingcare-box">
            <div className="bookingcare-header">
                <h3>Truyền Thông Nói Về BookingCare</h3>
            </div>
           <div className="bookingcare-body">
                <div className="box-left">
                  video
                  {/* <iframe
                    width="560"
                    height="315"
                    title="BookingCare trên VTV1"
                    allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                    src="https://www.youtube-nocookie.com/embed/FyDQljKtWnI?autoplay=1"
                  ></iframe> */}
                </div>
                <div className="box-right">
                  Content
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingCare);
