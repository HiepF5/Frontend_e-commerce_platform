//Response
export interface ILoginResponse {
  access_token: string
  refresh_token: string
  token_type: string
  full_name: string
  image_url: string
  date_of_birth: string
  phone_number: string
  email: string
  role: string[]
  issued_at: string
  expire_at: string
}
//Request
export interface ILoginFormRequest {
  username: string 
  password: string 
}
export interface ISignupFormRequest {
  firstName: string;
  lastName: string;
  dob: string; 
  isMale: number;
  phoneNumber: string;
  email: string;
  username: string;
  password: string;
}
export interface IVerificationRequest {
  email: string;
  verify_code: string;
}
export interface IResetPasswordRequest {
  email: string;
}
export interface INewPasswordRequest {
  email: string;
  verify_code: string;
  new_password: string;
}