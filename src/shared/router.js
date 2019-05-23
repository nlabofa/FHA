import {
  createSwitchNavigator,
  createStackNavigator,
  DrawerNavigator
} from "react-navigation";
import AuthLoadingScreen from "../screens/AuthLoading/AuthLoading";
import OnboardingScreen from "../screens/Onboarding/FirstScreen";
import LoginScreen from "../screens/Registration/Login";
import Step1 from "../screens/Registration/Step1";
import Step2 from "../screens/Registration/Step2";
import Step3 from "../screens/Registration/Step3";
import Step4 from "../screens/Registration/Step4";
import Step5 from "../screens/Registration/Step5";
import Step6 from "../screens/Registration/Step6";
import Step7 from "../screens/Registration/Step7";
import Step8 from "../screens/Registration/Step8";
import Step8ii from "../screens/Registration/Step8ii";
import Step8iii from "../screens/Registration/Step8iii";
import Step9 from "../screens/Registration/Step9";
import PaymentScreen from "../screens/Payment/Payment";
import WithdrawalScreen from "../screens/Withdrawal/Withdrawal";
import ConfirmWithdrawal from "../screens/Withdrawal/ConfirmWithdrawal";
import BanksCards from "../screens/Wallet/Banks&Cards";
import ContractualDetail from "../screens/Wallet/ContractualDetail";
import BVNScreen from "../screens/Payment/BVN";
import PayNow from "../screens/SaveNow/PayNowScreen";
import RecurrentDay from "../screens/Payment/RecurrentDay";

import Tabstack from "./tabs";

const Tabscreen = createStackNavigator(
  {
    Home: { screen: Tabstack },
    BVN: {
      screen: BVNScreen
    },
    RecurrentDay: {
      screen: RecurrentDay
    },
    Payment: {
      screen: PaymentScreen
    },
    Withdrawal: {
      screen: WithdrawalScreen
    },
    ConfirmWithdrawal: {
      screen: ConfirmWithdrawal
    },
    ContractualDetail: {
      screen: ContractualDetail
    },
    BanksCards: {
      screen: BanksCards
    },
    PayNow: {
      screen: PayNow
    }
  },
  {
    // initialRouteName: "PayNow",
    headerMode: "none"
  }
);
const OnboardingStack = createStackNavigator(
  {
    OnboardingScreen: {
      screen: OnboardingScreen
    },
    Login: {
      screen: LoginScreen
    },
    Step1: {
      screen: Step1
    },
    Step2: {
      screen: Step2
    },
    Step3: {
      screen: Step3
    },
    Step4: {
      screen: Step4
    },
    Step5: {
      screen: Step5
    },
    Step6: {
      screen: Step6
    },
    Step7: {
      screen: Step7
    },
    Step8: {
      screen: Step8
    },
    Step8ii: {
      screen: Step8ii
    },
    Step8iii: {
      screen: Step8iii
    },
    Step9: {
      screen: Step9
    }
    // Home: {
    //   screen: Tabscreen
    // }
  },
  {
    //initialRouteName: "Step6",
    headerMode: "none"
  }
);

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Onboarding: OnboardingStack,
    Home: Tabscreen
  },
  {
    // initialRouteName: "Onboarding"
  }
);
