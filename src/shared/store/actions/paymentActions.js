import axios from "axios";
import * as actionTypes from "./actionTypes";
import {
  LoaderStart,
  LoaderStop,
  ItemLoaderStart,
  ItemLoaderStop,
  alertMessage,
  removeUserInfo,
  clearMessage
} from "./index";
import { AsyncStorage } from "react-native";
import NavigationService from "../../NavigationService";
import store from "../root.store";
const apiURL = "https://staging.firsthomesafrica.com/api/v2";

export const saveCards = data => {
  return {
    type: actionTypes.SAVE_CARDS,
    cardlist: data
  };
};
export const saveBanks = data => {
  return {
    type: actionTypes.SAVE_BANKS,
    banklist: data
  };
};
export const saveAccountName = data => {
  return {
    type: actionTypes.SAVE_ACCOUNT_NAME,
    accountname: data
  };
};
export const savePaymentRef = token => {
  return {
    type: actionTypes.SAVE_PAYMENT_REF,
    paymentref: token
  };
};
export const getUserCards = () => {
  return dispatch => {
    AsyncStorage.getItem("usertoken").then(token => {
      dispatch(ItemLoaderStart());
      axios
        .get(apiURL + "/card/all", {
          headers: {
            "x-access-token": token
          }
        })
        .then(response => {
          dispatch(ItemLoaderStop());
          console.log(response);
          if (response.data.status == 200) {
            dispatch(saveCards(response.data.data));
          }
        })
        .catch(err => {
          dispatch(ItemLoaderStop());
          console.log(err.response);
          console.log(err.response.data.message);
        });
    });
  };
};
export const getBankList = () => {
  return dispatch => {
    AsyncStorage.getItem("usertoken").then(token => {
      dispatch(ItemLoaderStart());
      axios
        .get(apiURL + "/banks/list", {
          headers: {
            "x-access-token": token
          }
        })
        .then(response => {
          dispatch(ItemLoaderStop());
          console.log(response);
          if (response.status == 200) {
            let formatdata = [];
            response.data.map((value, index) => {
              return formatdata.push({
                value: value.Code,
                label: value.Name
              });
            });
            dispatch(saveBanks(formatdata));
          }
        })
        .catch(err => {
          dispatch(ItemLoaderStop());
          console.log(err.response);
          console.log(err.response.data.message);
        });
    });
  };
};
export const setRecurrentDay = data => {
  return dispatch => {
    AsyncStorage.getItem("usertoken").then(token => {
      dispatch(removeUserInfo());
      dispatch(LoaderStart());
      axios
        .post(apiURL + "/plan/setdate", data, {
          headers: {
            "x-access-token": token
          }
        })
        .then(response => {
          dispatch(LoaderStop());
          console.log(response);
          if (response.data.status == 200) {
            dispatch(alertMessage("200"));
          }
        })
        .catch(err => {
          dispatch(LoaderStop());
          console.log(err.response);
          alert(err.response.data.message);
        });
    });
  };
};
export const makeVoluntaryContribution = data => {
  console.log(data);
  return dispatch => {
    AsyncStorage.getItem("usertoken").then(token => {
      dispatch(LoaderStart());
      axios
        .post(apiURL + "/card/voluntary", data, {
          headers: {
            "x-access-token": token
          }
        })
        .then(response => {
          dispatch(LoaderStop());
          console.log(response);
          if (response.data.status == 200) {
            dispatch(alertMessage("contribution success"));
          }
          setTimeout(() => {
            dispatch(clearMessage());
          }, 2000);
        })
        .catch(err => {
          dispatch(LoaderStop());
          console.log(err.response);
          alert(err.response.data.message);
        });
    });
  };
};
export const makePaymentNow = data => {
  console.log(data);
  return dispatch => {
    AsyncStorage.getItem("usertoken").then(token => {
      dispatch(LoaderStart());
      axios
        .post(apiURL + "/withdrawal/repay", data, {
          headers: {
            "x-access-token": token
          }
        })
        .then(response => {
          dispatch(LoaderStop());
          console.log(response);
          if (response.data.status == 200) {
            NavigationService.reset("Home");
          }
          setTimeout(() => {
            dispatch(clearMessage());
          }, 2000);
        })
        .catch(err => {
          dispatch(LoaderStop());
          console.log(err.response);
          alert(err.response.data.message);
        });
    });
  };
};
export const makeWithdrawal = data => {
  return dispatch => {
    AsyncStorage.getItem("usertoken").then(token => {
      dispatch(LoaderStart());
      axios
        .post(apiURL + "/withdrawal", data, {
          headers: {
            "x-access-token": token
          }
        })
        .then(response => {
          dispatch(LoaderStop());
          console.log(response);
          if (response.data.status == 200) {
            alert(response.data.message);
            NavigationService.navigate("Home");
          }
          setTimeout(() => {
            dispatch(clearMessage());
          }, 2000);
        })
        .catch(err => {
          dispatch(LoaderStop());
          console.log(err.response);
          alert(
            err.response.data.message
              ? err.response.data.message
              : "An error has occured!"
          );
        });
    });
  };
};
export const verifyAccount = data => {
  console.log(data);
  return dispatch => {
    dispatch(LoaderStart());
    AsyncStorage.getItem("usertoken").then(token => {
      axios
        .post(apiURL + "/banks/verify", data, {
          headers: {
            "x-access-token": token
          }
        })
        .then(response => {
          dispatch(LoaderStop());
          console.log(response);
          console.log(response.data.data.data);
          if (response.status == 200 && response.data.data.data.accountname) {
            dispatch(saveAccountName(response.data.data.data.accountname));
            dispatch(alertMessage("verify account success"));
          } else {
            dispatch(LoaderStop());
            alert(response.data.data.data.responsemessage);
          }
        })
        .catch(err => {
          dispatch(LoaderStop());
          console.log(err.response);
          alert(err.response.data.message);
        });
    });
  };
};
export const doRecurrentPayment = (id, token, amount) => {
  return dispatch => {
    dispatch(LoaderStart());
    axios
      .post(
        apiURL + "/cards/recurring",
        { cardID: id, amount: amount },
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      )
      .then(response => {
        dispatch(LoaderStop());
        console.log(response);
        if (response.data.status == 200) {
          dispatch(savePaymentRef(response.data.data.card.reference));
          dispatch(
            alertMessage(
              response.data.status + "," + response.data.data.card.reference
            )
          );
        }
        return;
      })
      .catch(err => {
        dispatch(LoaderStop());
        console.log(err.response);
        console.log(err.response.data.message);
      });
  };
};
export const deleteCard = id => {
  console.log(id);
  return dispatch => {
    AsyncStorage.getItem("usertoken").then(token => {
      dispatch(ItemLoaderStart());
      axios
        .delete(apiURL + "/card/delete/" + id, {
          headers: {
            "x-access-token": token
          }
        })
        .then(response => {
          dispatch(ItemLoaderStop());
          console.log(response);
          if (response.data.status == 200) {
            dispatch(getUserCards());
          }
          return;
        })
        .catch(err => {
          dispatch(ItemLoaderStop());
          console.log(err.response);
          alert(err.response.data.message);
        });
    });
  };
};
export const saveBvn = data => {
  return dispatch => {
    AsyncStorage.getItem("usertoken").then(token => {
      console.log(data);
      console.log(token);
      dispatch(LoaderStart());
      axios
        .post(apiURL + "/account/bvn", data, {
          headers: {
            "x-access-token": token
          }
        })
        .then(response => {
          dispatch(LoaderStop());
          console.log(response);
          if (response.data.status == 200) {
            NavigationService.navigate("Payment");
            return;
          }
        })
        .catch(err => {
          dispatch(LoaderStop());
          console.log(err.response);
          //dispatch(alertMessage(err.response.data.message));
          alert(err.response.data.message);
        });
    });
  };
};
export const chargeCard = (content, status) => {
  const authData = store.getState().authReducer.userinfo;
  return dispatch => {
    AsyncStorage.getItem("usertoken").then(token => {
      dispatch(LoaderStart());
      if (status == 204) {
        /**i.e Charge with Phone Number*/
        console.log(content);
        axios
          .post(apiURL + "/card/otp/validate", content, {
            headers: {
              "x-access-token": token
            }
          })
          .then(response => {
            console.log(response);
            if (response.data.status === 200) {
              dispatch(LoaderStop());
              NavigationService.navigate("RecurrentDay");
              return;
            }
            dispatch(LoaderStop());
            console.log(response.data);
          })
          .catch(err => {
            console.log(err.response);
            dispatch(LoaderStop());
            const errmesg =
              err.response.data.message + ":" + err.response.data.data
                ? err.response.data.data.message
                : "";
            console.log(errmesg);
            alert(errmesg);
          });
      } else if (status == 203) {
        /**i.e OPEN WEB URL*/
        console.log(content);
        axios
          .get(apiURL + "/card/redirect", {
            headers: {
              "x-access-token": token,
              reference: content.reference,
              flwref: content.flwref
            }
          })
          .then(response => {
            console.log(response);
            if (response.data.status === 200) {
              dispatch(LoaderStop());
              NavigationService.navigate("RecurrentDay");
              return;
            }
            dispatch(LoaderStop());
            dispatch(
              alertMessage(
                response.data.status + "," + response.data.data.reference
              )
            );
          })
          .catch(err => {
            console.log(err.response);
            dispatch(LoaderStop());
            errmesg = "";
            if (err.response.data.data) {
              errmesg = err.response.data.data.message;
            } else {
              errmesg = err.response.data.message;
            }
            console.log(errmesg);
            alert(errmesg);
          });
      } else {
        /**For First check charge */
        console.log(token);
        axios
          .post(apiURL + "/card/add", content, {
            headers: {
              "x-access-token": token
            }
          })
          .then(response => {
            console.log(response);
            if (response.data.status === 203) {
              /**i.e we want to OPEN WEB URL */
              dispatch(
                alertMessage(
                  response.data.status +
                    "," +
                    response.data.reference +
                    "," +
                    response.data.authUrl +
                    "," +
                    response.data.flwref
                )
              );
              return;
            } else if (response.data.status === 200) {
              dispatch(LoaderStop());
              if (authData.hasMadeFirstPayment) {
                NavigationService.reset("Home");
              } else {
                NavigationService.navigate("RecurrentDay");
              }
              return;
            } else if (response.data.status === 201) {
              dispatch(LoaderStop());
              dispatch(
                alertMessage(
                  response.data.status + "," + "PIN Field is required"
                )
              );
            } else if (response.data.status === 202) {
              dispatch(LoaderStop());
              dispatch(
                alertMessage(
                  response.data.status + "," + "NOAUTH_INTERNATIONAL"
                )
              );
            } else if (response.data.status === 204) {
              dispatch(LoaderStop());
              dispatch(
                alertMessage(
                  response.data.status +
                    "," +
                    response.data.transaction_reference
                )
              );
            }
          })
          .catch(err => {
            console.log(err.response);
            dispatch(LoaderStop());
            const errmesg =
              err.response.data.message + ":" + err.response.data.data
                ? err.response.data.data.message
                : "";
            console.log(errmesg);
            alert(errmesg);
            //dispatch(alertMessage(err.response.status + "," + errmesg));
          });
      }
    });
  };
};
