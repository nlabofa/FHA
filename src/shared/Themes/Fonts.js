import { Colors } from "./index";
const type = {
  regular: "Metropolis-Regular",
  semibold: "Metropolis-SemiBold",
  medium: "Metropolis-Medium",
  bold: "Metropolis-Bold"
  //emphasis: 'HelveticaNeue-Italic'
};

const size = {
  h1: 38,
  h2: 34,
  h3: 30,
  h4: 26,
  h5: 23,
  h6: 19,
  input: 18,
  regular: 17,
  medium: 15,
  small: 12,
  tiny: 8.5
};

const style = {
  h1: {
    fontFamily: type.base,
    fontSize: size.h1
  },
  h2: {
    fontWeight: "bold",
    fontSize: size.h2
  },
  h3: {
    fontFamily: type.semibold,
    fontSize: size.h3
  },
  h4: {
    fontFamily: type.base,
    fontSize: size.h4,
    color: "black"
  },
  h5: {
    fontFamily: type.base,
    fontSize: size.h5
  },
  h6: {
    fontFamily: type.semibold,
    fontSize: size.h6
  },
  normal: {
    fontFamily: type.semibold,
    fontSize: size.medium,
    color: Colors.base
  },
  description: {
    fontFamily: type.base,
    fontSize: size.medium
  }
};

export default {
  type,
  size,
  style
};
