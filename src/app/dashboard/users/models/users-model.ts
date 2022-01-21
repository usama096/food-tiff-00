export interface Users {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  mobileNumber: string,
  isActive: boolean,
  userType: string,
  profileImgUrl: string
}
export interface UsersResolved {
  users: Users | null;
  error?: any;
}
