import * as actionTypes from "../actions/actionTypes";

import { updateObject } from "../../utils/utility";
const initialState = {
  cardlist: null,
  accountname: "",
  banklist: [],
  paymentref: null
};

const saveCards = (state, action) => {
  return updateObject(state, { cardlist: action.cardlist });
};
const savePaymentRef = (state, action) => {
  return updateObject(state, { paymentref: action.paymentref });
};
const saveBanks = (state, action) => {
  return updateObject(state, { banklist: action.banklist });
};
const saveAccountName = (state, action) => {
  return updateObject(state, { accountname: action.accountname });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_CARDS:
      return saveCards(state, action);
    case actionTypes.SAVE_PAYMENT_REF:
      return savePaymentRef(state, action);
    case actionTypes.SAVE_BANKS:
      return saveBanks(state, action);
    case actionTypes.SAVE_ACCOUNT_NAME:
      return saveAccountName(state, action);
    default:
      return state;
  }
};

export default reducer;
