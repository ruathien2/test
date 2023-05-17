import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoadingGender: false,
  genders: [],
  roles: [],
  positions: [],
  users: [],
  topDoctors: [],
  allDoctors: [],
  allScheduleTime: [],
  allRequireDoctorInfor: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    // GENDER
    case actionTypes.FETCH_GENDER_START:
      state.isLoadingGender = true;
      console.log("Fire fetch gender start", action);
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.genders = action.data;
      state.isLoadingGender = false;
      console.log("Fire fetch gender sucess", state);
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAILED:
      state.isLoadingGender = false;
      state.genders = [];
      console.log("Fire fetch gender failed", action);
      return {
        ...state,
      };

    // POSITION
    case actionTypes.FETCH_POSITION_SUCCESS:
      state.positions = action.data;
      console.log("Fire fetch position sucess", state);
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAILED:
      state.positions = [];
      console.log("Fire fetch position failed", action);
      return {
        ...state,
      };

    // ROLE
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roles = action.data;
      console.log("Fire fetch role sucess", state);
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAILED:
      state.roles = [];
      console.log("Fire fetch role failed", action);
      return {
        ...state,
      };

    // GET ALL USERS
    case actionTypes.FETCH_ALL_USERS_SUCCESS:
      state.users = action.users;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USERS_FAILED:
      state.users = [];
      return {
        ...state,
      };
    //GET TOP DOCTOR
    case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
      state.topDoctors = action.dataDoctors;
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_DOCTOR_FAILED:
      state.topDoctors = [];
      return {
        ...state,
      };
    //GET ALL DOCTORS
    case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
      state.allDoctors = action.dataDr;
      console.log(">>>Check actions: ", action);
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTORS_FAILED:
      state.dataDr = [];
      return {
        ...state,
      };
    //GET DETAIL DOCTOR HOUR SCHEDULE 
    case actionTypes.GET_DETAIL_ALLCODE_SCHEDULE_HOURS_SUCCESS:
      state.allScheduleTime = action.dataTime;
      console.log(">>>Check actions: ", action);
      return {
        ...state,
      };
    case actionTypes.GET_DETAIL_ALLCODE_SCHEDULE_HOURS_FAILED:
      state.allScheduleTime = [];
      return {
        ...state,
      };
    // GET ALL REQUIRE DOCTOR INFOR
      case actionTypes.FETCH_REQUIRE_DOCTOR_INFOR_SUCCESS:
      state.allRequireDoctorInfor = action.data;
      console.log(">>>Check actions require: ", action);
      return {
        ...state,
      };
    case actionTypes.FETCH_REQUIRE_DOCTOR_INFOR_FAILED:
      state.allRequireDoctorInfor = [];
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminReducer;
