const enum EPATHS {
  ServiceAccount = '/guest/users'
}
export const API_ENDPOINTS_ACCOUNT = {
  ApiLogin: `${EPATHS.ServiceAccount}/login`,
  ApiRegister: `${EPATHS.ServiceAccount}/register`,
  ApiCheckRegister: `${EPATHS.ServiceAccount}/check-register`,
  ApiForgotPassword: `${EPATHS.ServiceAccount}/forgot-password`,
  ApiCheckForgot: `${EPATHS.ServiceAccount}/check-forgot`,
};
