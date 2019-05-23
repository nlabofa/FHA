export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};
export const getStateName = id => {
  let statename;
  switch (id) {
    case "La":
      statename = "Lagos";
      break;
    case "Ab":
      statename = "Abia";
      break;
    case "Ri":
      statename = "Rivers";
      break;
    case "Ad":
      statename = "Adamawa";
      break;
    case "Ak":
      statename = "Akwa Ibom";
      break;
    case "Ba":
      statename = "Bauchi";
      break;
    case "BY":
      statename = "Bayelsa";
      break;
    case "Be":
      statename = "Benue";
      break;
    case "Bo":
      statename = "Borno";
      break;
    case "Cr":
      statename = "Cross River";
      break;
    case "De":
      statename = "Delta";
      break;
    case "Eb":
      statename = "Ebonyi";
      break;
    case "Ed":
      statename = "Edo";
      break;
    case "En":
      statename = "Enugu";
      break;
    case "Ek":
      statename = "Ekiti";
      break;
    case "Fc":
      statename = "FCT";
      break;
    case "Go":
      statename = "Gombe";
      break;
    case "Im":
      statename = "Imo";
      break;
    case "Ji":
      statename = "Jigawa";
      break;
    case "Kd":
      statename = "Kaduna";
      break;
    case "Kn":
      statename = "Kano";
      break;
    case "Kt":
      statename = "Katsina";
      break;
    case "Ke":
      statename = "Kebbi";
      break;
    case "Ko":
      statename = "Kogi";
      break;
    case "Kw":
      statename = "Kwara";
      break;
    case "Na":
      statename = "Nasarawa";
      break;
    case "Ni":
      statename = "Niger";
      break;
    case "Og":
      statename = "Ogun";
      break;
    case "On":
      statename = "Ondo";
      break;
    case "Os":
      statename = "Osun";
      break;
    case "Oy":
      statename = "Oyo";
      break;
    case "Pl":
      statename = "Plateau";
      break;
    case "So":
      statename = "Sokoto";
      break;
    case "Ta":
      statename = "Taraba";
      break;
    case "Yo":
      statename = "Yobe";
      break;
    case "Za":
      statename = "Zamfara";
      break;
  }

  return statename;
};
