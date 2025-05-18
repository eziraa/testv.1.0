interface SignupPayload {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface AuthResponse {
  user: {
    _id: string;
    username: string;
    email: string;
    profilePicture?: string;
  };
  accessToken: string;
  refreshToken: string;
}


export type { SignupPayload, LoginPayload, AuthResponse };