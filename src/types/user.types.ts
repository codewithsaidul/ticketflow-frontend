export interface IUser {
  _id: string;
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
  createdAt: Date;
  updatedAt: Date;
}


export enum UserRole {
  SUPERADMIN = "superadmin",
  ADMIN = "admin",
  HOST = "host",
  USER = "user"
}