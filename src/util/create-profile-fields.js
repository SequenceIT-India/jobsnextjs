import { validateField } from "./helper";
import { LABELS } from "./create-profile-labels";

export const jsCreateProfileLabels = {
  "contactAndAddress.contact.firstName": {
    type: "text",
    name: LABELS.PLACE_HOLDER.FIRST_NAME,
    step: 0,
  },
  "contactAndAddress.contact.lastName": {
    type: "text",
    name: LABELS.PLACE_HOLDER.LAST_NAME,
    step: 0,
  },
  "contactAndAddress.address.countryCode": {
    type: "text",
    name: LABELS.PLACE_HOLDER.COUNTRY,
    step: 0,
    validateFn: (value, obj) => {
      return value ? "" : LABELS.ERROR.COUNTRY_REQUIRED;
    },
  },
  "contactAndAddress.address.state": {
    type: "text",
    name: LABELS.PLACE_HOLDER.STATE,
    step: 0,
    validateFn: (value, obj) => {
      return value ? "" : LABELS.ERROR.STATE_REQUIRED;
    },
  },
  "contactAndAddress.address.city": {
    type: "text",
    name: LABELS.PLACE_HOLDER.CITY,
    step: 0,
    validateFn: (value, obj) => {
      return value ? "" : LABELS.ERROR.CITY_REQUIRED;
    },
  },
  "contactAndAddress.address.postal": {
    type: "zip",
    name: LABELS.PLACE_HOLDER.ZIP,
    step: 0,
    validateFn: (value) => {
      return validateField(
        LABELS.PLACE_HOLDER.ZIP,
        value,
        "zip",
        false,
        true,
        "",
        false
      );
    },
  },
  // "employmentTypePref": {
  //     // 'validateFn': (value) => {
  //     //     let hasError = true;
  //     //     Object.keys(value).forEach((key) => {
  //     //         if (value[key]) {
  //     //             hasError = false;
  //     //         }
  //     //     })
  //     //     return hasError ?  LABELS.ERROR.EMPLOYMENT_TYPE_REQUIRED : ''
  //     // },
  //     'name':  LABELS.PLACE_HOLDER.EMPLOYMENT_TYPE,
  //     'step' : 1
  // },
  // "workAuthType": {
  //     'type': 'text',
  //     'name': LABELS.PLACE_HOLDER.WORK_AUTHORIZATION,
  //     'step' : 1,
  // },
  otherWorkAuthType: {
    type: "text",
    name: LABELS.PLACE_HOLDER.WORK_AUTHORIZATION,
    step: 1,
    validateFn: (value, data) => {
      let hasError = true;
      if (data.workAuthType === 14) {
        hasError = value ? false : true;
      } else {
        hasError = false;
      }
      return hasError ? LABELS.ERROR.WORK_LOCATION_TYPE_REQUIRED : "";
    },
  },
  // "workLocPref": {
  //     'validateFn': (value) => {
  //         let hasError = true;
  //         Object.keys(value).forEach((key) => {
  //             if (value[key] === "Y") {
  //                 hasError = false;
  //             }
  //         })
  //         return hasError ? LABELS.ERROR.WORK_LOCATION_TYPE_REQUIRED : ''
  //     },
  //     'name': LABELS.PLACE_HOLDER.WORK_LOCATION_TYPE,
  //     'step' : 1
  // },
  // "monthsExp": {
  //     'validateFn': (value) => {
  //         return value <= 0 ?  LABELS.ERROR.TOTAL_EXPERIENCE_REQUIRED : ''
  //     },
  //     'name': LABELS.PLACE_HOLDER.TOTAL_EXPERIENCE,
  //     'step' : 1
  // },
  skills: {
    type: "array",
    fields: {
      skillName: {
        name: "Skill name",
        type: "text",
      },
      monthsExp: {
        validateFn: (value, obj) => {
          return obj.skillName && value <= 0
            ? LABELS.ERROR.EXPERIENCE_REQUIRED
            : "";
        },
        name: LABELS.PLACE_HOLDER.EXPERIENCE,
      },
      // "lastUsed": {
      //     name: LABELS.PLACE_HOLDER.LAST_USED,
      //     type: "text"
      // },
    },
    step: 2,
  },
  workExpDetails: {
    type: "array",
    fields: {
      jobTitle: {
        name: LABELS.PLACE_HOLDER.JOB_TITLE,
        type: "text",
      },
      companyName: {
        name: LABELS.PLACE_HOLDER.COMPANY,
        type: "text",
        validateFn: (value, obj) => {
          return obj.jobTitle
            ? value
              ? ""
              : LABELS.ERROR.COMPANY_REQUIRED
            : "";
        },
      },
      skillSet: {
        name: LABELS.PLACE_HOLDER.SKILL_SET,
        type: "text",
        validateFn: (value, obj) => {
          return obj.jobTitle
            ? value
              ? ""
              : LABELS.ERROR.SKILL_SET_REQUIRED
            : "";
        },
      },
      jobDesc: {
        name: LABELS.PLACE_HOLDER.JOB_DESCRIPTION,
        type: "text",
        validateFn: (value, obj) => {
          return obj.jobTitle
            ? value
              ? ""
              : LABELS.ERROR.DESCRIPTION_REQUIRED
            : "";
        },
      },
      "companyAddress.countryCode": {
        type: "text",
        name: LABELS.PLACE_HOLDER.COUNTRY,
        validateFn: (value, obj) => {
          return obj.jobTitle
            ? value
              ? ""
              : LABELS.ERROR.COUNTRY_REQUIRED
            : "";
        },
      },
      "companyAddress.state": {
        type: "text",
        name: LABELS.PLACE_HOLDER.STATE,
        validateFn: (value, obj) => {
          return obj.jobTitle ? (value ? "" : LABELS.ERROR.STATE_REQUIRED) : "";
        },
      },
      "companyAddress.city": {
        type: "text",
        name: LABELS.PLACE_HOLDER.CITY,
        validateFn: (value, obj) => {
          return obj.jobTitle ? (value ? "" : LABELS.ERROR.CITY_REQUIRED) : "";
        },
      },
      startDate: {
        type: "text",
        name: LABELS.PLACE_HOLDER.FROM_DATE,
        validateFn: (value, obj) => {
          return obj.jobTitle
            ? value
              ? ""
              : LABELS.ERROR.FROM_DATE_REQUIRED
            : "";
        },
      },
      endDate: {
        validateFn: (value, obj) => {
          return obj.jobTitle && !obj.currentStatus && !value
            ? LABELS.ERROR.END_DATE_REQUIRED
            : "";
        },
        name: LABELS.PLACE_HOLDER.END_DATE,
      },
    },
    step: 3,
  },
  educationDetails: {
    type: "array",
    fields: {
      educationLevel: {
        name: LABELS.PLACE_HOLDER.EDUCATION_LEVEL,
        type: "text",
      },
      otherEducationLevel: {
        name: LABELS.PLACE_HOLDER.EDUCATION_LEVEL,
        type: "text",
        validateFn: (value, education) => {
          let hasError = true;
          if (education.educationLevel === 11) {
            hasError = value ? false : true;
          } else {
            hasError = false;
          }
          return hasError ? LABELS.ERROR.EDUCATION_LEVEL_REQUIRED : "";
        },
      },
      studyField: {
        name: LABELS.PLACE_HOLDER.FOS,
        type: "text",
        validateFn: (value, obj) => {
          return obj.educationLevel && !value
            ? LABELS.ERROR.FIELD_OF_STUDY_REQUIRED
            : "";
        },
      },
      // "institutionName": {
      //     name:  LABELS.PLACE_HOLDER.SCHOOL_OR_COLLEGE,
      //     type: "text"
      // },
      // "cntryId": {
      //     'type': 'text',
      //     'name':  LABELS.PLACE_HOLDER.COUNTRY
      // },
      // "stateId": {
      //     'type': 'text',
      //     'name': LABELS.PLACE_HOLDER.STATE
      // },
      // "cityId": {
      //     'type': 'text',
      //     'name':  LABELS.PLACE_HOLDER.CITY
      // },
      startDate: {
        type: "text",
        name: LABELS.PLACE_HOLDER.FROM_DATE,
        validateFn: (value, obj) => {
          return obj.educationLevel && !value
            ? LABELS.ERROR.START_DATE_REQUIRED
            : "";
        },
      },
      endDate: {
        validateFn: (value, obj) => {
          return obj.educationLevel && !obj.currentStatus && !value
            ? LABELS.ERROR.END_DATE_REQUIRED
            : "";
        },
        name: LABELS.PLACE_HOLDER.END_DATE,
      },
    },
    step: 4,
  },
};
