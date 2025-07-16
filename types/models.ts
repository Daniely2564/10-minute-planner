interface ModelInstance {
  _id: string;
  __v: number;
  createdAt?: string;
  updatedAt?: string;
}
export interface User extends ModelInstance {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  avatar: string;
  userType: string;
  resetToken: string;
  resetTokenExpiration: Date;
}

export interface Note extends ModelInstance {
  id: number;
  title: string;
  note: string;
  user: string | User;
  shared: boolean;
  verses: {
    id: string;
    verse: string;
  }[];
}
