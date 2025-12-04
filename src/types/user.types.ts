export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  bio: string;
  interests: string[];
  location: string;
  role: string;
  status: string;
  profileImg: string;
  createdAt: Date;
  updatedAt: Date;
}