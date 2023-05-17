import React, { Component } from "react";
import { connect } from "react-redux";
// import "./SliderSpecialty1.scss";
import { FormattedMessage } from "react-intl";
import "./CallVideo.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";

class SliderSpecialty1 extends Component {
  render() {
        const {settings} = this.props
    return (
      <React.Fragment>
        <div className="section-specialty medicial-facility">
          <div className="section-container medicial-facility__container">
            <div className="section-header">
              <h3>Bác sĩ từ xa qua Video</h3>
              <button>xem thêm</button>
            </div>
            <div className="section-body">
              <Slider {...settings}>
                <div className="img-customie">
                 <div className = "customie">
                    <img
                      src="https://cdn.bookingcare.vn/fr/w300/2020/12/20/111237-tam-ly-2.jpg"
                      alt=""
                    />
                 </div>
                  <div className="title-container">
                    <span>Bệnh Viện Hữu Nghị Việt Đức</span>
                  </div>
                </div>
                <div className="img-customie">
                 <div className = "customie">
                    <img
                      src="https://cdn.bookingcare.vn/fr/w300/2020/12/20/111237-tam-ly-2.jpg"
                      alt=""
                    />
                 </div>
                  <div className="title-container">
                    <span>Tư Vấn, trị liệu tâm lý từ xa</span>
                  </div>
                </div>
                <div className="img-customie">
                 <div className = "customie">
                    <img
                      src="https://cdn.bookingcare.vn/fr/w300/2020/12/20/111237-tam-ly-2.jpg"
                      alt=""
                    />
                 </div>
                  <div className="title-container">
                    <span>Tư Vấn, trị liệu tâm lý từ xa</span>
                  </div>
                </div>
                <div className="img-customie">
                 <div className = "customie">
                    <img
                      src="https://cdn.bookingcare.vn/fr/w300/2020/12/20/111237-tam-ly-2.jpg"
                      alt=""
                    />
                 </div>
                  <div className="title-container">
                    <span>Tư Vấn, trị liệu tâm lý từ xa</span>
                  </div>
                </div>
                <div className="img-customie">
                 <div className = "customie">
                    <img
                      src="https://cdn.bookingcare.vn/fr/w300/2020/12/20/111237-tam-ly-2.jpg"
                      alt=""
                    />
                 </div>
                  <div className="title-container">
                    <span>Tư Vấn, trị liệu tâm lý từ xa</span>
                  </div>
                </div>
                <div className="img-customie">
                 <div className = "customie">
                    <img
                      src="https://cdn.bookingcare.vn/fr/w300/2020/12/20/111237-tam-ly-2.jpg"
                      alt=""
                    />
                 </div>
                  <div className="title-container">
                    <span>Tư Vấn, trị liệu tâm lý từ xa</span>
                  </div>
                </div>
                <div className="img-customie">
                 <div className = "customie">
                    <img
                      src="https://cdn.bookingcare.vn/fr/w300/2020/12/20/111237-tam-ly-2.jpg"
                      alt=""
                    />
                 </div>
                  <div className="title-container">
                    <span>Tư Vấn, trị liệu tâm lý từ xa</span>
                  </div>
                </div>
                <div className="img-customie">
                 <div className = "customie">
                    <img
                      src="https://cdn.bookingcare.vn/fr/w300/2020/12/20/111237-tam-ly-2.jpg"
                      alt=""
                    />
                 </div>
                  <div className="title-container">
                    <span>Tư Vấn, trị liệu tâm lý từ xa</span>
                  </div>
                </div>
                <div className="img-customie">
                 <div className = "customie">
                    <img
                      src="https://cdn.bookingcare.vn/fr/w300/2020/12/20/111237-tam-ly-2.jpg"
                      alt=""
                    />
                 </div>
                  <div className="title-container">
                    <span>Tư Vấn, trị liệu tâm lý từ xa</span>
                  </div>
                </div>
                <div className="img-customie">
                 <div className = "customie">
                    <img
                      src="https://cdn.bookingcare.vn/fr/w300/2020/12/20/111237-tam-ly-2.jpg"
                      alt=""
                    />
                 </div>
                  <div className="title-container">
                    <span>Tư Vấn, trị liệu tâm lý từ xa</span>
                  </div>
                </div>
                <div className="img-customie">
                 <div className = "customie">
                    <img
                      src="https://cdn.bookingcare.vn/fr/w300/2020/12/20/111237-tam-ly-2.jpg"
                      alt=""
                    />
                 </div>
                  <div className="title-container">
                    <span>Tư Vấn, trị liệu tâm lý từ xa</span>
                  </div>
                </div>
                <div className="img-customie">
                 <div className = "customie">
                    <img
                      src="https://cdn.bookingcare.vn/fr/w300/2020/12/20/111237-tam-ly-2.jpg"
                      alt=""
                    />
                 </div>
                  <div className="title-container">
                    <span>Tư Vấn, trị liệu tâm lý từ xa</span>
                  </div>
                </div>
                <div className="img-customie">
                 <div className = "customie">
                    <img
                      src="https://cdn.bookingcare.vn/fr/w300/2020/12/20/111237-tam-ly-2.jpg"
                      alt=""
                    />
                 </div>
                  <div className="title-container">
                    <span>Tư Vấn, trị liệu tâm lý từ xa</span>
                  </div>
                </div>
                <div className="img-customie">
                 <div className = "customie">
                    <img
                      src="https://cdn.bookingcare.vn/fr/w300/2020/12/20/111237-tam-ly-2.jpg"
                      alt=""
                    />
                 </div>
                  <div className="title-container">
                    <span>Tư Vấn, trị liệu tâm lý từ xa</span>
                  </div>
                </div>
                <div className="img-customie">
                 <div className = "customie">
                    <img
                      src="https://cdn.bookingcare.vn/fr/w300/2020/12/20/111237-tam-ly-2.jpg"
                      alt=""
                    />
                 </div>
                  <div className="title-container">
                    <span>Tư Vấn, trị liệu tâm lý từ xa</span>
                  </div>
                </div>
                <div className="img-customie">
                 <div className = "customie">
                    <img
                      src="https://cdn.bookingcare.vn/fr/w300/2020/12/20/111237-tam-ly-2.jpg"
                      alt=""
                    />
                 </div>
                  <div className="title-container">
                    <span>Tư Vấn, trị liệu tâm lý từ xa</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(SliderSpecialty1);
