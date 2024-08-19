// Auth
export const URLCompanySignup = (): string => "/company-signup";
export const URLUserSignup = (): string => "/user-signup";
export const URLSignIn = (): string => "/";

// User BGV
export const URLUserBGV = (): string => "/steps";
export const URLBGVReport = (): string => "/bgv-report";

// Dashboard Route
export const URLDashboard = (): string => "/dashboard";

// Applications
export const URLApplications = (): string => "/applications";
export const URLUserInfo = (id: string = ":id"): string => `/user-info/${id}}`;

// TimeSheets Route
export const URLTimeSheets = (): string => "/time-sheets";
export const URLTimeSheetsView = (): string => "/time-sheets/view";
export const URLTimeSheetsTemplateTwo = (): string => "/time-sheets/new";

//  Requests Route
export const URLRequests = (): string => "/requests";
export const URLRequestsView = (viewType: string = ":viewType"): string =>
  `/requests/view/${viewType}`;

// Account
export const URLAccount = (): string => "/account";
export const URLAddUsers = (): string => "/add-users";
export const URLDeleteUsers = (): string => "/delete-users";
export const URLTermsConditions = (): string => "/terms-conditions";
