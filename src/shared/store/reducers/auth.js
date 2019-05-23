import * as actionTypes from "../actions/actionTypes";

import { updateObject } from "../../utils/utility";

const initialState = {
  formdata: {},
  lga: [],
  usertoken: "",
  userwithdrawal: null,
  userinfo: null,
  contractualinfo: null,
  usercontribution: null,
  userdeposit: null,
  mortgage: ""
};

const saveFormdata = (state, action) => {
  return updateObject(state, {
    formdata: { ...state.formdata, ...action.formdata }
  });
};
const saveLga = (state, action) => {
  return updateObject(state, { lga: action.lga });
};
const saveMortgage = (state, action) => {
  return updateObject(state, { mortgage: action.mortgage });
};
const clearMortgage = state => {
  return updateObject(state, { mortgage: null });
};
const saveUserContribution = (state, action) => {
  return updateObject(state, { usercontribution: action.usercontribution });
};
const saveContractualInfo = (state, action) => {
  return updateObject(state, { contractualinfo: action.contractualinfo });
};
const saveUserWithdrawal = (state, action) => {
  return updateObject(state, { userwithdrawal: action.userwithdrawal });
};
const saveUserDeposit = (state, action) => {
  return updateObject(state, { userdeposit: action.userdeposit });
};
const saveUserinfo = (state, action) => {
  return updateObject(state, { userinfo: action.userinfo });
};
const removeUserinfo = state => {
  return updateObject(state, { userinfo: null });
};
const clearFormdata = state => {
  return updateObject(state, {
    formdata: {}
  });
};
const SaveUsertoken = (state, action) => {
  return updateObject(state, {
    usertoken: action.usertoken
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_FORM_DATA:
      return saveFormdata(state, action);
    case actionTypes.CLEAR_FORM_DATA:
      return clearFormdata(state);
    case actionTypes.SAVE_USER_TOKEN:
      return SaveUsertoken(state, action);
    case actionTypes.SAVE_USER_CONTRIBUTION:
      return saveUserContribution(state, action);
    case actionTypes.SAVE_CONTRACTUAL_INFO:
      return saveContractualInfo(state, action);
    case actionTypes.SAVE_USER_WITHDRAWAL:
      return saveUserWithdrawal(state, action);
    case actionTypes.SAVE_USER_DEPOSIT:
      return saveUserDeposit(state, action);
    case actionTypes.SAVE_MORTGAGE:
      return saveMortgage(state, action);
    case actionTypes.CLEAR_MORTGAGE:
      return clearMortgage(state);
    case actionTypes.SAVE_USER_INFO:
      return saveUserinfo(state, action);
    case actionTypes.REMOVE_USER_INFO:
      return removeUserinfo(state);
    case actionTypes.SAVE_LGA:
      return saveLga(state, action);
    default:
      return state;
  }
};

export default reducer;
