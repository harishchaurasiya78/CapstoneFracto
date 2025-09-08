export interface User {
  userId: number;
  username: string;
  role: string;
  email?: string;
  phone?: string;
  profileImagePath?: string;
  createdAt: Date;
}

export interface UserRegistration {
  username: string;
  password: string;
  email: string;
  phone: string;
  role: string;
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface UserUpdate {
  email?: string;
  phone?: string;
}
