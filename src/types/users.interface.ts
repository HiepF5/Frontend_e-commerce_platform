//Request
export interface IChangePasswordRequest {
  email: string;
  old_password: string;
  new_password: string;
}
export interface IChangeInfoRequest {
  firstName: string;
  lastName: string;
  dob: string;
  phoneNumber: string;
  email: string;
  username: string;
}
export interface IChangeAvatarRequest {
  email: string;
  file: File;
}
export interface IGetUserDetailRequest {
  email: string;
}
//Response
export interface IUser {
  user_code: string;        
  image_url: string;       
  first_name: string;       
  last_name: string;      
  date_of_birth: string;   
  phone_number: string;    
  email: string;           
  username: string;         
  list_role: string[];      
  active: boolean;         
  enable: boolean;        
  created_at?: string;    
  modified_at?: string;     
  modified_by?: string;    
}

