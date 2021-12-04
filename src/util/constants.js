export const CLEARANCE = [
  { key: 1, name: "Confidential" },
  { key: 2, name: "Secret" },
  { key: 3, name: "Top Secret" },
  { key: 4, name: "Sensitive" },
  { key: 5, name: "Public Trust" },
  { key: 6, name: "Dept of Homeland Security" },
  { key: 7, name: "Dept of Energy" },
  { key: 8, name: "Top Secret/SCI" },
  { key: 9, name: "Intelligence Agencies" },
  { key: 0, name: "Other" },
];

export const CHANGE_REASON = [
  {
    key: 1,
    name: "Working and actively seeking",
  },
  {
    key: 2,
    name: "In Between work, actively looking",
  },
  {
    key: 3,
    name: "Looking for ideal job",
  },
  {
    key: 4,
    name: "Studying, seeking after graduation",
  },
  {
    key: 5,
    name: "Out of college, actively looking",
  },
];

export const GENDER = [
  { key: 0, name: "Dont want to share" },
  { key: 1, name: "Male" },
  { key: 2, name: "Female" },
];

export const ETHNICITY = [
  { key: 1, name: "White" },
  { key: 2, name: "Black or African American" },
  { key: 3, name: "American Indian or Alaska Native" },
  { key: 4, name: "Hispanic or Latino" },
  { key: 5, name: "Native Hawaiian or Other Pacific Islander" },
  { key: 6, name: "Asian" },
  { key: 7, name: "Multiple Categories Reported" },
  { key: 99, name: "Race Unknown" },
];

export const DISABILITIES = [
  { key: 1, name: "Autism" },
  { key: 2, name: "Autoimmune disorder" },
  { key: 3, name: "Blind or low vision" },
  { key: 4, name: "Cancer" },
  { key: 5, name: "Cardiovascular or heart disease" },
  { key: 6, name: "Celiac disease" },
  { key: 7, name: "Cerebral palsy" },
  { key: 8, name: "Deaf or hard of hearing " },
  { key: 9, name: "Depression or anxiety " },
  { key: 10, name: "Diabetes" },
  { key: 11, name: "Epilepsy" },
  { key: 12, name: "Gastrointestinal disorders" },
  { key: 13, name: "Intellectual disability" },
  { key: 14, name: "Missing limbs or partially missing limbs" },
  { key: 15, name: "Nervous system" },
  { key: 16, name: "Psychiatric" },
  { key: 99, name: "Other" },
];

export const JOB_TYPES = [
  { name: "Full-time", key: "fullTimeJob" },
  { name: "Part-time", key: "partTimeJob" },
  { name: "Contract", key: "contractJob" },
  { name: "Internship", key: "internshipJob" },
  { name: "Temporary", key: "temporaryJob" },
];

export const EMPLOYMENT_TYPES = [
  { name: "Full-time", key: "1" },
  { name: "Part-time", key: "2" },
  { name: "Contract - W2", group: "Contracts", key: "3" },
  { name: "Contract - Independent", group: "Contracts", key: "4" },
  {
    name: "Contract to Hire - Independent",
    group: "Contracts",
    key: "5",
  },
  {
    name: "Contract to Hire - W2",
    group: "Contracts",
    key: "6",
  },
  { name: "Contract", group: "Corp-to-Corp", key: "7" },
  {
    name: "Contract to Hire",
    group: "Corp-to-Corp",
    key: "8",
  },
  { name: "Temporary Worker", key: "15" },
  { name: "Internship", key: "16" },
];

export const WORK_AUTHORIZATION = [
  { key: 0, name: "US Citizen" },
  { key: 1, name: "Green Card Holder" },
  { key: 2, name: "Canadian Citizen" },
  { key: 3, name: "Require H1B Sponsorship" },
  { key: 4, name: "Have H1B" },
  { key: 5, name: "OPT EAD" },
  { key: 6, name: "CPT" },
  { key: 7, name: "GC EAD" },
  { key: 8, name: "L2 EAD" },
  { key: 9, name: "E3" },
  { key: 10, name: "J2" },
  { key: 11, name: "Have TN Visa" },
  { key: 12, name: "Require TN Visa" },
  { key: 13, name: " F1" },
  { key: 99, name: " Other US Work Authorization" },
];

export const WORK_LOCATION_TYPE = [
  { key: "1", name: "Company Location Only" },
  { key: "2", name: "Work from Home 50%/Company Location 50%" },
  { key: "3", name: "Work from Home 100%" },
  { key: "4", name: "Work from Home 100%/Occasional Travelling" },
  { key: "5", name: "Jobs in My Prime Location" },
  { key: "6", name: "Jobs in My Prime & Preferred Location" },
  { key: "7", name: "Open for Relocation" },
  { key: "8", name: "100% travel Jobs" }
];

export const EDUCATION_LEVELS = [
  { key: 1, name: "High school diploma" },
  { key: 2, name: "Associate Degree" },
  { key: 3, name: "Bachelor’s Degree" },
  { key: 4, name: "Masters’s Degree" },
  { key: 5, name: "Doctorate Degree" },
  { key: 11, name: "Other" },
];

export const DEFAULT_COUNTRY = "231";

export const RESPONSE_CODE = {
  SUCCESSFUL_REGISTRATION: "1010",
  EMAIL_NOT_REGISTERED: "1013",
  INVALID_TIMESTAMP_IN_REQUEST: "1016",
  INCOMPLETE_PROFILE: "1017",
  INVALID_USER: "1018",
  INVALID_ACCOUNT_STATUS: "1019",
  EMAIL_ALREADY_IN_SYSTEM: "1004",
  FAILED_REGISTRATION_101: "101",
  INVALID_CREDENTIALS: "1001",
  SUCCESSFUL_LOGIN: "1000",
  UNEXPECTED_ERROR: "5000",
  SUCCESSFUL_PROFILE_UPDATE: "1009",
  SUCCESSFUL_PROFILE_CREATION: "1010",
  SUCCESSFUL_ADDITIONAL_PROFILE_UPDATE: "1009",
  SUCCESSFUL_ADDITIONAL_PROFILE_CREATION: "1010",
};
export const DATETIMEFORMAT = {
  DATETIME: "YYYYMMDDHHmmss",
  HOURS: "hours",
  DURATION_ZONE: 4,
};

export const YEARMONTHFORMAT = "YYYYMM";
