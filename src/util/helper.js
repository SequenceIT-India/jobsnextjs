import csc from "country-state-city";
import { JOB_TYPES } from "./constants";

export const ValidEmailRegex = RegExp(
  /^(("[\w - \S]+")|([\w-]+(?:\.[\w-]+)*)|("[\w - \S]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
);
export const ValidMobileNoRegex = RegExp(/^(\+\d{1,3}[-]?)?\d{10}$/);
export const ValidZipCodeRegex = RegExp(/^[0-9]{5,6}$/);
export const ValidUSZipCodeRegex = RegExp(/^([0-9]{5,6})-?([0-9]{4})?$/);
export const ValidPasswordRegex = RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])(?!.*\s).{8,128}$/
);
export const ValidURLRegex = RegExp(
  /^((http(s?)?):\/\/)?([wW]{3}\.)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?\S*$/
);
export const EmojiRegex = RegExp(
  /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g
);
export const DoubleByteCharacters = RegExp(/[^\u0000-\u00ff]/g);

export const AlphaNumericRegex = RegExp("^[a-zA-Z0-9 ]*$");

export const NumericRegex = RegExp("^[0-9]*$");

export const AlphaRegex = RegExp("^[a-zA-Z ]*$");

export const AtleastOneNumberRegex = RegExp(/^(?=.{4,15}$)\D*\d/);

export const allowedExtensionsForImage = /(\.jpg|\.png|\.jpeg)$/i;

export const JsLogin = {
  email: "Email",
  password: "Password",
  businessName: "Business Name",
  confirmPassword: "Confirm Password",
  firstName: "First Name",
  lastName: "Last Name",
  others: "Others",
  companyName: "Company Name",
  pincode: "Pincode",
  city: "City",
  state: "State",
  country: "Country",
  oldPassword: "OldPassword",
  newPassword: "NewPassword",
  confirmNewPassword: "ConfirmNewPassword",
  notes: "Notes",
  coverLetterName: "Cover Letter Name",
  resumeName: "Resume Name",
  createProfileTitle: "Profile Type",
  createProfileMessage: "Are you creating profile for yourself ?",
};

export const validateField = (
  name,
  value,
  type,
  required,
  skipPasswordValidation,
  defaultMessage,
  checkUSZipCode
) => {
  if (required && !value)
    return defaultMessage ? defaultMessage : `${name || "field"} is required`;
  if (type === "email")
    return ValidEmailRegex.test(value)
      ? ""
      : defaultMessage
      ? defaultMessage
      : "Email is not valid";
  if (type === "url") {
    return ValidURLRegex.test(value)
      ? ""
      : defaultMessage
      ? defaultMessage
      : "URL is not valid";
  }
  if (type === "password" && !skipPasswordValidation)
    return ValidPasswordRegex.test(value)
      ? ""
      : defaultMessage
      ? defaultMessage
      : "Password Should Contain atleast one uppercase, one lowercase, one digit and one special character and must be 8 to 128 characters";
  if (type === "zip" && value)
    return (
      checkUSZipCode
        ? ValidUSZipCodeRegex.test(value)
        : ValidZipCodeRegex.test(value)
    )
      ? ""
      : defaultMessage
      ? defaultMessage
      : "Zipcode is not valid";
  if (EmojiRegex.test(value)) return "Invalid input, emoji not allowed";
  if (DoubleByteCharacters.test(value)) return "Invalid content";
  for (var i = 0; i < value.length; i++) {
    if (value.charCodeAt(i) > 255) return "Invalid content";
  }
  return "";
};

export const getJobLocation = (job) => {
  console.log(job, "----");
  return `${csc?.getCityById(job?.cityId?.toString()).name || ""} ${
    csc?.getStateById(job?.stateId?.toString()).name || ""
  }, ${csc?.getCountryById(job?.cntryId?.toString()).name || ""}`;
};

export const getJobType = (job) => {
  if (job?.jobTypes) {
    const keys = Object.keys(job?.jobTypes).filter((k) => job?.jobTypes[k]);
    return keys.length
      ? JOB_TYPES.filter((emp) => keys.includes(emp.key))
          .map((emp) => emp.name)
          .join(", ")
      : "-";
  } else {
    return "-";
  }
};

export const onCopyPasteHandler = (e) => {
  e.preventDefault();
  return false;
};

export const getDate = () => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();
  return (today = mm + "/" + dd + "/" + yyyy);
};

export const ManageProfile = {
  firstTab: 0,
  secondTab: 1,
  thirdTab: 2,
  fourthTab: 3,
};
export const valueOf = (obj, path, value) => {
  if (typeof path == "string") {
    return valueOf(obj, path.split("."), value);
  } else if (path.length === 1 && typeof value !== "undefined") {
    return (obj[path[0]] = value);
  } else if (path.length == 0) {
    return obj;
  } else {
    return valueOf(obj[path[0]], path.slice(1), value);
  }
};
