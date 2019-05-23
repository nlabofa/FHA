import axios from "axios";
import * as actionTypes from "./actionTypes";
import store from "../root.store";
import {
  LoaderStart,
  LoaderStop,
  alertMessage,
  clearMessage,
  ItemLoaderStart,
  ItemLoaderStop
} from "./index";
import { AsyncStorage } from "react-native";
import NavigationService from "../../NavigationService";
const apiURL = "https://staging.firsthomesafrica.com/api/v2";

export const saveLGA = data => {
  return {
    type: actionTypes.SAVE_LGA,
    lga: data
  };
};
export const saveUserToken = data => {
  return {
    type: actionTypes.SAVE_USER_TOKEN,
    usertoken: data
  };
};
export const saveInfo = data => {
  return {
    type: actionTypes.SAVE_FORM_DATA,
    formdata: data
  };
};
export const saveUserInfo = data => {
  return {
    type: actionTypes.SAVE_USER_INFO,
    userinfo: data
  };
};
export const saveContractualDetails = data => {
  return {
    type: actionTypes.SAVE_CONTRACTUAL_INFO,
    contractualinfo: data
  };
};
export const removeUserInfo = () => {
  return {
    type: actionTypes.REMOVE_USER_INFO
  };
};
export const saveUserContributions = data => {
  return {
    type: actionTypes.SAVE_USER_CONTRIBUTION,
    usercontribution: data
  };
};
export const saveUserWithdrawal = data => {
  return {
    type: actionTypes.SAVE_USER_WITHDRAWAL,
    userwithdrawal: data
  };
};
export const saveUserDeposits = data => {
  return {
    type: actionTypes.SAVE_USER_DEPOSIT,
    userdeposit: data
  };
};
export const saveMortgage = data => {
  return {
    type: actionTypes.SAVE_MORTGAGE,
    mortgage: data
  };
};
export const clearMortgage = () => {
  return {
    type: actionTypes.CLEAR_MORTGAGE
  };
};
export const clearInfo = () => {
  return {
    type: actionTypes.CLEAR_FORM_DATA
  };
};

export const signUp = () => {
  const authData = store.getState().authReducer.formdata;
  console.log(authData);
  return dispatch => {
    dispatch(clearMessage());
    dispatch(LoaderStart());
    axios
      .post(apiURL + "/user", authData)
      .then(response => {
        dispatch(LoaderStop());
        if (response.status == 200) {
          console.log(response.data);
          // NavigationService.navigate("Step4");
          dispatch(alertMessage(response.data.status));
          setTimeout(() => {
            dispatch(clearMessage());
          }, 2000);
          AsyncStorage.setItem("usertoken", response.data.token);
          AsyncStorage.setItem(
            "hasPassword",
            JSON.stringify(response.data.hasPassword)
          );
          AsyncStorage.setItem(
            "madepayment",
            JSON.stringify(response.data.hasMadeFirstPayment)
          );
          AsyncStorage.setItem(
            "isverified",
            JSON.stringify(response.data.isVerified)
          );
          return;
        } else {
          console.log(response.data);
        }
      })
      .catch(err => {
        dispatch(LoaderStop());
        console.log(err.response);
        dispatch(
          alertMessage(
            err.response.data.messages
              ? err.response.data.messages[0]
              : err.response.data.message
          )
        );
        // dispatch(alertMessage(err.response.data.message));
      });
  };
};
export const signIn = data => {
  console.log(data);
  return dispatch => {
    dispatch(LoaderStart());
    axios
      .post(apiURL + "/login", data)
      .then(response => {
        dispatch(LoaderStop());
        if (response.status == 200) {
          console.log(response.data);
          AsyncStorage.setItem("usertoken", response.data.data.token);
          AsyncStorage.setItem(
            "madepayment",
            JSON.stringify(response.data.data.user.hasMadeFirstPayment)
          );
          AsyncStorage.setItem(
            "isverified",
            JSON.stringify(response.data.data.user.isVerified)
          );
          dispatch(saveUserInfo(response.data.data.user));

          return;
        } else {
          console.log(response.data);
        }
      })
      .catch(err => {
        dispatch(LoaderStop());
        console.log(err.response);
        if (err.response.data.status == 401) {
          dispatch(
            alertMessage(
              err.response.data.status + "," + err.response.data.token
            )
          );
          AsyncStorage.setItem("usertoken", err.response.data.token);
          setTimeout(() => {
            dispatch(clearMessage());
          }, 2000);
        } else {
          dispatch(
            alertMessage(
              err.response.data.status + "," + err.response.data.message
            )
          );
        }

        // dispatch(alertMessage(err.response.data.message));
      });
  };
};

