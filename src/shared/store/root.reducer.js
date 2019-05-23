import { combineReducers } from "redux";

import UIReducer from "./reducers/ui";
import AuthReducer from "./reducers/auth";
import PaymentReducer from "./reducers/payment";

export default combineReducers({
  uiReducer: UIReducer,
  paymentReducer: PaymentReducer,
  authReducer: AuthReducer
});
