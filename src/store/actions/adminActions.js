import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createNewUserService,
  getAllUser,
  deleteUserService,
  editUserService,
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailInfoDoctorService,
  getAllSpecialty,
  getAllClinic
} from "../../services/userService";
import { toast } from "react-toastify";
import { dispatch } from "../../redux";

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

// GENDER
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER_START,
      });

      let res = await getAllCodeService("GENDER");
      if (res && res.errCode === 0) {
        console.log(getState);
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (error) {
      dispatch(fetchGenderFailed());
      console.log(error);
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

// POSITION
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("POSITION");
      if (res && res.errCode === 0) {
        console.log(getState);
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (error) {
      dispatch(fetchPositionFailed());
      console.log(error);
    }
  };
};

export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});

export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

// ROLE
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("ROLE");
      if (res && res.errCode === 0) {
        console.log(getState);
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (error) {
      dispatch(fetchRoleFailed());
      console.log(error);
    }
  };
};

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});

export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

// Create user
export const creatNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);
      if (res && res.errCode === 0) {
        toast.success("Create User Successed !!!");
        dispatch(saveUserSuccess());
        setTimeout(() => {
          dispatch(fetchAllUsers());
        }, 500);
      } else {
        dispatch(saveUserFailed());
      }
    } catch (error) {
      dispatch(saveUserFailed());
      console.log(error);
    }
  };
};

export const saveUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});

export const saveUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});

//Get All Users
export const fetchAllUsers = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUser("ALL");
      if (res && res.errCode === 0) {
        dispatch(getAllUsersSuccess(res.users.reverse()));
      } else {
        dispatch(getAllUsersFalied());
      }
    } catch (error) {
      dispatch(getAllUsersFalied());
      console.log(error);
    }
  };
};

export const getAllUsersSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  users: data,
});

export const getAllUsersFalied = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAILED,
});

//Get Delete User
export const deleteAUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(userId);
      if (res && res.errCode === 0) {
        toast.success("Delete User Successed !!!");
        dispatch(deleteAUserSuccess());
        setTimeout(() => {
          dispatch(fetchAllUsers());
        }, 500);
      } else {
        dispatch(deleteUserFailed());
      }
    } catch (error) {
      dispatch(deleteUserFailed());
      console.log(error);
    }
  };
};

export const deleteAUserSuccess = () => ({
  type: actionTypes.FETCH_DELETE_USERS_SUCCESS,
});

export const deleteUserFailed = () => ({
  type: actionTypes.FETCH_DELETE_USERS_FAILED,
});

// Edit User
export const editUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(data);
      if (res && res.errCode === 0) {
        toast.success("Edit User Successed !!!");
        dispatch(editUserSuccess());
        setTimeout(() => {
          dispatch(fetchAllUsers());
        }, 500);
      } else {
        toast.error("Update user Failed");
        dispatch(editUserFailed());
      }
    } catch (error) {
      toast.error("Update user Failed");
      dispatch(editUserFailed());
      console.log(error);
    }
  };
};

export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});

//Get Top Doctor Home
export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeService("");
      console.log(">>>Check res top doctor: ", res);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
          dataDoctors: res.data,
        });
      } else {
        dispatch({ type: actionTypes.FETCH_TOP_DOCTOR_FAILED });
      }
    } catch (e) {
      console.log(e);
      dispatch({ type: actionTypes.FETCH_TOP_DOCTOR_FAILED });
    }
  };
};

// Get All Doctors
export const fetchAllDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctors();
      console.log(">>>Check res all doctor: ", res);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
          dataDr: res.data,
        });
      } else {
        dispatch({ type: actionTypes.FETCH_ALL_DOCTORS_FAILED });
      }
    } catch (e) {
      console.log(e);
      dispatch({ type: actionTypes.FETCH_ALL_DOCTORS_FAILED });
    }
  };
};

// Save Detail Info Doctor
export const saveDetailInfoDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailInfoDoctorService(data);
      if (res && res.errCode === 0) {
        toast.success("Save Infor Doctor Successed !!!");
        dispatch({
          type: actionTypes.SAVE_DETAIL_INFO_DOCTOR_SUCCESS,
        });
      } else {
        toast.error("Save Infor Doctor Don't Successed !!!");
        dispatch({ type: actionTypes.SAVE_DETAIL_INFO_DOCTOR_FAILED });
      }
    } catch (e) {
      console.log(e);
      toast.error("Save Infor Doctor Don't Successed !!!");
      dispatch({ type: actionTypes.SAVE_DETAIL_INFO_DOCTOR_FAILED });
    }
  };
};

//Get Detail Info Doctor

// export const getDetailDoctor = (id) => {
//   return async (dispatch, getState) => {
//     try {
//       if(this.props.match && this.props.match.params && this.props.match.params.id) {
//         let id = this.props.match.params.id
//         let res = await getDetailDoctorService()
//         dispatch({
//           type: actionTypes.GET_DETAIL_INFO_DOCTOR_SUCCESS
//         })
//       }
//     } catch (error) {
//       dispatch({type: actionTypes.GET_DETAIL_INFO_DOCTOR_FAILED})
//     }
//   }
// }

//Get all code schedule hours
export const fetchAllScheduleHours = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("TIME");
      console.log(">>>Check res all doctor: ", res);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.GET_DETAIL_ALLCODE_SCHEDULE_HOURS_SUCCESS,
          dataTime: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.GET_DETAIL_ALLCODE_SCHEDULE_HOURS_FAILED,
        });
      }
    } catch (e) {
      console.log(e);
      dispatch({ type: actionTypes.GET_DETAIL_ALLCODE_SCHEDULE_HOURS_FAILED });
    }
  };
};

// Get Price Info Doctor
export const getRequireDoctorInfor = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_REQUIRE_DOCTOR_INFOR_START,
      });

      let resPrice = await getAllCodeService("PRICE");
      let resProvince = await getAllCodeService("PROVINCE");
      let resPayment = await getAllCodeService("PAYMENT");
      let resSpecialty = await getAllSpecialty("SPECIALTY")
      let resClinic = await getAllClinic("CLINIC")

      if (
        resPrice &&
        resPrice.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0 &&
        resPayment &&
        resPayment.errCode === 0 &&
        resSpecialty &&
        resSpecialty.errCode === 0 &&
        resClinic &&
        resClinic.errCode === 0
      ) {
        console.log('getState', getState);
        let data = {
          resPrice: resPrice.data,
          resProvince: resProvince.data,
          resPayment: resPayment.data,
          resSpecialty: resSpecialty.data,
          resClinic: resClinic.data
        };
        dispatch(fecthReuireDoctorInfoSuccess(data));
      } else {
        dispatch(fecthReuireDoctorInfoFailed());
      }
    } catch (error) {
      dispatch(fecthReuireDoctorInfoFailed());
      console.log(error);
    }
  };
};

export const fecthReuireDoctorInfoSuccess = (allRequireData) => ({
  type: actionTypes.FETCH_REQUIRE_DOCTOR_INFOR_SUCCESS,
  data: allRequireData,
});

export const fecthReuireDoctorInfoFailed = () => ({
  type: actionTypes.FETCH_REQUIRE_DOCTOR_INFOR_FAILED,
});