export const calculateMortgage = () => {
  const authData = store.getState().authReducer.formdata;
  console.log(authData);
  return dispatch => {
    dispatch(clearMortgage());
    AsyncStorage.getItem("usertoken").then(token => {
      dispatch(LoaderStart());
      axios
        .post(apiURL + "/plan/mortgage", authData, {
          headers: {
            "x-access-token": token
          }
        })
        .then(response => {
          console.log(response);
          dispatch(LoaderStop());
          if (response.status == 200) {
            console.log(response.data);
            dispatch(saveMortgage(response.data.data));
            //NavigationService.navigate("Step9");

            return;
          } else {
            console.log(response.data);
          }
        })
        .catch(err => {
          dispatch(LoaderStop());
          console.log(err.response);
          alert(
            err.response.data.messages
              ? err.response.data.messages[0]
              : err.response.data.message
              ? err.response.data.message
              : "An error has occured"
          );
          //   dispatch(
          //     alertMessage(
          //       err.response.data.messages
          //         ? err.response.data.messages[0]
          //         : err.response.data.message
          //     )
          //   );
          // dispatch(alertMessage(err.response.data.message));
        });
    });
  };
};
export const verifyOtp = authData => {
  console.log(authData);
  return dispatch => {
    AsyncStorage.getItem("usertoken").then(usertoken => {
      console.log(usertoken);

      dispatch(LoaderStart());
      axios
        .post(apiURL + "/otp/validate", authData, {
          headers: {
            "x-access-token": usertoken
          }
        })
        .then(response => {
          dispatch(LoaderStop());
          if (response.status == 200) {
            console.log(response.data);
            AsyncStorage.setItem(
              "isverified",
              JSON.stringify(response.data.isVerified)
            );
            NavigationService.navigate("Step3");

            return;
          } else {
            console.log(response.data);
          }
        })
        .catch(err => {
          dispatch(LoaderStop());
          console.log(err.response);
          alert(
            err.response.data.messages
              ? err.response.data.messages[0]
              : err.response.data.message
          );
          //   dispatch(
          //     alertMessage(
          //       err.response.data.messages
          //         ? err.response.data.messages[0]
          //         : err.response.data.message
          //     )
          //   );
          // dispatch(alertMessage(err.response.data.message));
        });
    });
  };
};
export const addPassword = authData => {
  console.log(authData);
  return dispatch => {
    AsyncStorage.getItem("usertoken").then(usertoken => {
      console.log(usertoken);

      dispatch(LoaderStart());
      axios
        .post(apiURL + "/password", authData, {
          headers: {
            "x-access-token": usertoken
          }
        })
        .then(response => {
          dispatch(LoaderStop());
          if (response.status == 200) {
            console.log(response.data);
            AsyncStorage.setItem(
              "hasPassword",
              JSON.stringify(response.data.hasPassword)
            );
            NavigationService.reset("Step5");

            return;
          } else {
            console.log(response.data);
          }
        })
        .catch(err => {
          dispatch(LoaderStop());
          console.log(err.response);
          alert(
            err.response.data.messages
              ? err.response.data.messages[0]
              : err.response.data.message
          );
          //   dispatch(
          //     alertMessage(
          //       err.response.data.messages
          //         ? err.response.data.messages[0]
          //         : err.response.data.message
          //     )
          //   );
          // dispatch(alertMessage(err.response.data.message));
        });
    });
  };
};
export const sendReferral = data => {
  console.log(data);
  return dispatch => {
    AsyncStorage.getItem("usertoken").then(usertoken => {
      dispatch(ItemLoaderStart());
      axios
        .post(apiURL + "/referral", data, {
          headers: {
            "x-access-token": usertoken
          }
        })
        .then(response => {
          console.log(response);
          dispatch(ItemLoaderStop());
          if (response.data.status == 200) {
            alert(response.data.message);
            return;
          } else {
            console.log(response.data);
          }
        })
        .catch(err => {
          dispatch(ItemLoaderStop());
          console.log(err.response);
          alert(
            err.response.data.message
              ? err.response.data.message
              : "An error occured"
          );
        });
    });
  };
};
export const resendOtp = () => {
  return dispatch => {
    AsyncStorage.getItem("usertoken").then(usertoken => {
      console.log(usertoken);

      dispatch(ItemLoaderStart());
      axios
        .get(apiURL + "/otp/resend", {
          headers: {
            "x-access-token": usertoken
          }
        })
        .then(response => {
          dispatch(ItemLoaderStop());
          console.log(response);
          if (response.status == 200) {
            alert("OTP has been sent to your Phone and Email");
            return;
          } else {
            console.log(response.data);
          }
        })
        .catch(err => {
          dispatch(ItemLoaderStop());
          console.log(err.response);
          alert(
            err.response.data.messages
              ? err.response.data.messages[0]
              : err.response.data.message
          );
        });
    });
  };
};
export const getUserInfo = () => {
  return dispatch => {
    AsyncStorage.getItem("usertoken").then(usertoken => {
      console.log(usertoken);

      dispatch(LoaderStart());
      axios
        .get(apiURL + "/user", {
          headers: {
            "x-access-token": usertoken
          }
        })
        .then(response => {
          dispatch(LoaderStop());
          console.log(response);
          if (response.status == 200) {
            console.log(response.data);
            dispatch(saveUserInfo(response.data.data));
            AsyncStorage.setItem(
              "madepayment",
              JSON.stringify(response.data.data.hasMadeFirstPayment)
            );
            AsyncStorage.setItem(
              "isverified",
              JSON.stringify(response.data.data.isVerified)
            );
            return;
          } else {
            console.log(response.data);
          }
        })
        .catch(err => {
          dispatch(LoaderStop());
          console.log(err.response);
          // if (err.response.data.status == 401) {
          //   dispatch(clearStorage());
          //   NavigationService.navigate("Onboarding");
          // }

          // dispatch(alertMessage(err.response.data.message));
        });
    });
  };
};
export const getUserContributions = () => {
  return dispatch => {
    AsyncStorage.getItem("usertoken").then(usertoken => {
      console.log(usertoken);

      //dispatch(LoaderStart());
      axios
        .get(apiURL + "/wallet/contributions", {
          headers: {
            "x-access-token": usertoken
          }
        })
        .then(response => {
          // dispatch(LoaderStop());
          console.log(response);
          if (response.status == 200) {
            console.log(response.data);
            dispatch(saveUserContributions(response.data.data));
            return;
          } else {
            console.log(response.data);
          }
        })
        .catch(err => {
          //dispatch(LoaderStop());
          console.log(err.response);
          // if (err.response.data.status == 401) {
          //   dispatch(clearStorage());
          //   NavigationService.navigate("Onboarding");
          // }
        });
    });
  };
};
export const getContractualDetails = () => {
  return dispatch => {
    AsyncStorage.getItem("usertoken").then(usertoken => {
      //dispatch(LoaderStart());
      axios
        .get(apiURL + "/wallet/contractual", {
          headers: {
            "x-access-token": usertoken
          }
        })
        .then(response => {
          // dispatch(LoaderStop());
          console.log(response);
          if (response.status == 200) {
            console.log(response.data);
            dispatch(saveContractualDetails(response.data.data));
            return;
          } else {
            console.log(response.data);
          }
        })
        .catch(err => {
          //dispatch(LoaderStop());
          console.log(err.response);
          // if (err.response.data.status == 401) {
          //   dispatch(clearStorage());
          //   NavigationService.navigate("Onboarding");
          // }
        });
    });
  };
};
export const getUserDeposits = () => {
  return dispatch => {
    AsyncStorage.getItem("usertoken").then(usertoken => {
      console.log(usertoken);

      // dispatch(LoaderStart());
      axios
        .get(apiURL + "/wallet/deposits", {
          headers: {
            "x-access-token": usertoken
          }
        })
        .then(response => {
          // dispatch(LoaderStop());
          console.log(response);
          if (response.status == 200) {
            console.log(response.data);
            dispatch(saveUserDeposits(response.data.data));
            return;
          } else {
            console.log(response.data);
          }
        })
        .catch(err => {
          // dispatch(LoaderStop());
          console.log(err.response);

          // dispatch(alertMessage(err.response.data.message));
        });
    });
  };
};
export const getUserWithdrawals = () => {
  return dispatch => {
    AsyncStorage.getItem("usertoken").then(usertoken => {
      axios
        .get(apiURL + "/withdrawal", {
          headers: {
            "x-access-token": usertoken
          }
        })
        .then(response => {
          // dispatch(LoaderStop());
          console.log(response);
          if (response.status == 200) {
            console.log(response.data);
            dispatch(saveUserWithdrawal(response.data.data));
            return;
          } else {
            console.log(response.data);
          }
        })
        .catch(err => {
          // dispatch(LoaderStop());
          console.log(err.response);

          // dispatch(alertMessage(err.response.data.message));
        });
    });
  };
};
export const savePic = formData => {
  console.log(formData);
  return dispatch => {
    dispatch(LoaderStart());
    AsyncStorage.getItem("usertoken").then(token => {
      const data = new FormData();
      data.append("name", "picture");
      data.append("picture", {
        uri: formData.uri,
        type: formData.type,
        name: formData.fileName,
        data: formData.data
      });

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          "x-access-token": token
        },
        onUploadProgress: function(progressEvent) {
          var percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(percentCompleted);
        }
      };

      return axios
        .post(apiURL + "/upload", data, config)
        .then(response => {
          dispatch(LoaderStop());
          // NavigationService.navigate("Step6");
          dispatch(alertMessage("upload success"));
          setTimeout(() => {
            dispatch(clearMessage());
          }, 2000);
          console.log(response);
          //   if (response.status == 200) {
          //     console.log(response.data);
          //     NavigationService.navigate("Step5");

          //     return;
          //   } else {
          //     console.log(response.data);
          //   }
        })
        .catch(err => {
          dispatch(LoaderStop());
          console.log(err.response);
          //   dispatch(
          //     alertMessage(
          //       err.response.data.messages
          //         ? err.response.data.messages[0]
          //         : err.response.data.message
          //     )
          //   );
          // dispatch(alertMessage(err.response.data.message));
        });
    });
  };
};
export const getLga = state => {
  return dispatch => {
    dispatch(ItemLoaderStart());
    console.log(state);
    const appstate = state !== "FCT" ? " state" : "";

    axios
      .get("https://www.nigerianelite.com/api/Lga?state=" + state + appstate)
      .then(response => {
        dispatch(ItemLoaderStop());
        console.log(response);
        if (response.data) {
          let formatdata = [];
          response.data.map((value, index) => {
            return formatdata.push({
              value: value.lga,
              label: value.lga
            });
          });
          dispatch(saveLGA(formatdata));
        } else {
          return;
        }
      })
      .catch(err => {
        dispatch(ItemLoaderStop());
        console.log(err.response);
      });
  };
};
export const clearStorage = () => {
  return dispatch => {
    dispatch(removeUserInfo());
    AsyncStorage.removeItem("usertoken");
    AsyncStorage.removeItem("madepayment");
    AsyncStorage.removeItem("isverified");
    AsyncStorage.removeItem("hasPassword");
    NavigationService.navigate("Onboarding");
  };
};
