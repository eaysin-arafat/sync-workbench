// Auth
export const URLCompanySignup = (): string => "/company-signup";
export const URLUserSignup = (): string => "/sign-up";
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

// utils/navigation.ts
export const getDashboardLink = (): string => "/dashboard";
export const getEmployeeLink = (): string => "/employee";
export const getDepartmentLink = (): string => "/department";
export const getRolePermissionLink = (): string => "/role-permission";
export const getProjectTaskLink = (): string => "/project-task";
export const getAttendanceLink = (): string => "/attendance";
export const getLeaveLink = (): string => "/leave";
export const getPerformanceReviewsLink = (): string => "/performance-reviews";
export const getPayrollLink = (): string => "/payroll";
export const getDocumentLink = (): string => "/document";
export const getReportsLink = (): string => "/reports";
export const getSettingsLink = (): string => "/settings";
export const getUserProfileLink = (): string => "/user-profile";
export const getSecurityLink = (): string => "/security";
export const getHelpSupportLink = (): string => "/help-support";
export const getFeedbackSuggestionsLink = (): string => "/feedback-suggestions";
export const getCalendarLink = (): string => "/calendar";
