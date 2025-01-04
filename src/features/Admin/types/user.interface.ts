export interface UserListRequest {
  active: boolean | null;
  userCode: string | null;
  email: string | null;
  telephone: string | null;
  pageNumber: number;
  pageSize: number;
}

