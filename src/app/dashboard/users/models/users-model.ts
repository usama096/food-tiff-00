import { Image } from "src/app/shared/models/image-model";
export interface User {
  id?: number,
  firstName: string,
  lastName: string,
  email: string,
  mobileNumber: string,
  isActive: boolean,
  userType: string,
  image: Image
}
export interface UsersResolved {
  user: User | null;
  error?: any;
}
