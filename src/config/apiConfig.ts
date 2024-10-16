const enum EPATHS {
  ServiceAccount = '/guest/users',
  ServiceUsers = '/all/users',
  ServiceAddress = '/customer/address',
}
export const API_ENDPOINTS_ACCOUNT = {
  ApiLogin: `${EPATHS.ServiceAccount}/login`,
  ApiRegister: `${EPATHS.ServiceAccount}/register`,
  ApiCheckRegister: `${EPATHS.ServiceAccount}/check-register`,
  ApiForgotPassword: `${EPATHS.ServiceAccount}/forgot-password`,
  ApiCheckForgot: `${EPATHS.ServiceAccount}/check-forgot`,
};
export const API_ENDPOINTS_USERS = {
  ApiChangePassword: `${EPATHS.ServiceUsers}/change-password`,
  ApiChangeInfo: `${EPATHS.ServiceUsers}/change-info`,
  ApiChangeAvatar: `${EPATHS.ServiceUsers}/change-avatar`,
  ApiGetUserDetail: `${EPATHS.ServiceUsers}/detail`,
};
export const API_ENDPOINTS_ADDRESS = {
  ApiGetAllAddress: `${EPATHS.ServiceAddress}/get-all`,
  ApiCreateAddress: `${EPATHS.ServiceAddress}/create`,
  ApiUpdateAddress: `${EPATHS.ServiceAddress}/update`,
  ApiDeleteAddress: `${EPATHS.ServiceAddress}/delete`,
};


