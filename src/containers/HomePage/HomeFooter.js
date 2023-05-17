import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeFooter.scss';

class HomeFooter extends Component {

    render() {
      
        return (
           <div className='homefooter-container'>
            <div className="homefooter-box">
                <div className="box-left"><span>&copy;2023 BookingCare</span></div>
                <div className="box-right"><i className="fab fa-facebook-square icon-edit"></i><i className="fab fa-youtube icon-edit"></i></div>
            </div>
           </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
