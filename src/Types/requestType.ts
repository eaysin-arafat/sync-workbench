export type RequestType =
  | "hr"
  | "profile-edit"
  | "access"
  | "time-off"
  | "time-sheet";

export const requestType: Record<RequestType, string> = {
  hr: "HR",
  "profile-edit": "ProfileChange",
  access: "Access",
  "time-off": "TimeOff",
  "time-sheet": "TimeSheet",
};

export type RequestObjType = {
  hr: string;
  "profile-edit": string;
  access: string;
  "time-off": string;
};
