import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import SliderSpeciatly1 from './Section/SliderSpeciatly/SliderSpeciatly1';
import MedicalFacility from './Section/MedicalFacility/MedicalFacility';
import OutStandingDoctor from './Section/OutStandingDoctor/OutStandingDoctor';
import CallVideo from './Section/CallVideo/CallVideo';
import HandBook from './Section/HandBook/HandBook';
import BookingCare from './Section/BookingCare/BookingCare';
import './HomePage.scss';
// import { set } from 'lodash';
import HomeFooter from './HomeFooter';

class HomePage extends Component {

    handleAfterChange = (event, slick, currentSlide) => {

    }

    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            autoplay: false,
          };
          let settings1 = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 2,
            autoplay: false,
          };
        return (
            <React.Fragment>
                <HomeHeader isShowBanner={true}/>
                <CallVideo settings = {settings}/>
                <SliderSpeciatly1 settings = {settings}/>
                <MedicalFacility settings = {settings}/>
                <OutStandingDoctor settings = {settings}/>
                <HandBook settings = {settings1}/>
                <BookingCare/>
                <HomeFooter/>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
