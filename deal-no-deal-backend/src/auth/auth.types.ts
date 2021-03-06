export abstract class AuthService {
  abstract signUp(SignUpUserDto): Promise<SignUpResult>;
  abstract signIn(SignInUserDto): Promise<SignInResult>;
  abstract signOut(token: string): Promise<void>;
  abstract verifyToken(token: string): Promise<boolean>;
}

export interface SignUpResult {
  id: string;
  username: string;
}

export interface SignInResult {
  accessToken?: string;
  refreshToken?: string;
  expires?: number | string;
}
