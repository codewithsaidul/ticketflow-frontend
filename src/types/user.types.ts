export interface IUser {
  _id: string;
  userId?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  bio: string;
  interests: string[];
  location: string;
  role: string;
  profileImg: string;
  status: string;
  isDeleted: boolean
  createdAt: string;
  updatedAt: string;
}


export enum UserRole {
  SUPERADMIN = "superadmin",
  ADMIN = "admin",
  HOST = "host",
  USER = "user"
}